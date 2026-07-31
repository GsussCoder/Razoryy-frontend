import { SidebarBridge } from "../sidebarBridge";

/**
 * id de registro: "sidebar" (no corresponde a ninguna ruta; TourProvider lo
 * antepone manualmente a la cadena de cada página, ver TourProvider.jsx).
 *
 * Se usa en AppLayout.jsx con:
 *   usePageTour("sidebar", () => createSidebarTour({ role, isMobile }))
 */
export function createSidebarTour({ isMobile }) {
  return [
    {
      element: "#sidebar-navigation",
      popover: {
        title: "🧭 Menú de navegación",
        description:
          "Desde aquí te mueves entre todos los módulos disponibles para tu cuenta.",
        side: isMobile ? "bottom" : "right",
        align: "start",
      },
      onHighlightStarted: () => {
        // En móvil el sidebar es un drawer oculto: lo abrimos para poder
        // resaltarlo, y lo cerramos cuando el tour avanza o termina.
        if (isMobile) SidebarBridge.open();
      },
    },
  ];
}

/**
 * Callback para pasar como `options.onDestroyed` en usePageTour, así el
 * drawer móvil se cierra sin importar cómo termine el tour (Finalizar,
 * Saltar, click en la equis, click fuera del overlay).
 */
export function closeMobileSidebarOnExit(isMobile) {
  if (isMobile) SidebarBridge.close();
}
