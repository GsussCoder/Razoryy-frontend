import { usePayments } from "../../hooks/usePayments";
import { useBarberServices } from "../../hooks/useBarberServices";
import { useAppointments } from "../../hooks/useAppointments";
import { usePermissions } from "../../hooks/usePermissions";
import { FEATURES } from "../../config/permissions";
import { Plus } from "lucide-react";
import { useState, useMemo } from "react";
import { PaymentFormModal } from "../modals/PaymentFormModal";
import DataTable from "../ui/DataTable";
import { usePageTour } from "../../tours/usePageTour";
import { useBreakpoint } from "../../tours/useBreakpoint";
import { createPaymentsTour } from "../../tours/steps/paymentsTour";

const PAYMENT_METHOD_LABELS = {
  CASH: "Efectivo",
  TRANSFER: "Transferencia",
  NEQUI: "Nequi",
  DAVIPLATA: "Daviplata",
};

export default function AdminPayments() {
  const { can } = usePermissions();
  const { data: payments, isLoading } = usePayments();
  const { data: services } = useBarberServices();
  // const { data: appointments } = useAppointments();
  const [showFormModal, setShowFormModal] = useState(false);
  const isMobile = useBreakpoint();

  usePageTour("payments", () => createPaymentsTour({ isMobile }));

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
      header: "Empleado",
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
    {
      header: "Comisión Empleado",
      accessor: "payoutAmount",
      render: (value) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
          ${value.toLocaleString("es-CO")}
        </span>
      ),
    },
  ];

  const visibleColumns = columns.filter((col) => col.visible !== false);

  return (
    <div id="panel-payments">
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
          searchFields={["userName", "createdAt"]}
          emptyMessage={isLoading ? "Cargando..." : "No hay pagos registrados"}
        />
      </div>
    </div>
  );
}
