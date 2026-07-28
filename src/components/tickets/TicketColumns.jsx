import { UserCheck, Calendar, ShoppingBag, Clock } from "lucide-react";

const TICKET_TYPE_CONFIG = {
  WALK_IN: { label: "Directo", icon: UserCheck, classes: "bg-slate-700/60 text-slate-300 border-slate-600" },
  APPOINTMENT: { label: "Reserva", icon: Calendar, classes: "bg-purple-500/10 text-purple-300 border-purple-500/20" },
  PRODUCT: { label: "Producto", icon: ShoppingBag, classes: "bg-amber-500/10 text-amber-300 border-amber-500/20" },
};

const STATUS_CONFIG = {
  ASSIGNED: { label: "En proceso", classes: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  COMPLETED: { label: "Por cobrar", classes: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" },
  PAID: { label: "Pagado", classes: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  CANCELLED: { label: "Cancelado", classes: "bg-red-500/10 text-red-400 border-red-500/20" },
};

function TypeBadge({ type }) {
  const cfg = TICKET_TYPE_CONFIG[type] || TICKET_TYPE_CONFIG.WALK_IN;
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${cfg.classes}`}>
      <Icon className="w-3.5 h-3.5" />
      {cfg.label}
    </span>
  );
}

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.ASSIGNED;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${cfg.classes}`}>
      {cfg.label}
    </span>
  );
}

export const getTicketColumns = ({ role = "ADMIN", mutatingId, onComplete, onCancel, onPay }) => [
  {
    header: "Origen / Tipo",
    accessor: "ticketType",
    render: (v) => <TypeBadge type={v} />,
  },
  {
    header: "Estado",
    accessor: "serviceStatus",
    render: (v) => <StatusBadge status={v} />,
  },
  {
    header: "Atendido por",
    accessor: "barberName",
    render: (name, row) => (
      <div className="flex flex-col min-w-0">
        <span className="text-xs font-medium text-white truncate">{name || "Sin asignar"}</span>
      </div>
    ),
  },
  {
    header: "Servicio / Ítem",
    accessor: "barberServiceName",
    render: (v, row) => (
      <span className="text-xs font-medium text-slate-300">
        {v || (row.ticketType === "PRODUCT" ? "Venta de producto" : "Servicio de barbería")}
      </span>
    ),
  },
  {
    header: "Precio",
    accessor: "barberServicePrice",
    render: (price) => (
      <span className="text-xs font-bold text-white">
        ${Number(price || 0).toLocaleString("es-CO")}
      </span>
    ),
  },
  {
  header: "Fecha / Hora",
  accessor: "createdAt",
  render: (_, row) => {
    const dateValue = row.effectiveDate || row.createdAt;

    if (!dateValue) return <span className="text-slate-500 text-xs">—</span>;

    const date = new Date(dateValue);
    const isAppointment = row.ticketType === "APPOINTMENT";

    return (
      <div className="flex flex-col text-xs">
        <div className="flex items-center gap-1.5 text-slate-300 font-medium">
          <Clock className={`w-3.5 h-3.5 shrink-0 ${isAppointment ? "text-purple-400" : "text-slate-500"}`} />
          <span>
            {date.toLocaleDateString("es-CO", { day: "2-digit", month: "short" })},{" "}
            <span className="text-white font-semibold">
              {date.toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" })}
            </span>
          </span>
        </div>
        {isAppointment && (
          <span className="text-[10px] text-purple-400/80 font-medium ml-5">
            Cita agendada
          </span>
        )}
      </div>
    );
  },
},
  {
    header: "Acciones",
    accessor: "id",
    render: (id, row) => {
      const isUpdating = mutatingId === id;
      const isEmployee = role === "EMPLOYEE";

      if (row.serviceStatus === "ASSIGNED") {
        return (
          <div className="flex gap-1.5">
            <button
              disabled={isUpdating}
              onClick={() => onComplete(id)}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 hover:bg-yellow-500/20 transition-colors cursor-pointer disabled:opacity-50"
            >
              Terminar
            </button>
            <button
              disabled={isUpdating}
              onClick={() => onCancel(id)}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors cursor-pointer disabled:opacity-50"
            >
              Cancelar
            </button>
          </div>
        );
      }

      if (row.serviceStatus === "COMPLETED") {
        if (isEmployee) {
          return <span className="text-xs text-yellow-500/80 font-medium">Pendiente de cobro</span>;
        }

        return (
          <button
            disabled={isUpdating}
            onClick={() => onPay(row)}
            className="px-3 py-1 rounded-lg text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 transition-colors cursor-pointer disabled:opacity-50"
          >
            Marcar como pago
          </button>
        );
      }

      return <span className="text-slate-600 text-xs">(Sin acciones)</span>;
    },
  },
];