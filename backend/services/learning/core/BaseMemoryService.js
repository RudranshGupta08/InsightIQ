const LearningEventBus = require("./LearningEventBus");
const LearningConstants = require("../constants/LearningConstants");

class BaseMemoryService {

    constructor(model) {

        this.model = model;

    }

    async create(data) {

        return await this.model.create(data);

    }

    async findOne(filter = {}) {

        return await this.model.findOne(filter);

    }

    async findMany(filter = {}, options = {}) {

        const {

            sort = {},

            limit = 0,

            select = ""

        } = options;

        return await this.model

            .find(filter)

            .sort(sort)

            .limit(limit)

            .select(select);

    }

    async update(filter = {}, update = {}) {

        return await this.model.findOneAndUpdate(

            filter,

            update,

            {

                new: true,

                runValidators: true

            }

        );

    }

    async updateMany(filter = {}, update = {}) {

        return await this.model.updateMany(

            filter,

            update

        );

    }

    async delete(filter = {}) {

        return await this.model.deleteOne(filter);

    }

    async exists(filter = {}) {

        return await this.model.exists(filter);

    }

    async count(filter = {}) {

        return await this.model.countDocuments(filter);

    }

    async incrementUsage(id) {

        return await this.model.findByIdAndUpdate(

            id,

            {

                $inc: {

                    usageCount: LearningConstants.LEARNING.USAGE_INCREMENT

                },

                lastUsedAt: new Date()

            },

            {

                new: true

            }

        );

    }

    async incrementConfidence(id, value) {

        return await this.model.findByIdAndUpdate(

            id,

            {

                $inc: {

                    confidence: value

                }

            },

            {

                new: true

            }

        );

    }

    emit(eventName, payload = {}) {

        LearningEventBus.emitEvent(

            eventName,

            payload

        );

    }

}

module.exports = BaseMemoryService;