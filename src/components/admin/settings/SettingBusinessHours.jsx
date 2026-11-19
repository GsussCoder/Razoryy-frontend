import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

const DIAS = [
  { value: "MONDAY",    label: "Lunes" },
  { value: "TUESDAY",   label: "Martes" },
  { value: "WEDNESDAY", label: "Miércoles" },
  { value: "THURSDAY",  label: "Jueves" },
  { value: "FRIDAY",    label: "Viernes" },
  { value: "SATURDAY",  label: "Sábado" },
  { value: "SUNDAY",    label: "Domingo" },
];

// Datos de prueba (simulan el GET /api/v1/business-hour)
const MOCK_DATA = [
  { id: "a1b2c3d-1111-4aaa-8bbb-000000000001", dayOfWeek: "MONDAY",    openTime: "09:00", closeTime: "18:00", isClosed: false },
  { id: "a1b2c3d-1111-4aaa-8bbb-000000000002", dayOfWeek: "TUESDAY",   openTime: "09:00", closeTime: "18:00", isClosed: false },
  { id: "a1b2c3d-1111-4aaa-8bbb-000000000003", dayOfWeek: "WEDNESDAY", openTime: "09:00", closeTime: "18:00", isClosed: false },
  { id: "a1b2c3d-1111-4aaa-8bbb-000000000004", dayOfWeek: "THURSDAY",  openTime: "09:00", closeTime: "18:00", isClosed: false },
  { id: "a1b2c3d-1111-4aaa-8bbb-000000000005", dayOfWeek: "FRIDAY",    openTime: "09:00", closeTime: "18:00", isClosed: false },
  { id: "a1b2c3d-1111-4aaa-8bbb-000000000006", dayOfWeek: "SATURDAY",  openTime: "10:00", closeTime: "14:00", isClosed: false },
  // DOMINGO no está → cerrado
];

export default function SettingBusinessHours() {
  const [horarios, setHorarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  // ─── Cargar (CONECTAR API: reemplaza por tu GET) ───
  useEffect(() => {
    const cargar = async () => {
        await new Promise((resolve) => setTimeout(resolve, 400));
      // CONECTAR API:
      // const { data } = await api.get("/api/v1/business-hour");
      // setHorarios(data.days ?? data);
      setHorarios(MOCK_DATA);
      setCargando(false);
    };
    cargar();
  }, []);

  // ─── Toggle abrir/cerrar ───
  const toggleDia = (dayOfWeek) => {
    setHorarios((prev) => {
      const existe = prev.find((h) => h.dayOfWeek === dayOfWeek);

      if (!existe) {
        return [
          ...prev,
          { dayOfWeek, openTime: "09:00", closeTime: "18:00", isClosed: false, esNuevo: true },
        ];
      }

      if (!existe.isClosed) {
        if (existe.esNuevo) {
          return prev.filter((h) => h.dayOfWeek !== dayOfWeek);
        }
        return prev.map((h) =>
          h.dayOfWeek === dayOfWeek ? { ...h, isClosed: true } : h
        );
      }

      return prev.map((h) =>
        h.dayOfWeek === dayOfWeek ? { ...h, isClosed: false } : h
      );
    });
  };

  // ─── Actualizar hora ───
  const actualizarHora = (dayOfWeek, campo, valor) => {
    setHorarios((prev) =>
      prev.map((h) =>
        h.dayOfWeek === dayOfWeek ? { ...h, [campo]: valor } : h
      )
    );
  };

  // ─── Guardar (CONECTAR API: reemplaza por tus POST/PATCH/DELETE) ───
  const guardarTodo = async () => {
    setGuardando(true);
    setMensaje(null);

    await new Promise((resolve) => setTimeout(resolve, 600));

    // CONECTAR API:
    // for (const h of horarios) {
    //   if (h.isClosed && h.id) {
    //     await api.delete(`/api/v1/business-hour/${h.id}`);
    //   } else if (h.esNuevo) {
    //     await api.post("/api/v1/business-hour", h);
    //   } else {
    //     await api.patch("/api/v1/business-hour", h);
    //   }
    // }

    setGuardando(false);
    setMensaje("Horarios guardados correctamente");
  };

  if (cargando) {
    return (
      <div className="flex items-center justify-center p-16 text-slate-400">
        Cargando horarios...
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Horarios del local
        </h3>
        <button
          onClick={guardarTodo}
          disabled={guardando}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 text-sm whitespace-nowrap cursor-pointer"
        >
          {guardando ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>

      {mensaje && (
        <p className="mb-4 text-sm text-green-400">{mensaje}</p>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left px-3 py-2.5 text-xs font-semibold text-slate-400 uppercase">Día</th>
              <th className="text-left px-3 py-2.5 text-xs font-semibold text-slate-400 uppercase">Estado</th>
              <th className="text-left px-3 py-2.5 text-xs font-semibold text-slate-400 uppercase">Apertura</th>
              <th className="text-left px-3 py-2.5 text-xs font-semibold text-slate-400 uppercase">Cierre</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/60">
            {DIAS.map((dia) => {
              const registro = horarios.find((h) => h.dayOfWeek === dia.value);
              const cerrado = !registro || registro.isClosed;

              return (
                <tr key={dia.value} className="hover:bg-slate-700/30">
                  <td className="px-3 py-3 font-medium text-white">{dia.label}</td>

                  <td className="px-3 py-3">
                    <button
                      type="button"
                      onClick={() => toggleDia(dia.value)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        cerrado ? "bg-slate-600" : "bg-indigo-600"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          cerrado ? "translate-x-1" : "translate-x-6"
                        }`}
                      />
                    </button>
                    <span className={`ml-2 text-sm ${cerrado ? "text-slate-500" : "text-slate-300"}`}>
                      {cerrado ? "Cerrado" : "Abierto"}
                    </span>
                  </td>

                  <td className="px-3 py-3">
                    <input
                      type="time"
                      value={registro?.openTime ?? "09:00"}
                      disabled={cerrado}
                      onChange={(e) => actualizarHora(dia.value, "openTime", e.target.value)}
                      className="w-full rounded-lg bg-slate-900 border border-slate-600 px-2 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-900/50 disabled:text-slate-600 disabled:cursor-not-allowed"
                    />
                  </td>
                  <td className="px-3 py-3">
                    <input
                      type="time"
                      value={registro?.closeTime ?? "18:00"}
                      disabled={cerrado}
                      onChange={(e) => actualizarHora(dia.value, "closeTime", e.target.value)}
                      className="w-full rounded-lg bg-slate-900 border border-slate-600 px-2 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-900/50 disabled:text-slate-600 disabled:cursor-not-allowed"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}