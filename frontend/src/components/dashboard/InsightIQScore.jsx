import { Link } from "react-router-dom";

import {
  Activity,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

function InsightIQScore({

  insightIQScore,

  scoreStatus,

  profit,

  profitMargin,

  transactions,

}) {

  /* =====================================
        Ring Color
  ===================================== */

  let ringColor = "#ef4444";

  if (insightIQScore >= 90)

    ringColor = "#22c55e";

  else if (insightIQScore >= 75)

    ringColor = "#3b82f6";

  else if (insightIQScore >= 60)

    ringColor = "#eab308";

  /* =====================================
        Dynamic Insight
  ===================================== */

  const insightMessage =
    profitMargin >= 40
      ? "Outstanding profitability. Your business is operating efficiently."
      : profitMargin >= 25
        ? "Financial performance is healthy with consistent growth potential."
        : profit > 0
          ? "Business remains profitable. Optimizing expenses can improve margins."
          : "Expenses are impacting profitability. Consider reviewing operating costs.";

  /* =====================================
        Last Updated
  ===================================== */

  const lastUpdated =
    new Date().toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );

  return (

    <div
      className="
      bg-zinc-950
      border
      border-zinc-800
      rounded-3xl
      p-6
      h-full
      flex
      flex-col
      justify-between
      hover:border-violet-500/30
      transition-all
      duration-300
    "
    >

      {/* Header */}

      <div className="flex justify-between items-start">

        <div className="flex items-center gap-3">

          <div
            className="
            w-11
            h-11
            rounded-xl
            bg-violet-500/10
            flex
            items-center
            justify-center
          "
          >

            <Activity
              size={20}
              className="text-violet-400"
            />

          </div>

          <div>

            <h3 className="text-xl font-semibold">

              InsightIQ Score

            </h3>

            <p className="text-sm text-zinc-500">

              Current business snapshot

            </p>

          </div>

        </div>

        <Sparkles
          size={18}
          className="text-violet-400"
        />

      </div>

      {/* Score */}

      <div className="flex justify-center my-8">

        <div className="w-40 h-40">

          <CircularProgressbar

            value={insightIQScore}

            text={`${insightIQScore}`}

            strokeWidth={8}

            styles={buildStyles({

              pathColor: ringColor,

              textColor: "#ffffff",

              trailColor: "#27272a",

              strokeLinecap: "round",

              textSize: "18px",

            })}

          />

        </div>

      </div>

      {/* Status */}

      <div className="text-center -mt-2">

        <h2
          className="text-2xl font-semibold"
          style={{
            color: ringColor,
          }}
        >

          {scoreStatus}

        </h2>

        <p className="text-sm text-zinc-500 mt-1">

          Business Health Score

        </p>

      </div>

      {/* Business insight */}

      <div
        className="
        mt-6
        rounded-2xl
        bg-zinc-900
        border
        border-zinc-800
        p-4
      "
      >

        <p
          className="
          text-sm
          text-zinc-300
          leading-6
        "
        >

          {insightMessage}

        </p>

      </div>

            {/* Action */}

      <Link
        to="/analytics"
        className="
          mt-6
          group
          flex
          items-center
          justify-between
          rounded-2xl
          border
          border-zinc-800
          bg-zinc-900
          px-5
          py-4
          hover:border-violet-500/40
          hover:bg-zinc-900/80
          transition-all
          duration-300
        "
      >

        <div>

          <p className="font-medium">

            View Detailed Analysis

          </p>

          <p className="text-xs text-zinc-500 mt-1">

            Revenue • Expenses • Forecast • AI Insights

          </p>

        </div>

        <ArrowRight
          size={20}
          className="
            text-violet-400
            transition-transform
            duration-300
            group-hover:translate-x-2
          "
        />

      </Link>

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

        <div>

          <p className="text-xs text-zinc-500">

            Last Updated

          </p>

          <p className="text-sm font-medium">

            {lastUpdated}

          </p>

        </div>

        <div className="text-right">

          <p className="text-xs text-zinc-500">

            Transactions

          </p>

          <p className="text-sm font-semibold text-violet-400">

            {transactions.length}

          </p>

        </div>

      </div>

    </div>

  );

}

export default InsightIQScore;