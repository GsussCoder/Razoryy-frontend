export function createReportsTour({ isMobile }) {
  const steps = [];

  if (document.querySelector("#panel-reports")) {
    steps.push({
      element: "#panel-reports",
      popover: {
        title: "📈 Reportes",
        description:
          "Consulta ingresos diarios, gastos por categoría, rendimiento de barberos y arqueos de caja.",
        side: isMobile ? "bottom" : "right",
      },
    });
  }

  if (document.querySelector("#data-filter-date-range")) {
    steps.push({
      element: "#data-filter-date-range",
      popover: {
        title: "📅 Filtra reportes por rango de fechas",
        description:
          "Selecciona las fechas de inicio y fin para obtener reportes dentro de ese lapso de tiempo.",
        side: isMobile ? "bottom" : "right",
      },
    });
  }

  if (document.querySelector("#kpi-reports-cards")) {
    steps.push({
      element: "#kpi-reports-cards",
      popover: {
        title: "📊 Desempeño del negocio",
        description:
          "Observa los ingresos, egresos y ganancias dentro de las fechas seleccionadas.",
        side: isMobile ? "bottom" : "right",
      },
    });
  }

  if (document.querySelector("#reports-by-operations")) {
    steps.push({
      element: "#reports-by-operations",
      popover: {
        title: "💈 Reportes por operaciones",
        description:
          "Mira los reportes de las operaciones principales establecidas por el rango de fechas.",
        side: isMobile ? "bottom" : "right",
      },
    });
  }

  return steps;
}
