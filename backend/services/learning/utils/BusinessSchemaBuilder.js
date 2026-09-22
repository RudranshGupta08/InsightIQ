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

    const time = Date.parse(trimmed);
    return !Number.isNaN(time);
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

            const isNumeric =
                values.length > 0 &&
                numericValues.length >= values.length * 0.7;

            const dateValues = values.filter(isValidDateValue);
            const isDate =
                !isNumeric &&
                values.length > 0 &&
                dateValues.length >= values.length * 0.7;

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
