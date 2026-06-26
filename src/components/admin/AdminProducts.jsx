import { useState } from "react";
import { Plus } from "lucide-react";
import { FEATURES } from "../../config/permissions";
import { usePermissions } from "../../hooks/usePermissions";
import { useProducts } from "../../hooks/useProducts";
import DataTable from "../ui/DataTable";
import ProductFormModal from "../modals/ProductFormModal";
import ConfirmDeleteModal from "../modals/ConfirmDeleteModal";

export default function AdminProducts() {
  const { can } = usePermissions();
  const { data, isLoading, refetch, deleteProduct } = useProducts();
  const [showFormModal, setShowFormModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleEdit = (product) => {
    setProductToEdit(product);
    setShowFormModal(true);
  };

  const handleDelete = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
  if (serviceToDelete) {
    try {
      await deleteService(serviceToDelete.id);
    } catch {
      // el toast de error ya se mostró desde el hook
    }
    setServiceToDelete(null);
  }
};

  const handleCloseFormModal = () => {
    setShowFormModal(false);
    setProductToEdit(null);
  };

  const columns = [
    { header: "Producto", accessor: "productName" },
    {
      header: "Precio por unidad",
      accessor: "price",
      render: (value) => <span>${value.toLocaleString()}</span>,
    },
    {
      header: "Stock",
      accessor: "stock",
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
        <h2 className="text-2xl font-bold text-white">Productos</h2>
        <p className="text-slate-400">Administra los productos de tu barbería</p>
      </div>

      <div className="space-y-4">
        <DataTable
          data={data}
          columns={columns}
          itemsPerPage={6}
          searchable={true}
          searchPlaceholder="Buscar productos..."
          searchFields={["productName"]}
          emptyMessage={
            isLoading ? "Cargando..." : "No hay productos registrados"
          }
          actions={
            can(FEATURES.MANAGE_PRODUCTS) && (
              <button
                onClick={() => setShowFormModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Crear producto
              </button>
            )
          }
        />
      </div>

      <ProductFormModal
        isOpen={showFormModal}
        onClose={handleCloseFormModal}
        onSuccess={refetch}
        productToEdit={productToEdit}
      />

      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setProductToDelete(null);
        }}
        onConfirm={confirmDelete}
        itemName={productToDelete?.productName}
      />
    </div>
  );
}
