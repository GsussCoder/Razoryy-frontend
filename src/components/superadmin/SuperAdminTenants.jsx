import { useState, useEffect } from "react";
import { Loader2, Plus, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { apiClient } from "../../services/apiClient";
import { FEATURES } from "../../config/permissions";
import { usePermissions } from "../../hooks/usePermissions";
import DataTable from "../ui/DataTable";
import { useTenants } from "../../hooks/useTenants";
import { TenantFormModal } from "../modals/TenantFormModal";

export default function SuperAdminTenants() {
  const { can } = usePermissions();
  const { refetch, data: tenants, isLoading, error, togglingId } = useTenants();
  const [showNewTenantModal, setShowNewTenantModal] = useState(false);
  const [formData, setFormData] = useState({
    barberName: "",
    membership: "BASIC",
  });
  const [submitting, setSubmitting] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

  const columns = [
    { header: "Barberia", accessor: "barberName" },
    { header: "Plan", accessor: "membership" },
    {
      header: "Precio",
      accessor: "membershipPrice",
      render: (value) => <span>{value.toLocaleString()}</span>,
    },
    {
      header: "Estado",
      accessor: "isActive",
      render: (value, row) => (
        <button
          onClick={() => console.log("Clic")}
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
            value
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          } hover:bg-yellow-500/20 hover:text-yellow-400 transition cursor-pointer`}
        >
          {value ? (
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
            Gestiona todas las barberías del sistema
          </p>
        </div>
      </div>

      <DataTable
        data={tenants}
        columns={columns}
        itemsPerPage={6}
        searchable={true}
        searchPlaceholder="Buscar barberías..."
        searchFields={["barberName"]}
        emptyMessage={isLoading ? "Cargando..." : "No hay empleados registrados"}
        actions={
          can(FEATURES.NAV_TENANTS) && (
            <button
              onClick={() => setShowNewTenantModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Nueva barberia
            </button>
          )
        }
      />

      <TenantFormModal
        isOpen={showNewTenantModal}
        onClose={() => setShowNewTenantModal(false)}
        onSuccess={refetch}
      />
    </div>
  );
}
