import {
  Activity,
  TrendingUp,
  Wallet,
} from "lucide-react";

import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";
import AnalyticsCard from "./AnalyticsCard";

function ProgressRow({
  title,
  value,
  color,
}) {
  return (
    <div className="space-y-2">

      <div className="flex justify-between text-sm">

        <span className="text-zinc-400">
          {title}
        </span>

        <span className="font-medium">
          {value}%
        </span>

      </div>

      <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">

        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${value}%`,
            backgroundColor: color,
          }}
        />

      </div>

    </div>
  );
}

function HealthCard({

  businessHealth,

}) {

  const {

    insightIQScore,

    scoreStatus,

    revenueHealth,

    expenseHealth,

    profitability,

    insightMessage,

  } = businessHealth;

  let ringColor = "#ef4444";

  if (insightIQScore >= 90)
    ringColor = "#22c55e";

  else if (insightIQScore >= 75)
    ringColor = "#3b82f6";

  else if (insightIQScore >= 60)
    ringColor = "#eab308";

  return (
    <AnalyticsCard

    icon={

        <Activity size={20} />

    }

    title="Business Health"

    subtitle="AI Generated Score"

    className="h-full"

>

      {/* Score */}

      <div className="w-44 mx-auto">

        <CircularProgressbar

          value={insightIQScore}

          text={`${insightIQScore}`}

          strokeWidth={8}

          styles={buildStyles({

            pathColor: ringColor,

            trailColor: "#27272a",

            textColor: "#fff",

            textSize: "18px",

          })}

        />

      </div>

      <div className="text-center mt-4">

        <h3
          className="text-2xl font-semibold"
          style={{
            color: ringColor,
          }}
        >

          {scoreStatus}

        </h3>

      </div>

      {/* Progress */}

      <div className="space-y-6 mt-8">

        <ProgressRow

          title="Revenue Health"

          value={revenueHealth}

          color="#22c55e"

        />

        <ProgressRow

          title="Expense Control"

          value={expenseHealth}

          color="#ef4444"

        />

        <ProgressRow

          title="Profitability"

          value={profitability}

          color="#8b5cf6"

        />

      </div>

      {/* Insight */}

      <div
        className="
          mt-8
          rounded-2xl
          border
          border-zinc-800
          bg-zinc-900
          p-4
        "
      >

        <div className="flex gap-3">

          <TrendingUp
            size={18}
            className="text-violet-400 mt-1"
          />

          <p
            className="
              text-sm
              leading-6
              text-zinc-300
            "
          >

            {insightMessage}

          </p>

        </div>

      </div>

      {/* Footer */}

      <div
        className="
          mt-6
          pt-5
          border-t
          border-zinc-800
          flex
          items-center
          justify-between
        "
      >

        <div className="flex items-center gap-2">

          <Wallet
            size={16}
            className="text-violet-400"
          />

          <span className="text-sm text-zinc-500">

            Powered by InsightIQ AI

          </span>

        </div>

      </div>

    </AnalyticsCard>

  );

}

export default HealthCard;