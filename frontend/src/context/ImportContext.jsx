import {

    createContext,

    useContext,

    useState,

} from "react";

import API from "../api/axios";

const ImportContext = createContext();

export function ImportProvider({

    children,

}) {

    const [

        files,

        setFiles,

    ] = useState([]);

    const [

        preview,

        setPreview,

    ] = useState(null);

    const [

        mappings,

        setMappings,

    ] = useState([]);

    const [

        history,

        setHistory,

    ] = useState([]);

    const [

        uploadProgress,

        setUploadProgress,

    ] = useState(0);

    const [

        loading,

        setLoading,

    ] = useState(false);

    const [

        error,

        setError,

    ] = useState(null);

    const [

        success,

        setSuccess,

    ] = useState("");

    async function uploadFiles(selectedFiles) {
        console.log("STEP 1");
        try {

            setLoading(true);
            console.log("STEP 2");

            setError(null);

            setSuccess("");

            setUploadProgress(0);

            // Active Workspace
            const workspace = JSON.parse(
                localStorage.getItem("activeWorkspace")
            );
            console.log("STEP 3", workspace);

            if (!workspace?._id) {

                throw new Error(

                    "Please select a workspace first."

                );

            }

            // Logged In User
            const userInfo = JSON.parse(

                localStorage.getItem(

                    "userInfo"

                )

            );
            console.log("STEP 4", userInfo);

            const formData =

                new FormData();

            // Workspace ID
            formData.append(

                "workspaceId",

                workspace._id

            );

            // Files
            [...selectedFiles].forEach(

                file => {

                    formData.append(

                        "files",

                        file

                    );

                }

            );

            console.log("STEP 5");
            const response =

                await API.post(

                    "/import/upload",

                    formData,

                    {

                        headers: {

                            Authorization:

                                `Bearer ${userInfo?.token}`,

                        },

                        onUploadProgress:

                            progress => {

                                const percentage =

                                    Math.round(

                                        (

                                            progress.loaded /

                                            progress.total

                                        ) *

                                        100

                                    );

                                setUploadProgress(

                                    percentage

                                );

                            },

                    }

                );
            console.log("STEP 6");
            console.log(response.data.processedFiles[0]);

            setUploadProgress(100);

            setPreview(

                response.data

            );

            setFiles(

                selectedFiles

            );

            setSuccess(

                "Files uploaded successfully."

            );

        }

        catch (err) {

            console.error(err);

            setError(

                err.response?.data?.message ||

                err.message ||

                "Upload failed."

            );

        }

        finally {

            setLoading(false);

        }

    }

    function resetImport() {

        setFiles([]);

        setPreview(null);

        setMappings([]);

        setUploadProgress(0);

        setError(null);

        setSuccess("");

    }

    return (

        <ImportContext.Provider

            value={{

                files,

                preview,

                mappings,

                history,

                uploadProgress,

                loading,

                error,

                success,

                uploadFiles,

                resetImport,

                setMappings,

                setHistory,

            }}

        >

            {children}

        </ImportContext.Provider>

    );

}

export function useImport() {

    return useContext(

        ImportContext

    );

}