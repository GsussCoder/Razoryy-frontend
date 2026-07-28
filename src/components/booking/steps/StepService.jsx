import { Scissors, Clock, ChevronRight } from "lucide-react";

export function StepService({ services, selectedService, onSelect }) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Scissors className="w-5 h-5 text-indigo-400" />
          Elige un servicio
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">Selecciona el servicio que deseas</p>
      </div>

      <div className="space-y-2">
        {services.map((service) => {
          const isSelected = selectedService?.id === service.id;
          return (
            <button
              key={service.id}
              onClick={() => onSelect(service)}
              className={`group w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left ${
                isSelected
                  ? "border-indigo-500 bg-indigo-500/10"
                  : "border-slate-800 bg-slate-800/60 hover:border-slate-700 hover:bg-slate-800"
              } cursor-pointer`}
            >
              {/* Ícono */}
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                isSelected ? "bg-indigo-500/20" : "bg-slate-700 group-hover:bg-slate-600"
              }`}>
                <Scissors className={`w-5 h-5 ${isSelected ? "text-indigo-400" : "text-slate-400"}`} />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white text-sm truncate">{service.nameService}</p>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3" />
                  45 min aprox.
                </p>
              </div>

              {/* Precio */}
              <div className="text-right shrink-0">
                <p className={`font-bold text-base ${isSelected ? "text-indigo-400" : "text-white"}`}>
                  ${Number(service.price).toLocaleString("es-CO")}
                </p>
              </div>

              <ChevronRight className={`w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 ${
                isSelected ? "text-indigo-400" : "text-slate-600"
              }`} />
            </button>
          );
        })}
      </div>
    </div>
  );
}