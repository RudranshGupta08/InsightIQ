function normalizeNumericValue(value) {
    if (typeof value === "number") {
        return Number.isFinite(value) ? value : value;
    }

    if (typeof value !== "string") {
        return value;
    }

    const trimmed = value.trim();

    if (!trimmed) {
        return value;
    }

    const negative = /^\(.*\)$/.test(trimmed);
    const cleaned = trimmed
        .replace(/[₹$€£¥,\s]/g, "")
        .replace(/^\((.*)\)$/, "$1");

    if (!/^-?\d+(\.\d+)?$/.test(cleaned)) {
        return value;
    }

    const number = Number(cleaned);
    return negative ? -Math.abs(number) : number;
}

function normalizeDateValue(value) {
    if (value instanceof Date && !Number.isNaN(value.getTime())) {
        return value;
    }

    if (typeof value !== "string") {
        return value;
    }

    const trimmed = value.trim();
    if (!trimmed) return value;

    const isoMatch = /^(\d{4})[-\/]\d{1,2}[-\/]\d{1,2}$/.test(trimmed);
    const dayFirstMatch = /^(\d{1,2})[-\/]\d{1,2}[-\/]\d{4}$/.test(trimmed);

    if (!isoMatch && !dayFirstMatch) {
        return value;
    }

    const date = new Date(trimmed);
    return Number.isNaN(date.getTime()) ? value : date;
}

function normalizeRow(row = {}) {
    const normalized = {};

    Object.entries(row).forEach(([key, value]) => {
        const normalizedKey = String(key).trim();
        normalized[normalizedKey] = value;
    });

    const numericAliases = new Set([
        "amount",
        "totalamount",
        "total amount",
        "unitprice",
        "unit price",
        "quantity",
        "qty",
        "price",
        "cost",
        "value",
    ]);

    const dateAliases = new Set([
        "date",
        "transactiondate",
        "transaction date",
        "transdate",
        "invoice date",
        "payment date",
    ]);

    Object.entries(normalized).forEach(([key, value]) => {
        const compactKey = key.toLowerCase().replace(/[\s_-]/g, "");

        if (numericAliases.has(key.toLowerCase()) || numericAliases.has(compactKey)) {
            normalized[key] = normalizeNumericValue(value);
            return;
        }

        if (dateAliases.has(key.toLowerCase()) || dateAliases.has(compactKey)) {
            normalized[key] = normalizeDateValue(value);
        }
    });

    return normalized;
}

function normalizeData(parsedData = {}) {
    if (!parsedData.success) {
        return {
            success: false,
            error: parsedData.error || "Unable to normalize data.",
        };
    }

    const records = Array.isArray(parsedData.records)
        ? parsedData.records.map(normalizeRow)
        : [];

    const headers = Array.isArray(parsedData.headers)
        ? parsedData.headers.map((header) => String(header).trim())
        : [];

    const metadata = {
        fileType: parsedData.fileType || "unknown",
        fileName: parsedData.metadata?.fileName || "",
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
