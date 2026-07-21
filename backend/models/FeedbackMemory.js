const mongoose = require("mongoose");

const FeedbackMemorySchema = new mongoose.Schema(

    {

        workspaceId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Workspace",

            required: true,

            index: true

        },

        userId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true,

            index: true

        },

        feedbackType: {

            type: String,

            enum: [

                "FieldMapping",

                "Prediction",

                "Recommendation",

                "BusinessType",

                "Validation",

                "Classification",

                "Other"

            ],

            required: true,

            index: true

        },

        aiSuggestion: {

            type: String,

            required: true

        },

        userCorrection: {

            type: String,

            default: ""

        },

        accepted: {

            type: Boolean,

            default: false

        },

        confidenceBefore: {

            type: Number,

            default: 0,

            min: 0,

            max: 100

        },

        confidenceAfter: {

            type: Number,

            default: 0,

            min: 0,

            max: 100

        },

        reason: {

            type: String,

            default: ""

        },

        aiExplanation: {

            type: String,

            default: ""

        },

        sourceFile: {

            type: String,

            default: ""

        },

        modelVersion: {

            type: String,

            default: "InsightIQ AI v1"

        },

        learningApplied: {

            type: Boolean,

            default: false

        },

        tags: [

            String

        ],

        createdByAI: {

            type: Boolean,

            default: true

        }

    },

    {

        timestamps: true

    }

);

FeedbackMemorySchema.index({

    workspaceId: 1,

    feedbackType: 1

});

FeedbackMemorySchema.index({

    userId: 1

});

FeedbackMemorySchema.index({

    accepted: 1

});

FeedbackMemorySchema.index({

    learningApplied: 1

});

FeedbackMemorySchema.index({

    createdAt: -1

});

module.exports = mongoose.model(

    "FeedbackMemory",

    FeedbackMemorySchema

);