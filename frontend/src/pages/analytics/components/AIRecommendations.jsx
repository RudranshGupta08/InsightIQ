import {
  Brain,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

import AnalyticsCard from "./AnalyticsCard";

function AIRecommendations({

  recommendations = [],

  insightMessage,

  forecast,

  insightIQScore,

}) {

  return (

    <AnalyticsCard

      icon={<Brain size={20} />}

      title="AI Business Recommendations"

      subtitle="Generated from your business performance"

    >

      <div className="space-y-4">

        {/* AI Summary */}

        <div
          className="
            bg-violet-500/10
            border
            border-violet-500/20
            rounded-2xl
            p-5
          "
        >

          <div className="flex gap-3">

            <Sparkles
              className="text-violet-400 mt-1"
              size={20}
            />

            <div>

              <h3 className="font-semibold mb-2">

                InsightIQ AI Summary

              </h3>

              <p className="text-zinc-300 leading-7">

                {insightMessage}

              </p>

            </div>

          </div>

        </div>

        {/* Recommendations */}

        <div className="space-y-3">

          {recommendations.map(

            (item, index) => (

              <div

                key={index}

                className="
                  flex
                  items-start
                  gap-3
                  bg-zinc-900
                  border
                  border-zinc-800
                  rounded-xl
                  p-4
                "

              >

                <CheckCircle2

                  size={18}

                  className="text-green-400 mt-1"

                />

                <p className="text-zinc-300">

                  {item}

                </p>

              </div>

            )

          )}

        </div>

        {/* Bottom Grid */}

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          <div
            className="
              bg-zinc-900
              border
              border-zinc-800
              rounded-2xl
              p-5
            "
          >

            <TrendingUp
              className="text-green-400 mb-3"
              size={20}
            />

            <p className="text-sm text-zinc-500">

              Forecast Growth

            </p>

            <h3 className="text-2xl font-bold mt-2">

              {forecast.expectedGrowth}

            </h3>

          </div>

          <div
            className="
              bg-zinc-900
              border
              border-zinc-800
              rounded-2xl
              p-5
            "
          >

            <Brain
              className="text-violet-400 mb-3"
              size={20}
            />

            <p className="text-sm text-zinc-500">

              AI Confidence

            </p>

            <h3 className="text-2xl font-bold mt-2">

              {forecast.confidence}

            </h3>

          </div>

          <div
            className="
              bg-zinc-900
              border
              border-zinc-800
              rounded-2xl
              p-5
            "
          >

            <AlertTriangle
              className="text-yellow-400 mb-3"
              size={20}
            />

            <p className="text-sm text-zinc-500">

              Business Score

            </p>

            <h3 className="text-2xl font-bold mt-2">

              {insightIQScore}/100

            </h3>

          </div>

        </div>

      </div>

    </AnalyticsCard>

  );

}

export default AIRecommendations;