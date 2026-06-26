import { useAuth } from '../contexts/AuthContext';
import { hasPermission } from '../config/permissions';

/**
 * Hook para verificar permisos en componentes.
 * Uso: const { can } = usePermissions();
 *      if (can(FEATURES.MANAGE_EMPLOYEES)) { ... }
 */
export function usePermissions() {
  const { user } = useAuth();

  const can = (feature) => {
    if (!user) return false;
    return hasPermission(user.role, user.membership ?? null, feature);
  };

  return { can };
}
