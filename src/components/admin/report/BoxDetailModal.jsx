import React from "react";
import { Loader2, AlertCircle, User, DollarSign } from "lucide-react";
import Modal from "../../ui/Modal";

// Funciones de formato movidas aquí para encapsular la lógica de caja
export function formatCurrency(amount) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(amount || 0);
}

export function fmtDateTime(val) {
  if (!val) return "—";
  const date = new Date(val);
  return `${date.toLocaleDateString("es-CO", { day: "2-digit", month: "short" })}, ${date.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })}`;
}

const STATUS_STYLES = {
  OPEN: {
    label: "Abierta",
    classes: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  CLOSED: {
    label: "Cerrada",
    classes: "bg-slate-700/60 text-slate-300 border-slate-600",
  },
  ANNULLED: {
    label: "Anulada",
    classes: "bg-red-500/10 text-red-400 border-red-500/20",
  },
};

export function StatusBadge({ status }) {
  const cfg = STATUS_STYLES[status] || STATUS_STYLES.CLOSED;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${cfg.classes}`}
    >
      {cfg.label}
    </span>
  );
}

export default function BoxDetailsModal({
  isOpen,
  onClose,
  isLoadingBox,
  boxError,
  boxReport,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Detalles de Caja" size="lg">
      {isLoadingBox ? (
        <div className="flex flex-col items-center justify-center py-8 gap-3 text-slate-400">
          <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
          <span className="text-xs font-medium">
            Cargando reporte de caja...
          </span>
        </div>
      ) : boxError ? (
        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {boxError}
        </div>
      ) : boxReport ? (
        <div className="space-y-4 text-xs">
          {/* Header / Estado de la caja */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-700">
            <div>
              <span className="text-[10px] font-semibold uppercase text-slate-400">
                Apertura
              </span>
              <p className="text-xs text-slate-200 font-medium">
                {fmtDateTime(boxReport.openedAt)}
              </p>
            </div>
            <StatusBadge status={boxReport.status} />
          </div>

          {/* Usuarios involucrados */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/60">
              <p className="text-slate-400 text-[10px] uppercase font-semibold mb-1 flex items-center gap-1">
                <User className="w-3 h-3 text-indigo-400" /> Abrió
              </p>
              <p className="text-xs font-medium text-white">
                {boxReport.openedByUserName || boxReport.openedByUser || "—"}
              </p>
            </div>
            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/60">
              <p className="text-slate-400 text-[10px] uppercase font-semibold mb-1 flex items-center gap-1">
                <User className="w-3 h-3 text-indigo-400" /> Cerró
              </p>
              <p className="text-xs font-medium text-white">
                {boxReport.closedByUserName || boxReport.closedByUser || "—"}
              </p>
            </div>
          </div>

          {/* Resumen Financiero */}
          <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-700/60 space-y-2">
            <p className="text-[10px] uppercase font-semibold text-slate-400 flex items-center gap-1 mb-2">
              <DollarSign className="w-3 h-3 text-indigo-400" /> Resumen
              Operativo
            </p>

            {[
              {
                label: "Efectivo estimado",
                value: formatCurrency(boxReport.estimatedCash),
              },
              {
                label: "Efectivo real",
                value:
                  boxReport.actualCash !== null
                    ? formatCurrency(boxReport.actualCash)
                    : "Sin registrar",
              },
              {
                label: "Diferencia / Descuadre",
                value: formatCurrency(boxReport.cashDifference),
                color:
                  (boxReport.cashDifference || 0) < 0
                    ? "text-red-400"
                    : "text-emerald-400",
              },
              {
                label: "Pagos digitales",
                value: formatCurrency(boxReport.digitalPaymentsTotal),
                color: "text-indigo-400",
              },
              {
                label: "Gastos de caja",
                value: formatCurrency(boxReport.totalExpenses),
                color: "text-red-400",
              },
              {
                label: "Servicios cobrados",
                value: `${boxReport.totalTickets || 0} servicios`,
              },
            ].map((row) => (
              <div
                key={row.label}
                className="flex justify-between items-center py-1 border-b border-slate-800/60 last:border-0"
              >
                <span className="text-slate-400">{row.label}</span>
                <span className={`font-semibold ${row.color || "text-white"}`}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          {/* Transacciones por Medio de Pago */}
          {boxReport.paymentBreakdown?.length > 0 && (
            <div className="space-y-2">
              <p className="text-[10px] uppercase font-semibold text-slate-400">
                Desglose por medio de pago
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {boxReport.paymentBreakdown.map((item) => (
                  <div
                    key={item.paymentType}
                    className="bg-slate-900/40 p-2.5 rounded-xl border border-slate-700/40 flex justify-between items-center"
                  >
                    <div>
                      <p className="text-xs font-semibold text-white">
                        {item.paymentType}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        {item.count} transacciones
                      </p>
                    </div>
                    <p className="text-xs font-bold text-emerald-400">
                      {formatCurrency(item.total)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </Modal>
  );
}
