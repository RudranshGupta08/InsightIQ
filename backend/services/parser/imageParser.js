const fs = require("fs");
const path = require("path");

async function parseImage(file) {

    try {

        const stats = fs.statSync(file.path);

        const extension = path
            .extname(file.originalname)
            .replace(".", "")
            .toLowerCase();

        return {

            success: true,

            fileType: "image",

            records: [],

            headers: [],

            metadata: {

                fileName: file.originalname,

                parser: "image",

                extension,

                mimeType: file.mimetype,

                size: stats.size,

                totalRows: 0,

                totalColumns: 0,

                ocrEnabled: false,

                extractedText: "",

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

module.exports = parseImage;