const BasePredictor = require("../BasePredictor");

class ExpensePredictor extends BasePredictor {

    getName() {

        return "Expense Predictor";

    }

    supports(dataset = []) {

        if (!dataset.length) {

            return false;

        }

        return Object.keys(dataset[0]).some(

            column =>

                column.toLowerCase() === "expense"

        );

    }

    predict(dataset = []) {

        const expenses = dataset

            .map(row => Number(row.Expense || 0))

            .filter(value => !isNaN(value));

        return {

            predictor: this.getName(),

            average:

                this.calculator.average(expenses),

            movingAverage:

                this.calculator.movingAverage(expenses),

            growth:

                this.calculator.growthRate(expenses),

            forecast:

                this.calculator.linearForecast(expenses)

        };

    }

}

module.exports = new ExpensePredictor();