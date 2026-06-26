import { AlertCircle } from 'lucide-react';

export default function EmployeeAgenda() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Mi Agenda</h2>
        <p className="text-slate-400">Tus citas asignadas</p>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 p-8 text-center">
        <AlertCircle className="w-12 h-12 text-slate-500 mx-auto mb-3" />
        <p className="text-slate-400">Implementa aquí tu agenda de citas usando apiClient</p>
        <p className="text-sm text-slate-500 mt-2">
          Endpoints: GET /api/appointments, POST /api/appointments/&#123;id&#125;/confirm, etc.
        </p>
      </div>
    </div>
  );
}
