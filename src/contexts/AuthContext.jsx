import { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "../services/authApi";

// Mapa de normalización: backend → frontend
const ROLE_MAP = {
  SUPER_ADMIN: "superadmin",
  ADMIN: "admin",
  EMPLOYEE: "employee",
};

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Restaurar sesión desde sessionStorage al cargar
    const savedUser = sessionStorage.getItem("authUser");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        logout();
      }
    }

    setIsLoading(false);
  }, []);

  const login = (apiResponse) => {
    const {
      id,
      name,
      user: username,
      role,
      isActive,
      tenantId,
      barberName,
      membership,
      barberSlug,
      barbershopLogo,
      telegramConnected
    } = apiResponse;

    // Normalizar rol
    const normalizedRole = ROLE_MAP[role] || role.toLowerCase();

    // Normalizar membresía
    const MEMBERSHIP_MAP = {
      BASIC: "basic",
      STANDARD: "standard",
      PROFESSIONAL: "professional",
    };
    const normalizedMembership = membership
      ? MEMBERSHIP_MAP[membership] || membership.toLowerCase()
      : null;

    const userData = {
      id,
      name,
      user: username,
      role: normalizedRole,
      isActive,
      tenantId: tenantId || null,
      barberName: barberName,
      membership: normalizedMembership,
      barberSlug: barberSlug,
      barbershopLogo: barbershopLogo,
      telegramConnected: telegramConnected,
    };

    setUser(userData);
    sessionStorage.setItem("authUser", JSON.stringify(userData));
  };

  const updateUser = (partialUser) => {
    const newUser = { ...user, ...partialUser };

    setUser(newUser);

    sessionStorage.setItem("authUser", JSON.stringify(newUser));
  };

  const logout = async () => {
    await authApi.logout();
    sessionStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        updateUser,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
}
