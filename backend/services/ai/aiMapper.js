function aiMapper({

    normalizedData = {},

    semantic = [],

    pattern = {},

    validation = {},

    confidence = {}

} = {}) {

    const records = normalizedData.records || [];

    const headers = normalizedData.headers || [];

    const metadata = normalizedData.metadata || {};

    const businessProfile = {

        businessType:

            pattern.businessType ||

            "General Business",

        totalTransactions:

            records.length,

        totalColumns:

            headers.length,

        parser:

            metadata.parser ||

            "unknown",

        fileType:

            metadata.fileType ||

            "unknown"

    };

    const metrics = {

        revenue: 0,

        expenses: 0,

        profit: 0,

        tax: 0,

        salary: 0

    };

    const insights = [];

    semantic.forEach(item => {

        if (

            item.mappedTo !== "unknown"

        ) {

            insights.push({

                field:

                    item.original,

                mappedTo:

                    item.mappedTo,

                confidence:

                    item.confidence

            });

        }

    });

    return {

        success: true,

        businessProfile,

        metrics,

        transactions: records,

        headers,

        insights,

        confidence,

        warnings:

            validation.warnings || [],

        errors:

            validation.errors || [],

        metadata

    };

}

module.exports = aiMapper;