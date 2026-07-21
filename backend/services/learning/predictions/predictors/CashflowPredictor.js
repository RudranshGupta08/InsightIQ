const BasePredictor = require("../BasePredictor");

class CashflowPredictor extends BasePredictor {

    getName() {

        return "Cashflow Predictor";

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

        const cashflow = dataset.map(row =>

            Number(row.Revenue || 0) -

            Number(row.Expense || 0)

        );

        return {

            predictor: this.getName(),

            average:

                this.calculator.average(cashflow),

            movingAverage:

                this.calculator.movingAverage(cashflow),

            growth:

                this.calculator.growthRate(cashflow),

            forecast:

                this.calculator.linearForecast(cashflow)

        };

    }

}

module.exports = new CashflowPredictor();