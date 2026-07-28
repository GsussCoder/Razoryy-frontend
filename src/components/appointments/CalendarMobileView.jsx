import { useState } from "react";
import { STATUS_CLASSES, STATUS_LABELS } from "./statusConfig";

export default function CalendarMobileView({ 
  weekDays, 
  appointments, 
  isLoading, 
  onSelectAppointment, 
  formatDateKey 
}) {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const now = new Date();

  const selectedDate = weekDays[selectedDayIndex] || new Date();
  const dateStr = formatDateKey(selectedDate);

  // Ordenamos cronológicamente las citas del día seleccionado
  const dayAppointments = appointments
    .filter((app) => app.appointmentDate === dateStr)
    .sort((a, b) => a.appointmentTime?.localeCompare(b.appointmentTime));

  // Función para determinar si una cita ya pasó con respecto a la fecha/hora actual
  const isPastAppointment = (appDateStr, appTimeStr) => {
    if (!appDateStr || !appTimeStr) return false;
    const appointmentDateTime = new Date(`${appDateStr}T${appTimeStr}`);
    return appointmentDateTime < now;
  };

  return (
    <div className="md:hidden space-y-3 h-[calc(100vh-180px)] flex flex-col">
      {/* Selector de Días Deslizable Horizontal */}
      <div className="flex gap-2 overflow-x-auto pb-1 shrink-0 scrollbar-none">
        {weekDays.map((day, idx) => {
          const isSelected = idx === selectedDayIndex;
          const isToday = formatDateKey(day) === formatDateKey(new Date());

          return (
            <button
              key={idx}
              onClick={() => setSelectedDayIndex(idx)}
              className={`shrink-0 flex flex-col items-center justify-center w-12 h-14 rounded-xl border transition-all active:scale-95 cursor-pointer ${
                isSelected
                  ? "bg-indigo-500 border-indigo-400 text-slate-950 font-bold shadow-md shadow-indigo-500/20"
                  : isToday
                  ? "bg-slate-800 border-indigo-500/50 text-indigo-400"
                  : "bg-slate-900 border-slate-800 text-slate-400"
              }`}
            >
              <span className="text-[9px] uppercase font-bold">
                {day.toLocaleDateString("es-ES", { weekday: "short" })}
              </span>
              <span className="text-base font-extrabold">{day.getDate()}</span>
            </button>
          );
        })}
      </div>

      {/* Citas del Día Seleccionado */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3.5 flex-1 flex flex-col overflow-hidden shadow-xl">
        <h3 className="text-xs font-semibold text-slate-300 border-b border-slate-800 pb-2.5 shrink-0 flex items-center justify-between">
          <span>Citas del {selectedDate.toLocaleDateString("es-ES", { day: "numeric", month: "long" })}</span>
          <span className="text-[10px] text-slate-500 font-mono">
            Total: {dayAppointments.length}
          </span>
        </h3>

        <div className="flex-1 overflow-y-auto mt-2.5 space-y-2.5 pr-0.5">
          {isLoading ? (
            <p className="text-center text-slate-500 py-6 text-xs animate-pulse">
              Cargando citas...
            </p>
          ) : dayAppointments.length === 0 ? (
            <p className="text-center text-slate-500 py-6 text-xs">
              No hay citas agendadas para este día.
            </p>
          ) : (
            dayAppointments.map((app) => {
              const isPast = isPastAppointment(app.appointmentDate, app.appointmentTime);

              return (
                <div
                  key={app.id}
                  onClick={() => onSelectAppointment(app)}
                  className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer shadow-md block relative active:scale-[0.98] ${
                    STATUS_CLASSES[app.status] || "bg-slate-800 border-slate-700 text-slate-300"
                  } ${
                    isPast 
                      ? "opacity-45 grayscale-25 active:opacity-80 active:grayscale-0" 
                      : ""
                  }`}
                >
                  {/* Header de la tarjeta Móvil */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-extrabold bg-slate-950/50 px-2 py-0.5 rounded-md border border-white/10 text-white tracking-wide">
                      ⏰ {app.appointmentTime?.substring(0, 5)}
                    </span>

                    <span className="px-2 py-0.5 rounded text-[9px] font-extrabold uppercase border border-current tracking-wider">
                      {STATUS_LABELS[app.status] || app.status}
                    </span>
                  </div>

                  {/* Nombre del Cliente */}
                  <p className="font-bold text-sm text-white truncate">
                    {app.customerName} {app.customerLastname}
                  </p>

                  {/* Detalles: Servicio y Barbero */}
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-300/90 mt-1">
                    <span className="truncate font-medium">{app.barberService}</span>
                    <span className="text-[10px] text-slate-400 shrink-0 bg-slate-950/30 px-1.5 py-0.5 rounded">
                      💈 {app.userName}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}