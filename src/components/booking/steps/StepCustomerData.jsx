import { Loader2, ArrowLeft } from "lucide-react";
// 1. Importar el componente y sus estilos obligatorios
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

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
          <input type="text" required placeholder="Jonh" value={customerData.name} onChange={(e) => onChange("name", e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Apellido *</label>
          <input type="text" required placeholder="Doe" value={customerData.lastname} onChange={(e) => onChange("lastname", e.target.value)} className={inputClass} />
        </div>
      </div>

      {/* 2. Campo de Teléfono Internacional Reemplazado */}
      <div className="phone-input-dark">
        <label className={labelClass}>Teléfono / WhatsApp *</label>
        <PhoneInput
          international
          defaultCountry="CO"
          countries={["CO", "MX", "PE", "ES", "EC", "CL", "AR"]}
          placeholder="Escribe tu teléfono"
          value={customerData.phone}
          onChange={(value) => onChange("phone", value || "")}
          className={inputClass}
          numberInputProps={{
            required: true,
            className: "scheme-dark w-full bg-transparent focus:outline-none text-white ms-2 text-sm h-full"
          }}
        />
      </div>

      <div>
        <label className={labelClass}>
          Correo electrónico *
        </label>
        <input type="email" required placeholder="tu@email.com" value={customerData.email} onChange={(e) => onChange("email", e.target.value)} className={inputClass} />
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
