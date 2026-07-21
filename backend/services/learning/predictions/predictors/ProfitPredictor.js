const BasePredictor = require("../BasePredictor");

class ProfitPredictor extends BasePredictor {

    getName() {

        return "Profit Predictor";

    }

    supports(dataset = []) {

        if (!dataset.length) {

            return false;

        }

        const columns = Object.keys(dataset[0]).map(

            column => column.toLowerCase()

        );

        return (

            columns.includes("revenue") &&

            columns.includes("expense")

        );

    }

    predict(dataset = []) {

        const profits = dataset.map(row =>

            Number(row.Revenue || 0) -

            Number(row.Expense || 0)

        );

        return {

            predictor: this.getName(),

            average:

                this.calculator.average(profits),

            maximum:

                this.calculator.maximum(profits),

            minimum:

                this.calculator.minimum(profits),

            forecast:

                this.calculator.linearForecast(profits)

        };

    }

}

module.exports = new ProfitPredictor();