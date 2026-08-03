import {
  CheckCircle,
  DollarSign,
  ListCheck,
  MapPinned,
  PackageCheck,
  ShieldCheck,
  Users,
} from "lucide-react";

const FEATURES = [
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
      "Administra tu equipo, asigna servicios y controla el rendimiento de cada barbero.",
  },
  {
    icon: DollarSign,
    title: "Pagos y Comisiones",
    description:
      "Registro automático de pagos y gestión de comisiones para cada empleado.",
  },
  {
    icon: MapPinned,
    title: "Multi-sucursal",
    description: "Gestiona múltiples ubicaciones de tu local desde un solo lugar.",
  },
  {
    icon: CheckCircle,
    title: "Reportes Detallados",
    description:
      "Métricas de ingresos, egresos, citas y rendimiento de tu negocio.",
  },
  {
    icon: ListCheck,
    title: "Reservación de citas",
    description:
      "Tus clientes podrán agendar citas con tu negocio a través de tu enlace público y único.",
  },
  // {
  //   icon: PackageCheck,
  //   title: "Gestiona productos",
  //   description:
  //     "Mantente alerta de productos del local con avisos de stock bajo.",
  // },
  {
    icon: ShieldCheck,
    title: "Soporte activo",
    description: "Ten soporte activo con nosotros en cualquier momento del día.",
  },
];

export function FeaturesSection() {
  return (
    <section id="about-us" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-8">
            <span className="text-indigo-400 font-semibold tracking-wide uppercase text-sm">
              Sobre Nosotros
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-6">
              ¿Qué es Razoryy?
            </h2>
            <p className="text-slate-400 text-lg mb-4 leading-relaxed">
              Razoryy es la plataforma definitiva de gestión diseñada exclusivamente para transformar el día a día de las barberías modernas.
            </p>
            <p className="text-slate-400 text-lg mb-6 leading-relaxed">
              Nacimos con el objetivo de eliminar las tareas administrativas pesadas, permitiéndote a ti y a tus barberos concentrarse en lo que mejor saben hacer: elevar el estilo de sus clientes.
            </p>
            <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
              <p className="text-indigo-400 font-medium text-sm">Nuestra Misión</p>
              <p className="text-white font-medium mt-1">Impulsar el crecimiento de negocios independientes o ya posicionados mediante un sistema intuitivo y sin complicaciones.</p>
            </div>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {FEATURES.map((feature, idx) => (
              <div 
                key={idx} 
                className="bg-slate-800 hover:bg-slate-700/50 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 bg-indigo-600/20 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-indigo-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}