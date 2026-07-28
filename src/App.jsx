import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { FEATURES } from "./config/permissions";
import { NAVIGATION_BY_ROLE } from "./config/navigationConfig";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";
import Booking from "./components/booking/Booking";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./layout/AppLayout";
import UserAccount from "./components/UserAccount";
import TicketsPage from "./components/tickets/TicketsPage";
import AppointmentsPage from "./components/appointments/AppointmentsPage";
import AdminOverview from "./components/admin/AdminOverview";
import AdminEmployees from "./components/admin/AdminEmployees";
import AdminServices from "./components/admin/AdminServices";
import AdminProducts from "./components/admin/AdminProducts";
import AdminExpenses from "./components/admin/AdminExpenses";
import AdminPayments from "./components/admin/AdminPayments";
import AdminBoxes from "./components/admin/AdminBoxes";
import AdminSettings from "./components/admin/AdminSettings";
import EmployeeOverview from "./components/employee/EmployeeOverview";
import EmployeeRegisterPayment from "./components/employee/EmployeeRegisterPayment";
import EmployeeMyPayments from "./components/employee/EmployeeMyPayments";
import SuperAdminMetrics from "./components/superadmin/SuperAdminMetrics";
import SuperAdminTenants from "./components/superadmin/SuperAdminTenants";
import SuperAdminUsers from "./components/superadmin/SuperAdminUsers";
import AdminReports from "./components/admin/AdminReports";

function DashboardView() {
  const { user } = useAuth();
  if (user?.role === "admin") return <AdminOverview />;
  if (user?.role === "employee") return <EmployeeOverview />;
  if (user?.role === "superadmin") return <SuperAdminMetrics />;
  return <Navigate to="/login" replace />;
}

function RoleBasedLayout() {
  const { user } = useAuth();
  const config = NAVIGATION_BY_ROLE[user?.role] || NAVIGATION_BY_ROLE.employee;

  return (
    <AppLayout
      topNavConfig={config.top}
      bottomNavConfig={config.bottom}
      roleLabel={config.roleLabel}
    />
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/booking/:barberSlug" element={<Booking />} />

        {/* Rutas Protegidas en Layout */}
        <Route
          element={
            <ProtectedRoute>
              <RoleBasedLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <UserAccount />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assigns"
            element={
              <ProtectedRoute>
                <TicketsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/agenda"
            element={
              <ProtectedRoute>
                <AppointmentsPage />
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
            path="/reports"
            element={
              <ProtectedRoute requiredFeature={FEATURES.NAV_SERVICES}>
                <AdminReports />
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
            path="/boxes"
            element={
              <ProtectedRoute requiredFeature={FEATURES.NAV_BOXES}>
                <AdminBoxes />
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

          {/* Rutas Employee */}
          <Route
            path="/register-payment"
            element={<EmployeeRegisterPayment />}
          />
          <Route path="/my-payments" element={<EmployeeMyPayments />} />

          {/* Rutas SuperAdmin */}
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

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
