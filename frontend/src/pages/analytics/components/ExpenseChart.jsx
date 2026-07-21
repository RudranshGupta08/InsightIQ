import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Receipt,
} from "lucide-react";

import AnalyticsCard from "./AnalyticsCard";

const COLORS = [
  "#8b5cf6",
  "#22c55e",
  "#ef4444",
  "#f59e0b",
  "#3b82f6",
];

function ExpenseChart({

  expenseBreakdown,

}) {

  const totalExpense =
    expenseBreakdown.reduce(

      (sum, item) => sum + item.value,

      0

    );

  return (

    <AnalyticsCard

      title="Expense Breakdown"

      subtitle="Distribution of all business expenses"

    >

      <div className="grid lg:grid-cols-2 gap-8 items-center">

        {/* Donut Chart */}

        <div className="h-[300px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <PieChart>

              <Pie

                data={expenseBreakdown}

                dataKey="value"

                nameKey="name"

                innerRadius={70}

                outerRadius={100}

                paddingAngle={4}

              >

                {expenseBreakdown.map(

                  (entry, index) => (

                    <Cell

                      key={index}

                      fill={
                        COLORS[
                          index %
                          COLORS.length
                        ]
                      }

                    />

                  )

                )}

              </Pie>

              <Tooltip

                contentStyle={{

                  background: "#18181b",

                  border: "1px solid #27272a",

                  borderRadius: "12px",

                }}

              />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* Expense List */}

        <div className="space-y-4">

          {expenseBreakdown.map(

            (item, index) => (

              <div

                key={index}

                className="
                  flex
                  items-center
                  justify-between
                  bg-zinc-900
                  border
                  border-zinc-800
                  rounded-2xl
                  p-4
                "

              >

                <div className="flex items-center gap-3">

                  <div

                    className="w-3 h-3 rounded-full"

                    style={{

                      backgroundColor:

                        COLORS[
                          index %
                          COLORS.length
                        ],

                    }}

                  />

                  <Receipt
                    size={16}
                    className="text-zinc-400"
                  />

                  <span>

                    {item.name}

                  </span>

                </div>

                <span className="font-semibold">

                  ₹{item.value.toLocaleString()}

                </span>

              </div>

            )

          )}

          <div

            className="
              mt-4
              pt-4
              border-t
              border-zinc-800
              flex
              justify-between
              text-lg
              font-semibold
            "

          >

            <span>Total Expense</span>

            <span className="text-red-400">

              ₹{totalExpense.toLocaleString()}

            </span>

          </div>

        </div>

      </div>

    </AnalyticsCard>

  );

}

export default ExpenseChart;