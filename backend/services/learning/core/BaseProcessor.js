const LearningConstants = require("../constants/LearningConstants");

class BaseProcessor {

    constructor(name) {

        this.name = name;

    }

    startExecution() {

        return Date.now();

    }

    stopExecution(startTime) {

        return Date.now() - startTime;

    }

    validate(data) {

        if (!data) {

            throw new Error(

                "Processor input is required."

            );

        }

        return true;

    }

    buildSuccess({

        data = {},

        metadata = {},

        reasoning = [],

        warnings = []

    } = {}) {

        return {

            success: true,

            processor: this.name,

            timestamp: new Date(),

            data,

            metadata,

            reasoning,

            warnings

        };

    }

    buildError(error) {

        return {

            success: false,

            processor: this.name,

            timestamp: new Date(),

            error: error.message

        };

    }

    async execute(callback) {

        try {

            return await callback();

        }

        catch (error) {

            console.error(error);

            return this.buildError(

                error

            );

        }

    }

}

module.exports = BaseProcessor;