import {
  Download,
  FileText,
  FileSpreadsheet,
  File,
} from "lucide-react";

import AnalyticsCard from "./AnalyticsCard";

function ExportButton({

  icon,

  title,

  description,

}) {

  return (

    <button
      className="
        w-full
        bg-zinc-900
        border
        border-zinc-800
        rounded-2xl
        p-5
        text-left
        hover:border-violet-500/40
        hover:bg-zinc-900/80
        transition-all
      "
    >

      <div className="flex items-center gap-4">

        <div
          className="
            w-12
            h-12
            rounded-xl
            bg-violet-500/10
            flex
            items-center
            justify-center
            text-violet-400
          "
        >

          {icon}

        </div>

        <div>

          <h3 className="font-semibold">

            {title}

          </h3>

          <p className="text-sm text-zinc-500 mt-1">

            {description}

          </p>

        </div>

      </div>

    </button>

  );

}

function ExportCard() {

  return (

    <AnalyticsCard

      icon={<Download size={20} />}

      title="Export Reports"

      subtitle="Download your business analytics"

    >

      <div className="space-y-4">

        <ExportButton

          icon={<FileText size={22} />}

          title="PDF Report"

          description="Professional financial report"

        />

        <ExportButton

          icon={<FileSpreadsheet size={22} />}

          title="Excel Report"

          description="Detailed spreadsheet export"

        />

        <ExportButton

          icon={<File size={22} />}

          title="CSV Export"

          description="Raw transaction analytics"

        />

      </div>

    </AnalyticsCard>

  );

}

export default ExportCard;