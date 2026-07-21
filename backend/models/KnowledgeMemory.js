const mongoose = require("mongoose");

const KnowledgeMemorySchema = new mongoose.Schema(

    {

        workspaceId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "Workspace",

            default: null,

            index: true

        },

        industry: {

            type: String,

            default: "General",

            index: true

        },

        originalField: {

            type: String,

            required: true,

            trim: true,

            index: true

        },

        normalizedField: {

            type: String,

            required: true,

            trim: true,

        },

        category: {

            type: String,

            enum: [

                "Revenue",

                "Expense",

                "Profit",

                "Tax",

                "Salary",

                "Customer",

                "Vendor",

                "Inventory",

                "Asset",

                "Liability",

                "Equity",

                "Cashflow",

                "Product",

                "Service",

                "Other"

            ],

            default: "Other",

            index: true

        },

        confidence: {

            type: Number,

            default: 50,

            min: 0,

            max: 100

        },

        source: {

            type: String,

            enum: [

                "System",

                "User",

                "Learning",

                "Industry"

            ],

            default: "System"

        },

        explanation: {

            type: String,

            default: ""

        },

        usageCount: {

            type: Number,

            default: 1

        },

        successfulPredictions: {

            type: Number,

            default: 0

        },

        failedPredictions: {

            type: Number,

            default: 0

        },

        acceptedCorrections: {

            type: Number,

            default: 0

        },

        rejectedCorrections: {

            type: Number,

            default: 0

        },

        lastUsedAt: {

            type: Date,

            default: Date.now

        },

        lastUpdatedByAI: {

            type: Date,

            default: Date.now

        },

        isVerified: {

            type: Boolean,

            default: false

        },

        isGlobalKnowledge: {

            type: Boolean,

            default: false

        },

        metadata: {

            examples: [

                String

            ],

            aliases: [

                String

            ],

            notes: String

        }

    },

    {

        timestamps: true

    }

);

KnowledgeMemorySchema.index({

    originalField: 1,

    workspaceId: 1

});

KnowledgeMemorySchema.index({

    normalizedField: 1

});

KnowledgeMemorySchema.index({

    industry: 1,

    category: 1

});

KnowledgeMemorySchema.index({

    confidence: -1

});

KnowledgeMemorySchema.index({

    usageCount: -1

});

module.exports = mongoose.model(

    "KnowledgeMemory",

    KnowledgeMemorySchema

);