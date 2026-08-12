import { createContext, useContext, useState, useEffect } from "react";
import { tenantsApi } from "../services/tenantsApi";
import { useAuth } from "./AuthContext";

const BrandingContext = createContext(null);

export function BrandingProvider({ children }) {
  const { user } = useAuth();
  const [primaryColor, setPrimaryColor] = useState("#4f46e5");
  const [tenantId, setTenantId] = useState(null);
  const branding = {
    primaryColor,
    logo: user?.barbershopLogo || null,
    barberName: user?.barberName || "Razoryy",
  };

  useEffect(() => {
    if (tenantId) {
      const primaryColor =
        sessionStorage.getItem(`brand:${tenantId}:primaryColor`) || "#4f46e5";
      const logo = sessionStorage.getItem(`brand:logo`) || null;
      setBranding((prev) => ({ ...prev, primaryColor, logo }));
    }
  }, [tenantId]);

  const updatePrimaryColor = (color) => {
    setPrimaryColor(color);
    if (tenantId) {
      sessionStorage.setItem(`brand:primaryColor`, color);
    }
  };

  const uploadLogo = async (file) => {
    const response = await tenantsApi.uploadLogo(file);

    sessionStorage.setItem(`brand:logo`, response);
  };

  const setBarberName = (name) => {
    // setBranding((prev) => ({ ...prev, barberName: name }));
  };

  return (
    <BrandingContext.Provider
      value={{
        branding,
        tenantId,
        setTenantId,
        updatePrimaryColor,
        uploadLogo,
        setBarberName,
      }}
    >
      {children}
    </BrandingContext.Provider>
  );
}

export function useBranding() {
  const context = useContext(BrandingContext);
  if (!context) {
    throw new Error("useBranding debe usarse dentro de BrandingProvider");
  }
  return context;
}
