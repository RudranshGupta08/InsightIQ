function isValidDateValue(value) {
    if (value instanceof Date) {
        return !Number.isNaN(value.getTime());
    }

    if (typeof value !== "string") {
        return false;
    }

    const trimmed = value.trim();
    if (!trimmed) return false;

    const looksLikeDate =
        /^\d{4}[-\/]\d{1,2}[-\/]\d{1,2}(?:[T\s].*)?$/.test(trimmed) ||
        /^\d{1,2}[-\/]\d{1,2}[-\/]\d{4}(?:[\s].*)?$/.test(trimmed) ||
        /^[A-Za-z]{3,9}\s+\d{1,2},?\s+\d{4}$/.test(trimmed);

    if (!looksLikeDate) return false;

    const iso = trimmed.match(/^(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})(?:[T\s].*)?$/);
    if (iso) {
        const date = new Date(Date.UTC(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3])));
        return date.getUTCFullYear() === Number(iso[1]) &&
            date.getUTCMonth() === Number(iso[2]) - 1 &&
            date.getUTCDate() === Number(iso[3]);
    }

    const dayFirst = trimmed.match(/^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})(?:[\s].*)?$/);
    if (dayFirst) {
        const date = new Date(Date.UTC(Number(dayFirst[3]), Number(dayFirst[2]) - 1, Number(dayFirst[1])));
        return date.getUTCFullYear() === Number(dayFirst[3]) &&
            date.getUTCMonth() === Number(dayFirst[2]) - 1 &&
            date.getUTCDate() === Number(dayFirst[1]);
    }

    const named = trimmed.match(/^([A-Za-z]{3,9})\s+(\d{1,2}),?\s+(\d{4})$/);
    if (!named) return false;

    const date = new Date(trimmed);
    return !Number.isNaN(date.getTime()) &&
        date.getFullYear() === Number(named[3]) &&
        date.getDate() === Number(named[2]);
}

const NUMERIC_FIELD_HINTS = new Set([
    "amount",
    "totalamount",
    "netamount",
    "unitprice",
    "price",
    "quantity",
    "qty",
    "value",
]);

const DATE_FIELD_HINTS = new Set([
    "date",
    "transactiondate",
    "invoicedate",
    "paymentdate",
    "duedate",
]);

function normalizeFieldName(value = "") {
    return String(value)
        .trim()
        .toLowerCase()
        .replace(/[ _-]/g, "");
}

class BusinessSchemaBuilder {
    build(dataset = []) {
        if (!Array.isArray(dataset) || dataset.length === 0) {
            return {
                fields: {},
                numericFields: [],
                categoricalFields: [],
                dateFields: [],
                totalRows: 0,
            };
        }

        const schema = {
            fields: {},
            numericFields: [],
            categoricalFields: [],
            dateFields: [],
            totalRows: dataset.length,
        };

        const columns = Object.keys(dataset[0]);

        columns.forEach((column) => {
            const values = dataset
                .map((row) => row[column])
                .filter(
                    (value) =>
                        value !== null &&
                        value !== undefined &&
                        value !== ""
                );

            const numericValues = values
                .filter((value) => {
                    if (typeof value === "number") {
                        return Number.isFinite(value);
                    }

                    if (typeof value !== "string" || !value.trim()) {
                        return false;
                    }

                    return /^-?\d+(\.\d+)?$/.test(
                        value.trim().replace(/,/g, "")
                    );
                })
                .map((value) => Number(value));

            const uniqueValues = [...new Set(values)];

            const normalizedField = normalizeFieldName(column);
            const hasNumericHint = NUMERIC_FIELD_HINTS.has(normalizedField);
            const hasDateHint = DATE_FIELD_HINTS.has(normalizedField);

            const isNumeric =
                values.length > 0 &&
                (hasNumericHint || numericValues.length >= values.length * 0.7);

            const dateValues = values.filter(isValidDateValue);
            const isDate =
                !isNumeric &&
                values.length > 0 &&
                (hasDateHint || dateValues.length >= values.length * 0.7);

            const field = {
                name: column,
                values,
                uniqueValues,
                totalValues: values.length,
                missingValues: dataset.length - values.length,
                missingPercentage: Number(
                    (
                        ((dataset.length - values.length) /
                            dataset.length) *
                        100
                    ).toFixed(2)
                ),
                isNumeric,
                isDate,
                isCategorical: !isNumeric && !isDate,
            };

            if (isNumeric) {
                field.numericValues = numericValues;
                field.total = numericValues.reduce((a, b) => a + b, 0);
                field.average = numericValues.length
                    ? field.total / numericValues.length
                    : 0;
                field.max = Math.max(...numericValues);
                field.min = Math.min(...numericValues);
                schema.numericFields.push(column);
            }

            if (field.isCategorical) {
                schema.categoricalFields.push(column);
            }

            if (isDate) {
                schema.dateFields.push(column);
            }

            schema.fields[column] = field;
        });

        return schema;
    }
}

module.exports = new BusinessSchemaBuilder();
