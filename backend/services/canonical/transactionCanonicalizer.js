const TRANSACTION_TYPE_TO_FINANCIAL_CLASS = {
    income: "revenue",
    subscription: "revenue",
    expense: "expense",
    purchase: "expense",
    salary: "expense",
    tax: "expense",
    investment: "investment",
    loan: "financing",
    asset: "asset",
    refund: "adjustment",
};

const FINANCIAL_CLASS_TO_TRANSACTION_TYPE = {
    revenue: "income",
    expense: "expense",
    financing: "loan",
    investment: "investment",
    asset: "asset",
    adjustment: "refund",
};

const TRANSACTION_TYPES = new Set([
    "income",
    "expense",
    "purchase",
    "investment",
    "refund",
    "salary",
    "tax",
    "loan",
    "subscription",
    "asset",
]);

function normalizeText(value) {
    if (value === null || value === undefined) return "";
    return String(value).trim();
}

function normalizeTransactionType(value) {
    const normalized = normalizeText(value).toLowerCase().replace(/[\s-]+/g, "_");

    const aliases = {
        revenue: "income",
        sales: "income",
        sale: "income",
        income: "income",
        credit: "income",
        expense: "expense",
        expenses: "expense",
        cost: "expense",
        costs: "expense",
        debit: "expense",
        purchase: "purchase",
        purchases: "purchase",
        investment: "investment",
        refund: "refund",
        refunded: "refund",
        salary: "salary",
        payroll: "salary",
        wage: "salary",
        wages: "salary",
        tax: "tax",
        gst: "tax",
        loan: "loan",
        borrowing: "loan",
        subscription: "subscription",
        asset: "asset",
    };

    const type = aliases[normalized] || normalized;
    return TRANSACTION_TYPES.has(type) ? type : "";
}

function normalizeFinancialClass(value) {
    const normalized = normalizeText(value).toLowerCase().replace(/[\s-]+/g, "_");
    const aliases = {
        revenue: "revenue",
        income: "revenue",
        sales: "revenue",
        expense: "expense",
        expenses: "expense",
        cost: "expense",
        financing: "financing",
        finance: "financing",
        loan: "financing",
        investment: "investment",
        investments: "investment",
        transfer: "transfer",
        asset: "asset",
        assets: "asset",
        liability: "liability",
        liabilities: "liability",
        adjustment: "adjustment",
        refund: "adjustment",
    };

    return aliases[normalized] || "";
}

function parseAmount(value) {
    if (typeof value === "number") {
        return Number.isFinite(value) ? value : null;
    }

    if (typeof value !== "string") return null;

    const trimmed = value.trim();
    if (!trimmed) return null;

    const negative = /^\(.*\)$/.test(trimmed);
    const cleaned = trimmed
        .replace(/[₹$€£¥,\s]/g, "")
        .replace(/^\((.*)\)$/, "$1");

    if (!/^-?\d+(\.\d+)?$/.test(cleaned)) return null;

    const amount = Number(cleaned);
    if (!Number.isFinite(amount)) return null;

    return negative ? -Math.abs(amount) : amount;
}

function normalizeStatus(value) {
    const normalized = normalizeText(value).toLowerCase().replace(/[\s-]+/g, "_");
    const aliases = {
        complete: "completed",
        completed: "completed",
        success: "completed",
        successful: "completed",
        pending: "pending",
        cancelled: "cancelled",
        canceled: "cancelled",
        failed: "failed",
    };
    return aliases[normalized] || "completed";
}

function normalizePaymentMethod(value) {
    const normalized = normalizeText(value).toLowerCase().replace(/[\s-]+/g, "_");
    const aliases = {
        cash: "cash",
        upi: "upi",
        bank_transfer: "bank_transfer",
        transfer: "bank_transfer",
        credit_card: "credit_card",
        card: "credit_card",
        debit_card: "debit_card",
        cheque: "cheque",
        check: "cheque",
        wallet: "wallet",
    };
    return aliases[normalized] || "other";
}

function parseDate(value) {
    if (value instanceof Date && !Number.isNaN(value.getTime())) {
        return value;
    }

    if (typeof value !== "string" || !value.trim()) return null;

    const date = new Date(value.trim());
    return Number.isNaN(date.getTime()) ? null : date;
}

function inferTransactionType(row, financialClass) {
    const explicit = normalizeTransactionType(
        row.transactionType || row.type || row.txnType
    );

    if (explicit) return explicit;

    const candidates = [
        ["revenue", "income"],
        ["income", "income"],
        ["sales", "income"],
        ["expense", "expense"],
        ["expenses", "expense"],
        ["purchase", "purchase"],
        ["salary", "salary"],
        ["tax", "tax"],
        ["investment", "investment"],
        ["loan", "loan"],
        ["subscription", "subscription"],
        ["asset", "asset"],
        ["refund", "refund"],
    ];

    for (const [field, type] of candidates) {
        if (parseAmount(row[field]) !== null) return type;
    }

    return FINANCIAL_CLASS_TO_TRANSACTION_TYPE[financialClass] || "expense";
}

