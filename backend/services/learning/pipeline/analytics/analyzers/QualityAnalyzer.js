function normalizeHeader(value = "") {
    return String(value)
        .trim()
        .toLowerCase()
        .replace(/[_-]/g, " ")
        .replace(/\s+/g, " ");
}

function isBlank(value) {
    return value === null || value === undefined || String(value).trim() === "";
}

function isFiniteNumber(value) {
    if (typeof value === "number") return Number.isFinite(value);
    if (typeof value !== "string" || !value.trim()) return false;
    const cleaned = value.trim().replace(/,/g, "");
    return /^-?\d+(\.\d+)?$/.test(cleaned) && Number.isFinite(Number(cleaned));
}

function isValidDate(value) {
    if (value instanceof Date) return !Number.isNaN(value.getTime());
    if (typeof value !== "string" || !value.trim()) return false;

    const text = value.trim();
    const iso = text.match(/^(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})(?:[T\s].*)?$/);
    if (iso) {
        const date = new Date(Date.UTC(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3])));
        return (
            date.getUTCFullYear() === Number(iso[1]) &&
            date.getUTCMonth() === Number(iso[2]) - 1 &&
            date.getUTCDate() === Number(iso[3])
        );
    }

    const dayFirst = text.match(/^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})(?:[\s].*)?$/);
    if (dayFirst) {
        const date = new Date(Date.UTC(Number(dayFirst[3]), Number(dayFirst[2]) - 1, Number(dayFirst[1])));
        return (
            date.getUTCFullYear() === Number(dayFirst[3]) &&
            date.getUTCMonth() === Number(dayFirst[2]) - 1 &&
            date.getUTCDate() === Number(dayFirst[1])
        );
    }

    const namedMatch = text.match(/^([A-Za-z]{3,9})\s+(\d{1,2}),?\s+(\d{4})$/);
    if (!namedMatch) return false;

    const parsed = new Date(text);
    if (Number.isNaN(parsed.getTime())) return false;

    return parsed.getFullYear() === Number(namedMatch[3]) &&
        parsed.getDate() === Number(namedMatch[2]);
}

function fingerprint(row = {}) {
    return JSON.stringify(
        Object.keys(row)
            .sort()
            .reduce((result, key) => {
                result[key] = row[key];
                return result;
            }, {})
    );
}

