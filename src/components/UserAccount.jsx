import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Loader2, HelpCircle } from 'lucide-react';
import { useChangePassword } from '../hooks/userChangePassword';
import { useAuth } from '../contexts/AuthContext';
import { useBreakpoint } from '../tours/useBreakpoint';
import { TourManager } from '../tours/TourManager';
import { TourStorage } from '../tours/storage';

// El superadmin no tiene onboarding: el botón "Ver tutorial de nuevo" no se
// muestra en ese caso (ver misma exclusión en tours/TourProvider.jsx).
const EXCLUDED_ROLES = ['superadmin'];

export default function UserAccount() {
  const { changePassword, loading, error, setError } = useChangePassword();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();
  const isMobile = useBreakpoint();

  const showTourButton = !!user && !EXCLUDED_ROLES.includes(user.role);

  // Varios pasos del tour (stats, accesos rápidos) solo existen en /dashboard,
  // así que navegamos ahí, reseteamos el estado "completado" y disparamos de
  // nuevo la cadena sidebar -> dashboard.
  const handleRestartTour = () => {
    TourStorage.resetAll();
    navigate('/dashboard');
    // Pequeño delay para que AdminOverview/EmployeeOverview terminen de
    // montar y registrar sus tours antes de arrancarlos.
    setTimeout(() => {
      TourManager.startChain(['sidebar', 'dashboard'], {
        role: user.role,
        isMobile,
      });
    }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      await changePassword(password);
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.message || 'Error al cambiar la contraseña');
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Mi Cuenta</h2>
        <p className="text-slate-400">Gestiona tu información de cuenta</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-sm max-w-lg">
        <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5" />
          Cambiar contraseña
        </h3>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Nueva contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
              minLength={6}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Confirmar contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
              minLength={6}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 text-sm font-medium flex items-center justify-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Lock className="w-4 h-4" />
            )}
            {loading ? 'Guardando...' : 'Cambiar contraseña'}
          </button>
        </div>
      </form>

      {showTourButton && (
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-sm max-w-lg mt-6">
          <h3 className="font-semibold text-white mb-2 flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            ¿Necesitas un repaso?
          </h3>
          <p className="text-sm text-slate-400 mb-4">
            Puedes volver a ver el recorrido guiado del panel cuando quieras.
          </p>
          <button
            type="button"
            onClick={handleRestartTour}
            className="w-full py-2.5 bg-slate-700 text-white rounded-lg hover:bg-slate-600 text-sm font-medium flex items-center justify-center gap-2"
          >
            <HelpCircle className="w-4 h-4" />
            Ver tutorial de nuevo
          </button>
        </div>
      )}
    </div>
  );
}
