import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Scissors,
  LayoutDashboard,
  Calendar,
  Users,
  ScissorsIcon,
  Package,
  Receipt,
  DollarSign,
  Settings,
  LogOut,
  Menu,
  X,
  User,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useBranding } from "../../contexts/BrandingContext";
import { usePermissions } from "../../hooks/usePermissions";
import { FEATURES } from "../../config/permissions";
import { useState } from "react";

const ALL_NAV_ITEMS = [
  {
    to: "/dashboard",
    label: "Panel de control",
    icon: LayoutDashboard,
    feature: null,
  },
  {
    to: "/appointments",
    label: "Citas",
    icon: Calendar,
    feature: FEATURES.NAV_APPOINTMENTS,
  },
  {
    to: "/employees",
    label: "Empleados",
    icon: Users,
    feature: FEATURES.NAV_EMPLOYEES,
  },
  {
    to: "/services",
    label: "Servicios",
    icon: ScissorsIcon,
    feature: FEATURES.NAV_SERVICES,
  },
  {
    to: "/products",
    label: "Productos",
    icon: Package,
    feature: FEATURES.NAV_PRODUCTS,
  },
  // {
  //   to: "/expenses",
  //   label: "Gastos",
  //   icon: Receipt,
  //   feature: FEATURES.NAV_EXPENSES,
  // },
  {
    to: "/payments",
    label: "Registro de pagos",
    icon: DollarSign,
    feature: FEATURES.NAV_PAYMENTS,
  },
  { to: "/account", label: "Mi cuenta", icon: User, feature: null },
  {
    to: "/settings",
    label: "Configuración",
    icon: Settings,
    feature: FEATURES.NAV_SETTINGS,
  },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const { branding } = useBranding();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { can } = usePermissions();
  const navItems = ALL_NAV_ITEMS.filter(
    (item) => !item.feature || can(item.feature),
  );

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 px-4 lg:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-slate-700 rounded-lg"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
          {branding.logo ? (
            <img
              src={branding.logo}
              alt="Logo"
              className="w-10 h-10 rounded-lg object-cover"
            />
          ) : (
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: branding.primaryColor }}
            >
              <Scissors className="w-5 h-5 text-white" />
            </div>
          )}
          <div>
            <h1 className="text-lg font-bold text-white">
              {/* Razoryy */}
              {branding.barberName}
            </h1>
            <p className="text-xs text-slate-400">Panel de Administrador</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-300 hidden sm:block">
            Bienvenido, {user?.name}
          </span>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
          fixed top-18 lg:sticky lg:top-18.25 inset-y-0 left-0 z-20 w-64 bg-slate-800 border-r border-slate-700 
          transform transition-transform duration-200 lg:transform-none lg:h-[calc(100vh-73px)]
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        >
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.to ||
                (item.to === "/dashboard" &&
                  location.pathname === "/dashboard");
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "text-white"
                      : "text-slate-300 hover:bg-slate-700"
                  }`}
                  style={
                    isActive ? { backgroundColor: branding.primaryColor } : {}
                  }
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </NavLink>
              );
            })}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-2.5 text-red-300 hover:bg-red-900 rounded-lg transition-colors text-sm cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span className="sm:inline">Salir</span>
            </button>
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-10 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0 p-4 lg:p-6 min-h-[calc(100vh-73px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
