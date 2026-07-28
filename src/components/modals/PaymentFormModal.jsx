import { useState, useMemo, useEffect } from "react";
import { FEATURES } from "../../config/permissions";
import { usePermissions } from "../../hooks/usePermissions";
import { useBoxes } from "../../hooks/boxes/useBoxes";
import Modal from "../ui/Modal";

export function PaymentFormModal({
  isOpen,
  onClose,
  ticketId,
  onSuccess,
  registerPayment,
}) {
  const { can } = usePermissions();
  const { data: boxes } = useBoxes();

  const [formData, setFormData] = useState({
    paymentType: "CASH",
  });
  const [submitting, setSubmitting] = useState(false);

  const currentBox = useMemo(
    () => boxes?.find((box) => box.status === "OPEN") ?? null,
    [boxes],
  );

  useEffect(() => {
    if (isOpen) {
      setFormData({ paymentType: "CASH" });
      setSubmitting(false);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () =>
    setFormData({
      paymentType: "CASH",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await registerPayment(ticketId, {
        boxId: currentBox?.id, // TODO: El backend validará que la caja esté abierta
        paymentType: formData.paymentType,
      });
      resetForm();
      onSuccess?.(); // Refrescar lista de tickets
      onClose();
    } catch {
      // el toast de error ya se mostró desde el hook, el modal se queda abierto
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

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Registrar pago">
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Método de pago
          </label>
          <select
            name="paymentType"
            value={formData.paymentType}
            onChange={handleChange}
            required
            disabled={submitting}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
          >
            <option value="CASH">Efectivo</option>
            <option value="TRANSFER">Transferencia</option>
            <option value="NEQUI">Nequi</option>
            <option value="DAVIPLATA">Daviplata</option>
          </select>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={handleClose}
            disabled={submitting}
            className="flex-1 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500 disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={submitting || !formData.paymentType}
            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-50"
          >
            {submitting ? "Registrando..." : "Registrar pago"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
