const XLSX = require("xlsx");

async function parseExcel(file) {

    try {

        const workbook = XLSX.readFile(file.path);

        const sheetName = workbook.SheetNames[0];

        const worksheet = workbook.Sheets[sheetName];

        const records = XLSX.utils.sheet_to_json(

            worksheet,

            {

                defval: ""

            }

        );

        const headers =

            records.length > 0

                ? Object.keys(records[0])

                : [];

        return {

            success: true,

            fileType: "excel",

            headers,

            records,

            metadata: {

                fileName: file.originalname,

                parser: "excel",

                totalRows: records.length,

                totalColumns: headers.length,

                totalSheets: workbook.SheetNames.length,

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

module.exports = parseExcel;