import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import {
  Building2,
} from "lucide-react";

import AnalyticsCard from "./AnalyticsCard";

function BusinessComparison({

  workspaceComparison,

}) {

  return (

    <AnalyticsCard

      icon={
        <Building2 size={20} />
      }

      title="Business Comparison"

      subtitle="Revenue & Profit across all workspaces"

    >

      <div className="h-[380px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart

            data={workspaceComparison}

            layout="vertical"

            margin={{

              top: 10,

              right: 20,

              left: 20,

              bottom: 10,

            }}

          >

            <CartesianGrid

              stroke="#27272a"

              strokeDasharray="3 3"

            />

            <XAxis

              type="number"

              stroke="#71717a"

            />

            <YAxis

              type="category"

              dataKey="name"

              stroke="#71717a"

              width={120}

            />

            <Tooltip

              contentStyle={{

                background: "#18181b",

                border: "1px solid #27272a",

                borderRadius: "12px",

              }}

            />

            <Legend />

            <Bar

              dataKey="revenue"

              name="Revenue"

              fill="#22c55e"

              radius={[0, 8, 8, 0]}

            />

            <Bar

              dataKey="profit"

              name="Profit"

              fill="#8b5cf6"

              radius={[0, 8, 8, 0]}

            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </AnalyticsCard>

  );

}

export default BusinessComparison;