function getAmount(row, transactionType) {
    const directFields = ["amount", "totalAmount", "total_amount", "netAmount", "value"];

    for (const field of directFields) {
        const amount = parseAmount(row[field]);
        if (amount !== null) return Math.abs(amount);
    }

    const quantity = parseAmount(row.quantity ?? row.qty);
    const unitPrice = parseAmount(row.unitPrice ?? row.unit_price ?? row.price);

    if (quantity !== null && unitPrice !== null) {
        return Math.abs(quantity * unitPrice);
    }

    const inferredField =
        transactionType === "income" || transactionType === "subscription"
            ? "revenue"
            : transactionType === "investment"
                ? "investment"
                : transactionType === "loan"
                    ? "loan"
                    : "expense";

    const inferredAmount = parseAmount(row[inferredField]);
    return inferredAmount === null ? null : Math.abs(inferredAmount);
}

function canonicalizeRecord(row = {}, context = {}) {
    const financialClassFromRow = normalizeFinancialClass(row.financialClass);
    const transactionType = inferTransactionType(row, financialClassFromRow);
    const financialClass =
        financialClassFromRow ||
        TRANSACTION_TYPE_TO_FINANCIAL_CLASS[transactionType] ||
        "adjustment";

    const amount = getAmount(row, transactionType);
    if (amount === null) {
        return {
            success: false,
            error: "A valid amount could not be identified.",
        };
    }

    const title =
        normalizeText(row.title) ||
        normalizeText(row.itemName) ||
        normalizeText(row.description) ||
        normalizeText(row.customerVendor) ||
        `${transactionType.charAt(0).toUpperCase()}${transactionType.slice(1)} transaction`;

    const transactionDate =
        parseDate(row.transactionDate || row.date || row.paymentDate) ||
        new Date();

    const category =
        normalizeText(row.category) ||
        normalizeText(row.subCategory) ||
        financialClass;

    const quantity = parseAmount(row.quantity ?? row.qty);
    const unitPrice = parseAmount(row.unitPrice ?? row.unit_price ?? row.price);

    return {
        success: true,
        data: {
            ownerId: context.ownerId,
            workspaceId: context.workspaceId,
            title,
            description: normalizeText(row.description),
            notes: normalizeText(row.notes),
            transactionType,
            financialClass,
            category,
            subCategory: normalizeText(row.subCategory),
            amount,
            currency: normalizeText(row.currency).toUpperCase() || "INR",
            status: normalizeStatus(row.status),
            customerVendor: normalizeText(row.customerVendor || row.customer || row.vendor),
            customerEmail: normalizeText(row.customerEmail),
            customerPhone: normalizeText(row.customerPhone),
            paymentMethod: normalizePaymentMethod(row.paymentMethod),
            paymentReference: normalizeText(row.paymentReference),
            invoiceNumber: normalizeText(row.invoiceNumber),
            region: normalizeText(row.region) || "Global",
            city: normalizeText(row.city),
            country: normalizeText(row.country),
            itemName: normalizeText(row.itemName),
            quantity: quantity === null ? 1 : quantity,
            unitPrice: unitPrice === null ? 0 : unitPrice,
            tags: Array.isArray(row.tags) ? row.tags.map(normalizeText).filter(Boolean) : [],
            aiProcessed: Boolean(context.aiProcessed),
            aiCategory: financialClass,
            aiConfidence: Number(context.mappingConfidence || 0),
            transactionDate,
            source: context.source || "api",
            sourceFileName: context.sourceFileName || "",
            sourceBatchId: context.sourceBatchId || "",
            sourceRowIndex: context.sourceRowIndex ?? 0,
        },
    };
}

function canonicalizeRecords(rows = [], context = {}) {
    const transactions = [];
    const errors = [];

    rows.forEach((row, index) => {
        const result = canonicalizeRecord(row, {
            ...context,
            sourceRowIndex: index,
        });

        if (result.success) {
            transactions.push(result.data);
        } else {
            errors.push({
                row: index + 1,
                error: result.error,
            });
        }
    });

    return { transactions, errors };
}

module.exports = {
    canonicalizeRecord,
    canonicalizeRecords,
    normalizeTransactionType,
    normalizeFinancialClass,
    TRANSACTION_TYPE_TO_FINANCIAL_CLASS,
};
