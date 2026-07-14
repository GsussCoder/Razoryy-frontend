import { useEffect, useState, useContext } from "react";
import { AlertCircle, Plus } from "lucide-react";
import { FEATURES } from "../../config/permissions";
import { usePermissions } from "../../hooks/usePermissions";
import { useEmployees } from "../../hooks/useEmployees";
import { AuthContext } from "../../contexts/AuthContext";
import DataTable from "../ui/DataTable";
import { EmployeeFormModal } from "../modals/EmployeeFormModal";

export default function AdminEmployees() {
  const { can } = usePermissions();
  const { user } = useContext(AuthContext);
  const { refetch, changeState, data, isLoading, error, togglingId } =
    useEmployees();
  const [showFormModal, setShowFormModal] = useState(false);
  // const [buttonStateActive, setButtonStateActive] = useState(false);

  const columns = [
    { header: "Nombre", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Número", accessor: "number" },
    {
      header: "Cargo",
      accessor: "rol",
      render: (value) =>
        value === "employee" ? (
          <span>Barbero</span>
        ) : (
          <span>{value[0].toUpperCase() + value.slice(1).toLowerCase()}</span>
        ),
    },
    {
      header: "Comisión",
      accessor: "payoutRate",
      render: (value) => <span>{value}%</span>,
    },
    {
      header: "Estado",
      accessor: "isActive",
      render: (value, row) => (
        <button
          disabled={row.id === user.id ? true : false}
          onClick={() => changeState(row.id)}
          className={`px-2 py-1 rounded text-xs font-medium ${
            row.id === user.id
              ? "bg-green-500/10 text-green-400/50 cursor-not-allowed"
              : `cursor-pointer ${
                  value === true
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                } hover:bg-yellow-500/20 hover:text-yellow-400 transition`
          }`}
        >
          {togglingId === row.id ? "..." : value ? "Activo" : "inactivo"}
        </button>
      ),
    },
    // {
    //   header: "Acciones",
    //   accessor: "id",
    //   render: () => (
    //     <div className="flex gap-2">
    //       <button
    //         className="px-2 py-1 rounded font-bold bg-yellow-500 cursor-pointer hover:bg-yellow-500/60 hover:text-slate-300 transition"
    //         onClick={() => console.log("Clic editar")}
    //       >
    //         Editar
    //       </button>
    //       <button
    //         className="px-2 py-1 rounded font-bold bg-red-500 cursor-pointer hover:bg-red-500/60 hover:text-slate-300 transition"
    //         onClick={() => console.log("Clic borrar")}
    //       >
    //         Borrar
    //       </button>
    //     </div>
    //   ),
    // },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Barberos</h2>
        <p className="text-slate-400">Gestiona el personal de tu barbería</p>
      </div>

      <div className="space-y-4">
        <DataTable
          data={data}
          columns={columns}
          itemsPerPage={6}
          searchable={true}
          searchPlaceholder="Buscar barbero..."
          searchFields={["name", "user", "rol"]}
          emptyMessage={
            isLoading ? "Cargando..." : "No hay empleados registrados"
          }
          actions={
            can(FEATURES.MANAGE_EMPLOYEES) && (
              <button
                onClick={() => setShowFormModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Nuevo barbero
              </button>
            )
          }
        />
      </div>

      <EmployeeFormModal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        onSuccess={refetch}
      />
    </div>
  );
}
