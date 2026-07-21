function AnalyticsHeader() {

  const now = new Date();

  const currentDate =
    now.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );

  const currentTime =
    now.toLocaleTimeString(
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
        px-8
        py-7
        mb-8
      "
    >

      <div className="flex justify-between items-start">

        <div>

          <h1 className="text-3xl font-bold">

            AI Business Analytics

          </h1>

          <p className="text-zinc-500 mt-2">

            Detailed financial intelligence powered by InsightIQ AI.

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

  );

}

export default AnalyticsHeader;