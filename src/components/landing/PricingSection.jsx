import { useState } from "react";
import { CheckCircle, Info } from "lucide-react";

// 1 BARBERO MÁS = 5.000 Y 1 SUCURSAL MÁS = 10.000
const AVAILABLE_PLANS = [
  {
    name: "PRO",
    price: "30.000",
    popular: true,
    features: [
      {
        text: "Hasta 2 barberos",
        desc: "Soporta hasta dos perfiles de barberos trabajando de forma simultánea en la app.",
      },
      {
        text: "Asignación de servicios a cada barbero",
        desc: "Vincula cortes, lavados o tintes específicos a los barberos que los realizan.",
      },
      {
        text: "Gestión de empleados",
        desc: "Controla permisos de acceso al sistema y roles de tu equipo de trabajo.",
      },
      {
        text: "Reportes detallados",
        desc: "Visualiza gráficos de ventas diarias, servicios más pedidos y rendimiento.",
      },
      {
        text: "Apertura y cierre de caja",
        desc: "Lleva un control estricto del efectivo inicial y final de cada jornada laboral.",
      },
      {
        text: "Agendamiento de citas",
        desc: "Tus clientes reservan su espacio de manera digital las 24 horas del día.",
      },
      {
        text: "Comisiones automáticas",
        desc: "Calcula el porcentaje exacto que le corresponde a cada barbero al instante.",
      },
      // {
      //   text: "Notificaciones de citas",
      //   desc: "Envía recordatorios automáticos para reducir el ausentismo de clientes.",
      // },
      {
        text: "Soporte activo",
        desc: "Acceso a nuestro canal de ayuda preferencial vía WhatsApp o correo.",
      },
      // {
      //   text: "Personalización del panel",
      //   desc: "Adapta los colores y el logotipo del sistema con la identidad de tu marca.",
      // },
      {
        text: "Automatización de tus finanzas básicas",
        desc: "Automatiza el cálculo de ingresos netos restando los costos operativos esenciales.",
      },
      {
        text: "Hasta 1 sucursal",
        desc: "Ideal para administrar de forma centralizada un único local comercial.",
      },
      {
        text: "Historial de pagos y gastos",
        desc: "Registro completo de todos los egresos, compras de insumos y salarios.",
      },
      {
        text: "Ajustes de pago a empleados",
        desc: "Modifica bonificaciones o deducciones salariales personalizadas por empleado.",
      },
    ],
  },
  {
    name: "BUSINESS",
    price: "70.000",
    features: [
      {
        text: "Asignación de servicios a cada barbero",
        desc: "Vincula cortes, lavados o tintes específicos a los barberos que los realizan.",
      },
      {
        text: "Hasta 8 barberos",
        desc: "Soporta hasta ocho perfiles de barberos trabajando de forma simultánea en la app.",
      },
      {
        text: "Gestión de empleados",
        desc: "Controla permisos de acceso al sistema y roles de tu equipo de trabajo.",
      },
      {
        text: "Reportes detallados",
        desc: "Visualiza gráficos de ventas diarias, servicios más pedidos y rendimiento.",
      },
      {
        text: "Apertura y cierre de caja",
        desc: "Lleva un control estricto del efectivo inicial y final de cada jornada laboral.",
      },
      {
        text: "Reportes avanzados",
        desc: "Análisis predictivo de clientes frecuentes, horas pico y proyección de metas.",
      },
      {
        text: "Agendamiento de citas",
        desc: "Tus clientes reservan su espacio de manera digital las 24 horas del día.",
      },
      {
        text: "Comisiones automáticas",
        desc: "Calcula el porcentaje exacto que le corresponde a cada barbero al instante.",
      },
      // {
      //   text: "Notificaciones de citas",
      //   desc: "Envía recordatorios automáticos para reducir el ausentismo de clientes.",
      // },
      {
        text: "Soporte activo",
        desc: "Acceso a nuestro canal de ayuda preferencial vía WhatsApp o correo.",
      },
      // {
      //   text: "Personalización del panel",
      //   desc: "Adapta los colores y el logotipo del sistema con la identidad de tu marca.",
      // },
      {
        text: "Hasta 2 sucursales",
        desc: "Sincroniza y monitorea dos locales diferentes desde una sola cuenta master.",
      },
      {
        text: "Automatización de tus finanzas básicas",
        desc: "Automatiza el cálculo de ingresos netos restando los costos operativos esenciales.",
      },
      {
        text: "Historial de pagos y gastos",
        desc: "Registro completo de todos los egresos, compras de insumos y salarios.",
      },
      {
        text: "Ajustes de pago a empleados",
        desc: "Modifica bonificaciones o deducciones salariales personalizadas por empleado.",
      },
    ],
  },
];

export function PricingSection({ scrollToContact }) {
  // Estado para capturar qué feature tiene el tooltip activo
  const [activeTooltip, setActiveTooltip] = useState(null);

  return (
    <section id="price" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Planes profesionales y transparentes
          </h2>
          <p className="text-lg text-slate-400">
            Elige el plan que mejor se adapte a tu negocio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {AVAILABLE_PLANS.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-xl p-6 border transition-all ${
                plan.popular
                  ? "bg-indigo-600/10 border-indigo-500 relative"
                  : "bg-slate-800 border-slate-700"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full">
                  Plan independiente
                </div>
              )}
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-3xl font-bold text-white">
                  ${plan.price}
                </span>
                <span className="text-slate-400">/mes</span>
              </div>

              {/* Grid adaptado para móviles (1 columna por defecto, 2 en pantallas sm) */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mb-6">
                {plan.features.map((feature, fIdx) => {
                  const tooltipId = `${idx}-${fIdx}`;
                  const isVisible = activeTooltip === tooltipId;

                  return (
                    <li
                      key={fIdx}
                      className="flex items-start gap-2 relative group"
                      onMouseEnter={() => setActiveTooltip(tooltipId)}
                      onMouseLeave={() => setActiveTooltip(null)}
                      onTouchStart={(e) => {
                        e.stopPropagation();
                        setActiveTooltip(isVisible ? null : tooltipId);
                      }}
                    >
                      <CheckCircle className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-300 border-b border-dotted border-slate-600 pb-0.5 leading-tight select-none cursor-pointer inline md:hover:text-slate-100">
                        {feature.text}{" "}
                        <Info className="w-3.5 h-3.5 text-slate-400 inline align-text-top ml-0.5" />
                      </span>

                      {/* Tooltip con descripción flotante manteniendo el estilo oscuro integrado */}
                      {isVisible && (
                        <div className="absolute bottom-full left-0 mb-2 w-56 p-3 bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg shadow-xl z-30 pointer-events-none">
                          {feature.desc}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>

              <a
                href="/register"
                className={`block text-center py-2.5 rounded-lg font-medium transition-colors cursor-pointer ${
                  plan.popular
                    ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                    : "bg-slate-700 hover:bg-slate-600 text-white"
                }`}
              >
                Iniciar prueba gratis de 20 días
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
