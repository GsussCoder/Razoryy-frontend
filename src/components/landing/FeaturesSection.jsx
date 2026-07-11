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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Todo lo que necesitas para tu barbería
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Herramientas poderosas diseñadas específicamente para el negocio de
            barberías
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {FEATURES.map((feature, idx) => (
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
  );
}
