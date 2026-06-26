import { useState, useMemo } from "react";
import Modal from "../ui/Modal";
import { FEATURES } from "../../config/permissions";
import { usePermissions } from "../../hooks/usePermissions";

export function PaymentFormModal({
  isOpen,
  onClose,
  services,
  appointments,
  createPayment,
}) {
  const { can } = usePermissions();
  const [formData, setFormData] = useState({
    idBarberService: "",
    idAppointment: "",
    paymentType: "CASH",
  });
  const [submitting, setSubmitting] = useState(false);

  // Solo tiene sentido vincular citas que ya fueron confirmadas y están por atenderse
  const confirmedAppointments = useMemo(
    () => (appointments || []).filter((a) => a.status === "CONFIRMED"),
    [appointments],
  );

  const selectedService = services?.find(
    (s) => String(s.id) === String(formData.idBarberService),
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () =>
    setFormData({
      idBarberService: "",
      idAppointment: "",
      paymentType: "CASH",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createPayment({
        idBarberService: Number(formData.idBarberService),
        idAppointment: formData.idAppointment
          ? Number(formData.idAppointment)
          : null,
        paymentType: formData.paymentType,
      });
      resetForm();
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
            Servicio realizado
          </label>
          <select
            name="idBarberService"
            value={formData.idBarberService}
            onChange={handleChange}
            required
            disabled={submitting}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
          >
            <option value="">Selecciona un servicio</option>
            {services?.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nameService} — ${s.price.toLocaleString()}
              </option>
            ))}
          </select>
        </div>

        {selectedService && (
          <p className="text-sm text-slate-400">
            Monto a registrar:{" "}
            <span className="text-white font-medium">
              ${selectedService.price.toLocaleString()}
            </span>
          </p>
        )}

        {can(FEATURES.NAV_APPOINTMENTS) && (
          <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Cita asociada (opcional)
          </label>
          <select
            name="idAppointment"
            value={formData.idAppointment}
            onChange={handleChange}
            disabled={submitting}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
          >
            <option value="">Sin cita asociada</option>
            {confirmedAppointments.map((a) => (
              <option key={a.id} value={a.id}>
                {a.customerName} {a.customerLastname} — {a.appointmentDate}
              </option>
            ))}
          </select>
        </div>
        )}

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
            disabled={submitting || !formData.idBarberService}
            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-50"
          >
            {submitting ? "Registrando..." : "Registrar pago"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
