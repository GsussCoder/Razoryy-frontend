import { Calendar, AlertCircle, Loader2, ArrowLeft } from "lucide-react";

export function StepDateTime({ selectedDate, selectedTime, availableSlots, isLoadingSlots, onDateChange, onTimeSelect, onNext, onBack }) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-indigo-400" />
          Fecha y hora
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">Elige cuándo quieres tu cita</p>
      </div>

      {/* Selector de fecha */}
      <div>
        <label className="block text-xs font-medium text-slate-400 mb-2">Fecha</label>
        <input
          type="date"
          min={new Date().toISOString().split("T")[0]}
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          className="scheme-dark w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Slots */}
      {selectedDate && (
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-3">
            Horas disponibles
          </label>

          {isLoadingSlots ? (
            <div className="flex items-center gap-2 text-xs text-slate-500 py-4">
              <Loader2 className="w-4 h-4 animate-spin" />
              Buscando horarios libres...
            </div>
          ) : availableSlots.length === 0 ? (
            <div className="flex items-center gap-2 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3">
              <AlertCircle className="w-4 h-4 shrink-0" />
              No hay horarios disponibles para este día. Elige otra fecha.
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {availableSlots.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => onTimeSelect(time)}
                  className={`py-2.5 rounded-xl text-xs font-semibold border transition-all duration-150 ${
                    selectedTime === time
                      ? "bg-indigo-500 text-slate-950 border-indigo-400 scale-105 shadow-lg shadow-indigo-500/20"
                      : "bg-slate-800 border-slate-700 text-slate-300 hover:border-indigo-500/50 hover:text-indigo-400"
                  } cursor-pointer`}
                >
                  {time && typeof time === 'string' ? time.substring(0, 5) : "00:00"}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex items-center justify-between pt-2">
        <button onClick={onBack} className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition-colors cursor-pointer">
          <ArrowLeft className="w-3.5 h-3.5" />
          Volver
        </button>
        {selectedTime && (
          <button
            onClick={onNext}
            className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-400 active:bg-indigo-600 text-slate-950 font-bold rounded-xl text-xs transition-all shadow-lg shadow-indigo-500/20 cursor-pointer"
          >
            Continuar →
          </button>
        )}
      </div>
    </div>
  );
}