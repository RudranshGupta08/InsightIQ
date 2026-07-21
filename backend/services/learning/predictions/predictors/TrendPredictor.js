const BasePredictor = require("../BasePredictor");

class TrendPredictor extends BasePredictor {

    getName() {

        return "Trend Predictor";

    }

    supports(dataset = []) {

        return dataset.length > 1;

    }

    predict(dataset = []) {

        return {

            predictor: this.getName(),

            records:

                dataset.length,

            trend:

                dataset.length > 5

                    ? "Stable"

                    : "Insufficient Data"

        };

    }

}

module.exports = new TrendPredictor();