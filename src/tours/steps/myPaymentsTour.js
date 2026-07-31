export function createMyPaymentsTour({ isMobile }) {
  const steps = [];

  if (document.querySelector("#panel-my-payments")) {
    steps.push({
      element: "#panel-my-payments",
      popover: {
        title: "💵 Mis pagos",
        // TODO: describe cómo registrar un pago y qué muestra el historial.
        description: "Revisa el historial de los pagos que has recibido.",
        side: isMobile ? "bottom" : "right",
      },
    });
  }

  return steps;
}
