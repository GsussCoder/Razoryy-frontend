import { Box, BoxSelect, ChevronRight, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function BoxStatusBanner({ activeBox, onOpen, onClose, navitageToDetails }) {
  const isOpen = !!activeBox;

  if (isOpen) {
    return (
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Indicador pulsante */}
          <div className="relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-60" />
            <span className="relative flex h-9 w-9 rounded-lg bg-indigo-500/20 items-center justify-center">
              <Box className="w-4 h-4 text-indigo-400" />
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white">Caja abierta</p>
            <p className="text-xs text-slate-400 truncate">
              Total caja:{" "}
              <span className="text-indigo-300/60 font-medium">
                ${(activeBox.estimatedCash + activeBox.digitalPaymentsTotal).toLocaleString("es-CO")}
              </span>
            </p>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => onClose(activeBox)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-colors cursor-pointer"
          >
            Cerrar caja
          </button>
          <button
            onClick={() => navitageToDetails()}
            className="p-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors cursor-pointer"
            title="Ver detalle de caja"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 border-dashed p-4 flex flex-col sm:flex-row sm:items-center gap-3">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="h-9 w-9 rounded-lg bg-slate-700 flex items-center justify-center shrink-0">
          <BoxSelect className="w-4 h-4 text-slate-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">
            No hay caja abierta
          </p>
          <p className="text-xs text-slate-400">
            Abre la caja para registrar pagos del día
          </p>
        </div>
      </div>
      <button
        onClick={onOpen}
        className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors shrink-0 cursor-pointer"
      >
        <Plus className="w-3.5 h-3.5" />
        Abrir caja
      </button>
    </div>
  );
}
