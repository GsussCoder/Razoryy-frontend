import { useState } from "react";
import { Plus } from "lucide-react";
import { FEATURES } from "../../config/permissions";
import { usePermissions } from "../../hooks/usePermissions";
import { useBarberServices } from "../../hooks/useBarberServices";
import DataTable from "../ui/DataTable";
import ServiceFormModal from "../modals/ServiceFormModal";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";

export default function AdminServices() {
  const { can } = usePermissions();
  const { data, isLoading, refetch, deleteService } = useBarberServices();
  const [showFormModal, setShowFormModal] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);

  const handleEdit = (service) => {
    setServiceToEdit(service);
    setShowFormModal(true);
  };

  const handleDelete = (service) => {
    setServiceToDelete(service);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (serviceToDelete) {
      await deleteService(serviceToDelete.id);
      setServiceToDelete(null);
    }
  };

  const handleCloseFormModal = () => {
    setShowFormModal(false);
    setServiceToEdit(null);
  };

  const columns = [
    { header: "Servicio", accessor: "nameService" },
    { header: "Descripción", accessor: "description" },
    { 
      header: "Costo", 
      accessor: "price", 
      render: (value) => <span>${value.toLocaleString()}</span>
    },
    {
      header: "Acciones",
      accessor: "id",
      render: (id, row) => (
        <div className="flex gap-2">
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-colors cursor-pointer"
            onClick={() => handleEdit(row)}
          >
            Editar
          </button>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors cursor-pointer"
            onClick={() => handleDelete(row)}
          >
            Borrar
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Servicios</h2>
        <p className="text-slate-400">Administra los servicios de tu barbería</p>
      </div>

      <div className="space-y-4">
        <DataTable
          data={data}
          columns={columns}
          itemsPerPage={6}
          searchable={true}
          searchPlaceholder="Buscar servicios..."
          searchFields={["nameService", "description"]}
          emptyMessage={isLoading ? "Cargando..." : "No hay servicios registrados"}
          actions={
            can(FEATURES.MANAGE_SERVICES) && (
              <button
                onClick={() => setShowFormModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Crear servicio
              </button>
            )
          }
        />
      </div>

      <ServiceFormModal
        isOpen={showFormModal}
        onClose={handleCloseFormModal}
        onSuccess={refetch}
        serviceToEdit={serviceToEdit}
      />

      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setServiceToDelete(null);
        }}
        onConfirm={confirmDelete}
        itemName={serviceToDelete?.nameService}
      />
    </div>
  );
}
