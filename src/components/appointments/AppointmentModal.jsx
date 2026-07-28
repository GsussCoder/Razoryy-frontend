import {
  User,
  Scissors,
  Calendar,
  Clock,
  Phone,
} from "lucide-react";
import Modal from "../ui/Modal";
import { STATUS_CLASSES, STATUS_LABELS } from "./statusConfig";

export default function AppointmentModal({
  appointment,
  onClose,
  actionLoading,
}) {
  return (
    <Modal
      isOpen={Boolean(appointment)}
      onClose={onClose}
      title={appointment ? "Detalle de la Cita" : null}
      size="md"
    >
      {appointment && (
        <div className="space-y-5">
          <div>
            <span
              className={`inline-block px-2.5 py-1 rounded text-xs font-bold ${
                STATUS_CLASSES[appointment.status]
              }`}
            >
              {STATUS_LABELS[appointment.status] || appointment.status}
            </span>
          </div>

          {/* Información de la reserva */}
          <div className="space-y-3 text-xs text-slate-300">
            {/* Cliente */}
            <div className="flex items-center gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-700/60">
              <User className="w-4 h-4 text-indigo-400 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">
                  Cliente
                </p>
                <p className="text-sm font-semibold text-white">
                  {appointment.customerName} {appointment.customerLastname}
                </p>
              </div>
            </div>

            {/* Servicio y Barbero */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/60">
                <Scissors className="w-4 h-4 text-indigo-400 shrink-0" />
                <div className="truncate">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">
                    Servicio
                  </p>
                  <p className="font-semibold text-slate-200 truncate">
                    {appointment.barberService}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/60">
                <User className="w-4 h-4 text-indigo-400 shrink-0" />
                <div className="truncate">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">
                    Barbero
                  </p>
                  <p className="font-semibold text-slate-200 truncate">
                    {appointment.userName}
                  </p>
                </div>
              </div>
            </div>

            {/* Fecha y Hora */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/60">
                <Calendar className="w-4 h-4 text-indigo-400 shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">
                    Fecha
                  </p>
                  <p className="font-semibold text-slate-200">
                    {appointment.appointmentDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-700/60">
                <Clock className="w-4 h-4 text-indigo-400 shrink-0" />
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">
                    Hora
                  </p>
                  <p className="font-semibold text-slate-200">
                    {appointment.appointmentTime?.substring(0, 5)}
                  </p>
                </div>
              </div>
            </div>

            {/* Teléfono / WhatsApp */}
            <div className="flex items-center gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-700/60">
              <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-bold">
                  Teléfono / WhatsApp
                </p>
                <p className="font-semibold text-slate-200">
                  {appointment.customerNumber}
                </p>
              </div>
            </div>

            {/* Notas / Observaciones */}
            {appointment.reason && (
              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700/60">
                <p className="text-[10px] text-slate-400 uppercase font-bold">
                  Notas
                </p>
                <p className="text-slate-300 italic">{appointment.reason}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}
