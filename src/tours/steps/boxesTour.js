export function createBoxesTour({ isMobile }) {
  const steps = [];

  if (document.querySelector("#panel-boxes")) {
    steps.push({
      element: "#panel-boxes",
      popover: {
        title: "🗄️ Cajas diarias",
        // TODO: describe apertura, cierre y arqueo de caja.
        description: "Controla la apertura y cierre de caja, y revisa el historial de cajas.",
        side: isMobile ? "bottom" : "right",
      },
    });
  }

  return steps;
}
