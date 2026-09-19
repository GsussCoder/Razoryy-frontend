import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

const texts = ["SALÓN DE BARBERÍA", "SALÓN DE SPA", "SALÓN DE BELLEZA", "SALÓN DE UÑAS"];

export function HeroSection() {
  const [textIndex, setTextIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);

      setTimeout(() => {
        setTextIndex((prev) => (prev + 1) % texts.length);
        setVisible(true);
      }, 500);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero-section" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="mb-4 text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
          Gestiona tu negocio
        </h1>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          de forma profesional
        </h2>
        <div className="w-fit max-w-full mb-6 p-2 pl-6 pr-6 inline-block bg-indigo-900/20 border-2 rounded-2xl border-indigo-900">
          <span
            className={`block w-max text-2xl sm:text-5xl lg:text-6xl font-bold text-indigo-400 leading-tight transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
          >
            {texts[textIndex]}
          </span>
        </div>
        <p className="text-lg sm:text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
          Deja de llevar notas mentales de tus finanzas, obtén el control total
          de tu local con{" "}
          <span className="text-indigo-400 font-bold">Razoryy</span>, gestiona
          todo tu negocio de forma automatica e instantanea.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/register"
            className="bg-indigo-600 active:bg-indigo-800 hover:bg-indigo-700 text-white font-medium rounded-lg inline-flex items-center justify-center gap-2 px-6 py-3  transition-all hover:shadow-lg hover:shadow-indigo-500/30"
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
