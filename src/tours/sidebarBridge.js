/**
 * El sidebar es un drawer oculto en móvil (ver AppLayout.jsx: `sidebarOpen`).
 * Un paso del tour que resalta el menú necesita poder abrirlo/cerrarlo sin
 * acoplar AppLayout al motor de tours. AppLayout se "registra" aquí una vez
 * al montar, y cualquier módulo de tour puede pedir abrir/cerrar el drawer.
 *
 * Si AppLayout no se ha montado todavía (o el tour corre en un contexto sin
 * drawer, ej. desktop), open()/close() simplemente no hacen nada.
 */
let openImpl = () => {};
let closeImpl = () => {};

export const SidebarBridge = {
  register(open, close) {
    openImpl = open || (() => {});
    closeImpl = close || (() => {});
  },
  unregister() {
    openImpl = () => {};
    closeImpl = () => {};
  },
  open() {
    openImpl();
  },
  close() {
    closeImpl();
  },
};
