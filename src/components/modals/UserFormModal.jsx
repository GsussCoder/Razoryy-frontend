import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import Modal from "../ui/Modal";
import { useRegisterEmployee } from "../../hooks/useRegisterEmployee";
import { useTenants } from "../../hooks/useTenants"; // Asegúrate de tener este import

export function UserFormModal({ isOpen, onClose, onSuccess }) {
  const { register, registering } = useRegisterEmployee();
  const { data: tenants } = useTenants();
  const [formData, setFormData] = useState({
    tenantId: "",
    name: "",
    user: "",
    password: "",
    role: "EMPLOYEE",
    payoutRate: 50,
    isActive: "true",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register({
        tenantId: formData.tenantId,
        name: formData.name,
        user: formData.user,
        password: formData.password,
        role: formData.role,
        payoutRate: Number(formData.payoutRate),
        isActive: formData.isActive === "true",
      });

      setFormData({
        tenantId: "",
        name: "",
        user: "",
        password: "",
        role: "EMPLOYEE",
        payoutRate: 50,
        isActive: "true",
      });
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error("Error al registrar empleado:", err);
    }
  };

  const handleClose = () => {
    if (!registering) {
      setFormData({
        tenantId: "",
        name: "",
        user: "",
        password: "",
        role: "EMPLOYEE",
        payoutRate: 50,
        isActive: "true",
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
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        {/* --- SELECT DE BARBERÍA (TENANT) --- */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Barbería / Sucursal
          </label>
          <select
            name="tenantId"
            value={formData.tenantId}
            onChange={handleChange}
            required
            disabled={registering}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm disabled:opacity-60"
          >
            <option value="">Selecciona una barbería...</option>

            {tenants?.map((tenant) => (
              <option key={tenant.id} value={tenant.id}>
                {tenant.barberName || tenant.name}
              </option>
            ))}
          </select>
        </div>

        {/* --- NOMBRE COMPLETO --- */}
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

        {/* --- GRID RESPONSIVO: USUARIO Y CONTRASEÑA --- */}
        {/* 1 columna en móvil, 2 columnas desde pantallas pequeñas (sm) en adelante */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        </div>

        {/* --- GRID RESPONSIVO: ROL, COMISIÓN Y ESTADO --- */}
        {/* 1 columna en móvil, 3 columnas balanceadas a partir de pantallas 'sm' */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

        {/* --- BOTONES DE ACCIÓN RESPONSIVOS --- */}
        {/* flex-col-reverse apila los botones verticalmente en móviles (Cancelar abajo facilita el click del pulgar) */}
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
