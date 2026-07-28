import { useState } from "react";
import { Loader2, User, Scissors } from "lucide-react";
import Modal from "../ui/Modal";

const INITIAL_STATE = {
  barberName: "",
  userId: "",
  barberServiceId: "",
};

export function TicketFormModal({
  isOpen,
  onClose,
  onSuccess,
  users = [],
  services = [],
  onAssign,
}) {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "userId") {
      const selectedUser = users.find((u) => String(u.id) === value);
      setFormData((prev) => ({
        ...prev,
        userId: value,
        barberName: selectedUser?.name ?? "",
      }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => setFormData(INITIAL_STATE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onAssign(formData.barberName, formData.userId, formData.barberServiceId);
      resetForm();
      onSuccess?.();
      onClose();
    } catch {
      // el toast de error ya se mostró desde el hook
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!submitting) {
      resetForm();
      onClose();
    }
  };

  const activeBarbers = users.filter((u) => u.isActive && u.rol === "EMPLOYEE");

  const selectedService = services.find(
    (s) => String(s.id) === String(formData.barberServiceId),
  );

  const inputClass =
    "w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm disabled:opacity-50 transition-colors";
  const labelClass = "block text-sm font-medium text-slate-300 mb-1.5";

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Asignar servicio a barbero" size="sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              Barbero
            </span>
          </label>
          <select
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
            disabled={submitting}
            className={inputClass}
          >
            <option value="">Selecciona un barbero</option>
            {activeBarbers.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
          {activeBarbers.length === 0 && (
            <p className="text-xs text-amber-400 mt-1.5">
              No hay barberos activos registrados.
            </p>
          )}
        </div>

        <div>
          <label className={labelClass}>
            <span className="flex items-center gap-1.5">
              <Scissors className="w-3.5 h-3.5" />
              Servicio
            </span>
          </label>
          <select
            name="barberServiceId"
            value={formData.barberServiceId}
            onChange={handleChange}
            required
            disabled={submitting}
            className={inputClass}
          >
            <option value="">Selecciona un servicio</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nameService} — ${Number(s.price).toLocaleString("es-CO")}
              </option>
            ))}
          </select>

          {selectedService && (
            <div className="mt-2 flex items-center justify-between px-3 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
              <span className="text-xs text-slate-400">Valor del servicio</span>
              <span className="text-sm font-semibold text-indigo-400">
                ${Number(selectedService.price).toLocaleString("es-CO")}
              </span>
            </div>
          )}
        </div>

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
            type="submit"
            disabled={submitting || !formData.userId || !formData.barberServiceId}
            className="w-full sm:flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Asignando...
              </>
            ) : (
              "Asignar servicio"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
