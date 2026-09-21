import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import API from "../api/axios";

const AnalyticsContext =
  createContext();

export function AnalyticsProvider({
  children,
}) {

  const [
    transactions,
    setTransactions,
  ] = useState([]);

  const [
    workspaces,
    setWorkspaces,
  ] = useState([]);

  const [
    allTransactions,
    setAllTransactions,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    analytics,
    setAnalytics,
  ] = useState(null);

  const refreshAnalytics = useCallback(
    async () => {

      try {

        setLoading(true);

        const userInfo =
          JSON.parse(
            localStorage.getItem(
              "userInfo"
            )
          );

        const workspace =
          JSON.parse(
            localStorage.getItem(
              "activeWorkspace"
            )
          );

        if (!workspace || !userInfo)
          return;

        const [

          transactionsRes,

          workspacesRes,

          allTransactionsRes,

          analyticsRes,

        ] = await Promise.all([

          API.get(

            `/transactions?workspaceId=${workspace._id}`,

            {

              headers: {

                Authorization:
                  `Bearer ${userInfo.token}`,

              },

            }

          ),

          API.get(

            "/workspaces",

            {

              headers: {

                Authorization:
                  `Bearer ${userInfo.token}`,

              },

            }

          ),

          API.get(

            "/transactions",

            {

              headers: {

                Authorization:
                  `Bearer ${userInfo.token}`,

              },

            }

          ),

          API.get(

            `/analytics/dashboard?workspaceId=${workspace._id}`,

            {

              headers: {

                Authorization:
                  `Bearer ${userInfo.token}`,

              },

            }

          ),

        ]);

        setTransactions(
          transactionsRes.data
        );

        setWorkspaces(
          workspacesRes.data
        );

        setAllTransactions(
          allTransactionsRes.data
        );

        setAnalytics(
          analyticsRes.data.data
        );

      }

      catch (error) {

        console.error(error);

      }

      finally {

        setLoading(false);

      }

    },
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      refreshAnalytics();
    }, 0);

    return () => clearTimeout(timer);
  }, [refreshAnalytics]);

  return (

    <AnalyticsContext.Provider

      value={{

        transactions,

        workspaces,

        allTransactions,

        analytics,

        loading,

        refreshAnalytics,

      }}

    >

      {children}

    </AnalyticsContext.Provider>

  );

}

// eslint-disable-next-line react-refresh/only-export-components
export function useAnalytics() {

  return useContext(
    AnalyticsContext
  );

}