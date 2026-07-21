const LearningConstants = require("../constants/LearningConstants");

class MaturityCalculator {

    calculate(score = 0) {

        const persona = this.getPersona(score);

        const capabilities = this.getCapabilities(score);

        const nextStage = this.getNextStage(score);

        const recommendations = this.getRecommendations(score);

        return {

            score,

            level: persona.level,

            persona: persona.name,

            description: persona.description,

            capabilities,

            nextStage,

            recommendations,

            calculatedAt: new Date()

        };

    }

    evaluate(score = 0) {

        return this.calculate(score).persona;

    }

    getPersona(score) {

        if (score >= 95) {

            return {

                level: "Elite",

                name: "Expert Consultant",

                description: "AI deeply understands this business and delivers strategic insights."

            };

        }

        if (score >= 80) {

            return {

                level: "Advanced",

                name: "Advisor",

                description: "AI provides highly reliable business recommendations."

            };

        }

        if (score >= 60) {

            return {

                level: "Intermediate",

                name: "Strategist",

                description: "AI understands trends and begins making accurate forecasts."

            };

        }

        if (score >= 40) {

            return {

                level: "Developing",

                name: "Analyst",

                description: "AI understands business patterns and key metrics."

            };

        }

        if (score >= 20) {

            return {

                level: "Learning",

                name: "Learner",

                description: "AI is actively building business knowledge."

            };

        }

        return {

            level: "Starter",

            name: "Explorer",

            description: "AI is discovering the business for the first time."

        };

    }

    getCapabilities(score) {

        const capabilities = [

            "Basic field recognition"

        ];

        if (score >= 20) {

            capabilities.push(

                "Business vocabulary learning"

            );

        }

        if (score >= 40) {

            capabilities.push(

                "Pattern detection"

            );

        }

        if (score >= 60) {

            capabilities.push(

                "Forecast generation"

            );

        }

        if (score >= 80) {

            capabilities.push(

                "Strategic recommendations"

            );

        }

        if (score >= 95) {

            capabilities.push(

                "Business optimization insights"

            );

        }

        return capabilities;

    }

    getNextStage(score) {

        if (score >= 95) {

            return {

                target: "Maximum",

                remaining: 0

            };

        }

        if (score >= 80) {

            return {

                target: "Expert Consultant",

                remaining: 95 - score

            };

        }

        if (score >= 60) {

            return {

                target: "Advisor",

                remaining: 80 - score

            };

        }

        if (score >= 40) {

            return {

                target: "Strategist",

                remaining: 60 - score

            };

        }

        if (score >= 20) {

            return {

                target: "Analyst",

                remaining: 40 - score

            };

        }

        return {

            target: "Learner",

            remaining: 20 - score

        };

    }

    getRecommendations(score) {

        const recommendations = [];

        if (score < 20) {

            recommendations.push(

                "Upload more historical business data."

            );

        }

        if (score < 40) {

            recommendations.push(

                "Review and confirm AI field mappings."

            );

        }

        if (score < 60) {

            recommendations.push(

                "Provide correction feedback to improve AI learning."

            );

        }

        if (score < 80) {

            recommendations.push(

                "Continue uploading monthly business reports."

            );

        }

        if (score < 95) {

            recommendations.push(

                "Use forecasting and recommendations regularly."

            );

        }

        if (recommendations.length === 0) {

            recommendations.push(

                "Your AI has reached enterprise maturity."

            );

        }

        return recommendations;

    }

}

module.exports = new MaturityCalculator();