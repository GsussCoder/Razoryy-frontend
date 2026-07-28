import { Loader2, ArrowLeft } from "lucide-react";

const inputClass = "w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all";
const labelClass = "block text-xs font-medium text-slate-400 mb-2";

export function StepCustomerData({ customerData, onChange, onSubmit, onBack, isSubmitting, summary }) {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <h3 className="text-lg font-bold text-white">Tus datos</h3>
        <p className="text-xs text-slate-500 mt-0.5">Necesitamos estos datos para confirmar tu cita</p>
      </div>

      {/* Resumen mini de la selección */}
      <div className="bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3 space-y-1.5">
        <p className="text-xs font-medium uppercase tracking-wider mb-2">Tu cita</p>
        {[
          { label: "Servicio", value: summary.service },
          { label: "Barbero",  value: summary.barber },
          { label: "Fecha",    value: summary.date },
          { label: "Hora",     value: summary.time },
        ].map((row) => (
          <div key={row.label} className="flex justify-between items-center">
            <span className="text-xs text-slate-500">{row.label}</span>
            <span className="text-xs font-semibold text-white">{row.value}</span>
          </div>
        ))}
      </div>

      {/* Campos */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelClass}>Nombre *</label>
          <input type="text" required placeholder="Juan" value={customerData.name} onChange={(e) => onChange("name", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Apellido *</label>
          <input type="text" required placeholder="Pérez" value={customerData.lastname} onChange={(e) => onChange("lastname", e.target.value)} className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>Teléfono / WhatsApp *</label>
        <input type="tel" required placeholder="+57 300 000 0000" value={customerData.phone} onChange={(e) => onChange("phone", e.target.value)} className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>
          Correo electrónico
          <span className="text-slate-600 font-normal ml-1">(opcional)</span>
        </label>
        <input type="email" placeholder="tu@email.com" value={customerData.email} onChange={(e) => onChange("email", e.target.value)} className={inputClass} />
      </div>

      <div className="flex items-center justify-between pt-2">
        <button type="button" onClick={onBack} className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition-colors cursor-pointer">
          <ArrowLeft className="w-3.5 h-3.5" />
          Volver
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-2.5 bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-600 disabled:opacity-50 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-indigo-500/20 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Confirmando...
            </>
          ) : (
            "Confirmar reserva"
          )}
        </button>
      </div>
    </form>
  );
}