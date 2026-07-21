const RevenuePredictor = require("./predictors/RevenuePredictor");

const ExpensePredictor = require("./predictors/ExpensePredictor");

const CashflowPredictor = require("./predictors/CashflowPredictor");

const ProfitPredictor = require("./predictors/ProfitPredictor");

const TrendPredictor = require("./predictors/TrendPredictor");

const KPIPredictor = require("./predictors/KPIPredictor");

class PredictionEngine {

    constructor() {

        this.predictors = [

            RevenuePredictor,

            ExpensePredictor,

            CashflowPredictor,

            ProfitPredictor,

            TrendPredictor,

            KPIPredictor

        ];

    }

    predict(dataset = []) {

        const predictions = [];

        for (const predictor of this.predictors) {

            if (!predictor.supports(dataset)) {

                continue;

            }

            const result = predictor.predict(dataset);

            if (result) {

                predictions.push(result);

            }

        }

        return predictions;

    }

}

module.exports = new PredictionEngine();