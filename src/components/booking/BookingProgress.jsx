import { Check } from "lucide-react";

const STEPS = [
  { n: 1, label: "Servicio" },
  { n: 2, label: "Barbero" },
  { n: 3, label: "Horario" },
  { n: 4, label: "Tus datos" },
];

export function BookingProgress({ current }) {
  return (
    <div className="flex items-center justify-center gap-0 w-full">
      {STEPS.map((s, idx) => {
        const done    = current > s.n;
        const active  = current === s.n;
        const pending = current < s.n;

        return (
          <div key={s.n} className="flex items-center">
            {/* Círculo del paso */}
            <div className="flex flex-col items-center gap-1.5">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                done    ? "bg-indigo-500 text-slate-950"
                : active  ? "bg-indigo-500/20 border-2 border-indigo-400 text-indigo-400"
                : "bg-slate-800 border border-slate-700 text-slate-600"
              }`}>
                {done ? <Check className="w-4 h-4" /> : s.n}
              </div>
              <span className={`text-xs font-medium hidden sm:block transition-colors ${
                done || active ? "text-indigo-400" : "text-slate-600"
              }`}>
                {s.label}
              </span>
            </div>

            {/* Línea conectora */}
            {idx < STEPS.length - 1 && (
              <div className={`h-0.5 w-10 sm:w-16 mx-1 transition-colors duration-300 ${
                current > s.n ? "bg-indigo-500" : "bg-slate-800"
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
}