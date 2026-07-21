import {

    BookOpen,

    LayoutDashboard,

    Rocket,

    ShieldCheck,

    CircleHelp,

    Wrench,

    Building2,

    ClipboardList,

    Lightbulb

} from "lucide-react";

const items = [

    {

        id: "overview",

        title: "Overview",

        icon: LayoutDashboard

    },

    {

        id: "current",

        title: "Current Version",

        icon: BookOpen

    },

    {

        id: "version15",

        title: "Version 1.5",

        icon: Rocket

    },

    {

        id: "version20",

        title: "Version 2.0",

        icon: Lightbulb

    },

    {

        id: "release",

        title: "Release Notes",

        icon: ClipboardList

    },

    {

        id: "faq",

        title: "FAQ",

        icon: CircleHelp

    },

    {

        id: "best",

        title: "Best Practices",

        icon: ShieldCheck

    },

    {

        id: "troubleshooting",

        title: "Troubleshooting",

        icon: Wrench

    },

    {

        id: "industries",

        title: "Industries",

        icon: Building2

    }

];

function Navigation({

    active,

    setActive

}) {

    return (

        <div

            className="
                sticky
                top-8
                rounded-3xl
                border
                border-[var(--border)]
                bg-[var(--card)]
                p-4
            "

        >

            <h3

                className="
                    px-3
                    pb-4
                    text-sm
                    font-semibold
                    uppercase
                    tracking-wider
                    text-[var(--muted)]
                "

            >

                Knowledge Center

            </h3>

            <div className="space-y-2">

                {

                    items.map(item => {

                        const Icon = item.icon;

                        const selected =

                            active === item.id;

                        return (

                            <button

                                key={item.id}

                                onClick={() =>

                                    setActive(

                                        item.id

                                    )

                                }

                                className={`
                                    w-full
                                    flex
                                    items-center
                                    gap-3
                                    rounded-2xl
                                    px-4
                                    py-3
                                    transition-all
                                    duration-200

                                    ${selected

                                        ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg"

                                        : "text-[var(--muted)] hover:bg-white/5 hover:text-white"

                                    }
                                `}

                            >

                                <Icon size={19} />

                                <span>

                                    {item.title}

                                </span>

                            </button>

                        );

                    })

                }

            </div>

        </div>

    );

}

export default Navigation;