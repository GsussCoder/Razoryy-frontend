import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { hasPermission } from '../config/permissions';

/**
 * Protege rutas verificando autenticación y opcionalmente un feature requerido.
 * @param {string} [requiredFeature] - Si se pasa, verifica que el usuario tenga ese permiso.
 */
export default function ProtectedRoute({ children, requiredFeature }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredFeature && !hasPermission(user.role, user.membership ?? null, requiredFeature)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
