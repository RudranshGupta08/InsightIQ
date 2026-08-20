import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import KnowledgeCenter from "./pages/KnowledgeCenter";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Workspaces from "./pages/workspace/Workspaces";
import Transactions from "./pages/transactions/Transactions";
import Analytics from "./pages/analytics/Analytics";
import DataHub from "./pages/datahub/DataHub";
import Settings from "./pages/settings/Settings";
import ProtectedRoute from "./routes/ProtectedRoute";

import {
  AnalyticsProvider,
} from "./context/AnalyticsContext";

import { ImportProvider } from "./context/ImportContext";

function App() {

  return (

    <AnalyticsProvider>

      <ImportProvider>

        <BrowserRouter>

          <Routes>

            <Route
              path="/"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              }
            />

            <Route
              path="/transactions"
              element={
                <ProtectedRoute>
                  <Transactions />
                </ProtectedRoute>
              }
            />

            <Route
              path="/datahub"
              element={
                <ProtectedRoute>
                  <DataHub />
                </ProtectedRoute>
              }
            />

            <Route
              path="/workspaces"
              element={
                <ProtectedRoute>
                  <Workspaces />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />

            <Route
              path="/knowledge-center"
              element={
                <ProtectedRoute>
                  <KnowledgeCenter />
                </ProtectedRoute>
              }
            />

          </Routes>

        </BrowserRouter>

      </ImportProvider>

    </AnalyticsProvider>

  );

}

export default App;