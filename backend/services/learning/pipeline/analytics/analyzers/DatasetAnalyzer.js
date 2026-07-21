class DatasetAnalyzer {

    analyze(dataset = [], businessSchema = {}) {

        if (!Array.isArray(dataset) || dataset.length === 0) {

            return {

                summary: {},

                profile: {},

                schema: {},

                quality: {},

                characteristics: {}

            };

        }

        const summary = this.buildSummary(dataset);

        const schema = this.buildSchema(dataset);

        const profile = this.buildProfile(schema);

        const quality = this.buildQuality(dataset);

        const characteristics = this.buildCharacteristics(

            businessSchema

        );

        return {

            summary,

            profile,

            schema,

            quality,

            characteristics

        };

    }

    buildSummary(dataset) {

        return {

            rows: dataset.length,

            columns: Object.keys(dataset[0]).length

        };

    }

    buildSchema(dataset) {

        const schema = {

            numeric: [],

            categorical: [],

            boolean: [],

            date: [],

            text: []

        };

        const columns = Object.keys(dataset[0]);

        columns.forEach(column => {

            const type = this.detectColumnType(

                dataset,

                column

            );

            schema[type].push(column);

        });

        return schema;

    }

    buildProfile(schema) {

        return {

            numericColumns:

                schema.numeric.length,

            categoricalColumns:

                schema.categorical.length,

            booleanColumns:

                schema.boolean.length,

            dateColumns:

                schema.date.length,

            textColumns:

                schema.text.length

        };

    }

    buildQuality(dataset) {

        const rows = dataset.length;

        const columns = Object.keys(dataset[0]).length;

        const totalCells = rows * columns;

        let missingValues = 0;

        dataset.forEach(row => {

            Object.values(row).forEach(value => {

                if (

                    value === null ||

                    value === undefined ||

                    value === ""

                ) {

                    missingValues++;

                }

            });

        });

        const duplicates = this.countDuplicates(

            dataset

        );

        const completeness =

            Number(

                (

                    (

                        (totalCells - missingValues)

                        /

                        totalCells

                    ) * 100

                ).toFixed(2)

            );

        const qualityScore = Math.max(

            0,

            Math.round(

                completeness -

                (

                    duplicates *

                    0.5

                )

            )

        );

        return {

            completeness,

            qualityScore,

            duplicates,

            missingValues,

            missingPercentage:

                Number(

                    (

                        (

                            missingValues /

                            totalCells

                        ) * 100

                    ).toFixed(2)

                )

        };

    }

    buildCharacteristics(schema = {}) {

        const numeric = schema.numericFields || [];

        const categorical = schema.categoricalFields || [];

        const dates = schema.dateFields || [];

        const allColumns = [

            ...numeric,

            ...categorical,

            ...dates

        ].map(column =>

            String(column).toLowerCase()

        );

        const contains = keyword =>

            allColumns.some(column =>

                column.includes(keyword)

            );

        return {

            hasRevenue:

                contains("revenue") ||

                contains("sales") ||

                contains("income"),

            hasExpense:

                contains("expense") ||

                contains("cost"),

            hasProfit:

                contains("profit"),

            hasCustomer:

                contains("customer") ||

                contains("client"),

            hasProduct:

                contains("product") ||

                contains("item"),

            hasInventory:

                contains("inventory") ||

                contains("stock"),

            hasEmployee:

                contains("employee") ||

                contains("staff"),

            hasDate:

                dates.length > 0,

            hasRegion:

                contains("region") ||

                contains("city") ||

                contains("state"),

            hasCategory:

                contains("category"),

            hasQuantity:

                contains("quantity") ||

                contains("qty"),

            hasPrice:

                contains("price") ||

                contains("amount")

        };

    }

    detectColumnType(dataset, column) {

        const values = dataset

            .map(

                row => row[column]

            )

            .filter(

                value =>

                    value !== null &&

                    value !== undefined &&

                    value !== ""

            );

        if (values.length === 0) {

            return "text";

        }

        const sample = values[0];

        if (typeof sample === "boolean") {

            return "boolean";

        }

        if (

            typeof sample === "number"

        ) {

            return "numeric";

        }

        const numericCount = values.filter(

            value =>

                !isNaN(

                    Number(value)

                )

        ).length;

        if (

            numericCount >=

            values.length * 0.8

        ) {

            return "numeric";

        }

        const dateCount = values.filter(

            value =>

                !isNaN(

                    Date.parse(value)

                )

        ).length;

        if (

            dateCount >=

            values.length * 0.8

        ) {

            return "date";

        }

        const averageLength =

            values.reduce(

                (sum, value) =>

                    sum +

                    String(value).length,

                0

            ) / values.length;

        if (

            averageLength >

            30

        ) {

            return "text";

        }

        return "categorical";

    }

    countDuplicates(dataset) {

        const unique = new Set(

            dataset.map(

                row =>

                    JSON.stringify(row)

            )

        );

        return dataset.length - unique.size;

    }

}

module.exports = new DatasetAnalyzer();