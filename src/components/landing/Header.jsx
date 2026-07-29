import { useState } from "react";
import RazoryyLogo from "../../assets/logo.svg";

// Removido 'active:text-white' y 'active:after:scale-x-100' del flujo móvil
const linkStyles =
  "relative px-4 py-2 text-sm text-slate-300 md:hover:text-white md:active:text-white transition-colors cursor-pointer group after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:bg-indigo-400 after:scale-x-0 md:hover:after:scale-x-100 md:active:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center select-none touch-manipulation [webkit-tap-highlight-color:transparent]";

export function Header({ scrollToContact, scrollToPrice }) {
  const [isOpen, setIsOpen] = useState(false);

  // Manejador para cerrar el menú móvil antes de ejecutar cualquier acción
  const handleNavClick = (action) => {
    setIsOpen(false);
    if (action) action();
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <figure className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center">
            <img src={RazoryyLogo} alt="Logo de Razoryy" />
          </figure>
          <span className="text-lg font-bold text-white">
            Razor<span className="text-indigo-400">yy</span>
          </span>
        </a>

        {/* Botones para Escritorio */}
        <div className="hidden md:flex items-center gap-3">
          <button onClick={scrollToContact} className={linkStyles}>
            Contacto
          </button>
          <button onClick={scrollToPrice} className={linkStyles}>
            Precios
          </button>
          <a href="/login" className={linkStyles}>
            Soy barbero
          </a>
          <a
            href="/register"
            className="px-4 py-2 bg-indigo-600 active:bg-indigo-800 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg inline-flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-indigo-500/30"
          >
            Prueba gratis 20 días
          </a>
        </div>

        {/* Contenedor Móvil: Botón Principal + Hamburguesa */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href="/register"
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-medium rounded-md transition-colors"
          >
            Prueba gratis
          </a>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-400 hover:text-white active:text-white transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menú Desplegable Móvil */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900/98 px-4 py-4 flex flex-col items-start gap-3">
          <button
            onClick={() => handleNavClick(scrollToContact)}
            className={`w-fit text-left ${linkStyles}`}
          >
            Contacto
          </button>
          <button
            onClick={() => {
              handleNavClick();
              scrollToPrice();
            }}
            className={`w-fit text-left ${linkStyles}`}
          >
            Precios
          </button>
          <a
            href="/login"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick();
            }}
            className={`w-fit ${linkStyles}`}
          >
            Soy barbero
          </a>
        </div>
      )}
    </header>
  );
}
