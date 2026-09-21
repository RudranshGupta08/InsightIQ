const path = require("path");

const parseExcel = require("../services/parser/excelParser");
const parseCSV = require("../services/parser/csvParser");
const parsePDF = require("../services/parser/pdfParser");
const parseWord = require("../services/parser/wordParser");
const parseImage = require("../services/parser/imageParser");

const normalizeData = require("../services/normalizer/normalizer");

const LearningPayloadBuilder = require(
    "../services/learning/core/LearningPayloadBuilder"
);

const LearningEngine = require(
    "../services/learning/core/LearningEngine"
);
const Workspace = require("../models/Workspace");

async function uploadFiles(req, res) {

    try {

        if (!req.files || req.files.length === 0) {

            return res.status(400).json({

                success: false,

                message: "No files uploaded."

            });

        }

        const { workspaceId } = req.body;

        if (!workspaceId) {

            return res.status(400).json({

                success: false,

                message: "Workspace ID is required."

            });

        }

        const workspace = await Workspace.findOne({
            _id: workspaceId,
            ownerId: req.user._id,
        }).select("_id");

        if (!workspace) {
            return res.status(403).json({
                success: false,
                message: "You do not have access to this workspace.",
            });
        }

        const processedFiles = [];

        for (const file of req.files) {

            const extension = path
                .extname(file.originalname)
                .toLowerCase();

            let parsedData;

            // Excel
            if (
                extension === ".xlsx" ||
                extension === ".xls"
            ) {

                parsedData = await parseExcel(file);

            }

            // CSV
            else if (extension === ".csv") {

                parsedData = await parseCSV(file);

            }

            // PDF
            else if (extension === ".pdf") {

                parsedData = await parsePDF(file);

            }

            // Word
            else if (
                extension === ".doc" ||
                extension === ".docx"
            ) {

                parsedData = await parseWord(file);

            }

            // Images
            else if (
                extension === ".png" ||
                extension === ".jpg" ||
                extension === ".jpeg" ||
                extension === ".webp"
            ) {

                parsedData = await parseImage(file);

            }

            // Unsupported
            else {

                processedFiles.push({

                    success: false,

                    fileName: file.originalname,

                    message: "Unsupported file type."

                });

                continue;

            }

            // Parser failed
            if (!parsedData.success) {

                processedFiles.push({

                    success: false,

                    fileName: file.originalname,

                    error: parsedData.error

                });

                continue;

            }

            // Normalize
            const normalizedData = normalizeData(parsedData);

            if (!normalizedData.success) {

                processedFiles.push({

                    success: false,

                    fileName: file.originalname,

                    error: normalizedData.error

                });

                continue;

            }

            // Build Learning Payload
            const learningPayload =

                LearningPayloadBuilder.build(

                    normalizedData,

                    {

                        workspaceId,

                        fileName: file.originalname,

                        uploadedBy: req.user?._id

                    }

                );

            // AI Processing
            const aiAnalysis =

                await LearningEngine.processUpload(

                    learningPayload

                );

            if (!aiAnalysis.success) {

                processedFiles.push({

                    success: false,

                    fileName: file.originalname,

                    error:

                        aiAnalysis.error ||

                        "AI processing failed."

                });

                continue;

            }

            // Success
            processedFiles.push({

                success: true,

                fileName: file.originalname,

                rawData: {

                    headers:

                        normalizedData.headers,

                    metadata:

                        normalizedData.metadata

                },

                aiAnalysis

            });

        }

        return res.status(200).json({

            success: true,

            totalFiles: processedFiles.length,

            processedFiles

        });

    }

    catch (error) {

        console.error(

            "Import Controller Error:",

            error

        );

        return res.status(500).json({

            success: false,

            message: "Internal Server Error.",

            error: error.message

        });

    }

}

module.exports = {

    uploadFiles

};