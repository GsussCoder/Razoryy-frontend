import { HOURS, STATUS_CLASSES } from "./statusConfig";

export default function CalendarGrid({ 
  weekDays, 
  appointments, 
  isLoading, 
  onSelectAppointment, 
  formatDateKey 
}) {
  const now = new Date();

  // Función para determinar si una cita ya pasó con respecto a la fecha/hora actual
  const isPastAppointment = (dateStr, timeStr) => {
    if (!dateStr || !timeStr) return false;
    // Formato esperado: "YYYY-MM-DDTHH:mm:ss"
    const appointmentDateTime = new Date(`${dateStr}T${timeStr}`);
    return appointmentDateTime < now;
  };

  return (
    <div className="hidden md:flex flex-col bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl h-[calc(100vh-180px)]">
      <div className="grid grid-cols-8 border-b border-slate-800 bg-slate-950/80 text-center shrink-0">
        <div className="p-3 border-r border-slate-800 text-xs font-bold text-slate-500 uppercase flex items-center justify-center">
          Hora
        </div>
        {weekDays.map((day, idx) => {
          const isToday = formatDateKey(day) === formatDateKey(new Date());
          return (
            <div
              key={idx}
              className={`p-3 border-r border-slate-800 last:border-r-0 text-center ${
                isToday ? "bg-indigo-600/20" : ""
              }`}
            >
              <p className="text-[11px] font-bold text-slate-400 uppercase">
                {day.toLocaleDateString("es-ES", { weekday: "short" })}
              </p>
              <p className={`text-base font-black ${isToday ? "text-indigo-400" : "text-white"}`}>
                {day.getDate()}
              </p>
            </div>
          );
        })}
      </div>

      {/* Grid de Horas */}
      <div className="divide-y divide-slate-800/60 overflow-y-auto flex-1">
        {isLoading ? (
          <div className="p-12 text-center text-slate-500 text-sm animate-pulse">
            Cargando citas...
          </div>
        ) : (
          HOURS.map((hour) => {
            const hourPrefix = hour.substring(0, 3);

            return (
              <div key={hour} className="grid grid-cols-8 min-h-18">
                {/* Columna de la Hora Bloque */}
                <div className="p-2 border-r border-slate-800 text-xs text-slate-400 font-mono text-center flex items-center justify-center bg-slate-950/40 shrink-0 font-bold">
                  {hour}
                </div>

                {/* Columnas por día */}
                {weekDays.map((day, idx) => {
                  const dateStr = formatDateKey(day);
                  
                  const dayAppointments = appointments
                    .filter(
                      (app) =>
                        app.appointmentDate === dateStr &&
                        app.appointmentTime?.startsWith(hourPrefix)
                    )
                    .sort((a, b) =>
                      a.appointmentTime?.localeCompare(b.appointmentTime)
                    );

                  return (
                    <div 
                      key={idx} 
                      className="p-1.5 border-r border-slate-800/50 last:border-r-0 flex flex-col gap-2 justify-start bg-slate-900/20"
                    >
                      {dayAppointments.map((app) => {
                        const isPast = isPastAppointment(app.appointmentDate, app.appointmentTime);

                        return (
                          <button
                            key={app.id}
                            onClick={() => onSelectAppointment(app)}
                            className={`w-full text-left p-2.5 rounded-xl border transition-all duration-200 shadow-md block group relative cursor-pointer ${
                              STATUS_CLASSES[app.status] || "bg-slate-800 border-slate-700 text-slate-300"
                            } ${
                              isPast 
                                ? "opacity-45 grayscale-25 hover:opacity-80 hover:grayscale-0" 
                                : "hover:-translate-y-0.5 hover:shadow-lg"
                            }`}
                          >
                            {/* Header de la tarjeta: Badge de Hora y Barbero */}
                            <div className="flex items-center justify-between gap-1 mb-1.5">
                              <span className="font-mono text-[11px] font-extrabold bg-slate-950/40 px-2 py-0.5 rounded-md border border-white/10 tracking-wide text-white">
                                {app.appointmentTime?.substring(0, 5)}
                              </span>
                              <span className="text-[10px] truncate text-slate-300 font-medium bg-slate-950/20 px-1.5 py-0.5 rounded">
                                {app.userName}
                              </span>
                            </div>

                            {/* Nombre del Cliente */}
                            <p className="font-bold text-sm text-white truncate group-hover:text-white transition-colors">
                              {app.customerName} {app.customerLastname}
                            </p>

                            {/* Servicio */}
                            <p className="text-xs text-slate-300/90 truncate font-medium mt-0.5">
                              {app.barberService}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}