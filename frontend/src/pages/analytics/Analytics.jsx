import DashboardLayout from "../../layouts/DashboardLayout";

import AnalyticsHeader from "./components/AnalyticsHeader";
import HealthCard from "./components/HealthCard";
import RevenueChart from "./components/RevenueChart";
import ExpenseChart from "./components/ExpenseChart";
import BusinessComparison from "./components/BusinessComparison";
import AIRecommendations from "./components/AIRecommendations";
import ExportCard from "./components/ExportCard";
import { useAnalytics } from "../../context/AnalyticsContext";


function Analytics() {

    const {

        analytics,

        loading,

    } = useAnalytics();

    if (loading) {

        return (

            <DashboardLayout>

                <div className="flex items-center justify-center h-[70vh]">

                    <p className="text-zinc-400 text-lg">

                        Loading Analytics...

                    </p>

                </div>

            </DashboardLayout>

        );

    }

    if (!analytics) {

        return (

            <DashboardLayout>

                <div className="flex items-center justify-center h-[70vh]">

                    <p className="text-zinc-400 text-lg">

                        Select a workspace to view analytics.

                    </p>

                </div>

            </DashboardLayout>

        );

    }

    const {

        monthlyData,
        revenue,
        expenses,
        profit,
        expenseBreakdown,
        workspaceComparison,
        recommendations,
        insightMessage,
        insightIQScore,
        scoreStatus,
        revenueHealth,
        expenseHealth,
        profitability,

    } = analytics;

    const businessHealth = {
        insightIQScore,
        scoreStatus,
        revenueHealth,
        expenseHealth,
        profitability,
        insightMessage,
    };

    return (

        <DashboardLayout>

            <div className="space-y-8">

                <AnalyticsHeader />

                {/* Row 1 */}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    <HealthCard
                        businessHealth={businessHealth}
                    />

                    <div className="lg:col-span-2">

                        <RevenueChart

                            monthlyData={monthlyData}

                            revenue={revenue}

                            expenses={expenses}

                            profit={profit}

                        />

                    </div>

                </div>

                {/* Row 2 */}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    <ExpenseChart

                        expenseBreakdown={expenseBreakdown}

                    />

                    <BusinessComparison

                        workspaceComparison={workspaceComparison}

                    />

                </div>

                <AIRecommendations

                    recommendations={recommendations}

                    insightMessage={insightMessage}

                    insightIQScore={insightIQScore}

                />

                <ExportCard />

            </div>

        </DashboardLayout>

    );

}

export default Analytics;