import { usePayments } from "../../hooks/usePayments";
import { useBarberServices } from "../../hooks/useBarberServices";
import { useAppointments } from "../../hooks/useAppointments";
import { usePermissions } from "../../hooks/usePermissions";
import { FEATURES } from "../../config/permissions";
import { Plus } from "lucide-react";
import { useState, useMemo } from "react";
import { PaymentFormModal } from "../modals/PaymentFormModal";
import DataTable from "../ui/DataTable";

const PAYMENT_METHOD_LABELS = {
  CASH: "Efectivo",
  TRANSFER: "Transferencia",
  // CARD: "Tarjeta"
};

export default function AdminPayments() {
  const { can } = usePermissions();
  const { data: payments, isLoading } = usePayments();
  const { data: services } = useBarberServices();
  // const { data: appointments } = useAppointments();
  const [showFormModal, setShowFormModal] = useState(false);

  const sortedPayments = useMemo(() => {
    return [...payments].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });
  }, [payments]);

  const columns = [
    {
      header: "Fecha",
      accessor: "createdAt",
      render: (value) => new Date(value).toLocaleString("es-CO"),
    },
    {
      header: "Barbero",
      accessor: "userName",
    },
    {
      header: "Servicio",
      accessor: "serviceName",
    },
    {
      header: "Cliente",
      accessor: "appointment",
      render: (value) => <span>{value || "N/A"}</span>,
      visible: can(FEATURES.NAV_APPOINTMENTS),
    },
    {
      header: "Método de Pago",
      accessor: "paymentType",
      render: (value) => PAYMENT_METHOD_LABELS[value] || value,
    },
    {
      header: "Monto Total",
      accessor: "amount",
      render: (value) => `$${value.toLocaleString()}`,
    },
    {
      header: "Comisión Empleado",
      accessor: "payoutAmount",
      render: (value) => `$${(value || 0).toLocaleString()}`,
    },
  ];

  const visibleColumns = columns.filter((col) => col.visible !== false);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Registro de pagos</h2>
        <p className="text-slate-400">Historial de pagos y comisiones</p>
      </div>

      <div className="space-y-4">
        <DataTable
          data={sortedPayments}
          columns={visibleColumns}
          itemsPerPage={6}
          searchable={true}
          searchPlaceholder="Buscar pagos..."
          searchFields={["userName", "nameService"]}
          emptyMessage={isLoading ? "Cargando..." : "No hay pagos registrados"}
        />
      </div>
    </div>
  );
}
