import { ArrowDown, ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section id="hero-section" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Gestiona tu barbería de forma{" "}
          <span className="text-indigo-400">profesional</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
          Deja de llevar notas mentales de tus finanzas, obtén el
          control total de tu local con{" "}
          <span className="text-indigo-400 font-bold">Razoryy </span> y gestiona todo tu 
          negocio de forma automatica e instantanea. Unete a la 
          <span className="text-indigo-400 font-bold"> PRUEBA GRATIS DE 20 DÍAS</span>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/register"
            className="bg-indigo-600 active:bg-indigo-800 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg inline-flex items-center justify-center gap-2 px-6 py-3  transition-all hover:shadow-lg hover:shadow-indigo-500/30"
          >
            Prueba gratis 20 días
            <ArrowRight className="w-5 h-5" />
          </a>

          <a
            href="/login"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 transition-colors"
          >
            Soy barbero
          </a>
        </div>
      </div>
    </section>
  );
}
