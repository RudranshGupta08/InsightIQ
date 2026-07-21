const fs = require("fs");
const csv = require("csv-parser");

async function parseCSV(file) {

    return new Promise((resolve) => {

        const rows = [];

        fs.createReadStream(file.path)

            .pipe(csv())

            .on("data", (row) => {

                rows.push(row);

            })

            .on("end", () => {

                const headers =

                    rows.length > 0

                        ? Object.keys(rows[0])

                        : [];

                resolve({

                    success: true,

                    fileType: "csv",

                    records: rows,

                    headers,

                    metadata: {

                        totalRows: rows.length,

                        totalColumns: headers.length,

                    },

                });

            })

            .on("error", (error) => {

                resolve({

                    success: false,

                    error: error.message,

                });

            });

    });

}

module.exports = parseCSV;