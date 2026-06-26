import { useState } from "react";
import { Plus } from "lucide-react";
import { useExpenses } from "../../hooks/useExpenses";
import { useProducts } from "../../hooks/useProducts";
import DataTable from "../ui/DataTable";
import ExpenseFormModal from "../modals/ExpenseFormModal";

const EXPENSE_TYPE_LABELS = {
  SUPPLIES: "Insumos",
  PAYROLL: "Nomina",
};

const PAYMENT_METHOD_LABELS = {
  CASH: "Efectivo",
  TRANSFER: "Transferencia",
  // CARD: "Tarjeta"
};

export default function AdminExpenses() {
  const { data: expenses, isLoading, refetch } = useExpenses();
  const { data: products } = useProducts();
  const [showFormModal, setShowFormModal] = useState(false);

  const columns = [
    {
      header: "Fecha",
      accessor: "expenseDate",
      render: (value) => new Date(value).toLocaleDateString('es-ES')
    },
    {
      header: "Tipo",
      accessor: "expenseType",
      render: (value) => EXPENSE_TYPE_LABELS[value] || value
    },
    {
      header: "Descripción",
      accessor: "description"
    },
    {
      header: "Producto",
      accessor: "product",
      render: (value) => value?.productName || "N/A"
    },
    {
      header: "Método de Pago",
      accessor: "paymentMethod",
      render: (value) => PAYMENT_METHOD_LABELS[value] || value
    },
    {
      header: "Monto",
      accessor: "amount",
      render: (value) => `$${value.toLocaleString()}`
    }
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Gastos</h2>
        <p className="text-slate-400">Registra y consulta los gastos de tu barbería</p>
      </div>

      <div className="space-y-4">
        <DataTable
          data={expenses}
          columns={columns}
          itemsPerPage={6}
          searchable={true}
          searchPlaceholder="Buscar gastos..."
          searchFields={["description", "expenseType", "paymentMethod"]}
          emptyMessage={isLoading ? "Cargando..." : "No hay gastos registrados"}
          actions={
            <button
              onClick={() => setShowFormModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Registrar Gasto
            </button>
          }
        />
      </div>

      <ExpenseFormModal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSuccess={refetch}
        products={products}
      />
    </div>
  );
}
