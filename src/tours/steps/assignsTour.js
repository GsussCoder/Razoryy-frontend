/**
 * Compartido por admin y employee (misma ruta /assigns, mismo componente
 * TicketsPage.jsx).
 */
export function createAssignsTour({ role, isMobile }) {
  const steps = [];

  if ((role === "admin") && (document.querySelector("#assign-service-button"))) {
    steps.push({
      element: "#assign-service-button",
      popover: {
        title: "🎯 Asignar servicio",
        description: "Asigna servicios a tus barberos y consulta el historial de servicios.",
        side: isMobile ? "bottom" : "right",
      },
    });
  }

  if (document.querySelector("#filter-assigns-header")) {
    steps.push({
      element: "#filter-assigns-header",
      popover: {
        title: "📄 Registros de servicios",
        description: "Visualiza el historial de los servicios realizados y filtralos por categoria.",
        side: isMobile ? "bottom" : "right",
      },
    });
  }

  if (document.querySelector("#services-stats-bar")) {
    steps.push({
      element: "#services-stats-bar",
      popover: {
        title: "📊 Estadisticas rápidas",
        description: "Resumen rápido de servicios por su estado.",
        side: isMobile ? "bottom" : "right",
      },
    });
  }

  if (document.querySelector("#services-data-table")) {
    steps.push({
      element: "#services-data-table",
      popover: {
        title: "🗄 Historial de servicios",
        description: "Aquí podrás ver el historial de los servicios filtrados por categoria o por su estado, también podrás realizar las acciones que se encuentren disponibles.",
        side: isMobile ? "bottom" : "right",
      },
    });
  }

  return steps;
}
