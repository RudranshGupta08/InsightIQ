const BaseProcessor = require("../core/BaseProcessor");

const ProcessingContext = require("../core/ProcessingContext");

class PatternProcessor extends BaseProcessor {

    constructor() {

        super("PatternProcessor");

    }

    async process(payload = {}) {

        return await this.execute(async () => {

            this.validateInput(payload);

            const context =

                ProcessingContext.createContext(

                    payload

                );

            context.dataset =

                payload.dataset || [];

            context.patterns =

                this.detectPatterns(

                    context.dataset

                );

            context.analytics =

                this.buildAnalytics(

                    context.patterns,

                    context.dataset

                );

            return this.buildSuccess({

                data: {

                    patterns:

                        context.patterns,

                    analytics:

                        context.analytics

                },

                metadata: {

                    datasetSize:

                        context.dataset.length,

                    totalPatterns:

                        context.patterns.length

                }

            });

        });

    }

    validateInput(payload) {

        super.validate(payload);

        if (

            !Array.isArray(payload.dataset)

        ) {

            throw new Error(

                "Dataset is required."

            );

        }

        return true;

    }

    detectPatterns(dataset = []) {

        const patterns = [];

        patterns.push(

            ...this.detectMissingValues(

                dataset

            )

        );

        patterns.push(

            ...this.detectDuplicateRows(

                dataset

            )

        );

        patterns.push(

            ...this.detectNumericColumns(

                dataset

            )

        );

        patterns.push(

            ...this.detectCategoricalColumns(

                dataset

            )

        );

        return patterns;

    }

    detectMissingValues(dataset) {

        let missing = 0;

        dataset.forEach(row => {

            Object.values(row).forEach(value => {

                if (

                    value === null ||

                    value === "" ||

                    value === undefined

                ) {

                    missing++;

                }

            });

        });

        return [

            {

                type: "Missing Values",

                count: missing,

                severity:

                    missing > 0

                        ? "Medium"

                        : "Low"

            }

        ];

    }

    detectDuplicateRows(dataset) {

        const seen = new Set();

        let duplicates = 0;

        dataset.forEach(row => {

            const key =

                JSON.stringify(row);

            if (

                seen.has(key)

            ) {

                duplicates++;

            }

            else {

                seen.add(key);

            }

        });

        return [

            {

                type:

                    "Duplicate Records",

                count:

                    duplicates,

                severity:

                    duplicates > 0

                        ? "High"

                        : "Low"

            }

        ];

    }

    detectNumericColumns(dataset) {

        if (

            dataset.length === 0

        ) {

            return [];

        }

        const numeric = [];

        Object.keys(

            dataset[0]

        ).forEach(column => {

            const values =

                dataset

                    .map(

                        row =>

                            row[column]

                    )

                    .filter(

                        value =>

                            typeof value ===

                            "number"

                    );

            if (

                values.length

            ) {

                numeric.push({

                    type:

                        "Numeric Column",

                    field:

                        column,

                    records:

                        values.length

                });

            }

        });

        return numeric;

    }

    detectCategoricalColumns(dataset) {

        if (

            dataset.length === 0

        ) {

            return [];

        }

        const categorical = [];

        Object.keys(

            dataset[0]

        ).forEach(column => {

            const values =

                dataset

                    .map(

                        row =>

                            row[column]

                    )

                    .filter(

                        value =>

                            typeof value ===

                            "string"

                    );

            if (

                values.length

            ) {

                categorical.push({

                    type:

                        "Categorical Column",

                    field:

                        column,

                    records:

                        values.length

                });

            }

        });

        return categorical;

    }

    buildAnalytics(

        patterns,

        dataset

    ) {

        return {

            datasetSize:

                dataset.length,

            totalPatterns:

                patterns.length,

            numericPatterns:

                patterns.filter(

                    p =>

                        p.type ===

                        "Numeric Column"

                ).length,

            categoricalPatterns:

                patterns.filter(

                    p =>

                        p.type ===

                        "Categorical Column"

                ).length,

            issues:

                patterns.filter(

                    p =>

                        p.severity ===

                        "High"

                ).length

        };

    }

}

module.exports = new PatternProcessor();