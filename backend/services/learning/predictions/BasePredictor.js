const ForecastCalculator = require("../calculators/ForecastCalculator");

class BasePredictor {

    constructor() {

        this.calculator = ForecastCalculator;

    }

    getName() {

        throw new Error(

            "getName() must be implemented."

        );

    }

    supports(dataset = []) {

        throw new Error(

            "supports() must be implemented."

        );

    }

    predict(dataset = []) {

        throw new Error(

            "predict() must be implemented."

        );

    }

}

module.exports = BasePredictor;