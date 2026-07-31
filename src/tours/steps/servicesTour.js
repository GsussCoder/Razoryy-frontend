export function createServicesTour({ isMobile }) {
  const steps = [];

  if (document.querySelector("#panel-services")) {
    steps.push({
      element: "#panel-services",
      popover: {
        title: "✂️ Servicios",
        // TODO: describe cómo crear/editar/borrar servicios y precios.
        description: "Define los servicios que ofreces y sus precios.",
        side: isMobile ? "bottom" : "right",
      },
    });
  }

  return steps;
}
