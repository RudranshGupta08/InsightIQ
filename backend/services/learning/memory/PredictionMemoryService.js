const BaseMemoryService = require("../core/BaseMemoryService");

const LearningConstants = require("../constants/LearningConstants");

const PredictionMemory = require("../../../models/PredictionMemory");

class PredictionMemoryService extends BaseMemoryService {

    constructor() {

        super(PredictionMemory);

    }

    async getPrediction(workspaceId, predictionType, period) {

        return await this.findOne({

            workspaceId,

            predictionType,

            period

        });

    }

    async createPrediction(data) {

        const prediction = await this.create({

            ...data,

            confidence:

                data.confidence ||

                LearningConstants.CONFIDENCE.MEDIUM,

            status:

                LearningConstants.STATUS.PENDING

        });

        this.emit(

            LearningConstants.EVENTS.PREDICTION_CREATED,

            {

                workspaceId: data.workspaceId,

                predictionType: data.predictionType,

                period: data.period

            }

        );

        return prediction;

    }

    async verifyPrediction(

        predictionId,

        actualValue,

        accuracy

    ) {

        const prediction = await this.update(

            {

                _id: predictionId

            },

            {

                actualValue,

                accuracy,

                status:

                    LearningConstants.STATUS.VERIFIED,

                verifiedAt: new Date()

            }

        );

        this.emit(

            LearningConstants.EVENTS.PREDICTION_VERIFIED,

            {

                predictionId,

                accuracy

            }

        );

        return prediction;

    }

    async getWorkspacePredictions(workspaceId) {

        return await this.findMany(

            {

                workspaceId

            },

            {

                sort: {

                    createdAt: -1

                }

            }

        );

    }

    async getPredictionHistory(workspaceId, predictionType) {

        return await this.findMany(

            {

                workspaceId,

                predictionType

            },

            {

                sort: {

                    period: -1

                }

            }

        );

    }

    async getLatestPrediction(workspaceId, predictionType) {

        const predictions = await this.findMany(

            {

                workspaceId,

                predictionType

            },

            {

                sort: {

                    createdAt: -1

                },

                limit: 1

            }

        );

        return predictions.length > 0

            ? predictions[0]

            : null;

    }

}

module.exports = new PredictionMemoryService();