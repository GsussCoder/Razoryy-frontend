import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useBranding } from "../contexts/BrandingContext";
import { TourManager } from "./TourManager";
import { TourStorage } from "./storage";
import { useBreakpoint } from "./useBreakpoint";

// El superadmin es tu panel: nunca recibe onboarding.
const EXCLUDED_ROLES = ["superadmin"];

/**
 * Debe montarse DENTRO del Router (usa useLocation) y DENTRO de AuthProvider
 * (usa useAuth). Ver App.jsx: envuelve <Routes>.
 *
 * Cada vez que cambia la ruta:
 * 1. Deriva el id de la página desde el pathname ("/employees" -> "employees").
 * 2. Si el usuario no ha visto el tour del sidebar, lo encadena primero.
 * 3. Luego arranca (si existe y no fue completado) el tour propio de esa página.
 *
 * Así, "sidebar" se ve una única vez en toda la sesión del usuario (la
 * primera página que visite), y cada panel enseña solo lo suyo.
 */
export default function TourProvider({ children }) {
  const location = useLocation();
  const { user } = useAuth();
  const { branding } = useBranding();
  const isMobile = useBreakpoint();

  // El tour usa el color de marca del tenant como acento (botones, progreso).
  // Si no hay branding cargado aún, cae al emerald por defecto (ver theme.css).
  useEffect(() => {
    if (branding?.primaryColor) {
      document.documentElement.style.setProperty(
        "--tour-accent",
        branding.primaryColor,
      );
    }
  }, [branding?.primaryColor]);

  useEffect(() => {
    if (!user || EXCLUDED_ROLES.includes(user.role)) return;

    const pageId = location.pathname.replace(/^\//, "").split("/")[0];
    if (!pageId) return;

    const ctx = { role: user.role, isMobile };

    const chain = [];
    if (!TourStorage.isCompleted("sidebar")) chain.push("sidebar");
    if (pageId !== "sidebar") chain.push(pageId);

    if (chain.length === 0) return;

    // Pequeño delay para dar tiempo a que el DOM de la página (y sus ids)
    // termine de montarse antes de intentar resaltar elementos.
    const timeout = setTimeout(() => {
      TourManager.startChain(chain, ctx);
    }, 250);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, user?.role, isMobile]);

  return children;
}
