export function createSettingsTour({ isMobile }) {
  const steps = [];

  if (document.querySelector("#panel-settings")) {
    steps.push({
      element: "#panel-settings",
      popover: {
        title: "⚙️ Configuración",
        // description: "Personaliza el nombre, el logo y el color de tu marca.",
        description: "Personaliza el nombre de tu barbería y observa tu membresia actual.",
        side: isMobile ? "bottom" : "right",
      },
    });
  }

  return steps;
}
