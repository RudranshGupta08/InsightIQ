import DashboardLayout from "../../layouts/DashboardLayout";

import UploadZone from "./components/UploadZone";
import SupportedFormats from "./components/SupportedFormats";
import RecentImports from "./components/RecentImports";
import ConnectionCards from "./components/ConnectionCards";
import ImportProgress from "./components/ImportProgress";

import { AIResultsPanel } from "./ai-results";

import { useImport } from "../../context/ImportContext";

function DataHub() {

    const {

        loading,

        preview,

    } = useImport();

    return (

        <DashboardLayout>

            <div
                className="
                    mx-auto
                    w-full
                    max-w-7xl
                    space-y-10
                    px-6
                    py-8
                "
            >

                {/* ======================================== */}
                {/* Upload Files */}
                {/* ======================================== */}

                <UploadZone />

                {/* ======================================== */}
                {/* Upload Progress */}
                {/* ======================================== */}

                {

                    loading && (

                        <ImportProgress />

                    )

                }

                {/* ======================================== */}
                {/* AI Business Intelligence Report */}
                {/* ======================================== */}

                {

                    preview && (

                        <AIResultsPanel />

                    )

                }

                {/* ======================================== */}
                {/* Supported Formats */}
                {/* ======================================== */}

                <SupportedFormats />

                {/* ======================================== */}
                {/* Recent Imports */}
                {/* ======================================== */}

                <RecentImports />

                {/* ======================================== */}
                {/* Data Connectors */}
                {/* ======================================== */}

                <ConnectionCards />

            </div>

        </DashboardLayout>

    );

}

export default DataHub;