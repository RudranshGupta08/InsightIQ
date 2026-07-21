const fs = require("fs");
const pdf = require("pdf-parse");

async function parsePDF(file) {

    try {

        const buffer = fs.readFileSync(file.path);

        const pdfData = await pdf(buffer);

        const text = pdfData.text || "";

        const lines = text
            .split("\n")
            .map(line => line.trim())
            .filter(line => line.length > 0);

        const records = lines.map(line => ({
            content: line
        }));

        return {

            success: true,

            fileType: "pdf",

            records,

            headers: ["content"],

            metadata: {

                fileName: file.originalname,

                parser: "pdf",

                totalPages: pdfData.numpages,

                totalRows: records.length,

                totalColumns: 1,

                parsedAt: new Date()

            }

        };

    }

    catch (error) {

        return {

            success: false,

            error: error.message

        };

    }

}

module.exports = parsePDF;