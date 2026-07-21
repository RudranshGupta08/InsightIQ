import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import {
  TrendingUp,
  Wallet,
  BadgeIndianRupee,
} from "lucide-react";

import AnalyticsCard from "./AnalyticsCard";

function StatCard({
  icon,
  title,
  value,
  color,
}) {

  return (

    <div
      className="
        bg-zinc-900
        border
        border-zinc-800
        rounded-2xl
        p-4
      "
    >

      <div className="flex items-center justify-between">

        <div>

          <p className="text-zinc-500 text-sm">

            {title}

          </p>

          <h3 className="text-2xl font-semibold mt-2">

            ₹{value.toLocaleString()}

          </h3>

        </div>

        <div
          className="
            w-11
            h-11
            rounded-xl
            flex
            items-center
            justify-center
          "
          style={{
            backgroundColor: `${color}20`,
          }}
        >

          {icon}

        </div>

      </div>

    </div>

  );

}

function RevenueChart({

  monthlyData,

  revenue,

  expenses,

  profit,

}) {

  return (

    <AnalyticsCard

      icon={

        <TrendingUp size={20} />

      }

      title="Revenue Trend"

      subtitle="Monthly Financial Performance"

      action={

        <button
          className="
            px-4
            py-2
            rounded-xl
            bg-zinc-900
            border
            border-zinc-800
            text-sm
            hover:bg-zinc-800
            transition-all
          "
        >

          This Year

        </button>

      }

    >

      {/* KPI */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

        <StatCard

          title="Revenue"

          value={revenue}

          color="#22c55e"

          icon={

            <TrendingUp

              size={20}

              className="text-green-400"

            />

          }

        />

        <StatCard

          title="Expenses"

          value={expenses}

          color="#ef4444"

          icon={

            <Wallet

              size={20}

              className="text-red-400"

            />

          }

        />

        <StatCard

          title="Profit"

          value={profit}

          color="#8b5cf6"

          icon={

            <BadgeIndianRupee

              size={20}

              className="text-violet-400"

            />

          }

        />

      </div>

      {/* Chart */}

      <div className="h-[360px] w-full">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart
            data={monthlyData}
          >

            <CartesianGrid

              stroke="#27272a"

              strokeDasharray="3 3"

            />

            <XAxis

              dataKey="month"

              stroke="#71717a"

            />

            <YAxis

              stroke="#71717a"

            />

            <Tooltip

              contentStyle={{

                background: "#18181b",

                border: "1px solid #27272a",

                borderRadius: "12px",

              }}

            />

            <Legend />

            <Line

              type="monotone"

              dataKey="Revenue"

              stroke="#22c55e"

              strokeWidth={3}

              dot={{ r: 4 }}

              activeDot={{ r: 6 }}

            />

            <Line

              type="monotone"

              dataKey="Expense"

              stroke="#ef4444"

              strokeWidth={3}

              dot={{ r: 4 }}

              activeDot={{ r: 6 }}

            />

            <Line

              type="monotone"

              dataKey="Profit"

              stroke="#8b5cf6"

              strokeWidth={3}

              dot={{ r: 4 }}

              activeDot={{ r: 6 }}

            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </AnalyticsCard>

  );

}

export default RevenueChart;