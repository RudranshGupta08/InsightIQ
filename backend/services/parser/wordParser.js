const mammoth = require("mammoth");

async function parseWord(file) {

    try {

        const result = await mammoth.extractRawText({

            path: file.path

        });

        const text = result.value || "";

        const paragraphs = text

            .split("\n")

            .map(line => line.trim())

            .filter(line => line.length > 0);

        const records = paragraphs.map(paragraph => ({

            content: paragraph

        }));

        return {

            success: true,

            fileType: "word",

            records,

            headers: ["content"],

            metadata: {

                fileName: file.originalname,

                parser: "word",

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

module.exports = parseWord;