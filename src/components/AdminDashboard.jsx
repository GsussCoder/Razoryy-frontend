import { Routes, Route } from 'react-router-dom';
import AdminLayout from './admin/AdminLayout';
import AdminOverview from './admin/AdminOverview';
import AdminAppointments from './admin/AdminAppointments';
import AdminEmployees from './admin/AdminEmployees';
import AdminServices from './admin/AdminServices';
import AdminProducts from './admin/AdminProducts';
import AdminExpenses from './admin/AdminExpenses';
import AdminPayments from './admin/AdminPayments';
import AdminSettings from './admin/AdminSettings';
import UserAccount from './UserAccount';

export default function AdminDashboard() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<AdminOverview />} />
        <Route path="appointments" element={<AdminAppointments />} />
        <Route path="employees" element={<AdminEmployees />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="expenses" element={<AdminExpenses />} />
        <Route path="payments" element={<AdminPayments />} />
        <Route path="settings" element={<AdminSettings />} />
        {/* <Route path="account" element={<UserAccount />} /> */}
      </Route>
    </Routes>
  );
}
