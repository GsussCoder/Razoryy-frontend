import DataTable from "../../ui/DataTable";

function formatCurrency(amount) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(amount || 0);
}

export function ExpensesTab({ expenses, isLoading }) {
  const columns = [
    {
      header: "Categoría",
      accessor: "expenseType",
      render: (v) => <span className="text-xs font-medium text-slate-300">{v}</span>,
    },
    {
      header: "Registros",
      accessor: "count",
      render: (v) => (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium border bg-slate-700/60 text-slate-300 border-slate-600">
          {v} registros
        </span>
      ),
    },
    {
      header: "Total Egresos",
      accessor: "total",
      render: (v) => <span className="text-xs font-bold text-red-400">{formatCurrency(v)}</span>,
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <span className="text-xs font-medium px-2.5 py-1 rounded-md border bg-red-500/10 text-red-400 border-red-500/20">
          Total acumulado: {formatCurrency(expenses?.totalExpenses)}
        </span>
      </div>
      <DataTable
        data={expenses?.breakdown ?? []}
        columns={columns}
        isLoading={isLoading}
        itemsPerPage={10}
        emptyMessage="No hay gastos registrados en este rango de fechas"
      />
    </div>
  );
}