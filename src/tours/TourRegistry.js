const registry = new Map();

/**
 * Cada panel se registra a sí mismo con `usePageTour(id, createSteps)`.
 * `id` debe coincidir con el nombre de ruta sin la barra inicial
 * (ej. "/employees" -> "employees"), porque TourProvider lo deriva así
 * automáticamente desde `location.pathname`.
 */
export const TourRegistry = {
  register(id, factory) {
    registry.set(id, factory);
  },
  unregister(id) {
    registry.delete(id);
  },
  get(id) {
    return registry.get(id);
  },
  has(id) {
    return registry.has(id);
  },
};
