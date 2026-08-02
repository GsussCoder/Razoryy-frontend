import { AlertCircle, ArrowLeft } from "lucide-react";

export function BookingError() {
  return (
    <div className="min-h-screen bg-slate-900/95 flex items-center justify-center p-4">
      <div className="text-center space-y-4 max-w-sm">
        <div className="w-20 h-20 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto">
          <AlertCircle className="w-10 h-10 text-rose-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Barbería no encontrada</h2>
          <p className="text-slate-400 text-sm">
            El enlace que usaste no corresponde a ninguna barbería activa. Verifica el enlace e inténtalo de nuevo.
          </p>
        </div>
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </button>
      </div>
    </div>
  );
}