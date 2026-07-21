function ImportProgress({

    progress = 0,

}) {

    return (

        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">

            <h2 className="text-xl font-semibold">

                Import Progress

            </h2>

            <div className="mt-6">

                <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">

                    <div

                        className="h-full bg-violet-500"

                        style={{

                            width: `${progress}%`,

                        }}

                    />

                </div>

                <p className="mt-4 text-zinc-400">

                    {progress}% Completed

                </p>

            </div>

        </div>

    );

}

export default ImportProgress;