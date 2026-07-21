const mongoose = require("mongoose");

const IndustryMemorySchema = new mongoose.Schema(

    {

        industry: {

            type: String,

            required: true,

            unique: true,

            trim: true,

            index: true

        },

        description: {

            type: String,

            default: ""

        },

        supportedBusinessTypes: [

            String

        ],

        commonRevenueTerms: [

            String

        ],

        commonExpenseTerms: [

            String

        ],

        commonTaxTerms: [

            String

        ],

        commonCustomerTerms: [

            String

        ],

        commonVendorTerms: [

            String

        ],

        commonInventoryTerms: [

            String

        ],

        commonKPIs: [

            {

                name: String,

                description: String,

                importance: {

                    type: Number,

                    default: 5,

                    min: 1,

                    max: 10

                }

            }

        ],

        seasonalPatterns: [

            {

                period: String,

                trend: String,

                confidence: {

                    type: Number,

                    default: 50,

                    min: 0,

                    max: 100

                }

            }

        ],

        businessRules: [

            {

                title: String,

                description: String

            }

        ],

        aiRecommendations: [

            {

                title: String,

                description: String,

                priority: {

                    type: String,

                    enum: [

                        "Low",

                        "Medium",

                        "High"

                    ],

                    default: "Medium"

                }

            }

        ],

        benchmarkMetrics: {

            averageProfitMargin: Number,

            averageGrowthRate: Number,

            averageExpenseRatio: Number,

            averageCustomerRetention: Number,

            averageInventoryTurnover: Number

        },

        vocabulary: [

            {

                original: String,

                mappedTo: String,

                confidence: Number

            }

        ],

        totalBusinessesLearned: {

            type: Number,

            default: 0

        },

        averageAIConfidence: {

            type: Number,

            default: 0,

            min: 0,

            max: 100

        },

        lastLearningUpdate: {

            type: Date,

            default: Date.now

        },

        aiVersion: {

            type: String,

            default: "InsightIQ AI v1"

        }

    },

    {

        timestamps: true

    }

);

IndustryMemorySchema.index({

    industry: 1

});

IndustryMemorySchema.index({

    averageAIConfidence: -1

});

IndustryMemorySchema.index({

    totalBusinessesLearned: -1

});

module.exports = mongoose.model(

    "IndustryMemory",

    IndustryMemorySchema

);