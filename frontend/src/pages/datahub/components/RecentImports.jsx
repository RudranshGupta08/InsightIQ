function RecentImports() {

    const imports = [

        {

            name: "January.xlsx",

            status: "Completed",

            rows: 1254,

        },

        {

            name: "Expenses.pdf",

            status: "Processing",

            rows: "--",

        },

        {

            name: "Payroll.csv",

            status: "Completed",

            rows: 328,

        },

    ];

    return (

        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">

            <h2 className="text-xl font-semibold mb-6">

                Recent Imports

            </h2>

            <div className="space-y-4">

                {

                    imports.map((item) => (

                        <div

                            key={item.name}

                            className="bg-zinc-900 rounded-2xl border border-zinc-800 p-4"

                        >

                            <div className="flex justify-between">

                                <div>

                                    <h3 className="font-medium">

                                        {item.name}

                                    </h3>

                                    <p className="text-zinc-500 text-sm">

                                        {item.rows} Records

                                    </p>

                                </div>

                                <span className="text-green-400">

                                    {item.status}

                                </span>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default RecentImports;