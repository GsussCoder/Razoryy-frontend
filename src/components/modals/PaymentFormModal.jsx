import { useState, useMemo, useEffect } from "react";
import { FEATURES } from "../../config/permissions";
import { usePermissions } from "../../hooks/usePermissions";
import { useBoxes } from "../../hooks/boxes/useBoxes";
import Modal from "../ui/Modal";

export function PaymentFormModal({
  isOpen,
  onClose,
  onSuccess,
  createFastTicket,
  services,
  currentBox,
}) {
  const { can } = usePermissions();

  const [formData, setFormData] = useState({
    barberServiceId: "",
    paymentType: "CASH",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        barberServiceId: "",
        paymentType: "CASH",
      });
      setSubmitting(false);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () =>
    setFormData({
      barberServiceId: "",
      paymentType: "CASH",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await createFastTicket(
        currentBox?.id,
        formData.barberServiceId,
        formData.paymentType,
      );
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
            Servicio
          </label>
          <select
            name="barberServiceId"
            value={formData.barberServiceId}
            onChange={handleChange}
            required
            disabled={submitting}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
          >
            <option value="">Selecciona un servicio</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.nameService} - ${service.price.toLocaleString("es-CO")}
              </option>
            ))}
          </select>
        </div>

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
            disabled={
              submitting || !formData.paymentType || !formData.barberServiceId
            }
            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-50"
          >
            {submitting ? "Registrando..." : "Registrar pago"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
