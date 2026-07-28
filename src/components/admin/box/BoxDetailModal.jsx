import { User } from "lucide-react";
import Modal from "../../ui/Modal";

export function BoxDetailModal({ isOpen, onClose, box, fmt, fmtDate, fmtTime, STATUS_CONFIG }) {
  if (!box) return null;
  const cfg = STATUS_CONFIG[box.status] || STATUS_CONFIG.CLOSED;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Detalle de caja" size="md">
      <div className="space-y-4">
        {/* Status + fechas */}
        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
            {cfg.label}
          </span>
          <span className="text-xs text-slate-500">{fmtDate(box.createdAt)}</span>
        </div>

        {/* Responsables */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-900/60 rounded-lg p-3">
            <p className="text-xs text-slate-400 mb-1 flex items-center gap-1">
              <User className="w-3 h-3" /> Abrió
            </p>
            <p className="text-sm font-medium text-white">{box.openedByUser || "—"}</p>
            <p className="text-xs text-slate-500 mt-0.5">{fmtDate(box.openedAt)} - {fmtTime(box.openedAt)}</p>
          </div>
          <div className="bg-slate-900/60 rounded-lg p-3">
            <p className="text-xs text-slate-400 mb-1 flex items-center gap-1">
              <User className="w-3 h-3" /> Cerró
            </p>
            <p className="text-sm font-medium text-white">{box.closedByUser || "—"}</p>
            <p className="text-xs text-slate-500 mt-0.5">{fmtDate(box.closedAt)} - {fmtTime(box.closedAt)}</p>
          </div>
        </div>

        {/* Cifras */}
        <div className="bg-slate-900/60 rounded-xl p-4 space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Resumen financiero</h4>
          <div className="space-y-2">
            {[
              { label: "Efectivo estimado", value: fmt(box.estimatedCash) },
              { label: "Diferencia en efectivo",value: fmt(box.cashDifference), highlight: box.cashDifference < 0 ? "text-red-400" : "text-green-400" },
              { label: "Efectivo real", value: fmt(box.actualCash) },
              { label: "Pagos digitales", value: fmt(box.digitalPaymentsTotal), highlight: "text-indigo-400" },
              { label: "Total", value: fmt(box.estimatedCash + box.digitalPaymentsTotal) },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between">
                <span className="text-sm text-slate-400">{row.label}</span>
                <span className={`text-sm font-semibold ${row.highlight || "text-white"}`}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-sm font-medium transition-colors cursor-pointer"
        >
          Cerrar
        </button>
      </div>
    </Modal>
  );
}