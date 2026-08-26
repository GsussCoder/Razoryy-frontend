import { useState } from "react";
import {
  Calendar,
  TrendingUp,
  Users,
  PieChart,
  Archive,
  RefreshCw,
} from "lucide-react";
import { useReports } from "../../hooks/useReports";
import { useBoxes } from "../../hooks/boxes/useBoxes";
import { ReportKpiCards } from "./report/ReportKpiCards";
import { RevenueTab } from "./report/RevenueTab";
import { BarbersTab } from "./report/BarbersTab";
import { ExpensesTab } from "./report/ExpensesTab";
import { BoxLookupTab } from "./report/BoxLookupTab";
import { usePageTour } from "../../tours/usePageTour";
import { useBreakpoint } from "../../tours/useBreakpoint";
import { createReportsTour } from "../../tours/steps/reportsTour";

const TABS = [
  { id: "revenue", label: "Ingresos diarios", icon: TrendingUp },
  { id: "expenses", label: "Gastos por categoría", icon: PieChart },
  { id: "barbers", label: "Rendimiento de empleados", icon: Users },
  { id: "box", label: "Consulta de caja", icon: Archive },
];

export default function AdminReports() {
  const today = new Date().toISOString().split("T")[0];
  const firstDayOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1,
  )
    .toISOString()
    .split("T")[0];

  const [startDate, setStartDate] = useState(firstDayOfMonth);
  const isMobile = useBreakpoint();

  usePageTour("reports", () => createReportsTour({ isMobile }));
  const [endDate, setEndDate] = useState(today);
  const [activeTab, setActiveTab] = useState("revenue");
  const [selectedBox, setSelectedBox] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    balance,
    revenue,
    expenses,
    barbers,
    isLoading,
    error,
    refetch,
    boxReport,
    isLoadingBox,
    boxError,
    fetchBoxReport,
  } = useReports({ startDate, endDate });

  const { data: boxes = [], isLoading: isLoadingBoxes } = useBoxes();

  const handleSelectBox = (box) => {
    setSelectedBox(box);
    fetchBoxReport(box.id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBox(null);
  };

  return (
    <div id="panel-reports" className="space-y-4">
      {/* Header Principal */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Reportes</h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Métricas financieras, rendimiento operativo y auditoría
          </p>
        </div>

        {/* Filtros de Fecha Adaptables */}
        <div id="data-filter-date-range" className="flex items-center gap-2 w-full md:w-auto">
          <div className="flex-1 md:flex-none bg-slate-800/80 border border-slate-700 p-2 sm:px-3 sm:py-1.5 rounded-xl">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-1.5 sm:hidden">
              <Calendar className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>Rango de fechas:</span>
            </div>

            <div className="grid grid-cols-2 sm:flex sm:items-center gap-2">
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                <Calendar className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Desde:</span>
              </div>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="scheme-dark bg-slate-950 border border-slate-800 text-white rounded-lg text-xs px-2 py-1.5 focus:outline-none focus:border-indigo-500 w-full"
              />
              <span className="hidden sm:inline text-slate-500 font-medium text-xs">hasta</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="scheme-dark bg-slate-950 border border-slate-800 text-white rounded-lg text-xs px-2 py-1.5 focus:outline-none focus:border-indigo-500 w-full"
              />
            </div>
          </div>

          <button
            onClick={() => refetch(true)}
            title="Recargar datos"
            className="p-2.5 sm:p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 rounded-xl transition-colors cursor-pointer shrink-0 self-stretch sm:self-auto flex items-center justify-center"
          >
            <RefreshCw
              className={`w-4 h-4 sm:w-3.5 sm:h-3.5 ${
                isLoading ? "animate-spin text-indigo-400" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Alerta de Error */}
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400">
          {error}
        </div>
      )}

      {/* Tarjetas KPI */}
      <ReportKpiCards balance={balance} isLoading={isLoading} />

      {/* Pestañas de Navegación idénticas al estilo TicketsFilters */}
      <div id="reports-by-operations" className="bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700/80 flex items-center gap-1.5 overflow-x-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "bg-slate-900/40 text-slate-400 hover:text-white hover:bg-slate-700/50"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-slate-400"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Vistas Secundarias */}
      <div>
        {activeTab === "revenue" && (
          <RevenueTab revenue={revenue} isLoading={isLoading} />
        )}
        {activeTab === "barbers" && (
          <BarbersTab barbers={barbers} isLoading={isLoading} />
        )}
        {activeTab === "expenses" && (
          <ExpensesTab expenses={expenses} isLoading={isLoading} />
        )}
        {activeTab === "box" && (
          <BoxLookupTab
            boxes={boxes}
            isLoadingBoxes={isLoadingBoxes}
            selectedBox={selectedBox}
            boxReport={boxReport}
            isLoadingBox={isLoadingBox}
            boxError={boxError}
            onSelectBox={handleSelectBox}
            isModalOpen={isModalOpen}
            onCloseModal={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
}