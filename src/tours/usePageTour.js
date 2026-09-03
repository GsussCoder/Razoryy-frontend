import { useEffect, useRef } from "react";
import { driver } from "driver.js";
import { TourRegistry } from "./TourRegistry";
import { TourStorage } from "./storage";

/**
 * Registra el tour de un panel en el TourRegistry.
 *
 * @param {string} id - Debe coincidir con la ruta sin "/" (ej. "employees").
 * @param {() => Array} createSteps - Devuelve el arreglo de steps de driver.js
 *   para el estado ACTUAL de la página (ya resuelto: rol, móvil, si existen
 *   ciertos elementos en el DOM, etc.). Se vuelve a evaluar cada vez que el
 *   tour arranca, no en cada render.
 * @param {object} [options]
 * @param {() => void} [options.onDestroyed] - Se ejecuta además de la lógica
 *   interna (marcar completado + encadenar el siguiente tour). Útil para
 *   limpiar UI propia del panel, ej. cerrar el drawer móvil del sidebar.
 * @param {Array} [options.deps] - Igual que deps de useEffect; solo hace
 *   falta si `id` puede cambiar dinámicamente (normalmente no aplica).
 */
export function usePageTour(id, createSteps, options = {}) {
  const { onDestroyed: extraOnDestroyed, version = 1, page = id, deps = [] } = options;

  const createStepsRef = useRef(createSteps);
  createStepsRef.current = createSteps;
  const extraOnDestroyedRef = useRef(extraOnDestroyed);
  extraOnDestroyedRef.current = extraOnDestroyed;

  useEffect(() => {
    const factory = (runtimeCtx = {}) => {
      const steps = createStepsRef.current();

      if (!steps || steps.length === 0) return null;

      return driver({
        allowClose: true,
        animate: true,
        showProgress: true,
        smoothScroll: true,
        stagePadding: 6,
        popoverClass: "app-tour-popover",
        overlayColor: "rgba(2, 6, 23, 0.75)",
        nextBtnText: "Siguiente",
        prevBtnText: "Atrás",
        doneBtnText: "Finalizar",
        progressText: "{{current}} de {{total}}",
        steps,
        onDestroyed: () => {
          TourStorage.complete(id, version);
          extraOnDestroyedRef.current?.();
          runtimeCtx.onFinish?.();
        },
      });
    };

    TourRegistry.register(id, factory, version, page);
    return () => TourRegistry.unregister(id);
  }, [id, version, page, ...deps]);
}
