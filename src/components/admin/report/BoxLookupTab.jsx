import React from "react";
import { Clock, Eye, Loader2 } from "lucide-react";
import DataTable from "../../ui/DataTable";
import BoxDetailsModal, {
  formatCurrency,
  fmtDateTime,
  StatusBadge,
} from "./BoxDetailModal";

export function BoxLookupTab({
  boxes = [],
  isLoadingBoxes,
  selectedBox,
  boxReport,
  isLoadingBox,
  boxError,
  onSelectBox,
  isModalOpen,
  onCloseModal,
}) {
  const columns = [
    {
      header: "Estado",
      accessor: "status",
      render: (v) => <StatusBadge status={v} />,
    },
    {
      header: "Abrió",
      accessor: "openedByUser",
      render: (v) => (
        <span className="text-xs font-medium text-white">{v || "—"}</span>
      ),
    },
    {
      header: "Apertura",
      accessor: "openedAt",
      render: (v) => (
        <span className="text-xs text-slate-300 font-medium flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          {fmtDateTime(v)}
        </span>
      ),
    },
    {
      header: "Cierre",
      accessor: "closedAt",
      render: (v) => (
        <span className="text-xs text-slate-300 font-medium">
          {v ? fmtDateTime(v) : "—"}
        </span>
      ),
    },
    {
      header: "Total de la caja",
      accessor: "total",
      render: (_, row) => (
        <span className="text-xs font-bold text-white">
          {formatCurrency(
            (row.actualCash || 0) + (row.digitalPaymentsTotal || 0),
          )}
        </span>
      ),
    },
    {
      header: "Acción",
      accessor: "id",
      render: (id, row) => (
        <button
          onClick={() => onSelectBox(row)}
          disabled={isLoadingBox && selectedBox?.id === id}
          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
        >
          {isLoadingBox && selectedBox?.id === id ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Eye className="w-3.5 h-3.5" />
          )}
          Ver detalles
        </button>
      ),
    },
  ];

  return (
    <>
      <DataTable
        data={boxes}
        columns={columns}
        isLoading={isLoadingBoxes}
        itemsPerPage={8}
        emptyMessage="No hay registros de cajas disponibles"
      />

      {/* El modal acoplado elegantemente aquí abajo */}
      <BoxDetailsModal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        isLoadingBox={isLoadingBox}
        boxError={boxError}
        boxReport={boxReport}
      />
    </>
  );
}
