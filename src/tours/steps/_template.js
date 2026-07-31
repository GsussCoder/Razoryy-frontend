/**
 * PLANTILLA — copia este archivo para un panel nuevo.
 *
 * Pasos para agregar el tour de un panel:
 *
 * 1. Copia este archivo como `tours/steps/miPanelTour.js` y renombra la
 *    función (ej. `createEmployeesTour`).
 * 2. En el componente de ese panel, agrega un `id="..."` a los bloques que
 *    quieras resaltar (igual que ya tienes `#cash-box-banner`,
 *    `#metrics-summary-grid`, `#quick-actions-panel` en AdminOverview.jsx).
 * 3. En ese mismo componente:
 *
 *      import { usePageTour } from "../../tours/usePageTour";
 *      import { useBreakpoint } from "../../tours/useBreakpoint";
 *      import { createMiPanelTour } from "../../tours/steps/miPanelTour";
 *      import { useAuth } from "../../contexts/AuthContext";
 *
 *      const { user } = useAuth();
 *      const isMobile = useBreakpoint();
 *      usePageTour("mi-panel-id", () =>
 *        createMiPanelTour({ role: user?.role, isMobile }),
 *      );
 *
 *    El primer argumento ("mi-panel-id") DEBE coincidir con el nombre de la
 *    ruta sin "/" (ej. la ruta "/employees" -> id "employees"), porque
 *    TourProvider deriva el id automáticamente desde la URL.
 * 4. Listo — no hace falta tocar TourProvider ni TourManager: apenas el
 *    usuario entre a esa ruta por primera vez, el tour arranca solo.
 */
export function createTemplateTour({ role, isMobile }) {
  const steps = [];

  if (document.querySelector("#TODO-selector")) {
    steps.push({
      element: "#TODO-selector",
      popover: {
        title: "TODO: título del paso",
        description: "TODO: qué hace esta sección / cómo se usa.",
        side: isMobile ? "bottom" : "right",
      },
    });
  }

  return steps;
}
