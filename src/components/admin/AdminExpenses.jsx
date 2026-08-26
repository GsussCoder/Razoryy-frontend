import { useState, useMemo } from "react";
import { Plus, Receipt, User } from "lucide-react";
import { useExpenses } from "../../hooks/useExpenses";
import { useEmployees } from "../../hooks/useEmployees";
import DataTable from "../ui/DataTable";
import CreateExpenseModal from "./expense/CreateExpenseModal";
import { usePageTour } from "../../tours/usePageTour";
import { useBreakpoint } from "../../tours/useBreakpoint";
import { createExpensesTour } from "../../tours/steps/expensesTour";
import {
  getGeneralExpenseColumns,
  getSalaryExpenseColumns,
} from "./expense/ExpenseColumns";

export default function ExpensesPage() {
  const [activeTab, setActiveTab] = useState("GENERAL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMobile = useBreakpoint();

  usePageTour("expenses", () => createExpensesTour({ isMobile }));

  const {
    expenses,
    pagination,
    isLoading,
    isCreating,
    error,
    createExpense,
    goToPage,
  } = useExpenses({ activeTab });

  const { refetch: refetchEmployees } = useEmployees();

  const handleCreateExpense = async (expenseData) => {
    try {
      await createExpense(expenseData);

      // Si el gasto registrado fue de nómina, actualizamos saldos de empleados
      if (expenseData.expenseType === "SALARY") {
        await refetchEmployees();
      }
      setIsModalOpen(false);
    } catch {
      // Manejado internamente por el hook con useToast
    }
  };

  const columns = useMemo(() => {
    return activeTab === "SALARY"
      ? getSalaryExpenseColumns()
      : getGeneralExpenseColumns();
  }, [activeTab]);

  return (
    <div id="panel-expenses" className="space-y-4 lg:space-y-6">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Egresos y Salarios</h2>
          <p className="text-slate-400 text-sm">
            Gestión de pagos de nómina de tus empleados y salidas operativas
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer shadow-lg shadow-indigo-600/20"
        >
          <Plus className="w-4 h-4" />
          Registrar Gasto / Pago
        </button>
      </div>

      {/* Pestañas de Filtrado */}
      <div className="flex border-b border-slate-800 gap-6">
        <button
          onClick={() => setActiveTab("GENERAL")}
          className={`pb-3 text-sm font-medium flex items-center gap-2 transition-colors border-b-2 cursor-pointer ${
            activeTab === "GENERAL"
              ? "border-indigo-500 text-indigo-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Receipt className="w-4 h-4" />
          Gastos Operativos
        </button>

        <button
          onClick={() => setActiveTab("SALARY")}
          className={`pb-3 text-sm font-medium flex items-center gap-2 transition-colors border-b-2 cursor-pointer ${
            activeTab === "SALARY"
              ? "border-indigo-500 text-indigo-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <User className="w-4 h-4" />
          Pagos de Salarios / Nómina
        </button>
      </div>

      {/* Alerta de Error */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* Tabla Paginada de Lado del Servidor */}
      <DataTable
        serverSide={true}
        data={expenses}
        columns={columns}
        isLoading={isLoading}
        page={pagination.currentPage + 1}
        totalPage={pagination.totalPages}
        totalElements={pagination.totalElements}
        pageSize={pagination.pageSize}
        hasNext={pagination.hasNext}
        hasPrevious={pagination.hasPrevious}
        onPageChange={(newPage1Based) => {
          goToPage(newPage1Based - 1);
        }}
        emptyMessage={
          isLoading
            ? "Cargando egresos..."
            : activeTab === "SALARY"
              ? "No hay egresos por pagos de salarios registrados."
              : "No hay gastos operacionales registrados."
        }
      />

      {/* Modal de Creación */}
      <CreateExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateExpense}
        isLoading={isCreating}
      />
    </div>
  );
}
