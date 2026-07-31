export function createExpensesTour({ isMobile }) {
  const steps = [];

  if (document.querySelector("#panel-expenses")) {
    steps.push({
      element: "#panel-expenses",
      popover: {
        title: "🧾 Gastos",
        // TODO: describe cómo registrar un gasto general vs. un pago de nómina.
        description: "Registra y consulta los gastos generales y de nómina de tu barbería.",
        side: isMobile ? "bottom" : "right",
      },
    });
  }

  return steps;
}
