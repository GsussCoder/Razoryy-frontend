import { Routes, Route } from "react-router-dom";
import SuperAdminLayout from "./superadmin/SuperAdminLayout";
import SuperAdminMetrics from "./superadmin/SuperAdminMetrics";
import SuperAdminTenants from "./superadmin/SuperAdminTenants";
import SuperAdminUsers from "./superadmin/SuperAdminUsers";

export default function SuperAdminDashboard() {
  return (
    <Routes>
      <Route element={<SuperAdminLayout />}>
        <Route index element={<SuperAdminMetrics />} />
        <Route path="barbershops" element={<SuperAdminTenants />} />
        <Route path="users" element={<SuperAdminUsers />} />
      </Route>
    </Routes>
  );
}
