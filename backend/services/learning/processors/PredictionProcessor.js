const BaseProcessor = require("../core/BaseProcessor");

const ProcessingContext = require("../core/ProcessingContext");

const PredictionEngine = require("../predictions/PredictionEngine");

class PredictionProcessor extends BaseProcessor {

    constructor() {

        super("PredictionProcessor");

    }

    async process(payload = {}) {

        return await this.execute(async () => {

            this.validateInput(payload);

            const context =

                ProcessingContext.createContext(

                    payload

                );

            this.prepareContext(

                context

            );

            const report =

                await PredictionEngine.predict(

                    context.dataset

                );

            context.predictions =

                report.predictions || [];

            context.analytics =

                report.analytics || {};

            context.metadata =

                report.metadata || {};

            context.reasoning =

                report.reasoning || [];

            context.warnings =

                report.warnings || [];

            return this.buildSuccess({

                data: {

                    predictions:

                        context.predictions,

                    analytics:

                        context.analytics

                },

                metadata:

                    context.metadata,

                reasoning:

                    context.reasoning,

                warnings:

                    context.warnings

            });

        });

    }

    validateInput(payload) {

        super.validate(payload);

        if (

            !Array.isArray(

                payload.dataset

            )

        ) {

            throw new Error(

                "Dataset is required."

            );

        }

        return true;

    }

    prepareContext(context) {

        context.dataset =

            context.payload.dataset || [];

        return context;

    }

}

module.exports = new PredictionProcessor();