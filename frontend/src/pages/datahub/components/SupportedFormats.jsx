import {
    FileSpreadsheet,
    FileText,
    FileImage,
    Database,
} from "lucide-react";

const formats = [

    {
        title: "Excel",
        icon: FileSpreadsheet,
        color: "text-green-400",
    },

    {
        title: "CSV",
        icon: FileSpreadsheet,
        color: "text-emerald-400",
    },

    {
        title: "PDF",
        icon: FileText,
        color: "text-red-400",
    },

    {
        title: "Word",
        icon: FileText,
        color: "text-blue-400",
    },

    {
        title: "Images",
        icon: FileImage,
        color: "text-violet-400",
    },

    {
        title: "Google Sheets",
        icon: Database,
        color: "text-yellow-400",
        comingSoon: true,
    },

];

function SupportedFormats() {

    return (

        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">

            <h2 className="text-xl font-semibold mb-6">

                Supported Formats

            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

                {

                    formats.map((item) => {

                        const Icon = item.icon;

                        return (

                            <div

                                key={item.title}

                                className="bg-zinc-900 rounded-2xl p-5 text-center border border-zinc-800"

                            >

                                <Icon

                                    size={34}

                                    className={`mx-auto ${item.color}`}

                                />

                                <h3 className="mt-4 font-medium">

                                    {item.title}

                                </h3>

                                {

                                    item.comingSoon && (

                                        <p className="text-xs text-zinc-500 mt-2">

                                            Coming Soon

                                        </p>

                                    )

                                }

                            </div>

                        );

                    })

                }

            </div>

        </div>

    );

}

export default SupportedFormats;