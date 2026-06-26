import { createContext, useContext, useState, useEffect } from 'react';

const BrandingContext = createContext(null);

export function BrandingProvider({ children }) {
  const [branding, setBranding] = useState({
    primaryColor: '#4f46e5',
    logo: null,
    barberName: 'BarberPro | System',
  });
  const [tenantId, setTenantId] = useState(null);

  // Cargar branding desde sessionStorage cuando cambia el tenantId
  useEffect(() => {
    if (tenantId) {
      const primaryColor = sessionStorage.getItem(`brand:${tenantId}:primaryColor`) || '#4f46e5';
      const logo = sessionStorage.getItem(`brand:${tenantId}:logo`) || null;
      setBranding((prev) => ({ ...prev, primaryColor, logo }));
    }
  }, [tenantId]);

  const updatePrimaryColor = (color) => {
    setBranding((prev) => ({ ...prev, primaryColor: color }));
    if (tenantId) {
      sessionStorage.setItem(`brand:${tenantId}:primaryColor`, color);
      // TODO: Cuando el backend tenga el campo primaryColor, hacer PATCH aquí
    }
  };

  const uploadLogo = async (file) => {
    if (!tenantId) return;
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        sessionStorage.setItem(`brand:${tenantId}:logo`, reader.result);
        setBranding((prev) => ({ ...prev, logo: reader.result }));
        resolve({ logo: reader.result });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    // TODO: Cuando el backend soporte uploads, reemplazar por POST multipart/form-data
  };

  const deleteLogo = async () => {
    if (!tenantId) return;
    sessionStorage.removeItem(`brand:${tenantId}:logo`);
    setBranding((prev) => ({ ...prev, logo: null }));
    // TODO: Cuando el backend soporte deletes, hacer DELETE aquí
  };

  const setBarberName = (name) => {
    setBranding((prev) => ({ ...prev, barberName: name }));
    // TODO: Persistir en backend cuando exista el campo
  };

  return (
    <BrandingContext.Provider
      value={{
        branding,
        tenantId,
        setTenantId,
        updatePrimaryColor,
        uploadLogo,
        deleteLogo,
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
    throw new Error('useBranding debe usarse dentro de BrandingProvider');
  }
  return context;
}
