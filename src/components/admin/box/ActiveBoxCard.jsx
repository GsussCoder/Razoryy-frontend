import { ChevronRight, XCircle } from "lucide-react";

export function ActiveBoxCard({ box, onViewDetails, onClose, fmt, fmtDate, fmtTime, }) {
  if (!box) return null;

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 lg:p-5 mb-6">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5 shrink-0 mt-0.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
          </span>
          <span className="text-sm font-semibold text-green-400">
            Caja abierta ahora
          </span>
        </div>
        <span className="text-xs text-slate-500">
          {fmtDate(box.openedAt)} — {fmtTime(box.openedAt)}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
        <div className="bg-slate-900/60 rounded-lg p-3">
          <p className="text-xs text-slate-400 mb-1">Total ingresos</p>
          <p className="text-lg font-bold text-white">
            {fmt(box.digitalPaymentsTotal)}
          </p>
        </div>
        <div className="bg-slate-900/60 rounded-lg p-3">
          <p className="text-xs text-slate-400 mb-1">Abierta por</p>
          <p className="text-sm font-semibold text-white truncate">
            {box.openedByUser}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <button
          onClick={() => onViewDetails(box)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-sm font-medium transition-colors cursor-pointer"
        >
          Ver detalles
          <ChevronRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => onClose(box)}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-colors cursor-pointer"
        >
          <XCircle className="w-4 h-4" />
          Cerrar caja
        </button>
      </div>
    </div>
  );
}
