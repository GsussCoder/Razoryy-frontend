import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, DollarSign, Scissors, Loader2 } from "lucide-react";
import { usePermissions } from "../../hooks/usePermissions";
import { useBarberServices } from "../../hooks/useBarberServices";
import { usePayments } from "../../hooks/usePayments";
import { useAppointments } from "../../hooks/useAppointments";
import { QuickActions } from "../ui/QuickActions";
import RecentPaymentsTable from "../ui/RecentPaymentsTable";
import { FEATURES } from "../../config/permissions";
import { PaymentFormModal } from "../modals/PaymentFormModal";

export default function EmployeeOverview() {
  const navigate = useNavigate();
  const { data: services, isLoading, error } = useBarberServices();
  const { data: payments, createPayment } = usePayments();
  const { data: appointments } = useAppointments();
  const { can } = usePermissions();
  const [showFormModal, setShowFormModal] = useState(false);

  const todayHaircuts = payments.filter((payment) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const paymentDate = new Date(payment.createdAt);
    paymentDate.setHours(0, 0, 0, 0);
    return paymentDate.getTime() === today.getTime();
  });
  const todayIncome = todayHaircuts.reduce((acc, h) => acc + h.amount, 0);
  const todayAppointments = 0;

  const statCards = [
    {
      icon: Calendar,
      label: "Citas hoy",
      value: todayAppointments,
      color: "bg-blue-500",
      feature: FEATURES.NAV_APPOINTMENTS,
    },
    {
      icon: Scissors,
      label: "Cortes realizados",
      value: todayHaircuts.length,
      color: "bg-red-500",
      feature: FEATURES.VIEW_INCOME_STATS,
    },
    {
      icon: DollarSign,
      label: "Ingresos hoy",
      value: `$${todayIncome.toLocaleString()}`,
      color: "bg-green-500",
      feature: FEATURES.VIEW_INCOME_STATS,
    },
    {
      icon: Scissors,
      label: "Servicios activos",
      value: services.length,
      color: "bg-orange-500",
      feature: null,
    }, // 👈 antes apuntaba a un feature inexistente
  ].filter((card) => !card.feature || can(card.feature));

  const quickActions = [
    {
      icon: DollarSign,
      label: "Registrar pago",
      color: "bg-green-600",
      onClick: () => setShowFormModal(true),
      feature: FEATURES.NAV_PAYMENTS,
    },
    {
      icon: Calendar,
      label: "Ver citas",
      color: "bg-blue-600",
      onClick: () => navigate("/agenda"),
      feature: FEATURES.NAV_APPOINTMENTS,
    },
  ].filter((action) => !action.feature || can(action.feature));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 lg:mb-8">
        <h2 className="text-2xl font-bold text-white">Panel de control</h2>
        <p className="text-slate-400">Resumen general y atajos rápidos</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        <div className="order-2 lg:order-1 lg:flex-1 space-y-4 lg:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            {statCards.map((stat, idx) => (
              <div
                key={idx}
                className="bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-sm flex items-center gap-4"
              >
                <div
                  className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center shrink-0`}
                >
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col min-w-0">
                  <p className="text-xs font-medium text-slate-400 truncate">
                    {stat.label}
                  </p>
                  <p className="text-xl font-bold text-white tracking-tight">
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <RecentPaymentsTable payments={payments} limit={5} />
        </div>

        <div className="order-1 lg:order-2 lg:w-64 shrink-0">
          <QuickActions actions={quickActions} />
        </div>
      </div>

      <PaymentFormModal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        services={services}
        appointments={appointments}
        createPayment={createPayment}
      />
    </div>
  );
}
