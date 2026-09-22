const path = require("path");
const crypto = require("crypto");

const parseExcel = require("../services/parser/excelParser");
const parseCSV = require("../services/parser/csvParser");
const parsePDF = require("../services/parser/pdfParser");
const parseWord = require("../services/parser/wordParser");
const parseImage = require("../services/parser/imageParser");

const normalizeData = require("../services/normalizer/normalizer");
const Transaction = require("../models/Transaction");
const Workspace = require("../models/Workspace");

const LearningPayloadBuilder = require(
    "../services/learning/core/LearningPayloadBuilder"
);

const LearningEngine = require(
    "../services/learning/core/LearningEngine"
);

const { canonicalizeRecords } = require(
    "../services/canonical/transactionCanonicalizer"
);

function getSourceType(extension) {
    const sourceTypes = {
        ".csv": "csv",
        ".xlsx": "excel",
        ".xls": "excel",
        ".pdf": "pdf",
        ".doc": "word",
        ".docx": "word",
        ".png": "image",
        ".jpg": "image",
        ".jpeg": "image",
        ".webp": "image",
    };

    return sourceTypes[extension] || "api";
}

function getMappingConfidence(mappings = []) {
    const scores = mappings
        .map((mapping) => Number(mapping?.confidence))
        .filter((score) => Number.isFinite(score));

    if (!scores.length) return 0;

    return Number(
        (scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(2)
    );
}

async function uploadFiles(req, res) {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No files uploaded.",
            });
        }

        const { workspaceId } = req.body;

        if (!workspaceId) {
            return res.status(400).json({
                success: false,
                message: "Workspace ID is required.",
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
            const extension = path.extname(file.originalname).toLowerCase();
            const source = getSourceType(extension);
            const sourceBatchId = crypto.randomUUID();

            let parsedData;

            if (extension === ".xlsx" || extension === ".xls") {
                parsedData = await parseExcel(file);
            } else if (extension === ".csv") {
                parsedData = await parseCSV(file);
            } else if (extension === ".pdf") {
                parsedData = await parsePDF(file);
            } else if (extension === ".doc" || extension === ".docx") {
                parsedData = await parseWord(file);
            } else if (
                extension === ".png" ||
                extension === ".jpg" ||
                extension === ".jpeg" ||
                extension === ".webp"
            ) {
                parsedData = await parseImage(file);
            } else {
                processedFiles.push({
                    success: false,
                    fileName: file.originalname,
                    message: "Unsupported file type.",
                });
                continue;
            }

            if (!parsedData.success) {
                processedFiles.push({
                    success: false,
                    fileName: file.originalname,
                    error: parsedData.error,
                });
                continue;
            }

            const normalizedData = normalizeData(parsedData);

            if (!normalizedData.success) {
                processedFiles.push({
                    success: false,
                    fileName: file.originalname,
                    error: normalizedData.error,
                });
                continue;
            }

            const learningPayload = LearningPayloadBuilder.build(
                normalizedData,
                {
                    workspaceId,
                    fileName: file.originalname,
                    uploadedBy: req.user?._id,
                }
            );

            const aiAnalysis = await LearningEngine.processUpload(
                learningPayload
            );

            if (!aiAnalysis.success) {
                processedFiles.push({
                    success: false,
                    fileName: file.originalname,
                    error:
                        aiAnalysis.error ||
                        "AI processing failed.",
                });
                continue;
            }

            const mappedDataset = aiAnalysis.data?.dataset || [];
            const mappings = aiAnalysis.data?.mappings || [];
            const mappingConfidence = getMappingConfidence(mappings);

            const canonicalized = canonicalizeRecords(
                mappedDataset,
                {
                    ownerId: req.user._id,
                    workspaceId,
                    source,
                    sourceFileName: file.originalname,
                    sourceBatchId,
                    aiProcessed: true,
                    mappingConfidence,
                }
            );

            let persistedTransactions = [];

            if (canonicalized.transactions.length) {
                persistedTransactions = await Transaction.insertMany(
                    canonicalized.transactions,
                    { ordered: false }
                );
            }

            processedFiles.push({
                success: true,
                fileName: file.originalname,
                rawData: {
                    headers: normalizedData.headers,
                    metadata: normalizedData.metadata,
                },
                aiAnalysis,
                canonical: {
                    totalRows: normalizedData.records.length,
                    persistedTransactions: persistedTransactions.length,
                    skippedRows: canonicalized.errors.length,
                    errors: canonicalized.errors,
                    mappingConfidence,
                    sourceBatchId,
                },
            });
        }

        const totalTransactions = processedFiles.reduce(
            (total, file) =>
                total + (file.canonical?.persistedTransactions || 0),
            0
        );

        return res.status(200).json({
            success: true,
            totalFiles: processedFiles.length,
            totalTransactions,
            processedFiles,
        });
    } catch (error) {
        console.error("Import Controller Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error.",
            error: error.message,
        });
    }
}

module.exports = {
    uploadFiles,
};
