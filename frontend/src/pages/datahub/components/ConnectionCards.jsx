import {

    Database,

    Cloud,

    Building2,

} from "lucide-react";

const apps = [

    "Google Sheets",

    "Google Drive",

    "Dropbox",

    "QuickBooks",

    "Zoho Books",

    "Tally ERP",

];

function ConnectionCards() {

    return (

        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">

            <h2 className="text-xl font-semibold mb-6">

                Connected Sources

            </h2>

            <div className="space-y-4">

                {

                    apps.map((app) => (

                        <div

                            key={app}

                            className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-2xl p-4"

                        >

                            <div className="flex items-center gap-3">

                                <Database className="text-violet-400" />

                                {app}

                            </div>

                            <span className="text-zinc-500">

                                Coming Soon

                            </span>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default ConnectionCards;