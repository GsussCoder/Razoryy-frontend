export const STATUS_LABELS = {
  SCHEDULED: "Programada",
  COMPLETED: "Completada",
  CANCELLED: "Cancelada",
};

export const STATUS_CLASSES = {
  SCHEDULED: "bg-indigo-500/10 border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/20",
  COMPLETED: "bg-emerald-500/10 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20",
  CANCELLED: "bg-rose-500/10 border-rose-500/40 text-rose-400 line-through opacity-60 hover:bg-rose-500/20",
};

export const HOURS = Array.from({ length: 13 }, (_, i) => {
  const hour = i + 8;
  return `${hour < 10 ? "0" : ""}${hour}:00`;
});