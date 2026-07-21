const BasePredictor = require("../BasePredictor");

class RevenuePredictor extends BasePredictor {

    getName() {

        return "Revenue Predictor";

    }

    supports(dataset = []) {

        if (!dataset.length) {

            return false;

        }

        const columns = Object.keys(dataset[0]).map(

            column => column.toLowerCase()

        );

        return columns.includes("revenue");

    }

    predict(dataset = []) {

        const revenue = dataset

            .map(row => Number(row.Revenue || 0))

            .filter(value => !isNaN(value));

        if (!revenue.length) {

            return null;

        }

        return {

            predictor: this.getName(),

            field: "Revenue",

            records: revenue.length,

            total:

                this.calculator.sum(revenue),

            average:

                this.calculator.average(revenue),

            minimum:

                this.calculator.minimum(revenue),

            maximum:

                this.calculator.maximum(revenue),

            movingAverage:

                this.calculator.movingAverage(revenue),

            growthRate:

                this.calculator.growthRate(revenue),

            forecast:

                this.calculator.linearForecast(revenue)

        };

    }

}

module.exports = new RevenuePredictor();