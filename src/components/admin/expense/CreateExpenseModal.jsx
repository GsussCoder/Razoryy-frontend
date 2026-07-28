import { useState, useMemo } from 'react';
import { Wallet, User, Calculator, AlertTriangle, CheckCircle2 } from 'lucide-react';
import Modal from '../../ui/Modal';
import { useEmployees } from '../../../hooks/useEmployees';

export default function CreateExpenseModal({ isOpen, onClose, onSubmit, isLoading }) {
  const { data: employees } = useEmployees();

  const [formData, setFormData] = useState({
    currentBox: false,
    expenseType: 'SUPPLIES',
    paymentType: 'CASH',
    amount: '',
    description: '',
    barberId: '',
  });

  // Filtrar solo barberos/empleados activos
  const activeBarbers = useMemo(() => {
    return employees.filter((emp) => emp.active !== false);
  }, [employees]);

  // Barbero seleccionado actualmente
  const selectedBarber = useMemo(() => {
    return activeBarbers.find((b) => String(b.id) === String(formData.barberId));
  }, [activeBarbers, formData.barberId]);

  // Cálculo del nuevo balance proyectado del barbero
  const balanceProyection = useMemo(() => {
    if (!selectedBarber || !formData.amount) return null;

    const currentNetPayment = Number(selectedBarber.netPayment || 0);
    const inputAmount = Number(formData.amount || 0);
    const newBalance = currentNetPayment - inputAmount;

    return {
      currentNetPayment,
      inputAmount,
      newBalance,
      isExact: newBalance === 0,
      isDebt: newBalance < 0, // Se le pagó más de lo que acumulaba (Adelanto)
      isPending: newBalance > 0, // Todavía le queda saldo a favor
    };
  }, [selectedBarber, formData.amount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;

    // Validación si es de tipo SALARY
    if (formData.expenseType === 'SALARY' && !formData.barberId) {
      return;
    }

    await onSubmit({
      currentBox: formData.currentBox,
      expenseType: formData.expenseType,
      paymentType: formData.paymentType,
      amount: parseFloat(formData.amount),
      description: formData.description,
      barberId: formData.expenseType === 'SALARY' ? formData.barberId : null,
    });

    // Resetear formulario
    setFormData({
      currentBox: false,
      expenseType: 'SUPPLIES',
      paymentType: 'CASH',
      amount: '',
      description: '',
      barberId: '',
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nuevo Registro de Gasto" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Descripción */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Descripción
          </label>
          <input
            type="text"
            required
            placeholder="Ej: Pago de nómina semana 3, Compra de cuchillas..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>

        {/* Tipo de Gasto */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Categoría del Gasto
          </label>
          <select
            value={formData.expenseType}
            onChange={(e) =>
              setFormData({
                ...formData,
                expenseType: e.target.value,
                barberId: e.target.value === 'SALARY' ? formData.barberId : '',
              })
            }
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          >
            <option value="SUPPLIES">Suministros</option>
            <option value="SALARY">Salario / Pago a Barbero</option>
            <option value="UTILITIES">Servicios Básicos</option>
            <option value="WATER_BILL">Factura del Agua</option>
            <option value="ELECTRICITY_BILL">Factura de Luz</option>
            <option value="SYSTEM_PAYMENT">Pago del Sistema</option>
            <option value="RENT">Renta / Arriendo</option>
          </select>
        </div>

        {/* SELECTOR DE BARBERO (SOLO SI ES SALARY) */}
        {formData.expenseType === 'SALARY' && (
          <div className="p-3 bg-indigo-950/40 border border-indigo-500/30 rounded-xl space-y-3">
            <div>
              <label className="text-xs font-medium text-indigo-200 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-indigo-400" />
                Seleccionar Barbero / Empleado
              </label>
              <select
                required
                value={formData.barberId}
                onChange={(e) => setFormData({ ...formData, barberId: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              >
                <option value="">-- Seleccionar Barbero --</option>
                {activeBarbers.map((barber) => (
                  <option key={barber.id} value={barber.id}>
                    {barber.name} (Acumulado: ${Number(barber.netPayment || 0).toLocaleString('es-CO')})
                  </option>
                ))}
              </select>
            </div>

            {/* VISTA PREVIA DEL CÁLCULO DE PAGO */}
            {balanceProyection && (
              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Pago Acumulado Actual:</span>
                  <span className="font-semibold text-slate-200">
                    ${balanceProyection.currentNetPayment.toLocaleString('es-CO')}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Monto a Entregar:</span>
                  <span className="font-semibold text-red-400">
                    -${balanceProyection.inputAmount.toLocaleString('es-CO')}
                  </span>
                </div>
                <hr className="border-slate-800 my-1" />
                <div className="flex justify-between items-center pt-0.5">
                  <span className="font-medium text-slate-300 flex items-center gap-1">
                    <Calculator className="w-3.5 h-3.5 text-indigo-400" />
                    Nuevo Saldo Restante:
                  </span>
                  <span
                    className={`font-bold text-sm ${
                      balanceProyection.isExact
                        ? 'text-green-400'
                        : balanceProyection.isDebt
                        ? 'text-amber-400'
                        : 'text-indigo-300'
                    }`}
                  >
                    ${balanceProyection.newBalance.toLocaleString('es-CO')}
                  </span>
                </div>

                {/* MENSAJES DE ESTADO */}
                {balanceProyection.isExact && (
                  <p className="text-[11px] text-green-400 flex items-center gap-1 pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Pago exacto. El saldo del barbero quedará en $0.
                  </p>
                )}
                {balanceProyection.isDebt && (
                  <p className="text-[11px] text-amber-400 flex items-center gap-1 pt-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Atención: El monto supera la deuda. El barbero quedará con un adelanto/saldo en contra.
                  </p>
                )}
                {balanceProyection.isPending && (
                  <p className="text-[11px] text-indigo-300 flex items-center gap-1 pt-1">
                    Le seguirá debiendo ${balanceProyection.newBalance.toLocaleString('es-CO')} tras este pago parcial.
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Monto y Método de Pago */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Monto ($)
            </label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Método de Pago
            </label>
            <select
              value={formData.paymentType}
              onChange={(e) => setFormData({ ...formData, paymentType: e.target.value })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            >
              <option value="CASH">Efectivo</option>
              <option value="NEQUI">Nequi</option>
              <option value="DAVIPLATA">Daviplata</option>
              <option value="TRANSFER">Transferencia</option>
            </select>
          </div>
        </div>

        {/* Checkbox para currentBox */}
        <div className="p-3 bg-slate-900/60 border border-slate-700/60 rounded-lg space-y-1.5">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.currentBox}
              onChange={(e) => setFormData({ ...formData, currentBox: e.target.checked })}
              className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-xs font-medium text-slate-200 flex items-center gap-1.5">
              <Wallet className="w-3.5 h-3.5 text-amber-400" />
              Asociar a la caja activa actual
            </span>
          </label>
          <p className="text-[11px] text-slate-400 pl-6">
            Si está marcado, este dinero saldrá directamente del efectivo en caja de hoy.
          </p>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 text-sm transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? 'Guardando...' : 'Registrar Gasto'}
          </button>
        </div>
      </form>
    </Modal>
  );
}