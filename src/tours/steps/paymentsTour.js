export function createPaymentsTour({ isMobile }) {
  const steps = [];

  if (document.querySelector("#panel-payments")) {
    steps.push({
      element: "#panel-payments",
      popover: {
        title: "💵 Registro de pagos",
        // TODO: describe filtros, métodos de pago, etc.
        description: "Aquí ves y registras todos los pagos hechos por tu equipo.",
        side: isMobile ? "bottom" : "right",
      },
    });
  }

  return steps;
}
