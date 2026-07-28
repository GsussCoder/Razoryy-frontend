import { ArrowLeft, ChevronRight } from "lucide-react";

function Avatar({ name }) {
  const initials = name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  const colors = ["bg-indigo-500", "bg-violet-500", "bg-sky-500", "bg-amber-500", "bg-rose-500"];
  const color = colors[name.charCodeAt(0) % colors.length];
  
  return (
    <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center font-bold text-white text-base shrink-0`}>
      {initials}
    </div>
  );
}

export function StepBarber({ barbers, selectedBarber, onSelect, onBack }) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-white">Elige tu barbero</h3>
        <p className="text-xs text-slate-500 mt-0.5">¿Con quién quieres tu cita?</p>
      </div>

      <div className="space-y-2">
        {barbers.map((barber) => {
          const isSelected = selectedBarber?.id === barber.id;
          return (
            <button
              key={barber.id}
              onClick={() => onSelect(barber)}
              className={`group w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left ${
                isSelected
                  ? "border-indigo-500 bg-indigo-500/10"
                  : "border-slate-800 bg-slate-800/60 hover:border-slate-700 hover:bg-slate-800"
              } cursor-pointer`}
            >
              <Avatar name={barber.name} />

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white text-sm">{barber.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">Barbero profesional</p>
              </div>

              {isSelected && (
                <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-full shrink-0">
                  Seleccionado
                </span>
              )}

              <ChevronRight className={`w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                isSelected ? "text-indigo-400" : "text-slate-600"
              }`} />
            </button>
          );
        })}
      </div>

      <button onClick={onBack} className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 transition-colors cursor-pointer">
        <ArrowLeft className="w-3.5 h-3.5" />
        Volver a servicios
      </button>
    </div>
  );
}