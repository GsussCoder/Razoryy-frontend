import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";

export default function CalendarHeader({
  currentDate,
  onPrevWeek,
  onNextWeek,
  onToday,
  tenantSlug = "", // Recibimos el slug aquí
}) {
  const [copied, setCopied] = useState(false);

  // Construimos la URL pública dinámicamente
  const publicBookingUrl = tenantSlug
    ? `${window.location.origin}/booking/${tenantSlug}`
    : "#";

  const handleCopyLink = () => {
    if (!tenantSlug) return;
    navigator.clipboard.writeText(publicBookingUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
      {/* Título e Información del Enlace */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          Calendario de citas
        </h2>
        <p className="text-xs text-slate-400">
          Visualiza y gestiona las reservas agendadas por tus clientes.
        </p>

        {/* Badge del Link de Agendamiento Público */}
        {tenantSlug && (
          <div className="mt-2.5 flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-400">Link público:</span>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 border border-slate-700/80 rounded-lg text-xs font-mono text-indigo-300">
              <span className="max-w-50 sm:max-w-70 truncate">
                {publicBookingUrl}
              </span>
              
              {/* Botón Copiar */}
              <button
                onClick={handleCopyLink}
                title="Copiar enlace"
                className="p-1 text-slate-400 hover:text-white hover:bg-slate-700/60 rounded transition-colors cursor-pointer"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>

              {/* Botón Ir al Enlace */}
              <a
                href={publicBookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Abrir página de agendamiento"
                className="p-1 text-slate-400 hover:text-white hover:bg-slate-700/60 rounded transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Navegación del Calendario */}
      <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
        <button
          onClick={onToday}
          className="px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors cursor-pointer"
        >
          Hoy
        </button>
        <div className="flex items-center bg-slate-800 rounded-lg border border-slate-700">
          <button
            onClick={onPrevWeek}
            className="p-1.5 text-slate-400 hover:text-white cursor-pointer"
            title="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={onNextWeek}
            className="p-1.5 text-slate-400 hover:text-white cursor-pointer"
            title="Siguiente"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}