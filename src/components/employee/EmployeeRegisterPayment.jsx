import { AlertCircle } from 'lucide-react';

export default function EmployeeRegisterPayment() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Registrar Pago</h2>
        <p className="text-slate-400">Registra un pago por un servicio realizado</p>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 p-8 text-center">
        <AlertCircle className="w-12 h-12 text-slate-500 mx-auto mb-3" />
        <p className="text-slate-400">Implementa aquí el registro de pagos usando apiClient</p>
        <p className="text-sm text-slate-500 mt-2">
          Endpoint: POST /api/payments
        </p>
      </div>
    </div>
  );
}
