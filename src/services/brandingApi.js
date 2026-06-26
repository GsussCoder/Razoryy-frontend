/**
 * Servicio de branding para personalización de marca del tenant.
 * TODO: Cuando el backend tenga los campos primaryColor y logoUrl en Tenant,
 * reemplazar la implementación local por llamadas PATCH/POST reales.
 */

const STORAGE_PREFIX = 'brand';

export const brandingApi = {
  getBranding: (tenantId) => {
    const primaryColor = sessionStorage.getItem(`${STORAGE_PREFIX}:${tenantId}:primaryColor`) || '#4f46e5';
    const logo = sessionStorage.getItem(`${STORAGE_PREFIX}:${tenantId}:logo`) || null;
    return { primaryColor, logo };
  },

  savePrimaryColor: (tenantId, color) => {
    sessionStorage.setItem(`${STORAGE_PREFIX}:${tenantId}:primaryColor`, color);
    return Promise.resolve({ primaryColor: color });
  },

  uploadLogo: (tenantId, file) => {
    // TODO: Reemplazar por POST multipart/form-data cuando el backend lo soporte
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        sessionStorage.setItem(`${STORAGE_PREFIX}:${tenantId}:logo`, reader.result);
        resolve({ logo: reader.result });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },

  deleteLogo: (tenantId) => {
    sessionStorage.removeItem(`${STORAGE_PREFIX}:${tenantId}:logo`);
    return Promise.resolve();
  },
};
