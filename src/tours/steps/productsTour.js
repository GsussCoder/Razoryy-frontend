export function createProductsTour({ isMobile }) {
  const steps = [];

  if (document.querySelector("#panel-products")) {
    steps.push({
      element: "#panel-products",
      popover: {
        title: "📦 Productos",
        // TODO: describe cómo crear/editar/borrar productos.
        description: "Gestiona el inventario de productos que vendes.",
        side: isMobile ? "bottom" : "right",
      },
    });
  }

  return steps;
}
