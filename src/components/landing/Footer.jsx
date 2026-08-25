import InstagramLogo from "../../assets/icons/instagram-logo";

const linkStyles = "relative px-4 py-1.5 text-sm text-slate-300/80 md:hover:text-white md:active:text-white transition-colors cursor-pointer group after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:bg-indigo-400 after:scale-x-0 md:hover:after:scale-x-100 md:active:after:scale-x-100 after:transition-transform after:duration-300 after:origin-center select-none touch-manipulation [webkit-tap-highlight-color:transparent]";

export function Footer({ scrollToInit, scrollToAboutUs, scrollToContact, scrollToPrice }) {
  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 text-center sm:text-left">
        <div className="flex flex-col items-center sm:items-start gap-2">
          <div className="flex gap-2 items-center">
            <figure className="w-10 h-10">
              <img src="/razoryy-icon.svg" alt="Razoryy logo" />
            </figure>
            <p className="font-bold text-lg">
              Razor<span className="text-indigo-400">yy</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center sm:items-start">
          <h3 className="font-bold text-white mb-3">Enlaces rápidos</h3>
          <div className="flex flex-col items-center sm:items-start w-full">
            <button onClick={() => scrollToInit()} className={linkStyles}>Inicio</button>
            <button onClick={() => scrollToAboutUs()} className={linkStyles}>Nosotros</button>
            <button onClick={() => scrollToPrice()} className={linkStyles}>Planes</button>
            <button onClick={() => scrollToContact()} className={linkStyles}>Contacto</button>
            <a href="/terms" className={linkStyles}>Términos y condiciones</a>
          </div>
        </div>

        <div className="flex flex-col items-center sm:items-start">
          <h3 className="font-bold text-white mb-3">Redes sociales</h3> { /* Información */}
          <a href="https://www.instagram.com/razo_ryy/?hl=es" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors">
            <figure>
              <InstagramLogo className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors duration-300" />
            </figure>
            Instagram
          </a>
        </div>

        <div className="flex flex-col items-center sm:items-start">
          <h3 className="font-bold text-white mb-3">Iniciar en Razoryy</h3>
          <a href="/register" className="bg-indigo-600 hover:bg-indigo-800 text-white px-4 py-2 rounded text-sm transition-colors cursor-pointer">
            Iniciar con la prueba gratis
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto text-center border-t border-slate-800/50 pt-6">
        <p className="text-slate-500 text-sm">
          © 2026 Razoryy. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
