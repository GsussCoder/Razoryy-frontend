import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { FEATURES } from './config/permissions';
import Landing from './components/Landing';
import Login from './components/Login';
import Register from  './components/Register';
import ProtectedRoute from './components/ProtectedRoute';

// Layouts
import AdminLayout from './components/admin/AdminLayout';
import EmployeeLayout from './components/employee/EmployeeLayout';
import SuperAdminLayout from './components/superadmin/SuperAdminLayout';

import UserAccount from './components/UserAccount';

// Vistas admin
import AdminOverview from './components/admin/AdminOverview';
import AdminAppointments from './components/admin/AdminAppointments';
import AdminEmployees from './components/admin/AdminEmployees';
import AdminServices from './components/admin/AdminServices';
import AdminProducts from './components/admin/AdminProducts';
import AdminExpenses from './components/admin/AdminExpenses';
import AdminPayments from './components/admin/AdminPayments';
import AdminSettings from './components/admin/AdminSettings';

// Vistas employee
import EmployeeAgenda from './components/employee/EmployeeAgenda';
import EmployeeOverview from './components/employee/EmployeeOverview';
import EmployeeRegisterPayment from './components/employee/EmployeeRegisterPayment';
import EmployeeMyPayments from './components/employee/EmployeeMyPayments';

// Vistas superadmin
import SuperAdminMetrics from './components/superadmin/SuperAdminMetrics';
import SuperAdminTenants from './components/superadmin/SuperAdminTenants';
import SuperAdminUsers from './components/superadmin/SuperAdminUsers';

// Decide qué vista raíz mostrar según el rol del usuario
function DashboardRouter() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'admin')      return <AdminOverview />;
  if (user.role === 'employee')   return <EmployeeOverview />;
  if (user.role === 'superadmin') return <SuperAdminMetrics />;
  return <Navigate to="/login" replace />;
}

// Decide qué layout envuelve las rutas según el rol del usuario
function LayoutRouter() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'admin')      return <AdminLayout />;
  if (user.role === 'employee')   return <EmployeeLayout />;
  if (user.role === 'superadmin') return <SuperAdminLayout />;
  return <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas — todas usan el mismo layout dinámico */}
        <Route
          element={
            <ProtectedRoute>
              <LayoutRouter />
            </ProtectedRoute>
          }
        >
          {/* Ruta raíz del dashboard — despacha por rol */}
          <Route path="/dashboard" element={<DashboardRouter />} />
          <Route path="/account" element={<UserAccount />} />

          {/* Rutas admin */}
          <Route
            path="/appointments"
            element={
              <ProtectedRoute requiredFeature={FEATURES.NAV_APPOINTMENTS}>
                <AdminAppointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employees"
            element={
              <ProtectedRoute requiredFeature={FEATURES.NAV_EMPLOYEES}>
                <AdminEmployees />
              </ProtectedRoute>
            }
          />
          <Route
            path="/services"
            element={
              <ProtectedRoute requiredFeature={FEATURES.NAV_SERVICES}>
                <AdminServices />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute requiredFeature={FEATURES.NAV_PRODUCTS}>
                <AdminProducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expenses"
            element={
              <ProtectedRoute requiredFeature={FEATURES.NAV_EXPENSES}>
                <AdminExpenses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payments"
            element={
              <ProtectedRoute requiredFeature={FEATURES.NAV_PAYMENTS}>
                <AdminPayments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute requiredFeature={FEATURES.NAV_SETTINGS}>
                <AdminSettings />
              </ProtectedRoute>
            }
          />

          {/* Rutas employee */}
          <Route path="/agenda" element={
            <ProtectedRoute requiredFeature={FEATURES.NAV_APPOINTMENTS}>
              <EmployeeAgenda />
            </ProtectedRoute>
          } />
          <Route path="/register-payment" element={<EmployeeRegisterPayment />} />
          <Route path="/my-payments" element={<EmployeeMyPayments />} />
          
          {/* Rutas superadmin */}
          <Route
            path="/metrics"
            element={
              <ProtectedRoute requiredFeature={FEATURES.NAV_METRICS}>
                <SuperAdminMetrics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/barbershops"
            element={
              <ProtectedRoute requiredFeature={FEATURES.NAV_TENANTS}>
                <SuperAdminTenants />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute requiredFeature={FEATURES.NAV_USERS}>
                <SuperAdminUsers />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
