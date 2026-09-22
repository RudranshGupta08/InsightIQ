const SEVERITY_ORDER = { high: 0, medium: 1, low: 2, info: 3 };

function decision({ id, priority, title, trigger, why, evidence, action, guardrail, dataSufficiency = "sufficient" }) {
    return { id, priority, title, trigger, why, evidence, action, guardrail, dataSufficiency };
}

function buildDecisionIntelligence({ metrics = {}, diagnostics = [], forecast = null, anomalyDetection = null }) {
    const decisions = [];

    const mediumOrHigher = diagnostics
        .filter((item) => ["high", "medium"].includes(item?.severity))
        .sort((a, b) => (SEVERITY_ORDER[a.severity] ?? 99) - (SEVERITY_ORDER[b.severity] ?? 99));

    // Convert the most important diagnostic signals into explicit business actions.
    mediumOrHigher.forEach((item) => {
        if (item.id === "limited-data-coverage") {
            decisions.push(decision({
                id: "improve-data-coverage",
                priority: "medium",
                title: "Increase data coverage before making trend decisions",
                trigger: item.title,
                why: item.why,
                evidence: item.evidence,
                action: "Import or record transactions across additional operating periods, then reassess trends and recurring behavior.",
                guardrail: "Do not treat the current limited dataset as representative of long-term business performance.",
                dataSufficiency: item.dataSufficiency,
            }));
        } else if (item.id === "expenses-without-revenue") {
            decisions.push(decision({
                id: "validate-revenue-completeness",
                priority: "high",
                title: "Validate revenue coverage before changing costs",
                trigger: item.title,
                why: item.why,
                evidence: item.evidence,
                action: "Verify that revenue transactions were imported and mapped correctly before taking cost-reduction action.",
                guardrail: "Do not interpret a zero-revenue result as proof that the business has no revenue when the dataset may be incomplete.",
                dataSufficiency: item.dataSufficiency,
            }));
        } else if (item.id === "operating-loss") {
            decisions.push(decision({
                id: "review-operating-loss",
                priority: "high",
                title: "Investigate the recorded operating loss",
                trigger: item.title,
                why: item.why,
                evidence: item.evidence,
                action: "Review the largest expense categories and verify revenue completeness and transaction classification before changing spending.",
                guardrail: "Separate data-quality problems from genuine operating losses before making cost decisions.",
                dataSufficiency: item.dataSufficiency,
            }));
        } else if (item.id === "high-expense-burden") {
            decisions.push(decision({
                id: "review-expense-burden",
                priority: item.severity === "high" ? "high" : "medium",
                title: "Review the operating expense burden",
                trigger: item.title,
                why: item.why,
                evidence: item.evidence,
                action: "Inspect the largest expense categories and determine which costs are recurring, one-time, or incorrectly classified.",
                guardrail: "Do not cut costs solely from the aggregate ratio without reviewing the underlying transactions.",
                dataSufficiency: item.dataSufficiency,
            }));
        } else if (item.id === "expense-concentration") {
            decisions.push(decision({
                id: "review-concentrated-expense",
                priority: item.severity === "high" ? "high" : "medium",
                title: `Review the concentrated expense category: ${item.evidence?.category || "top category"}`,
                trigger: item.title,
                why: item.why,
                evidence: item.evidence,
                action: "Review transactions in the concentrated category for recurring costs, unusual entries, and classification accuracy.",
                guardrail: "A concentrated category is not automatically an avoidable cost; validate its business purpose first.",
                dataSufficiency: item.dataSufficiency,
            }));
        }
    });

    (anomalyDetection?.anomalies || []).forEach((anomaly) => {
        decisions.push(decision({
            id: `review-anomaly-${anomaly.id || decisions.length}`,
            priority: anomaly.severity === "high" ? "high" : "medium",
            title: "Review an unusual transaction before relying on aggregate metrics",
            trigger: anomaly.title,
            why: anomaly.why,
            evidence: anomaly.evidence,
            action: anomaly.action,
            guardrail: "Do not remove, reclassify, or exclude the transaction without verifying the source record.",
            dataSufficiency: anomaly.dataSufficiency || "sufficient",
        }));
    });

    // Forecast unavailability is a decision guardrail, not a forecast failure.
    if (forecast && forecast.available === false && metrics.transactionCount > 0) {
        decisions.push(decision({
            id: "defer-forecast-driven-planning",
            priority: "medium",
            title: "Defer forecast-driven planning until history is sufficient",
            trigger: "Forecast is currently unavailable",
            why: forecast.reason || "Historical data does not meet the forecast eligibility requirements.",
            evidence: {
                observedMonths: forecast.observedMonths,
                activeMonths: forecast.activeMonths,
                minimumObservedMonths: forecast.minimumObservedMonths,
                minimumActiveMonths: forecast.minimumActiveMonths,
            },
            action: "Continue collecting monthly financial activity and reassess forecast eligibility once sufficient historical observations are available.",
            guardrail: "Do not substitute an assumed growth rate for an unavailable forecast.",
            dataSufficiency: "limited",
        }));
    }

    // Avoid duplicate decisions generated by multiple signals.
    const unique = [];
    const seen = new Set();
    decisions.forEach((item) => {
        if (!seen.has(item.id)) {
            seen.add(item.id);
            unique.push(item);
        }
    });

    unique.sort((a, b) => (SEVERITY_ORDER[a.priority] ?? 99) - (SEVERITY_ORDER[b.priority] ?? 99));

    const highCount = unique.filter((item) => item.priority === "high").length;
    const mediumCount = unique.filter((item) => item.priority === "medium").length;
    const dataSufficiency = metrics.transactionCount === 0 ? "insufficient" : metrics.transactionCount < 6 ? "limited" : "sufficient";

    let summary = "No immediate decision action was generated from the recorded evidence.";
    if (highCount > 0) summary = `${highCount} high-priority decision action${highCount === 1 ? "" : "s"} require review.`;
    else if (mediumCount > 0) summary = `${mediumCount} decision action${mediumCount === 1 ? "" : "s"} are available for review.`;

    return {
        summary,
        dataSufficiency,
        count: unique.length,
        decisions: unique,
    };
}

module.exports = { buildDecisionIntelligence };
