// hooks/useDetectLocation.js
import { useState } from 'react';

export function useDetectLocation() {
  const [detecting, setDetecting] = useState(false);
  const [locationError, setLocationError] = useState(null);

  const detect = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        const err = 'Tu navegador no soporta geolocalización.';
        setLocationError(err);
        reject(err);
        return;
      }

      setDetecting(true);
      setLocationError(null);

      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          try {
            const res = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.latitude}&longitude=${coords.longitude}&localityLanguage=es`
            );
            const data = await res.json();

            resolve({
              country: data.countryName || '',
              state: data.principalSubdivision || '',
              city: data.city || data.locality || '',
            });
          } catch {
            const err = 'No se pudo obtener la ubicación. Complétala manualmente.';
            setLocationError(err);
            reject(err);
          } finally {
            setDetecting(false);
          }
        },
        (geoError) => {
          setDetecting(false);
          const messages = {
            1: 'Permiso de ubicación denegado. Complétala manualmente.',
            2: 'No se pudo determinar tu ubicación.',
            3: 'La solicitud de ubicación tardó demasiado, asegurate de haber concedido los permisos.',
          };
          const err = messages[geoError.code] || 'Error al obtener ubicación.';
          setLocationError(err);
          reject(err);
        },
        { timeout: 10000, maximumAge: 60000 }
      );
    });
  };

  return { detect, detecting, locationError };
}