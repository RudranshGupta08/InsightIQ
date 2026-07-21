import { useRef, useState } from "react";

import {
    UploadCloud,
    FileSpreadsheet,
    FileText,
    FileImage,
    File,
    X,
    Sparkles,
} from "lucide-react";

import { useImport } from "../../../context/ImportContext";

function UploadZone() {

    const {

        uploadFiles,

        loading,

        uploadProgress,

        success,

        error,

    } = useImport();

    const inputRef = useRef(null);

    const [

        selectedFiles,

        setSelectedFiles,

    ] = useState([]);

    const [

        dragging,

        setDragging,

    ] = useState(false);

    function handleFiles(files) {

        const incomingFiles = Array.from(files);

        setSelectedFiles((previous) => [

            ...previous,

            ...incomingFiles,

        ]);

    }

    function removeFile(index) {

        setSelectedFiles(

            selectedFiles.filter(

                (_, i) => i !== index

            )

        );

    }

    function openPicker() {

        inputRef.current.click();

    }

    function handleDrop(event) {

        event.preventDefault();

        setDragging(false);

        handleFiles(

            event.dataTransfer.files

        );

    }

    function getIcon(file) {

        if (

            file.name.endsWith(".xlsx") ||

            file.name.endsWith(".xls")

        ) {

            return (

                <FileSpreadsheet

                    className="text-green-400"

                    size={28}

                />

            );

        }

        if (

            file.name.endsWith(".csv")

        ) {

            return (

                <FileSpreadsheet

                    className="text-emerald-400"

                    size={28}

                />

            );

        }

        if (

            file.name.endsWith(".pdf")

        ) {

            return (

                <FileText

                    className="text-red-400"

                    size={28}

                />

            );

        }

        if (

            file.name.endsWith(".doc") ||

            file.name.endsWith(".docx")

        ) {

            return (

                <FileText

                    className="text-blue-400"

                    size={28}

                />

            );

        }

        if (

            file.type.startsWith("image")

        ) {

            return (

                <FileImage

                    className="text-violet-400"

                    size={28}

                />

            );

        }

        return (

            <File

                className="text-zinc-400"

                size={28}

            />

        );

    }

    return (

        <div

            className="

                bg-zinc-950

                border

                border-zinc-800

                rounded-3xl

                p-8

            "

        >

            <div

                onDrop={handleDrop}

                onDragOver={(event) => {

                    event.preventDefault();

                    setDragging(true);

                }}

                onDragLeave={() =>

                    setDragging(false)

                }

                className={`

                    border-2

                    border-dashed

                    rounded-3xl

                    p-14

                    transition-all

                    duration-300

                    text-center

                    cursor-pointer

                    ${dragging

                        ? "border-violet-500 bg-violet-500/10"

                        : "border-zinc-700"

                    }

                `}

            >

                <UploadCloud

                    size={65}

                    className="

                        mx-auto

                        text-violet-400

                        mb-6

                    "

                />

                <h2

                    className="

                        text-4xl

                        font-bold

                        text-white

                    "

                >

                    Import Your Business

                </h2>

                <p

                    className="

                        mt-5

                        text-zinc-400

                        leading-8

                        max-w-3xl

                        mx-auto

                    "

                >

                    Drop your Excel,

                    CSV,

                    PDF,

                    Word documents,

                    invoices,

                    receipts or financial reports here.

                    <br />

                    InsightIQ AI automatically detects,

                    understands and prepares your

                    business data.

                </p>

                <button

                    type="button"

                    onClick={openPicker}

                    className="

                        mt-8

                        bg-violet-600

                        hover:bg-violet-700

                        transition-all

                        rounded-2xl

                        px-8

                        py-4

                        font-semibold

                        text-white

                    "

                >

                    Browse Files

                </button>

                <input

                    ref={inputRef}

                    type="file"

                    hidden

                    multiple

                    onChange={(event) =>

                        handleFiles(

                            event.target.files

                        )

                    }

                />

            </div>
            {/* Ready To Import */}

            {selectedFiles.length > 0 && (

                <div className="mt-10">

                    <div className="flex items-center justify-between mb-6">

                        <div>

                            <h3 className="text-2xl font-semibold text-white">

                                Ready to Import

                            </h3>

                            <p className="text-zinc-400 mt-2">

                                Review your selected files before sending them to InsightIQ AI.

                            </p>

                        </div>

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                bg-violet-500/10
                                text-violet-400
                                px-4
                                py-2
                                rounded-xl
                            "
                        >

                            <Sparkles size={18} />

                            <span className="font-medium">

                                {selectedFiles.length}

                                {" "}

                                File

                                {selectedFiles.length > 1 ? "s" : ""}

                            </span>

                        </div>

                    </div>

                    <div className="space-y-4">

                        {

                            selectedFiles.map(

                                (file, index) => (

                                    <div

                                        key={index}

                                        className="
                                            flex
                                            items-center
                                            justify-between
                                            bg-zinc-900
                                            border
                                            border-zinc-800
                                            hover:border-violet-600
                                            rounded-2xl
                                            p-5
                                            transition-all
                                        "

                                    >

                                        <div className="flex items-center gap-4">

                                            <div
                                                className="
                                                    w-14
                                                    h-14
                                                    rounded-2xl
                                                    bg-zinc-800
                                                    flex
                                                    items-center
                                                    justify-center
                                                "
                                            >

                                                {

                                                    getIcon(file)

                                                }

                                            </div>

                                            <div>

                                                <h4
                                                    className="
                                                        text-white
                                                        font-semibold
                                                    "
                                                >

                                                    {file.name}

                                                </h4>

                                                <div
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-3
                                                        mt-1
                                                    "
                                                >

                                                    <span
                                                        className="
                                                            text-zinc-500
                                                            text-sm
                                                        "
                                                    >

                                                        {

                                                            (
                                                                file.size /
                                                                1024 /
                                                                1024
                                                            ).toFixed(2)

                                                        }

                                                        {" "}MB

                                                    </span>

                                                    <span
                                                        className="
                                                            text-green-400
                                                            text-xs
                                                            bg-green-500/10
                                                            px-2
                                                            py-1
                                                            rounded-lg
                                                        "
                                                    >

                                                        Ready

                                                    </span>

                                                </div>

                                            </div>

                                        </div>

                                        <button

                                            onClick={() =>

                                                removeFile(index)

                                            }

                                            className="
                                                w-10
                                                h-10
                                                rounded-xl
                                                bg-red-500/10
                                                hover:bg-red-500/20
                                                transition-all
                                                flex
                                                items-center
                                                justify-center
                                            "

                                        >

                                            <X

                                                size={18}

                                                className="text-red-400"

                                            />

                                        </button>

                                    </div>

                                )

                            )

                        }

                    </div>

                </div>

            )}
            {/* Upload Progress */}

            {loading && (

                <div
                    className="
                        mt-10
                        bg-zinc-900
                        border
                        border-zinc-800
                        rounded-2xl
                        p-6
                    "
                >

                    <div className="flex items-center justify-between mb-3">

                        <div>

                            <h4 className="text-white font-semibold">

                                InsightIQ AI is analyzing your files...

                            </h4>

                            <p className="text-zinc-400 text-sm mt-1">

                                Detecting revenue, expenses, invoices, taxes and preparing your business data.

                            </p>

                        </div>

                        <span className="text-violet-400 font-semibold">

                            {uploadProgress}%

                        </span>

                    </div>

                    <div
                        className="
                            w-full
                            h-3
                            bg-zinc-800
                            rounded-full
                            overflow-hidden
                        "
                    >

                        <div
                            className="
                                h-full
                                bg-violet-500
                                transition-all
                                duration-500
                            "
                            style={{

                                width: `${uploadProgress}%`

                            }}
                        />

                    </div>

                </div>

            )}

            {/* Success */}

            {

                success && (

                    <div
                        className="
                            mt-6
                            bg-green-500/10
                            border
                            border-green-500/20
                            rounded-2xl
                            p-5
                        "
                    >

                        <p className="text-green-400 font-medium">

                            ✅ {success}

                        </p>

                    </div>

                )

            }

            {/* Error */}

            {

                error && (

                    <div
                        className="
                            mt-6
                            bg-red-500/10
                            border
                            border-red-500/20
                            rounded-2xl
                            p-5
                        "
                    >

                        <p className="text-red-400 font-medium">

                            {error}

                        </p>

                    </div>

                )

            }

            {/* Upload Button */}

            <div className="mt-10 flex justify-end">

                <button

                    disabled={

                        loading ||

                        selectedFiles.length === 0

                    }

                    onClick={() => {

                        console.log("BUTTON CLICKED");

                        uploadFiles(selectedFiles);

                    }}



                    className="
                        flex
                        items-center
                        gap-3
                        bg-violet-600
                        hover:bg-violet-700
                        disabled:opacity-50
                        disabled:cursor-not-allowed
                        transition-all
                        rounded-2xl
                        px-8
                        py-4
                        text-white
                        font-semibold
                    "

                >

                    <Sparkles size={20} />

                    {

                        loading

                            ? "Analyzing..."

                            : "Analyze Files with AI"

                    }

                </button>

            </div>

        </div>

    );

}

export default UploadZone;