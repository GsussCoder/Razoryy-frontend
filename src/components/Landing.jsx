import {
  Scissors,
  Calendar,
  Users,
  DollarSign,
  Shield,
  Zap,
  CheckCircle,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  MapPinned,
  Globe,
  ArrowDown,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";
import RazoryyLogo from "../assets/logo.svg";

export default function Landing() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center">
              <img src={RazoryyLogo} alt="Logo de Razoryy" />
            </div>
            <span className="text-lg font-bold text-white">Razor<span className="text-indigo-400">yy</span></span>
          </div>

          {/* Botones */}
          <div className="flex items-center gap-3">
            <button
              onClick={scrollToContact}
              className="hidden sm:inline-flex px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors"
            >
              Contacto
            </button>
            <a
              href="/login"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Iniciar Sesión
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Gestiona tu barbería de forma{" "}
            <span className="text-indigo-500">profesional</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Sistema completo para administrar citas, empleados, pagos e
            inventario. Todo en una sola plataforma diseñada para barberías
            modernas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToContact}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-indigo-500/30"
            >
              Contactanos
              <ArrowDown className="w-5 h-5" />
            </button>

            <a
              href="/login"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 transition-colors"
            >
              Iniciar Sesión
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Todo lo que necesitas para tu barbería
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Herramientas poderosas diseñadas específicamente para el negocio
              de barberías
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              // {
              //   icon: Calendar,
              //   title: "Gestión de Citas",
              //   description:
              //     "Sistema completo de reservas con confirmación automática y recordatorios por mensajes de WhatsApp.",
              // },
              {
                icon: Users,
                title: "Control de Empleados",
                description:
                  "Administra tu equipo, asigna comisiones y controla el rendimiento de cada barbero.",
              },
              {
                icon: DollarSign,
                title: "Pagos y Comisiones",
                description:
                  "Registro automático de pagos y cálculo de comisiones para cada empleado.",
              },
              {
                icon: MapPinned,
                title: "Multi-sucursal",
                description:
                  "Gestiona múltiples ubicaciones desde un solo lugar.",
              },
              // {
              //   icon: Globe,
              //   title: "Sitio Web Público",
              //   description:
              //     "Cada barbería tiene su propio sitio web para que los clientes agenden online.",
              // },
              {
                icon: CheckCircle,
                title: "Reportes Detallados",
                description:
                  "Métricas de ingresos, egresos, citas y rendimiento de tu negocio.",
              },
              {
                icon: PackageCheck,
                title: "Gestiona productos",
                description:
                  "Mantente alerta de productos del local con avisos de stock bajo.",
              },
              {
                icon: ShieldCheck,
                title: "Soporte activo",
                description:
                  "Ten soporte activo con nosotros en cualquier momento.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors"
              >
                <div className="w-12 h-12 bg-indigo-600/20 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-indigo-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Planes simples y transparentes
            </h2>
            <p className="text-lg text-slate-400">
              Elige el plan que mejor se adapte a tu negocio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Básico",
                price: "20.000",
                features: [
                  "Hasta 2 usuarios",
                  "Gestión de barberos",
                  "Reportes básicos",
                  "Comisiones automaticas",
                  "Soporte activo",
                ],
              },
              {
                name: "Estandar",
                price: "50.000",
                popular: true,
                features: [
                  "Hasta 5 usuarios",
                  "Todo lo de Básico",
                  "Agendamiento de citas",
                  "Sitio web para agendar citas",
                ],
              },
              {
                name: "Profesional",
                price: "100.000",
                features: [
                  "Usuarios ilimitados",
                  "Todo lo de Estandar",
                  "Multi-sucursal",
                  "Reportes avanzados",
                  "Notificaciones de citas via WhatsApp",
                ],
              },
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-xl p-6 border hover:scale-102 transition-all ${
                  plan.popular
                    ? "bg-indigo-600/10 border-indigo-500 relative"
                    : "bg-slate-800 border-slate-700"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full">
                    Plan destacado
                  </div> // Más popular (Reemplazar algún día)
                )}
                <h3 className="text-xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-white">
                    ${plan.price}
                  </span>
                  <span className="text-slate-400">/mes</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  onClick={scrollToContact}
                  className={`block text-center py-2.5 rounded-lg font-medium transition-colors cursor-pointer ${
                    plan.popular
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                      : "bg-slate-700 hover:bg-slate-600 text-white"
                  }`}
                >
                  Comenzar
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Contactanos
            </h2>
            <p className="text-lg text-slate-400">
              Lleva tu negocio a otro nivel y empieza a automatizar
              hoy mismo.
            </p>
          </div>

          <div className="mx-auto max-w-md bg-slate-800 rounded-xl p-6">
            <form  className="space-y-4">
              {/* <h2 className="text-2xl text-center" >Mensaje directo</h2> */}
              <label className="ml-2">Nombre</label>
              <input type="text" placeholder="Nombre" className="w-full bg-slate-900 border border-slate-700 rounded-lg mt-1.5 p-2 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all" />
              <label className="ml-2">Correo electrónico</label>
              <input type="email" placeholder="example@gmail.com" className="w-full bg-slate-900 border border-slate-700 rounded-lg mt-1.5 p-2 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all" />
              <label className="ml-2">Asunto</label>
              <textarea placeholder="¡Hola! Estoy interesado en automatizar mi local." className="w-full h-30 bg-slate-900 border border-slate-700 rounded-lg mt-1.5 p-2 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all" />
              <button className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all cursor-pointer">Enviar mensaje</button>
            </form>
            
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center">
              <Mail className="w-8 h-8 text-indigo-500 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Email</h3>
              <p className="text-slate-400 text-sm">clustsol@gmail.com</p>
            </div>
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center">
              <Phone className="w-8 h-8 text-indigo-500 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Teléfono</h3>
              <p className="text-slate-400 text-sm">+57 313 880 2211</p>
            </div>
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center">
              <MapPin className="w-8 h-8 text-indigo-500 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Ubicación</h3>
              <p className="text-slate-400 text-sm">Bogotá, Colombia</p>
            </div>
          </div> */}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-500 text-sm">
            © 2026 Razoryy por Clustsol. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
