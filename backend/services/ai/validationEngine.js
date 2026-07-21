function validationEngine(normalizedData = {}) {

    const records = normalizedData.records || [];

    const headers = normalizedData.headers || [];

    const warnings = [];

    const errors = [];

    let valid = true;

    // Validate headers

    if (headers.length === 0) {

        valid = false;

        errors.push("No headers found.");

    }

    // Validate records

    if (records.length === 0) {

        valid = false;

        errors.push("No records found.");

    }

    let emptyRows = 0;

    let negativeAmounts = 0;

    let duplicateRows = 0;

    const uniqueRows = new Set();

    records.forEach(record => {

        const values = Object.values(record);

        // Empty row detection

        const isEmpty = values.every(value =>

            value === "" ||

            value === null ||

            value === undefined

        );

        if (isEmpty) {

            emptyRows++;

        }

        // Duplicate detection

        const hash = JSON.stringify(record);

        if (uniqueRows.has(hash)) {

            duplicateRows++;

        }

        else {

            uniqueRows.add(hash);

        }

        // Negative amount detection

        values.forEach(value => {

            const number = Number(value);

            if (

                !Number.isNaN(number) &&

                number < 0

            ) {

                negativeAmounts++;

            }

        });

    });

    if (emptyRows > 0) {

        warnings.push(

            `${emptyRows} empty rows detected.`

        );

    }

    if (duplicateRows > 0) {

        warnings.push(

            `${duplicateRows} duplicate rows detected.`

        );

    }

    if (negativeAmounts > 0) {

        warnings.push(

            `${negativeAmounts} negative values found.`

        );

    }

    return {

        valid,

        warnings,

        errors,

        statistics: {

            totalRows: records.length,

            totalHeaders: headers.length,

            emptyRows,

            duplicateRows,

            negativeAmounts

        }

    };

}

module.exports = validationEngine;