import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { BrandingProvider } from "./contexts/BrandingContext.jsx";
import { ToastProvider } from "./contexts/ToastContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrandingProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </BrandingProvider>
    </AuthProvider>
  </StrictMode>,
);
