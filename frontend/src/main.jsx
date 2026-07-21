import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";

import {
  AuthProvider,
} from "./context/AuthContext";

import { Toaster }
  from "sonner";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <AuthProvider>

      <Toaster
        richColors
        position="top-right"
        toastOptions={{
          style: {
            background: "#18181b",
            color: "#fff",
            border: "1px solid #27272a",
          },
        }}
      />

      <App />

    </AuthProvider>
  </React.StrictMode>
);