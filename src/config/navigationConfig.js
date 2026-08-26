import {
  LayoutDashboard,
  Calendar,
  Users,
  ScissorsIcon,
  Package,
  DollarSign,
  Archive,
  ListOrdered,
  Wallet,
  Settings,
  User,
  BanknoteArrowUp,
  ChartNoAxesCombinedIcon,
} from "lucide-react";
import { FEATURES } from "./permissions";

export const NAVIGATION_BY_ROLE = {
  admin: {
    roleLabel: "Admin",
    top: [
      {
        to: "/dashboard",
        label: "Panel de control",
        icon: LayoutDashboard,
        feature: null,
      },
      {
        to: "/agenda",
        label: "Calendario de citas",
        icon: Calendar,
        feature: FEATURES.NAV_APPOINTMENTS,
      },
      {
        to: "/assigns",
        label: "Historial de servicios",
        icon: ListOrdered,
        feature: FEATURES.NAV_SERVICES,
      },
      {
        to: "/boxes",
        label: "Registro de cajas",
        icon: Archive,
        feature: FEATURES.NAV_BOXES,
      },
      {
        to: "/payments",
        label: "Registros financieros",
        icon: DollarSign,
        feature: FEATURES.NAV_PAYMENTS,
      },
      {
        to: "/expenses",
        label: "Gastos",
        icon: BanknoteArrowUp,
        feature: FEATURES.NAV_PAYMENTS,
      },
      {
        to: "/reports",
        label: "Reportes",
        icon: ChartNoAxesCombinedIcon,
        feature: FEATURES.NAV_PAYMENTS,
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
    ],
    bottom: [
      { to: "/account", label: "Mi cuenta", icon: User, feature: null },
      {
        to: "/settings",
        label: "Configuración",
        icon: Settings,
        feature: FEATURES.NAV_SETTINGS,
      },
    ],
  },
  employee: {
    roleLabel: "Empleado",
    top: [
      {
        to: "/dashboard",
        label: "Panel de control",
        icon: LayoutDashboard,
        feature: null,
      },
      {
        to: "/assigns",
        label: "Mis Servicios",
        icon: ListOrdered,
        feature: null,
      },
      {
        to: "/agenda",
        label: "Mis citas",
        icon: Calendar,
        feature: FEATURES.NAV_APPOINTMENTS,
      },
      { to: "/my-payments", label: "Mis pagos", icon: Wallet, feature: null },
    ],
    bottom: [{ to: "/account", label: "Mi cuenta", icon: User, feature: null }],
  },
  superadmin: {
    roleLabel: "Super admin",
    top: [
      {
        to: "/metrics",
        label: "Métricas Globales",
        icon: LayoutDashboard,
        feature: FEATURES.NAV_METRICS,
      },
      {
        to: "/barbershops",
        label: "Barberías",
        icon: Users,
        feature: FEATURES.NAV_TENANTS,
      },
      {
        to: "/users",
        label: "Usuarios",
        icon: Users,
        feature: FEATURES.NAV_USERS,
      },
    ],
    bottom: [{ to: "/account", label: "Mi cuenta", icon: User, feature: null }],
  },
};
