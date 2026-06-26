import { Routes, Route } from 'react-router-dom';
import EmployeeLayout from './employee/EmployeeLayout';
import EmployeeAgenda from './employee/EmployeeAgenda';
import EmployeeOverview from './employee/EmployeeOverview';
import EmployeeRegisterPayment from './employee/EmployeeRegisterPayment';
import EmployeeMyPayments from './employee/EmployeeMyPayments';
import UserAccount from './UserAccount';

export default function EmployeeDashboard() {
  return (
    <Routes>
      <Route element={<EmployeeLayout />}>
        <Route index element={<EmployeeOverview />} />
        <Route path="my-payments" element={<EmployeeMyPayments />} />
        <Route path="account" element={<UserAccount />} />
      </Route>
    </Routes>
  );
}
