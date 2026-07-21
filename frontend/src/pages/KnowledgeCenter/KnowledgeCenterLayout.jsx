import { useState } from "react";

import Hero from "./components/Hero";
import Navigation from "./components/Navigation";

import Overview from "./sections/Overview";
import CurrentVersion from "./sections/CurrentVersion";
import Version15 from "./sections/Version15";
import Version20 from "./sections/Version20";
import ReleaseNotes from "./sections/ReleaseNotes";
import FAQ from "./sections/FAQ";
import BestPractices from "./sections/BestPractices";
import Troubleshooting from "./sections/Troubleshooting";
import SupportedIndustries from "./sections/SupportedIndustries";

const sections = {
    overview: <Overview />,
    current: <CurrentVersion />,
    version15: <Version15 />,
    version20: <Version20 />,
    release: <ReleaseNotes />,
    faq: <FAQ />,
    best: <BestPractices />,
    troubleshooting: <Troubleshooting />,
    industries: <SupportedIndustries />
};

function KnowledgeCenterLayout() {
    const [active, setActive] = useState("overview");

    return (
        <div
            className="
                min-h-screen
                bg-[var(--background)]
                text-white
            "
        >
            {/* Hero Section */}

            <Hero />

            {/* Main Layout */}

            <div className="mx-auto max-w-[1600px] px-8 py-8">
                <div
                    className="
                        grid
                        gap-8
                        lg:grid-cols-[280px_minmax(0,1fr)]
                    "
                >
                    {/* Sidebar */}

                    <aside
                        className="
                            lg:sticky
                            lg:top-8
                            h-fit
                        "
                    >
                        <Navigation
                            active={active}
                            setActive={setActive}
                        />
                    </aside>

                    {/* Main Content */}

                    <main
                        className="
                            min-w-0
                            space-y-8
                        "
                    >
                        {sections[active]}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default KnowledgeCenterLayout;