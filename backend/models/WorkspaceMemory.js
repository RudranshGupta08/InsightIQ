const mongoose = require("mongoose");

const WorkspaceMemorySchema = new mongoose.Schema(

    {

        workspaceId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Workspace",

            required: true,

            index: true

        },

        workspaceName: {

            type: String,

            trim: true

        },

        businessType: {

            type: String,

            default: "Unknown",

            index: true

        },

        industry: {

            type: String,

            default: "General",

            index: true

        },

        aiVersion: {

            type: String,

            default: "InsightIQ AI v1"

        },

        learningScore: {

            type: Number,

            default: 0,

            min: 0,

            max: 100

        },

        confidenceScore: {

            type: Number,

            default: 0,

            min: 0,

            max: 100

        },

        totalImports: {

            type: Number,

            default: 0

        },

        totalTransactions: {

            type: Number,

            default: 0

        },

        successfulPredictions: {

            type: Number,

            default: 0

        },

        failedPredictions: {

            type: Number,

            default: 0

        },

        preferredCurrency: {

            type: String,

            default: "INR"

        },

        financialYearStart: {

            type: String,

            default: "April"

        },

        taxSystem: {

            type: String,

            default: "GST"

        },

        accountingMethod: {

            type: String,

            enum: [

                "Cash",

                "Accrual",

                "Unknown"

            ],

            default: "Unknown"

        },

        businessVocabulary: [

            {

                original: String,

                mappedTo: String,

                confidence: Number,

                learnedAt: {

                    type: Date,

                    default: Date.now

                }

            }

        ],

        seasonalPatterns: [

            {

                month: String,

                trend: String,

                confidence: Number

            }

        ],

        commonExpenses: [

            String

        ],

        commonRevenueStreams: [

            String

        ],

        aiNotes: [

            {

                title: String,

                description: String,

                createdAt: {

                    type: Date,

                    default: Date.now

                }

            }

        ],

        lastImportAt: Date,

        lastLearningAt: Date,

        lastPredictionAt: Date,

        isActive: {

            type: Boolean,

            default: true

        }

    },

    {

        timestamps: true

    }

);

WorkspaceMemorySchema.index({

    workspaceId: 1,

    businessType: 1

});

WorkspaceMemorySchema.index({

    workspaceId: 1,

    learningScore: -1

});

WorkspaceMemorySchema.index({

    workspaceId: 1,

    confidenceScore: -1

});

module.exports = mongoose.model(

    "WorkspaceMemory",

    WorkspaceMemorySchema

);