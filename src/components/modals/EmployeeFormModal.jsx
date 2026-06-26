import { useState } from "react";
import { Loader2 } from "lucide-react";
import { authApi } from "../../services/authApi";
import { useRegisterEmployee } from "../../hooks/useRegisterEmployee";
import Modal from "../ui/Modal";

export function EmployeeFormModal({ isOpen, onClose, onSuccess }) {
  const { register, registering } = useRegisterEmployee();
  const [formData, setFormData] = useState({
    // tenantId: null,
    name: "",
    user: "",
    password: "",
    role: "EMPLOYEE",
    payoutRate: 50,
    isActive: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register({
        // tenantId: formData.tenantId,
        name: formData.name,
        user: formData.user,
        password: formData.password,
        role: formData.role,
        payoutRate: Number(formData.payoutRate),
        isActive: Boolean(formData.isActive),
      });

      setFormData({
        name: "",
        user: "",
        password: "",
        role: "EMPLOYEE",
        payoutRate: 50,
        isActive: true,
      });

      onSuccess?.();
      onClose();
    } catch (err) {
      // el modal se queda abierto mostrando el error
      console.log(err);
    }
  };

  const handleClose = () => {
    if (!registering) {
      setFormData({
        name: "",
        user: "",
        password: "",
        role: "EMPLOYEE",
        payoutRate: 50,
        isActive: true,
      });
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Nuevo empleado"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Nombre completo
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            placeholder="Juan Pérez"
            required
            disabled={registering}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Usuario
          </label>
          <input
            type="text"
            name="user"
            value={formData.user}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            placeholder="juan.perez"
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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Rol
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              disabled={registering}
            >
              <option value="EMPLOYEE">Empleado</option>
              <option value="ADMIN">Administrador</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Comisión (%)
            </label>
            <input
              type="number"
              name="payoutRate"
              value={formData.payoutRate}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              min="0"
              max="100"
              required
              disabled={registering}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Estado
            </label>
            <select
              name="isActive"
              value={formData.isActive}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              disabled={registering}
            >
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={handleClose}
            disabled={registering}
            className="flex-1 px-4 py-2 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 disabled:opacity-50 text-sm font-medium transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={registering}
            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            {registering ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creando...
              </>
            ) : (
              "Crear empleado"
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
