const mongoose = require("mongoose");

const PredictionMemorySchema = new mongoose.Schema(

    {

        workspaceId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Workspace",

            required: true,

            index: true

        },

        predictionType: {

            type: String,

            enum: [

                "Revenue",

                "Expense",

                "Profit",

                "Cashflow",

                "Inventory",

                "Sales",

                "Customer",

                "Growth",

                "BusinessHealth",

                "Other"

            ],

            required: true,

            index: true

        },

        period: {

            type: String,

            required: true

        },

        predictedValue: {

            type: Number,

            required: true

        },

        actualValue: {

            type: Number,

            default: null

        },

        confidence: {

            type: Number,

            default: 50,

            min: 0,

            max: 100

        },

        accuracy: {

            type: Number,

            default: 0,

            min: 0,

            max: 100

        },

        trend: {

            type: String,

            enum: [

                "Increasing",

                "Decreasing",

                "Stable",

                "Seasonal",

                "Unknown"

            ],

            default: "Unknown"

        },

        seasonality: {

            type: String,

            default: ""

        },

        businessReason: {

            type: String,

            default: ""

        },

        aiExplanation: {

            type: String,

            default: ""

        },

        recommendation: {

            type: String,

            default: ""

        },

        factors: [

            {

                name: String,

                impact: Number,

                description: String

            }

        ],

        status: {

            type: String,

            enum: [

                "Pending",

                "Verified",

                "Expired"

            ],

            default: "Pending"

        },

        predictedAt: {

            type: Date,

            default: Date.now

        },

        verifiedAt: Date

    },

    {

        timestamps: true

    }

);

PredictionMemorySchema.index({

    workspaceId: 1,

    predictionType: 1

});

PredictionMemorySchema.index({

    workspaceId: 1,

    period: 1

});

PredictionMemorySchema.index({

    confidence: -1

});

PredictionMemorySchema.index({

    accuracy: -1

});

PredictionMemorySchema.index({

    trend: 1

});

module.exports = mongoose.model(

    "PredictionMemory",

    PredictionMemorySchema

);