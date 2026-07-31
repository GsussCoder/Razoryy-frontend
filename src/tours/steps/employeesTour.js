export function createEmployeesTour({ role, isMobile }) {
  const steps = [];

  if (document.querySelector("#panel-employees")) {
    steps.push({
      element: "#panel-employees",
      popover: {
        title: "👥 Tu equipo",
        // TODO: describe cómo agregar/editar/activar-desactivar barberos.
        description:
          "Agrega barberos, edita sus datos y activa o desactiva su acceso al sistema.",
        side: isMobile ? "bottom" : "right",
      },
    });
  }

  return steps;
}
