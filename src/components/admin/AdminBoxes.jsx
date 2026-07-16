import { usePermissions } from "../../hooks/usePermissions";
import { FEATURES } from "../../config/permissions";
import { ChevronRight, Plus } from "lucide-react";
import { useState } from "react";
import { ActiveBoxCard } from "./box/ActiveBoxCard";
import { BoxDetailModal } from "./box/BoxDetailModal";
import { useBoxes } from "../../hooks/boxes/useBoxes";
import ConfirmModal from "../modals/ConfirmModal";
import BoxCloseModal from "./box/BoxCloseModal";
import DataTable from "../ui/DataTable";

// -----------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------
const fmt = (val) => `$${(val || 0).toLocaleString("es-CO")}`;
const fmtDate = (val) =>
  val
    ? new Date(val).toLocaleDateString("es-CO", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";
const fmtTime = (val) =>
  val
    ? new Date(val).toLocaleTimeString("es-CO", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

const STATUS_CONFIG = {
  OPEN: {
    label: "Abierta",
    bg: "bg-green-500/20",
    text: "text-green-400",
    dot: "bg-green-400",
  },
  CLOSED: {
    label: "Cerrada",
    bg: "bg-slate-500/20",
    text: "text-slate-400",
    dot: "bg-slate-400",
  },
};

export default function AdminBoxes() {
  const { can } = usePermissions();
  const { data: boxes, isLoading, refetch, openBox, closeBox } = useBoxes();
  const [selectedBox, setSelectedBox] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showOpenModal, setShowOpenModal] = useState(false);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [actualCash, setActualCash] = useState(0);

  const activeBox = boxes.find((b) => b.status === "OPEN") ?? null;
  const closedBoxes = boxes.filter((b) => b.status === "CLOSED");

  const handleViewDetails = (box) => {
    setSelectedBox(box);
    setShowDetailModal(true);
  };

  const handleCloseBox = (box) => {
    setSelectedBox(box);
    setShowCloseModal(true);
  };

  const confirmOpenBox = async () => {
    await openBox();
    await refetch();
    setShowOpenModal(false);
  };

  const columns = [
    {
      header: "Apertura",
      accessor: "openedAt",
      render: (value) => fmtDate(value) + " " + fmtTime(value),
    },
    {
      header: "Abierta por",
      accessor: "openedByUser",
    },
    {
      header: "Estado",
      accessor: "status",
      render: (value) => {
        const cfg = STATUS_CONFIG[value] || STATUS_CONFIG.CLOSED;
        return (
          <span
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
            {cfg.label}
          </span>
        );
      },
    },
    {
      header: "Total del día",
      accessor: "total",
      render: (value) => fmt(value),
    },
    {
      header: "Cierre",
      accessor: "closedAt",
      render: (value) => fmtDate(value) + " " + fmtTime(value),
    },
    {
      header: "Acciones",
      accessor: "id",
      render: (_, row) => (
        <button
          onClick={() => handleViewDetails(row)}
          className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          Detalles
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-white">Cajas diarias</h2>
          <p className="text-slate-400 text-sm">
            Control y registro de apertura/cierre
          </p>
        </div>

        {!activeBox && (
          <button
            onClick={() => setShowOpenModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Abrir caja
          </button>
        )}
      </div>

      <ActiveBoxCard
        box={activeBox}
        onViewDetails={handleViewDetails}
        onClose={handleCloseBox}
        fmt={fmt}
        fmtDate={fmtDate}
        fmtTime={fmtTime}
      />

      <div>
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
          Historial
        </h3>
        <DataTable
          data={closedBoxes}
          columns={columns}
          itemsPerPage={6}
          searchable
          searchPlaceholder="Buscar por fecha o usuario..."
          searchFields={["openedByUser", "closedByUser"]}
          emptyMessage={isLoading ? "Cargando..." : "No hay cajas cerradas aún"}
          minWidth={500}
        />
      </div>

      <ConfirmModal
        isOpen={showOpenModal}
        onClose={() => setShowOpenModal(false)}
        onConfirm={confirmOpenBox}
        itemName={"abrir nueva caja"}
      />

      <BoxDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        box={selectedBox}
        fmt={fmt}
        fmtDate={fmtDate}
        fmtTime={fmtTime}
        STATUS_CONFIG={STATUS_CONFIG}
      />

      <BoxCloseModal
        isOpen={showCloseModal}
        onClose={() => setShowCloseModal(false)}
        onConfirm={async(actualCash) => {
            await closeBox(selectedBox.id, actualCash);
            await refetch();
            setShowCloseModal(false);
        }}
        box={selectedBox}
      />
    </div>
  );
}
