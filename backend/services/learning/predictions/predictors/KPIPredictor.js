const BasePredictor = require("../BasePredictor");

class KPIPredictor extends BasePredictor {

    getName() {

        return "KPI Predictor";

    }

    supports(dataset = []) {

        return dataset.length > 0;

    }

    predict(dataset = []) {

        return {

            predictor: this.getName(),

            records:

                dataset.length,

            columns:

                Object.keys(dataset[0] || {}).length,

            completeness:

                "Good"

        };

    }

}

module.exports = new KPIPredictor();