class QualityAnalyzer {
    analyze(dataset = [], schema = {}, mappings = [], rawHeaders = []) {
        const rows = Array.isArray(dataset) ? dataset : [];
        const headers = Array.isArray(rawHeaders) && rawHeaders.length
            ? rawHeaders
            : Object.keys(rows[0] || {});

        const rowCount = rows.length;
        const columnCount = headers.length;
        const issues = [];
        const warnings = [];

        const normalizedHeaders = headers.map(normalizeHeader).filter(Boolean);
        const duplicateHeaders = normalizedHeaders.filter(
            (header, index) => normalizedHeaders.indexOf(header) !== index
        );

        if (!columnCount) {
            issues.push({
                code: "NO_HEADERS",
                severity: "critical",
                message: "No usable headers were detected.",
            });
        }

        if (duplicateHeaders.length) {
            warnings.push({
                code: "DUPLICATE_HEADERS",
                severity: "warning",
                message: "Duplicate column headers were detected.",
                count: new Set(duplicateHeaders).size,
            });
        }

        if (!rowCount) {
            issues.push({
                code: "NO_ROWS",
                severity: "critical",
                message: "The dataset contains no data rows.",
            });
        }

        let totalCells = rowCount * columnCount;
        let missingCells = 0;
        let invalidNumericCells = 0;
        let invalidDateCells = 0;

        const numericFields = new Set(schema.numericFields || []);
        const dateFields = new Set(schema.dateFields || []);

        rows.forEach((row) => {
            headers.forEach((header) => {
                if (isBlank(row?.[header])) {
                    missingCells += 1;
                }
            });

            numericFields.forEach((field) => {
                const value = row?.[field];
                if (!isBlank(value) && !isFiniteNumber(value)) {
                    invalidNumericCells += 1;
                }
            });

            dateFields.forEach((field) => {
                const value = row?.[field];
                if (!isBlank(value) && !(value instanceof Date) && !isValidDate(value)) {
                    invalidDateCells += 1;
                }
            });
        });

        const fingerprints = new Map();
        rows.forEach((row, index) => {
            const key = fingerprint(row);
            const indexes = fingerprints.get(key) || [];
            indexes.push(index + 1);
            fingerprints.set(key, indexes);
        });

        const duplicateGroups = [...fingerprints.values()].filter(
            (indexes) => indexes.length > 1
        );
        const duplicateRows = duplicateGroups.reduce(
            (total, indexes) => total + indexes.length - 1,
            0
        );

        const completeness = totalCells
            ? Math.max(0, 100 - (missingCells / totalCells) * 100)
            : 0;

        const typedCells =
            numericFields.size * rowCount + dateFields.size * rowCount;
        const invalidTypedCells = invalidNumericCells + invalidDateCells;
        const validity = typedCells
            ? Math.max(0, 100 - (invalidTypedCells / typedCells) * 100)
            : 100;

        const uniqueness = rowCount
            ? Math.max(0, 100 - (duplicateRows / rowCount) * 100)
            : 0;

        const structure = columnCount > 0 ? 100 : 0;

        const qualityScore = Number(
            (
                completeness * 0.4 +
                validity * 0.3 +
                uniqueness * 0.2 +
                structure * 0.1
            ).toFixed(2)
        );

        if (missingCells > 0) {
            warnings.push({
                code: "MISSING_VALUES",
                severity: "warning",
                message: "Some cells are missing values.",
                count: missingCells,
                percentage: Number(
                    ((missingCells / Math.max(totalCells, 1)) * 100).toFixed(2)
                ),
            });
        }

        if (invalidNumericCells > 0) {
            issues.push({
                code: "INVALID_NUMERIC_VALUES",
                severity: "error",
                message: "Some values in numeric fields are not valid numbers.",
                count: invalidNumericCells,
            });
        }

        if (invalidDateCells > 0) {
            issues.push({
                code: "INVALID_DATE_VALUES",
                severity: "error",
                message: "Some values in date fields are not valid dates.",
                count: invalidDateCells,
            });
        }

        if (duplicateRows > 0) {
            warnings.push({
                code: "DUPLICATE_ROWS",
                severity: "warning",
                message: "Duplicate records were detected.",
                count: duplicateRows,
                groups: duplicateGroups.length,
            });
        }

        const unknownMappings = mappings.filter(
            (mapping) => !mapping?.mappedTo || String(mapping.mappedTo).toLowerCase() === "unknown"
        );
        const lowConfidenceMappings = mappings.filter((mapping) => {
            const score = Number(mapping?.confidence);
            return Number.isFinite(score) && score < 70;
        });

        if (unknownMappings.length) {
            warnings.push({
                code: "UNMAPPED_FIELDS",
                severity: "warning",
                message: "Some fields could not be semantically mapped.",
                count: unknownMappings.length,
            });
        }

        if (lowConfidenceMappings.length) {
            warnings.push({
                code: "LOW_MAPPING_CONFIDENCE",
                severity: "warning",
                message: "Some semantic mappings have low confidence.",
                count: lowConfidenceMappings.length,
            });
        }

        const errorCount = issues.length;
        const warningCount = warnings.length;

        let status = "Good";
        if (qualityScore < 70 || errorCount > 0) status = "Needs Review";
        if (qualityScore < 40 || issues.some((issue) => issue.severity === "critical")) {
            status = "Poor";
        }

        return {
            score: qualityScore,
            status,
            rows: rowCount,
            columns: columnCount,
            completeness: Number(completeness.toFixed(2)),
            validity: Number(validity.toFixed(2)),
            uniqueness: Number(uniqueness.toFixed(2)),
            missingValues: missingCells,
            duplicateRows,
            invalidNumericValues: invalidNumericCells,
            invalidDateValues: invalidDateCells,
            mapping: {
                total: mappings.length,
                unmapped: unknownMappings.length,
                lowConfidence: lowConfidenceMappings.length,
            },
            issues,
            warnings,
            errorCount,
            warningCount,
        };
    }
}

module.exports = new QualityAnalyzer();
