class ForecastCalculator {

    average(values = []) {

        if (!values.length) {

            return 0;

        }

        return values.reduce(

            (sum, value) => sum + Number(value || 0),

            0

        ) / values.length;

    }

    movingAverage(values = [], window = 3) {

        if (!values.length) {

            return 0;

        }

        if (values.length <= window) {

            return this.average(values);

        }

        const recent = values.slice(-window);

        return this.average(recent);

    }

    growthRate(values = []) {

        if (values.length < 2) {

            return 0;

        }

        const first = Number(values[0]);

        const last = Number(values[values.length - 1]);

        if (first === 0) {

            return 0;

        }

        return ((last - first) / first) * 100;

    }

    percentageChange(current = 0, previous = 0) {

        current = Number(current);

        previous = Number(previous);

        if (previous === 0) {

            return 0;

        }

        return ((current - previous) / previous) * 100;

    }

    linearForecast(values = []) {

        if (values.length < 2) {

            return this.average(values);

        }

        const growth = this.growthRate(values);

        const latest = Number(values[values.length - 1]);

        return latest + (latest * growth / 100);

    }

    minimum(values = []) {

        return values.length

            ? Math.min(...values)

            : 0;

    }

    maximum(values = []) {

        return values.length

            ? Math.max(...values)

            : 0;

    }

    sum(values = []) {

        return values.reduce(

            (sum, value) =>

                sum + Number(value || 0),

            0

        );

    }

}

module.exports = new ForecastCalculator();