import { useState } from "react";
import { Loader2, Wallet, AlertTriangle } from "lucide-react";
import Modal from "../ui/Modal";

const PAYMENT_TYPES = [
  { value: "CASH", label: "Efectivo" },
  { value: "NEQUI", label: "Nequi" },
  { value: "DAVIPLATA", label: "Daviplata" },
  { value: "TRANSFER", label: "Transferencia" },
];

export function PayTicketModal({ isOpen, onClose, ticket, openBox, onConfirm }) {
  const [paymentType, setPaymentType] = useState("CASH");
  const [submitting, setSubmitting] = useState(false);

  const handleClose = () => {
    if (!submitting) onClose();
  };

  const handleConfirm = async () => {
    if (!openBox) return;
    setSubmitting(true);
    try {
      await onConfirm(ticket.id, openBox.id, paymentType);
      onClose();
    } catch {
      // el toast de error ya se mostró desde el hook
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Registrar pago" size="sm">
      <div className="space-y-4">
        {ticket && (
          <div className="bg-slate-900/40 border border-slate-700/30 rounded-lg p-3 text-sm">
            <p className="text-slate-400">
              {ticket.barberServiceName} — {ticket.barberName}
            </p>
            <p className="text-lg font-semibold text-emerald-400">
              ${Number(ticket.barberServicePrice).toLocaleString("es-CO")}
            </p>
          </div>
        )}

        {!openBox ? (
          <div className="flex items-start gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-300">
              No hay una caja abierta. Abre una caja en el módulo de Cajas
              antes de registrar el pago.
            </p>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Wallet className="w-3.5 h-3.5" />
                Medio de pago
              </span>
            </label>
            <select
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
              disabled={submitting}
              className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {PAYMENT_TYPES.map((pt) => (
                <option key={pt.value} value={pt.value}>
                  {pt.label}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex flex-col-reverse sm:flex-row gap-2.5 pt-2">
          <button
            type="button"
            onClick={handleClose}
            disabled={submitting}
            className="w-full sm:flex-1 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={submitting || !openBox}
            className="w-full sm:flex-1 py-2.5 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Registrando...
              </>
            ) : (
              "Confirmar pago"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
