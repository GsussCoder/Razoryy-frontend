const registry = new Map();

/**
 * Cada panel se registra a sí mismo con `usePageTour(id, createSteps)`.
 * `id` debe coincidir con el nombre de ruta sin la barra inicial
 * (ej. "/employees" -> "employees"), porque TourProvider lo deriva así
 * automáticamente desde `location.pathname`.
 */
export const TourRegistry = {
  register(id, factory, version = 1, page = id) {
    registry.set(id, { factory, version, page });
  },
  unregister(id) {
    registry.delete(id);
  },
  get(id) {
    return registry.get(id)?.factory;
  },
  getVersion(id) {
    return registry.get(id)?.version ?? 1;
  },
  has(id) {
    return registry.has(id);
  },
  /**
   * Devuelve todos los ids registrados que pertenecen a una página,
   * en el orden en que se registraron (el orden en que montaron sus
   * componentes). Incluye el id "principal" de la página si coincide
   * con su propio nombre (comportamiento de siempre).
   */
  getIdsForPage(page) {
    return Array.from(registry.entries())
      .filter(([, entry]) => entry.page === page)
      .map(([id]) => id);
  },
};
