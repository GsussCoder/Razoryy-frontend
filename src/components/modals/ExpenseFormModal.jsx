import { useState } from "react";
import Modal from "../ui/Modal";
import { expensesApi } from "../../services/expensesApi";
import { useToast } from "../../contexts/ToastContext";

export default function ExpenseFormModal({ isOpen, onClose, onSuccess, products }) {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    expenseType: "SUPPLIES",
    description: "",
    amount: "",
    paymentMethod: "CASH",
    productId: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await expensesApi.create({
        ...formData,
        amount: parseFloat(formData.amount),
        productId: formData.productId || null
      });
      
      showToast("Gasto registrado exitosamente", "success");
      onSuccess();
      onClose();
      
      setFormData({
        expenseType: "SUPPLIES",
        description: "",
        amount: "",
        paymentMethod: "CASH",
        productId: ""
      });
    } catch (err) {
      showToast("Error al registrar gasto", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Registrar Gasto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Tipo de Gasto
          </label>
          <select
            name="expenseType"
            value={formData.expenseType}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
            required
          >
            <option value="SUPPLIES">Insumos</option>
            <option value="SERVICES">Servicios</option>
            <option value="RENT">Alquiler</option>
            <option value="UTILITIES">Servicios Públicos</option>
            <option value="OTHER">Otros</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Descripción
          </label>
          <input
            placeholder="Compra de cuchillas"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Monto
          </label>
          <input
            type="number"
            placeholder="0"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            step="0.01"
            min="0"
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Método de Pago
          </label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
            required
          >
            <option value="CASH">Efectivo</option>
            <option value="TRANSFER">Transferencia</option>
            <option value="CARD">Tarjeta</option>
          </select>
        </div>

        {formData.expenseType === "SUPPLIES" && (
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Producto (Opcional)
            </label>
            <select
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
            >
              <option value="">Sin producto asociado</option>
              {products?.map(product => (
                <option key={product.id} value={product.id}>
                  {product.productName}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-50"
          >
            {isSubmitting ? "Registrando..." : "Registrar"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
