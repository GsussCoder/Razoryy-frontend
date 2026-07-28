import { CheckCircle2, Calendar, Scissors, User, MapPin } from "lucide-react";

export function BookingSuccess({ barbershop, selectedService, selectedBarber, selectedDate, selectedTime, customerData }) {
  const fmt = (dateStr) =>
    new Date(dateStr).toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long" });

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 text-center">
        {/* Ícono animado */}
        <div className="relative mx-auto w-24 h-24">
          <div className="absolute inset-0 rounded-full bg-indigo-500/20 animate-ping" />
          <div className="relative w-24 h-24 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-indigo-400" />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white mb-1">¡Cita confirmada!</h2>
          <p className="text-slate-400 text-sm">
            Te esperamos el{" "}
            <span className="text-indigo-400 font-semibold capitalize">{fmt(selectedDate)}</span>
            {" "}a las{" "}
            <span className="text-indigo-400 font-semibold">{selectedTime.substring(0, 5)}</span>
          </p>
        </div>

        {/* Resumen de la cita */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden text-left">
          {[
            { icon: MapPin,     label: "Lugar",    value: barbershop.barberName },
            { icon: Scissors,   label: "Servicio", value: selectedService?.nameService },
            { icon: User,       label: "Barbero",  value: selectedBarber?.name },
            { icon: Calendar,   label: "Cliente",  value: `${customerData.name} ${customerData.lastname}` },
          ].map((row, idx) => (
            <div key={idx} className={`flex items-center gap-3 px-5 py-3.5 ${idx < 3 ? "border-b border-slate-800" : ""}`}>
              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                <row.icon className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <p className="text-xs text-slate-500">{row.label}</p>
                <p className="text-sm font-medium text-white">{row.value}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-slate-500">
          Guarda esta pantalla como comprobante de tu reserva.
        </p>
      </div>
    </div>
  );
}