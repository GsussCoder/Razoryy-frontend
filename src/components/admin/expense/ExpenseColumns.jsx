import { Wallet, Calendar, User, DollarSign } from "lucide-react";

const EXPENSE_TYPE_LABELS = {
  SUPPLIES: "Suministros",
  SALARY: "Salario",
  UTILITIES: "Servicios Básicos",
  WATER_BILL: "Factura de Agua",
  ELECTRICITY_BILL: "Factura de Luz",
  SYSTEM_PAYMENT: "Pago del Sistema",
  RENT: "Renta / Arriendo",
};

const PAYMENT_TYPE_LABELS = {
  CASH: "Efectivo",
  NEQUI: "Nequi",
  DAVIPLATA: "Daviplata",
  TRANSFER: "Transferencia",
};

export const getGeneralExpenseColumns = () => [
  {
    header: "Descripción",
    accessor: "description",
    render: (val, row) => (
      <div className="flex flex-col">
        <span className="font-medium text-white">{val}</span>
        <span className="text-xs text-slate-400">
          {EXPENSE_TYPE_LABELS[row.expenseType] || row.expenseType}
        </span>
      </div>
    ),
  },
  {
    header: "Monto",
    accessor: "amount",
    render: (val) => (
      <span className="font-bold text-red-400">
        -${Number(val || 0).toLocaleString("es-CO")}
      </span>
    ),
  },
  {
    header: "Origen de Fondos",
    accessor: "boxDate",
    render: (boxDate) =>
      boxDate ? (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Wallet className="w-3.5 h-3.5" />
          Caja del día {new Date(boxDate).toLocaleDateString("es-CO")}
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-700/60 text-slate-400 border border-slate-600">
          <Calendar className="w-3.5 h-3.5" />
          Gasto General
        </span>
      ),
  },
  {
    header: "Método de Pago",
    accessor: "paymentType",
    render: (val) => (
      <span className="text-xs font-medium text-slate-300">
        {PAYMENT_TYPE_LABELS[val] || val}
      </span>
    ),
  },
  {
    header: "Fecha",
    accessor: "createdAt",
    render: (val) => {
      if (!val) return <span className="text-slate-500">—</span>;
      const date = new Date(val);
      return (
        <span className="text-xs text-slate-300">
          {date.toLocaleDateString("es-CO")} -{" "}
          {date.toLocaleTimeString("es-CO", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      );
    },
  },
];

export const getSalaryExpenseColumns = () => [
  {
    header: "Encargado",
    accessor: "userName",
    render: (val, row) => (
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-semibold text-xs">
          <User className="w-4 h-4" />
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-white">
            {val || row.userName}
          </span>
          <span className="text-xs text-slate-400">{row.description}</span>
        </div>
      </div>
    ),
  },
  {
    header: "Monto Entregado",
    accessor: "amount",
    render: (val) => (
      <span className="font-bold text-emerald-400">
        ${Number(val || 0).toLocaleString("es-CO")}
      </span>
    ),
  },
  {
    header: "Método de Pago",
    accessor: "paymentType",
    render: (val) => (
      <span className="text-xs font-medium text-slate-300">
        {PAYMENT_TYPE_LABELS[val] || val}
      </span>
    ),
  },
  {
    header: "Origen del Pago",
    accessor: "boxDate",
    render: (boxDate) =>
      boxDate ? (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Wallet className="w-3.5 h-3.5" />
          Caja del día {new Date(boxDate).toLocaleDateString("es-CO")}
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-700/60 text-slate-400 border border-slate-600">
          <DollarSign className="w-3.5 h-3.5" />
          Efectivo Externo / Transferencia
        </span>
      ),
  },
  {
    header: "Fecha de Pago",
    accessor: "createdAt",
    render: (val) => {
      if (!val) return <span className="text-slate-500">—</span>;
      const date = new Date(val);
      return (
        <span className="text-xs text-slate-300">
          {date.toLocaleDateString("es-CO")} -{" "}
          {date.toLocaleTimeString("es-CO", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      );
    },
  },
];
