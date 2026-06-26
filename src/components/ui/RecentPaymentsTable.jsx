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
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
    { header: "Servicio", accessor: "nameService" },
    {
      header: "Método",
      accessor: "paymentType",
      render: (value) => (
        <span className="text-xs text-slate-400">
          {PAYMENT_METHOD_LABELS[value] || value}
        </span>
      ),
    },
    {
      header: "Monto",
      accessor: "amount",
      render: (value) => (
        <span className="font-medium text-white">
          ${value.toLocaleString()}
        </span>
      ),
    },
  ];

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-sm p-4">
      <h3 className="text-sm font-semibold text-slate-300 mb-3">
        Últimos cortes realizados
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
