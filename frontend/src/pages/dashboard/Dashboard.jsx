import {
  getBusinessAnalytics
} from "../../utils/businessAnalytics";

import InsightIQScore from "../../components/dashboard/InsightIQScore";

import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../../layouts/DashboardLayout";
import {
  useAnalytics,
} from "../../context/AnalyticsContext";

import API from "../../api/axios";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

function Dashboard() {

  const {
    transactions,
    workspaces,
    allTransactions,
    loading,
  } = useAnalytics();

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const clientName =
    userInfo?.name || "User";

  const now = new Date();

  const currentDate =
    now.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const currentTime =
    now.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const analytics = getBusinessAnalytics(
    transactions,
    workspaces,
    allTransactions
  );

  const {
    revenue,
    expenses,
    profit,
    profitMargin,
    expenseRatio,

    insightIQScore,
    scoreStatus,
    scoreColor,
    insightMessage,

    revenueHealth,
    expenseHealth,
    profitability,

    businessPerformance,
    workspaceComparison,
    topBusiness,

    recentActivities,
    monthlyData,
    chartData,
    highestTransaction,

    expenseBreakdown,
    recommendations,
    forecast,
    exportData,

  } = analytics;

  if (loading) {

    return (

      <DashboardLayout>

        <div className="text-center py-20">

          Loading Dashboard...

        </div>

      </DashboardLayout>

    );

  }

  return (
    <DashboardLayout>

      {/* Hero Section */}

      <div
        className="
      mb-8
      bg-zinc-950
      border
      border-zinc-800
      rounded-3xl
      px-8
      py-6
    "
      >

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold">

              👋 Welcome back, {clientName}

            </h1>

            <p className="text-zinc-500 mt-2">

              Here's what's happening across your businesses today.

            </p>

          </div>

          <div className="text-right">

            <p className="text-sm text-zinc-500">

              {currentDate}

            </p>

            <p className="text-xl font-semibold mt-1">

              {currentTime}

            </p>

          </div>

        </div>

      </div>

      {/* KPI Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

        {/* Revenue */}

        <div className="bg-zinc-950 border border-emerald-500/20 rounded-2xl p-6 hover:border-emerald-500/40 transition-all">

          <div className="flex justify-between items-center">

            <p className="text-zinc-400">
              Revenue
            </p>

            <span className="text-emerald-400 text-lg">
              📈
            </span>

          </div>

          <h2 className="text-3xl font-bold mt-5">

            ₹{revenue.toLocaleString()}

          </h2>

          <p className="text-sm text-emerald-400 mt-3">

            Business Income

          </p>

        </div>

        {/* Profit */}

        <div className="bg-zinc-950 border border-violet-500/20 rounded-2xl p-6 hover:border-violet-500/40 transition-all">

          <div className="flex justify-between items-center">

            <p className="text-zinc-400">
              Net Profit
            </p>

            <span className="text-violet-400 text-lg">
              💰
            </span>

          </div>

          <h2 className="text-3xl font-bold mt-5">

            ₹{profit.toLocaleString()}

          </h2>

          <p className="text-sm text-violet-400 mt-3">

            {profitMargin}% Margin

          </p>

        </div>

        {/* Expenses */}

        <div className="bg-zinc-950 border border-red-500/20 rounded-2xl p-6 hover:border-red-500/40 transition-all">

          <div className="flex justify-between items-center">

            <p className="text-zinc-400">
              Expenses
            </p>

            <span className="text-red-400 text-lg">
              💸
            </span>

          </div>

          <h2 className="text-3xl font-bold mt-5">

            ₹{expenses.toLocaleString()}

          </h2>

          <p className="text-sm text-red-400 mt-3">

            Operational Costs

          </p>

        </div>

        {/* Transactions */}

        <div className="bg-zinc-950 border border-blue-500/20 rounded-2xl p-6 hover:border-blue-500/40 transition-all">

          <div className="flex justify-between items-center">

            <p className="text-zinc-400">
              Transactions
            </p>

            <span className="text-blue-400 text-lg">
              📑
            </span>

          </div>

          <h2 className="text-3xl font-bold mt-5">

            {transactions.length}

          </h2>

          <p className="text-sm text-blue-400 mt-3">

            Recorded Entries

          </p>

        </div>

        {/* Businesses */}

        <div className="bg-zinc-950 border border-amber-500/20 rounded-2xl p-6 hover:border-amber-500/40 transition-all">

          <div className="flex justify-between items-center">

            <p className="text-zinc-400">
              Businesses
            </p>

            <span className="text-amber-400 text-lg">
              🏢
            </span>

          </div>

          <h2 className="text-3xl font-bold mt-5">

            {workspaces.length}

          </h2>

          <p className="text-sm text-amber-400 mt-3">

            Active Workspaces

          </p>

        </div>

      </div>

      {/* Chart + InsightIQ */}

      <div className="mt-8 grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Financial Overview */}

        <div className="xl:col-span-2 bg-zinc-950 border border-zinc-800 rounded-2xl p-6">

          <div className="flex items-center justify-between mb-8">

            <div>

              <h3 className="text-2xl font-semibold">

                Financial Overview

              </h3>

              <p className="text-zinc-500 text-sm mt-1">

                Revenue • Expenses

              </p>

            </div>

            <button
              className="
            px-4
            py-2
            rounded-xl
            bg-zinc-900
            border
            border-zinc-800
            hover:border-violet-500/30
            transition-all
          "
            >

              This Month

            </button>

          </div>

          <div className="h-[380px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart data={monthlyData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#27272a"
                />

                <XAxis
                  dataKey="month"
                  stroke="#a1a1aa"
                />

                <YAxis
                  stroke="#a1a1aa"
                />

                <Tooltip
                  contentStyle={{
                    background: "#111111",
                    border: "1px solid #27272a",
                    borderRadius: "14px",
                  }}
                />

                <Legend
                  iconType="circle"
                />

                <Line
                  type="monotone"
                  dataKey="Revenue"
                  stroke="#22c55e"
                  strokeWidth={3}
                  dot={false}
                />

                <Line
                  type="monotone"
                  dataKey="Expense"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={false}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* InsightIQ Score */}

        <InsightIQScore
          insightIQScore={insightIQScore}
          scoreStatus={scoreStatus}
          profit={profit}
          profitMargin={profitMargin}
          expenseRatio={expenseRatio}
          transactions={transactions}
          insightMessage={insightMessage}
          recommendations={recommendations}
        />

      </div>
      {/* Bottom Section */}

      <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Recent Activity */}

        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">

          <div className="flex items-center justify-between mb-6">

            <h3 className="text-xl font-semibold">

              Recent Activity

            </h3>

            <button
              className="
            text-sm
            text-violet-400
            hover:text-violet-300
            transition-colors
          "
            >
              View All
            </button>

          </div>

          <div className="space-y-5">

            {recentActivities.length > 0 ? (

              recentActivities.map((transaction) => (

                <div
                  key={transaction._id}
                  className="
                flex
                justify-between
                items-center
                pb-4
                border-b
                border-zinc-800
                last:border-none
                last:pb-0
              "
                >

                  <div>

                    <p className="font-medium">

                      {[
                        "income",
                        "subscription",
                      ].includes(
                        transaction.transactionType
                      )
                        ? "🟢"
                        : "🔴"}

                      {" "}

                      {transaction.title}

                    </p>

                    <p className="text-zinc-500 text-sm mt-1">

                      {transaction.category}

                    </p>

                  </div>

                  <div className="text-right">

                    <p
                      className={`font-semibold ${[
                        "income",
                        "subscription",
                      ].includes(
                        transaction.transactionType
                      )
                        ? "text-green-400"
                        : "text-red-400"
                        }`}
                    >

                      ₹
                      {Number(
                        transaction.amount
                      ).toLocaleString()}

                    </p>

                    <p className="text-zinc-500 text-xs mt-1">

                      {new Date(
                        transaction.createdAt
                      ).toLocaleDateString()}

                    </p>

                  </div>

                </div>

              ))

            ) : (

              <p className="text-zinc-500">

                No recent activity.

              </p>

            )}

          </div>

        </div>

        {/* Top Business */}

        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6">

          <div className="flex justify-between items-center mb-6">

            <h3 className="text-xl font-semibold">

              Top Business

            </h3>

            <span className="text-2xl">

              🏆

            </span>

          </div>

          {topBusiness ? (

            <>

              <div>

                <h2 className="text-2xl font-bold">

                  {topBusiness.name}

                </h2>

                <p className="text-zinc-500 mt-1">

                  Best Performing Workspace

                </p>

              </div>

              <div className="mt-8 space-y-5">

                <div className="flex justify-between">

                  <span className="text-zinc-500">

                    Revenue

                  </span>

                  <span className="font-semibold">

                    ₹{topBusiness.revenue.toLocaleString()}

                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-zinc-500">

                    Transactions

                  </span>

                  <span className="font-semibold">

                    {topBusiness.transactionCount}

                  </span>

                </div>

              </div>

            </>

          ) : (

            <div className="flex items-center justify-center h-52">

              <p className="text-zinc-500">

                No Business Data

              </p>

            </div>

          )}

        </div>

      </div>

    </DashboardLayout>

  );

}

export default Dashboard;