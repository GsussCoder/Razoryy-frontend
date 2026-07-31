/**
 * id de registro: "dashboard" (coincide con la ruta /dashboard).
 * Se usa en AdminOverview.jsx y EmployeeOverview.jsx con:
 *   usePageTour("dashboard", () => createDashboardTour({ role, isMobile }))
 *
 * Cada bloque valida que el elemento exista en el DOM antes de agregarlo:
 * así el mismo tour sirve para admin y employee aunque no compartan
 * exactamente los mismos widgets (ej. el admin tiene caja registradora,
 * el employee no).
 */
export function createDashboardTour({ role, isMobile }) {
  const steps = [];

  if (
    (role === "admin" || role === "superadmin") &&
    document.querySelector("#cash-box-banner")
  ) {
    steps.push({
      element: "#cash-box-banner",
      popover: {
        title: "💰 Atajo de apertura y cierre de caja",
        description:
          "Abre tu caja del día aquí para habilitar el registro de entradas y salidas de tu local.",
        side: "bottom",
      },
    });
  }

  if ((role === "admin") && document.querySelector("#metrics-summary-grid")) {
    steps.push({
      element: "#metrics-summary-grid",
      popover: {
        title: "📊 Resumen del día",
        description:
          "Aquí ves de un vistazo citas pendientes, cortes realizados, tu equipo activo y ingresos de la caja actual.",
        side: "bottom",
      },
    });
  } else {
    steps.push({
      element: "#metrics-summary-grid",
      popover: {
        title: "📊 Resumen del día",
        description:
          "Aquí ves de un vistazo tus citas pendientes, cortes realizados y tus ingresos del día",
        side: "bottom",
      },
    });
  }

  if (document.querySelector("#quick-actions-panel")) {
    steps.push({
      element: "#quick-actions-panel",
      popover: {
        title: "⚡ Accesos rápidos",
        // TODO: ajustar copy.
        description:
          "Aquí tendrás un atajo a las secciones principales y más usadas del sistema.",
        side: isMobile ? "bottom" : "left",
      },
    });
  }

  // Si ningún elemento existe todavía (ej. la página aún no terminó de
  // montar sus widgets condicionados por permisos), no lanzamos un tour vacío.
  return steps;
}
