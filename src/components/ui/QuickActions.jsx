export function QuickActions({ actions = [], title = 'Acciones rápidas' }) {
  if (actions.length === 0) return null;

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-sm p-4 lg:p-5">
      <h3 className="text-sm font-semibold text-slate-300 mb-3">{title}</h3>

      {/* Móvil: fila horizontal con scroll + snap. Desktop: columna vertical */}
      <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none -mx-1 px-1 lg:mx-0 lg:px-0 [-webkit-overflow-scrolling:touch]">
        {actions.map((action, idx) => (
          <button
            key={idx}
            onClick={action.onClick}
            className="flex items-center gap-3 shrink-0 lg:shrink lg:w-full snap-start px-4 py-3 bg-slate-900/60 hover:bg-slate-700/60 border border-slate-700 rounded-lg transition-colors text-left whitespace-nowrap lg:whitespace-normal cursor-pointer"
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 bg-slate-800/80`}>
              <action.icon className={`w-4 h-4 ${action.iconColor}`} />
            </div>
            <span className="text-sm font-medium text-slate-200">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}