function normalizeData(parsedData = {}) {

    if (!parsedData.success) {

        return {

            success: false,

            error: parsedData.error || "Unable to normalize data.",

        };

    }

    const records = Array.isArray(parsedData.records)
        ? parsedData.records
        : [];

    const headers = Array.isArray(parsedData.headers)
        ? parsedData.headers
        : [];

    const metadata = {

        fileType: parsedData.fileType || "unknown",

        fileName:
            parsedData.metadata?.fileName || "",

        parser:
            parsedData.metadata?.parser ||

            parsedData.fileType ||

            "unknown",

        totalRows:
            parsedData.metadata?.totalRows ||

            records.length,

        totalColumns:
            parsedData.metadata?.totalColumns ||

            headers.length,

        totalSheets:
            parsedData.metadata?.totalSheets ||

            1,

        parsedAt:

            parsedData.metadata?.parsedAt ||

            new Date(),

    };

    return {

        success: true,

        records,

        headers,

        metadata,

    };

}

module.exports = normalizeData;