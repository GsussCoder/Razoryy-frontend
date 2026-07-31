import { TourRegistry } from "./TourRegistry";
import { TourStorage } from "./storage";

export class TourManager {
  static current = null;

  /**
   * Arranca un tour por id. `runtimeCtx` son datos que solo existen en el
   * momento de arrancar (ej. `onFinish` para encadenar el siguiente tour),
   * separados de los datos propios de la página (role, isMobile), que ya
   * están cerrados en el factory registrado por `usePageTour`.
   */
  static start(id, runtimeCtx = {}) {
    const factory = TourRegistry.get(id);
    if (!factory) return false;

    if (this.current) {
      this.current.destroy();
      this.current = null;
    }

    const driverInstance = factory(runtimeCtx);
    if (!driverInstance) return false;

    this.current = driverInstance;
    driverInstance.drive();
    return true;
  }

  /**
   * Arranca una secuencia de tours en orden. Si uno ya fue completado o no
   * existe, salta al siguiente automáticamente. Cuando el último termina,
   * llama a `onAllFinished` (opcional).
   *
   * Ej: TourManager.startChain(["sidebar", "dashboard"], { role, isMobile })
   */
  static startChain(ids, ctx = {}, onAllFinished) {
    const [id, ...rest] = ids;

    if (!id) {
      onAllFinished?.();
      return;
    }

    if (!TourRegistry.has(id) || TourStorage.isCompleted(id)) {
      this.startChain(rest, ctx, onAllFinished);
      return;
    }

    const started = this.start(id, {
      ...ctx,
      onFinish: () => this.startChain(rest, ctx, onAllFinished),
    });

    // Si por algún motivo el tour no pudo construirse (ej. sin elementos
    // en el DOM), seguimos con el resto de la cadena.
    if (!started) {
      this.startChain(rest, ctx, onAllFinished);
    }
  }

  static stop() {
    if (this.current) {
      this.current.destroy();
      this.current = null;
    }
  }

  static has(id) {
    return TourRegistry.has(id);
  }
}
