// src/config/permissions.js

export const FEATURES = {
  NAV_APPOINTMENTS: "nav:appointments",
  NAV_EMPLOYEES: "nav:employees",
  NAV_SERVICES: "nav:services",
  NAV_PRODUCTS: "nav:products",
  NAV_EXPENSES: "nav:expenses",
  NAV_PAYMENTS: "nav:payments",
  NAV_SETTINGS: "nav:settings",
  NAV_TENANTS: "nav:tenants",
  NAV_METRICS: "nav:metrics",
  NAV_USERS: "nav:users",

  MANAGE_EMPLOYEES: "action:manage_employees",
  MANAGE_SERVICES: "action:manage_services",
  MANAGE_PRODUCTS: "action:manage_products",
  VIEW_ALL_PAYMENTS: "action:view_all_payments",
  VIEW_INCOME_STATS: "action:view_income_stats",
  VIEW_ACTIVE_EMPLOYEES: "action:view_active_employees",
  VIEW_ACTIVE_SERVICES: "action:view_active_services",
  VIEW_MY_PAYMENTS: "action:view_my_payments",
  BRAND_SETTINGS: "action:brand_settings",

  EDIT_APPOINTMENTS: "action:edit_appointments", // reprogramar / cambiar motivo — solo ADMIN
  WHATSAPP_NOTIFICATIONS: "action:whatsapp_notifications", // solo professional
};

// ---------- ADMIN: cada plan extiende al anterior ----------
const ADMIN_PRO = [
  FEATURES.NAV_EMPLOYEES,
  FEATURES.NAV_SERVICES,
  FEATURES.NAV_PRODUCTS,
  FEATURES.NAV_EXPENSES,
  FEATURES.NAV_PAYMENTS,
  FEATURES.NAV_SETTINGS,
  FEATURES.NAV_APPOINTMENTS,
  FEATURES.EDIT_APPOINTMENTS,
  FEATURES.MANAGE_EMPLOYEES,
  FEATURES.MANAGE_SERVICES,
  FEATURES.MANAGE_PRODUCTS,
  FEATURES.VIEW_ALL_PAYMENTS,
  FEATURES.VIEW_INCOME_STATS,
];

const ADMIN_BUSINESS = [
  ...ADMIN_PRO,
];

// ---------- EMPLOYEE: cada plan extiende al anterior ----------
const EMPLOYEE_PRO = [
  FEATURES.NAV_PAYMENTS, // registrar pago + ver sus pagos + su cuenta
  FEATURES.NAV_APPOINTMENTS,
  FEATURES.VIEW_INCOME_STATS,
  FEATURES.VIEW_MY_PAYMENTS,
];

const EMPLOYEE_BUSINESS = [
  ...EMPLOYEE_PRO,
];

const PERMISSIONS = {
  superadmin: {
    any: [FEATURES.NAV_METRICS, FEATURES.NAV_TENANTS, FEATURES.NAV_USERS],
  },
  admin: {
    pro: ADMIN_PRO,
    business: ADMIN_BUSINESS,
  },
  employee: {
    pro: EMPLOYEE_PRO,
    business: EMPLOYEE_BUSINESS,
  },
};

export function hasPermission(role, membership, feature) {
  const rolePerms = PERMISSIONS[role];
  if (!rolePerms) return false;
  const key = membership && rolePerms[membership] ? membership : "any";
  const perms = rolePerms[key] || [];
  return perms.includes(feature);
}
