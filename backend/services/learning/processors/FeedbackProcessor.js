const BaseProcessor = require("../core/BaseProcessor");

const ProcessingContext = require("../core/ProcessingContext");

const FeedbackMerger = require("../utils/FeedbackMerger");

const FeedbackScoreCalculator = require("../calculators/FeedbackScoreCalculator");

const WorkspaceMemoryService = require("../memory/WorkspaceMemoryService");

const MappingMemoryService = require("../memory/MappingMemoryService");

class FeedbackProcessor extends BaseProcessor {

    constructor() {

        super("FeedbackProcessor");

    }

    async process(payload = {}) {

        return await this.execute(async () => {

            this.validateInput(payload);

            const context =

                ProcessingContext.createContext(

                    payload

                );

            this.prepareContext(context);

            await this.loadExistingMemory(context);

            this.mergeFeedback(context);

            this.calculateLearningMetrics(context);

            await this.updateWorkspaceMemory(context);

            await this.updateMappingMemory(context);

            return this.buildSuccess({

                data: {

                    workspace:

                        context.workspaceMemory,

                    mapping:

                        context.mappingMemory,

                    metrics:

                        context.metrics

                },

                metadata: {

                    workspaceId:

                        context.payload.workspaceId,

                    processedAt:

                        new Date()

                },

                reasoning: [

                    {

                        stage:

                            "Feedback Learning",

                        decision:

                            "Feedback successfully processed.",

                        timestamp:

                            new Date()

                    }

                ]

            });

        });

    }

    validateInput(payload) {

        super.validate(payload);

        if (!payload.workspaceId) {

            throw new Error(

                "Workspace ID is required."

            );

        }

        if (!payload.feedback) {

            throw new Error(

                "Feedback is required."

            );

        }

        return true;

    }

    prepareContext(context) {

        context.feedback =

            context.payload.feedback;

    }

    async loadExistingMemory(context) {

        context.workspaceMemory =

            await WorkspaceMemoryService.getWorkspace(

                context.payload.workspaceId

            );

        context.mappingMemory =

            await MappingMemoryService.findMapping(

                context.payload.workspaceId,

                context.feedback.originalField

            );

    }

    mergeFeedback(context) {

        context.mappingMemory =

            FeedbackMerger.merge(

                context.mappingMemory || {},

                context.feedback

            );

    }

    calculateLearningMetrics(context) {

        context.metrics =

            FeedbackScoreCalculator.buildMetrics(

                context.mappingMemory

            );

        Object.assign(

            context.mappingMemory,

            context.metrics

        );

    }

    async updateWorkspaceMemory(context) {

        await WorkspaceMemoryService.updateLearningMetrics(

            context.payload.workspaceId,

            context.metrics

        );

    }

    async updateMappingMemory(context) {

        await MappingMemoryService.save(

            context.mappingMemory

        );

    }

}

module.exports = new FeedbackProcessor();