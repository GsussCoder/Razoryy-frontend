import { useState } from "react";
import { Loader2 } from "lucide-react";
import Modal from "../ui/Modal";
import { useRegisterTenant } from "../../hooks/useRegisterTenant";
import { useRegisterEmployee } from "../../hooks/useRegisterEmployee";

const MEMBERSHIP_PLANS = [
  { value: "BASIC", label: "Básico", price: 20000 },
  { value: "STANDARD", label: "Estándar", price: 50000 },
  { value: "PROFESSIONAL", label: "Profesional", price: 100000 },
];

export function TenantFormModal({ isOpen, onClose, onSuccess }) {
  const { register, registering } = useRegisterTenant();
//   const { register: registerAdminTenant } = useRegisterEmployee();
  
  const initialFormState = {
    barberName: "",
    memberShip: "BASIC",
    memberShipPrice: Number(20000),
    // name: "",
    // user: "",
    // password: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register({
        barberName: formData.barberName,
        memberShip: formData.memberShip,
        memberShipPrice: Number(formData.memberShipPrice),
      });

      setFormData(initialFormState);
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error("Error al registrar el tenant:", err);
    }
  };

  const handleClose = () => {
    if (!registering) {
      setFormData(initialFormState);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Registrar Nueva Barbería"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        {/* --- DATOS DE LA BARBERÍA --- */}
        <div className="space-y-4 border-b border-slate-800 pb-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
            Datos del Negocio
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Nombre de la Barbería
            </label>
            <input
              type="text"
              name="barberName"
              value={formData.barberName}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              placeholder="Ej. ClustSol Barber Club"
              required
              disabled={registering}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Plan de Membresía
            </label>
            <select
              name="memberShip"
              value={formData.memberShip}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              disabled={registering}
            >
              {MEMBERSHIP_PLANS.map((plan) => (
                <option key={plan.value} value={plan.value}>
                  {plan.label} (${plan.price.toLocaleString()}/mes)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* --- DATOS DEL ADMINISTRADOR (DUEÑO DEL TENANT) --- */}
        {/* <div className="space-y-4 pt-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
            Cuenta del Administrador
          </h3>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Nombre del Administrador
            </label>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              placeholder="Ej. Carlos Mendoza"
              required
              disabled={registering}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Usuario de Acceso
              </label>
              <input
                type="text"
                name="user"
                value={formData.user}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                placeholder="carlos.mendoza"
                required
                disabled={registering}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                placeholder="••••••••"
                required
                minLength={6}
                disabled={registering}
              />
            </div>
          </div>
        </div> */}

        {/* --- BOTONES DE ACCIÓN --- */}
        {/* flex-col-reverse en mobile coloca Cancelar abajo para mejorar el alcance del pulgar, cambia a fila horizontal en sm */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
          <button
            type="button"
            onClick={handleClose}
            disabled={registering}
            className="w-full sm:flex-1 px-4 py-2.5 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 disabled:opacity-50 text-sm font-medium transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={registering}
            className="w-full sm:flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            {registering ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Registrando...
              </>
            ) : (
              "Registrar Barbería"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}