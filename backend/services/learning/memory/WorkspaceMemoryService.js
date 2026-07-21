const BaseMemoryService = require("../core/BaseMemoryService");

const LearningConstants = require("../constants/LearningConstants");

const WorkspaceMemory = require("../../../models/WorkspaceMemory");

class WorkspaceMemoryService extends BaseMemoryService {

    constructor() {

        super(WorkspaceMemory);

    }

    async getWorkspace(workspaceId) {

        return await this.findOne({

            workspaceId

        });

    }

    async createWorkspace(data) {

        const workspace = await this.create({

            ...data,

            learningScore:

                LearningConstants.LEARNING.DEFAULT_SCORE,

            confidenceScore:

                LearningConstants.CONFIDENCE.MEDIUM

        });

        this.emit(

            LearningConstants.EVENTS.WORKSPACE_UPDATED,

            {

                workspaceId: data.workspaceId

            }

        );

        return workspace;

    }

    async incrementImportCount(workspaceId) {

        return await this.update(

            {

                workspaceId

            },

            {

                $inc: {

                    totalImports: 1

                },

                lastImportAt: new Date()

            }

        );

    }

    async updateLearningScore(

        workspaceId,

        score

    ) {

        return await this.update(

            {

                workspaceId

            },

            {

                learningScore: score,

                lastLearningAt: new Date()

            }

        );

    }

    async updateConfidence(

        workspaceId,

        confidence

    ) {

        return await this.update(

            {

                workspaceId

            },

            {

                confidenceScore: confidence

            }

        );

    }

    async addVocabulary(

        workspaceId,

        vocabulary

    ) {

        return await this.update(

            {

                workspaceId

            },

            {

                $push: {

                    businessVocabulary: vocabulary

                }

            }

        );

    }

    async addAINote(

        workspaceId,

        note

    ) {

        return await this.update(

            {

                workspaceId

            },

            {

                $push: {

                    aiNotes: note

                }

            }

        );

    }

    async learn(data) {

        let workspace =

            await this.getWorkspace(

                data.workspaceId

            );

        if (!workspace) {

            workspace =

                await this.createWorkspace(data);

        }

        await this.incrementImportCount(

            data.workspaceId

        );

        return workspace;

    }

}

module.exports = new WorkspaceMemoryService();