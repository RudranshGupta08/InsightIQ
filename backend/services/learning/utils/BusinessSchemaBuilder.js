class BusinessSchemaBuilder {

    build(dataset = []) {

        if (!Array.isArray(dataset) || dataset.length === 0) {

            return {
                fields: {},
                numericFields: [],
                categoricalFields: [],
                dateFields: [],
                totalRows: 0
            };

        }

        const schema = {

            fields: {},

            numericFields: [],

            categoricalFields: [],

            dateFields: [],

            totalRows: dataset.length

        };

        const columns = Object.keys(dataset[0]);

        columns.forEach(column => {

            const values = dataset
                .map(row => row[column])
                .filter(value =>
                    value !== null &&
                    value !== undefined &&
                    value !== ""
                );

            const numericValues = values
                .map(value => Number(value))
                .filter(value => !isNaN(value));

            const uniqueValues = [...new Set(values)];

            const isNumeric =
                numericValues.length >=
                values.length * 0.7;

            const isDate =
                values.some(value =>
                    !isNaN(Date.parse(value))
                );

            const field = {

                name: column,

                values,

                uniqueValues,

                totalValues: values.length,

                missingValues:
                    dataset.length - values.length,

                missingPercentage:
                    Number(
                        (
                            (dataset.length - values.length) /
                            dataset.length *
                            100
                        ).toFixed(2)
                    ),

                isNumeric,

                isDate,

                isCategorical:
                    !isNumeric && !isDate

            };

            if (isNumeric) {

                field.numericValues = numericValues;

                field.total =
                    numericValues.reduce(
                        (a, b) => a + b,
                        0
                    );

                field.average =
                    numericValues.length
                        ? field.total /
                          numericValues.length
                        : 0;

                field.max =
                    Math.max(...numericValues);

                field.min =
                    Math.min(...numericValues);

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