import { useState, useEffect } from "react";
import {
  Building2,
  Users,
  DollarSign,
  Activity,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { apiClient } from "../../services/apiClient";

export default function SuperAdminMetrics() {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadTenants();
  }, []);

  const loadTenants = async () => {
    try {
      const data = await apiClient.get("/api/tenants");
      setTenants(data);
    } catch (err) {
      setError("Error al cargar tenants");
      console.error("Error loading tenants:", err);
    } finally {
      setLoading(false);
    }
  };

  const activeTenants = tenants.filter((t) => t.isActive);
  const mrr = activeTenants.reduce(
    (sum, t) => sum + (t.membershipPrice || 0),
    0,
  );

  const stats = [
    {
      icon: Building2,
      label: "Barberias activas",
      value: activeTenants.length,
      color: "bg-indigo-500",
    },
    {
      icon: Users,
      label: "Total barberias",
      value: tenants.length,
      color: "bg-emerald-500",
    },
    {
      icon: DollarSign,
      label: "MRR estimado",
      value: `$${mrr.toLocaleString()}`,
      color: "bg-purple-500",
    },
    {
      icon: Activity,
      label: "Estado del sistema",
      value: "Operativo",
      color: "bg-blue-500",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Métricas Globales</h2>
        <p className="text-slate-400">Vista y estado general del sistema</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-sm flex items-center gap-4"
          >
            <div
              className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center shrink-0`}
            >
              <stat.icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col min-w-0">
              <p className="text-xs font-medium text-slate-400 truncate">
                {stat.label}
              </p>
              <p className="text-xl font-bold text-white tracking-tight">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Membership breakdown */}
      <div className="mt-8 bg-slate-800 rounded-xl border border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Distribución por plan
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["BASIC", "STANDARD", "PROFESSIONAL"].map((plan) => {
            const count = tenants.filter((t) => t.membership === plan).length;
            return (
              <div
                key={plan}
                className="bg-slate-700/50 rounded-lg p-4 text-center"
              >
                <p className="text-sm text-slate-400">{plan}</p>
                <p className="text-2xl font-bold text-white mt-1">{count}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
