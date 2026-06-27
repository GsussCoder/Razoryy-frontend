import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { Shield, Building2, BarChart3, LogOut, Menu, X, User } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

const navItems = [
  { to: "/dashboard", label: "Métricas", icon: BarChart3 },
  { to: "/barbershops", label: "Barberías", icon: Building2 },
  { to: "/users", label: "Usuarios", icon: User },
];

export default function SuperAdminLayout() {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
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
          <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">Razoryy</h1>
            <p className="text-xs text-slate-400">Super Administrador</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-300 hidden sm:block">
            Hola, {user?.name}
          </span>
        </div>
      </header>

      <div className="flex">
        <aside
          className={`
          fixed top-18 lg:sticky lg:top-[73px] inset-y-0 left-0 z-20 w-64 bg-slate-800 border-r border-slate-700 
          transform transition-transform duration-200 lg:transform-none lg:h-[calc(100vh-73px)]
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        >
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-indigo-500 text-white"
                      : "text-slate-300 hover:bg-slate-700"
                  }`}
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

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-10 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 min-w-0 p-4 lg:p-6 min-h-[calc(100vh-73px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
