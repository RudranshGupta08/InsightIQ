import {
  createContext,
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

  const refreshAnalytics =
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

      }

      catch (error) {

        console.error(error);

      }

      finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    refreshAnalytics();

  }, []);

  return (

    <AnalyticsContext.Provider

      value={{

        transactions,

        workspaces,

        allTransactions,

        loading,

        refreshAnalytics,

      }}

    >

      {children}

    </AnalyticsContext.Provider>

  );

}

export function useAnalytics() {

  return useContext(
    AnalyticsContext
  );

}