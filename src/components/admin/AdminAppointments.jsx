import { useState } from "react";
import { useAppointments } from "../../hooks/useAppointments";
import DataTable from "../ui/DataTable";

const STATUS_LABELS = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmada",
  COMPLETED: "Completada",
  CANCELLED: "Cancelada",
};

const STATUS_COLORS = {
  PENDING: "bg-yellow-500/20 text-yellow-400",
  CONFIRMED: "bg-blue-500/20 text-blue-400",
  COMPLETED: "bg-green-500/20 text-green-400",
  CANCELLED: "bg-red-500/20 text-red-400",
};

export default function AdminAppointments() {
  const {
    data: appointments,
    isLoading,
    confirmAppointment,
    cancelAppointment,
    completeAppointment,
  } = useAppointments();
  const [actionLoading, setActionLoading] = useState(null);

  const handleConfirm = async (id) => {
    setActionLoading(id);
    try {
      await confirmAppointment(id);
    } catch {
      // el toast de error ya se mostró desde el hook
    }
    setActionLoading(null);
  };

  const handleCancel = async (id) => {
    setActionLoading(id);
    try {
      await confirmAppointment(id);
    } catch {
      // el toast de error ya se mostró desde el hook
    }
    setActionLoading(null);
  };

  const handleComplete = async (id) => {
    setActionLoading(id);
    try {
      await confirmAppointment(id);
    } catch {
      // el toast de error ya se mostró desde el hook
    }
    setActionLoading(null);
  };

  const columns = [
    {
      header: "Cliente",
      accessor: "clientName",
      render: (value, row) => (
        <div>
          <div className="font-medium text-white">{value}</div>
          <div className="text-xs text-slate-400">{row.clientPhone}</div>
        </div>
      ),
    },
    {
      header: "Servicio",
      accessor: "barberService",
      render: (value) => value?.nameService || "N/A",
    },
    {
      header: "Barbero",
      accessor: "user",
      render: (value) => value?.name || "N/A",
    },
    {
      header: "Fecha",
      accessor: "appointmentDate",
      render: (value) => new Date(value).toLocaleDateString("es-ES"),
    },
    {
      header: "Hora",
      accessor: "appointmentTime",
    },
    {
      header: "Estado",
      accessor: "status",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${STATUS_COLORS[value] || "bg-slate-500/20 text-slate-400"}`}
        >
          {STATUS_LABELS[value] || value}
        </span>
      ),
    },
    {
      header: "Acciones",
      accessor: "id",
      render: (id, row) => {
        const isLoading = actionLoading === id;

        return (
          <div className="flex gap-2">
            {row.status === "PENDING" && (
              <>
                <button
                  onClick={() => handleConfirm(id)}
                  disabled={isLoading}
                  className="px-2 py-1 rounded text-xs font-medium bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? "..." : "Confirmar"}
                </button>
                <button
                  onClick={() => handleCancel(id)}
                  disabled={isLoading}
                  className="px-2 py-1 rounded text-xs font-medium bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? "..." : "Cancelar"}
                </button>
              </>
            )}
            {row.status === "CONFIRMED" && (
              <button
                onClick={() => handleComplete(id)}
                disabled={isLoading}
                className="px-2 py-1 rounded text-xs font-medium bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors cursor-pointer disabled:opacity-50"
              >
                {isLoading ? "..." : "Completar"}
              </button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Citas</h2>
        <p className="text-slate-400">Gestiona las citas de tu barbería</p>
      </div>

      <div className="space-y-4">
        <DataTable
          data={appointments}
          columns={columns}
          itemsPerPage={6}
          searchable={true}
          searchPlaceholder="Buscar citas..."
          searchFields={[
            "clientName",
            "barberService.nameService",
            "user.name",
          ]}
          emptyMessage={isLoading ? "Cargando..." : "No hay citas registradas"}
        />
      </div>
    </div>
  );
}
