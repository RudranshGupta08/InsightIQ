import {
  Brain,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import AnalyticsCard from "./AnalyticsCard";

function AIRecommendations({

  recommendations = [],

  insightMessage,

  insightIQScore,

}) {

  return (

    <AnalyticsCard

      icon={<Brain size={20} />}

      title="Business Recommendations"

      subtitle="Derived from current business performance"

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

                InsightIQ Summary

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

        {/* Business score remains temporary until the metric engine replaces it. */}

        <div className="mt-6">

          <div
            className="
              bg-zinc-900
              border
              border-zinc-800
              rounded-2xl
              p-5
            "
          >

            <p className="text-sm text-zinc-500">

              Current business score (legacy)

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