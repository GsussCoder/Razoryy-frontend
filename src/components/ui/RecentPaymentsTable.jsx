import DataTable from "./DataTable";

const PAYMENT_METHOD_LABELS = { CASH: "Efectivo", TRANSFER: "Transferencia" };

export default function RecentPaymentsTable({ payments = [], limit = 5 }) {
  const recent = payments.slice(-limit).reverse();

  const columns = [
    {
      header: "Fecha",
      accessor: "createdAt",
      render: (value) =>
        new Date(value).toLocaleString("es-CO", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
    {
      header: "Barbero",
      accessor: "userName",
    },
    {
      header: "Método de Pago",
      accessor: "paymentType",
      render: (value) => PAYMENT_METHOD_LABELS[value] || value,
    },
    {
      header: "Monto Total",
      accessor: "amount",
      render: (value) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
          ${value.toLocaleString("es-CO")}
        </span>
      ),
    },
  ];

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-sm p-4">
      <h3 className="text-sm font-semibold text-slate-300 mb-3">
        Últimos servicios realizados
      </h3>
      <DataTable
        data={recent}
        columns={columns}
        itemsPerPage={limit}
        minWidth={0}
        emptyMessage="Todavía no has registrado ningún corte"
      />
    </div>
  );
}
