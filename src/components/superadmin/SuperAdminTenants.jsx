import { Loader2, CheckCircle, XCircle } from "lucide-react";
import DataTable from "../ui/DataTable";
import { useTenants } from "../../hooks/useTenants";

const MEMBERSHIP_PLANS = ["PRO", "BUSINESS"];

export default function SuperAdminTenants() {
  const {
    data: tenants,
    isLoading,
    error,
    togglingId,
    changeState,
    changeMembership,
  } = useTenants();

  const columns = [
    { header: "Barberia", accessor: "barberName" },
    {
      header: "Plan",
      accessor: "membership",
      render: (value, row) => (
        <select
          value={value}
          disabled={togglingId === row.id}
          onChange={(e) => changeMembership(row.id, e.target.value)}
          className="bg-slate-900 border border-slate-700 rounded-lg text-xs text-white px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {MEMBERSHIP_PLANS.map((plan) => (
            <option key={plan} value={plan}>
              {plan}
            </option>
          ))}
        </select>
      ),
    },
    {
      header: "Precio",
      accessor: "membershipPrice",
      render: (value) => <span>{value?.toLocaleString()}</span>,
    },
    {
      header: "Estado",
      accessor: "isActive",
      render: (value, row) => (
        <button
          onClick={() => changeState(row.id)}
          disabled={togglingId === row.id}
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
            value
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          } hover:bg-yellow-500/20 hover:text-yellow-400 transition cursor-pointer disabled:opacity-50`}
        >
          {togglingId === row.id ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : value ? (
            <CheckCircle className="w-3 h-3" />
          ) : (
            <XCircle className="w-3 h-3" />
          )}
          {value ? "Activo" : "Inactivo"}
        </button>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Barberías</h2>
          <p className="text-slate-400">
            Gestiona todas las barberías del sistema. Las barberías nuevas se
            registran ellas mismas desde /register — aquí solo administras
            plan y estado.
          </p>
        </div>
      </div>

      {error && <p className="text-sm text-red-400 mb-4">{error}</p>}

      <DataTable
        data={tenants}
        columns={columns}
        itemsPerPage={6}
        searchable={true}
        searchPlaceholder="Buscar barberías..."
        searchFields={["barberName"]}
        emptyMessage={isLoading ? "Cargando..." : "No hay barberías registradas"}
      />
    </div>
  );
}
