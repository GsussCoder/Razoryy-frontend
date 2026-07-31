const PREFIX = "tour.";

/**
 * TODO(backend): esto vive hoy en localStorage (se pierde si el usuario
 * cambia de dispositivo/navegador). Cuando el backend tenga un endpoint de
 * onboarding (endpoint propio en tu API), reemplazar
 * isCompleted/complete por llamadas reales y usar esto solo como cache
 * local mientras carga la respuesta del servidor.
 */
export const TourStorage = {
  isCompleted(id) {
    return localStorage.getItem(`${PREFIX}${id}`) === "true";
  },

  complete(id) {
    localStorage.setItem(`${PREFIX}${id}`, "true");
  },

  reset(id) {
    localStorage.removeItem(`${PREFIX}${id}`);
  },

  resetAll() {
    Object.keys(localStorage)
      .filter((key) => key.startsWith(PREFIX))
      .forEach((key) => localStorage.removeItem(key));
  },
};
