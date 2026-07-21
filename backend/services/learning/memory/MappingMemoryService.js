const BaseMemoryService = require("../core/BaseMemoryService");

const LearningConstants = require("../constants/LearningConstants");

const KnowledgeMemory = require("../../../models/KnowledgeMemory");

class MappingMemory extends BaseMemoryService {

    constructor() {

        super(KnowledgeMemory);

    }

    async findMapping(workspaceId, originalField) {

        return await this.findOne({

            workspaceId,

            originalField

        });

    }

    async createMapping(data) {

        const mapping = await this.create({

            ...data,

            confidence:

                data.confidence ||

                LearningConstants.CONFIDENCE.MEDIUM,

            usageCount: 1

        });

        this.emit(

            LearningConstants.EVENTS.KNOWLEDGE_UPDATED,

            {

                workspaceId: data.workspaceId,

                originalField: data.originalField,

                normalizedField: data.normalizedField

            }

        );

        return mapping;

    }

    async updateMapping(mappingId, confidenceIncrease = 2) {

        const updated = await this.incrementConfidence(

            mappingId,

            confidenceIncrease

        );

        await this.incrementUsage(mappingId);

        return updated;

    }

    async learn(data) {

        const existing = await this.findMapping(

            data.workspaceId,

            data.originalField

        );

        if (existing) {

            return await this.updateMapping(

                existing._id,

                LearningConstants.LEARNING.CONFIDENCE_INCREMENT

            );

        }

        return await this.createMapping(data);

    }

    async findByNormalizedField(normalizedField) {

        return await this.findMany(

            {

                normalizedField

            },

            {

                sort: {

                    confidence: -1

                }

            }

        );

    }

    async getTopMappings(limit = 20) {

        return await this.findMany(

            {},

            {

                sort: {

                    usageCount: -1,

                    confidence: -1

                },

                limit

            }

        );

    }

}

module.exports = new MappingMemory();