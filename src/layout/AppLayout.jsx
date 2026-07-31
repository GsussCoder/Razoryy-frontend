import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { Scissors, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useBranding } from "../contexts/BrandingContext";
import { usePermissions } from "../hooks/usePermissions";
import { useState, useEffect } from "react";
import { SidebarBridge } from "../tours/sidebarBridge";
import { usePageTour } from "../tours/usePageTour";
import { useBreakpoint } from "../tours/useBreakpoint";
import {
  createSidebarTour,
  closeMobileSidebarOnExit,
} from "../tours/steps/sidebarTour";

export default function AppLayout({
  topNavConfig = [],
  bottomNavConfig = [],
  roleLabel = "Usuario",
}) {
  const { user, logout } = useAuth();
  const { branding } = useBranding();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { can } = usePermissions();
  const isMobile = useBreakpoint();

  // Permite que el tour (createSidebarTour, ver tours/steps/sidebarTour.js)
  // abra/cierre este drawer en móvil sin acoplar el motor de tours a AppLayout.
  useEffect(() => {
    SidebarBridge.register(
      () => setSidebarOpen(true),
      () => setSidebarOpen(false),
    );
    return () => SidebarBridge.unregister();
  }, []);

  usePageTour("sidebar", () => createSidebarTour({ isMobile }), {
    onDestroyed: () => closeMobileSidebarOnExit(isMobile),
  });

  const filterItems = (items) =>
    items.filter((item) => !item.feature || can(item.feature));

  const topNavItems = filterItems(topNavConfig);
  const bottomNavItems = filterItems(bottomNavConfig);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const renderNavLink = (item) => {
    const isActive = location.pathname === item.to;
    return (
      <NavLink
        key={item.to}
        to={item.to}
        onClick={() => setSidebarOpen(false)}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
          isActive ? "text-white" : "text-slate-300 hover:bg-slate-700"
        }`}
        style={isActive ? { backgroundColor: branding.primaryColor } : {}}
      >
        <item.icon className="w-5 h-5 shrink-0" />
        <span className="truncate">{item.label}</span>
      </NavLink>
    );
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col lg:flex-row">
      {/* Header Mobile */}
      <header className="lg:hidden sticky top-0 z-50 flex items-center justify-between bg-slate-800 border-b border-slate-700 px-4 py-3 shadow-md">
        <div className="flex items-center gap-3 min-w-0">
          {branding.logo ? (
            <img
              src={branding.logo}
              alt="Logo"
              className="w-8 h-8 rounded-lg object-cover shrink-0"
            />
          ) : (
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: branding.primaryColor }}
            >
              <Scissors className="w-4 h-4 text-white" />
            </div>
          )}
          <h1 className="text-sm font-bold text-white truncate">
            {branding.barberName || "Razoryy"}
          </h1>
        </div>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors focus:outline-none"
        >
          {sidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </header>

      {/* Sidebar Desktop y Mobile Drawer */}
      <aside
        className={`fixed lg:sticky top-0 bottom-0 left-0 z-40 w-64 bg-slate-800 border-r border-slate-700 flex flex-col h-screen transform transition-transform duration-200 ease-in-out lg:transform-none pt-14.25 lg:pt-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="hidden lg:flex p-4 border-b border-slate-700 flex-col gap-4">
          <div className="flex items-center gap-3">
            {branding.logo ? (
              <img
                src={branding.logo}
                alt="Logo"
                className="w-10 h-10 rounded-lg object-cover shrink-0"
              />
            ) : (
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: branding.primaryColor }}
              >
                <Scissors className="w-5 h-5 text-white" />
              </div>
            )}
            <div className="min-w-0">
              <h1 className="text-base font-bold text-white truncate">
                {branding.barberName}
              </h1>
              <p className="text-xs text-slate-400 truncate">
                {user?.name} · {roleLabel}
              </p>
            </div>
          </div>
        </div>

        <nav
          id="sidebar-navigation"
          className="flex-1 overflow-y-auto p-4 space-y-1 strict-scrollbar"
        >
          {topNavItems.map(renderNavLink)}
        </nav>

        <div className="p-4 border-t border-slate-700 bg-slate-800/95 space-y-1">
          {bottomNavItems.map(renderNavLink)}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 text-red-400 hover:bg-red-950/40 hover:text-red-300 rounded-lg transition-colors text-sm font-medium cursor-pointer"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span>Salir del sistema</span>
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-35 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
