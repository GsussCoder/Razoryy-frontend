import { useState } from "react";
import { Loader2, AlertTriangle, TrendingUp, TrendingDown, Minus } from "lucide-react";
import Modal from "../../ui/Modal";

export default function BoxCloseModal({ isOpen, onClose, onConfirm, box }) {
  const [actualCash, setActualCash] = useState("");
  const [closing, setClosing] = useState(false);

  const estimatedCash = box?.estimatedCash ?? 0;
  const digitalTotal = box?.digitalPaymentsTotal ?? 0;

  // Calcular diferencia en tiempo real mientras el usuario escribe
  const actualCashNum = parseFloat(actualCash) || 0;
  const difference = actualCashNum - estimatedCash;
  const hasCashValue = actualCash !== "";

  const getDifferenceConfig = () => {
    if (!hasCashValue) return null;
    if (difference === 0) return { icon: Minus, text: "Cuadre exacto", color: "text-green-400", bg: "bg-green-500/10 border-green-500/20" };
    if (difference > 0)  return { icon: TrendingUp, text: `Sobrante: $${difference.toLocaleString("es-CO")}`, color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" };
    return { icon: TrendingDown, text: `Faltante: $${Math.abs(difference).toLocaleString("es-CO")}`, color: "text-red-400", bg: "bg-red-500/10 border-red-500/20" };
  };

  const diffConfig = getDifferenceConfig();

  const handleConfirm = async () => {
    if (!actualCash) return;
    setClosing(true);
    try {
      await onConfirm(actualCashNum);
      setActualCash("");
      onClose();
    } catch {
      // el toast de error se muestra desde el hook
    } finally {
      setClosing(false);
    }
  };

  const handleClose = () => {
    if (!closing) {
      setActualCash("");
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Cerrar caja del día" size="sm">
      <div className="space-y-4">

        {/* Resumen del día */}
        <div className="bg-slate-900/60 rounded-xl p-4 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
            Resumen del día
          </p>
          <div className="flex justify-between">
            <span className="text-sm text-slate-400">Efectivo estimado</span>
            <span className="text-sm font-medium text-white">
              ${estimatedCash.toLocaleString("es-CO")}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-slate-400">Pagos digitales</span>
            <span className="text-sm font-medium text-indigo-400">
              ${digitalTotal.toLocaleString("es-CO")}
            </span>
          </div>
        </div>

        {/* Input del efectivo real */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1.5">
            Efectivo real contado
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">$</span>
            <input
              type="number"
              min="0"
              value={actualCash}
              onChange={(e) => setActualCash(e.target.value)}
              disabled={closing}
              placeholder="0"
              className="w-full pl-7 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm disabled:opacity-50"
            />
          </div>
        </div>

        {/* Diferencia en tiempo real */}
        {diffConfig && (
          <div className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border ${diffConfig.bg}`}>
            <diffConfig.icon className={`w-4 h-4 shrink-0 ${diffConfig.color}`} />
            <span className={`text-sm font-medium ${diffConfig.color}`}>{diffConfig.text}</span>
          </div>
        )}

        {/* Advertencia si hay faltante */}
        {hasCashValue && difference < 0 && (
          <div className="flex items-start gap-2 text-xs text-amber-400">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span>Hay un faltante en caja. Verifica el conteo antes de cerrar.</span>
          </div>
        )}

        {/* Acciones */}
        <div className="flex flex-col-reverse sm:flex-row gap-2.5 pt-2">
          <button
            type="button"
            onClick={handleClose}
            disabled={closing}
            className="w-full sm:flex-1 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!actualCash || closing}
            className="w-full sm:flex-1 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {closing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Cerrando...
              </>
            ) : (
              "Confirmar cierre"
            )}
          </button>
        </div>

      </div>
    </Modal>
  );
}