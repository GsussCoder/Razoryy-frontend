import DataTable from "../../ui/DataTable";

function formatCurrency(amount) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(amount || 0);
}

export function RevenueTab({ revenue, isLoading }) {
  const columns = [
    {
      header: "Fecha",
      accessor: "date",
      render: (v) => <span className="text-xs font-medium text-slate-300">{v}</span>,
    },
    {
      header: "Transacciones",
      accessor: "count",
      render: (v) => (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium border bg-slate-700/60 text-slate-300 border-slate-600">
          {v} pagos
        </span>
      ),
    },
    {
      header: "Total Ingresado",
      accessor: "total",
      render: (v) => (
        <span className="text-xs font-bold text-emerald-400">
          {formatCurrency(v)}
        </span>
      ),
    },
  ];

  return (
    <DataTable
      data={revenue?.series ?? []}
      columns={columns}
      isLoading={isLoading}
      itemsPerPage={10}
      emptyMessage="No hay ingresos registrados en este rango de fechas"
    />
  );
}