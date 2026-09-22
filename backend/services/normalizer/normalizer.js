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

function isValidCalendarDate(year, month, day) {
    const date = new Date(Date.UTC(year, month - 1, day));
    return (
        date.getUTCFullYear() === year &&
        date.getUTCMonth() === month - 1 &&
        date.getUTCDate() === day
    );
}

function parseDateParts(value) {
    const iso = value.match(/^(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})$/);
    if (iso) {
        return { year: Number(iso[1]), month: Number(iso[2]), day: Number(iso[3]) };
    }

    const dayFirst = value.match(/^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/);
    if (dayFirst) {
        return { year: Number(dayFirst[3]), month: Number(dayFirst[2]), day: Number(dayFirst[1]) };
    }

    return null;
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

    const parts = parseDateParts(trimmed);

    if (!parts || !isValidCalendarDate(parts.year, parts.month, parts.day)) {
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
