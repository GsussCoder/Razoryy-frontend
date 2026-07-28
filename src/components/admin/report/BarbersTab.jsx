import DataTable from "../../ui/DataTable";

function formatCurrency(amount) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(amount || 0);
}

export function BarbersTab({ barbers, isLoading }) {
  const columns = [
    {
      header: "Barbero",
      accessor: "userName",
      render: (v, row) => {
        const name = v || row.barberName || "Sin asignar";
        return <span className="text-xs font-medium text-white truncate">{name}</span>;
      },
    },
    {
      header: "Servicios",
      accessor: "completedServices",
      render: (v, row) => {
        const count = v ?? row.ticketsCount ?? 0;
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium border bg-blue-500/10 text-blue-400 border-blue-500/20">
            {count} servicios
          </span>
        );
      },
    },
    {
      header: "Comisión / Pago",
      accessor: "payoutAmount",
      render: (v) => <span className="text-xs font-medium text-indigo-400">{formatCurrency(v)}</span>,
    },
    {
      header: "Total Generado",
      accessor: "revenueGenerated",
      render: (v) => <span className="text-xs font-bold text-emerald-400">{formatCurrency(v)}</span>,
    },
  ];

  return (
    <DataTable
      data={barbers?.barbers ?? []}
      columns={columns}
      isLoading={isLoading}
      itemsPerPage={10}
      emptyMessage="No hay métricas de barberos en este rango de fechas"
    />
  );
}