import { useEffect, useState, useRef } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const STYLES = {
  success: { Icon: CheckCircle2, border: 'border-green-500/30', bg: 'bg-green-500/10', icon: 'text-green-400', bar: 'bg-green-500' },
  error:   { Icon: XCircle,      border: 'border-red-500/30',   bg: 'bg-red-500/10',   icon: 'text-red-400',   bar: 'bg-red-500' },
  warning: { Icon: AlertTriangle,border: 'border-yellow-500/30',bg: 'bg-yellow-500/10',icon: 'text-yellow-400',bar: 'bg-yellow-500' },
  info:    { Icon: Info,         border: 'border-indigo-500/30',bg: 'bg-indigo-500/10',icon: 'text-indigo-400',bar: 'bg-indigo-500' },
};

export default function Toast({ id, message, type = 'info', duration = 5000, onDismiss }) {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [dragX, setDragX] = useState(0);
  const dragStartX = useRef(null);
  const timerRef = useRef(null);

  const style = STYLES[type] || STYLES.info;
  const { Icon } = style;

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const close = () => {
    setLeaving(true);
    setTimeout(() => onDismiss(id), 200);
  };

  useEffect(() => {
    if (duration <= 0) return;
    timerRef.current = setTimeout(close, duration);
    return () => clearTimeout(timerRef.current);
  }, [duration]);

  // Deslizar para descartar en móvil
  const handleTouchStart = (e) => {
    dragStartX.current = e.touches[0].clientX;
    clearTimeout(timerRef.current);
  };
  const handleTouchMove = (e) => {
    if (dragStartX.current === null) return;
    setDragX(e.touches[0].clientX - dragStartX.current);
  };
  const handleTouchEnd = () => {
    if (Math.abs(dragX) > 100) {
      close();
    } else {
      setDragX(0);
      timerRef.current = setTimeout(close, duration);
    }
    dragStartX.current = null;
  };

  return (
    <div
      role="alert"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        transform: `translateX(${dragX}px)`,
        opacity: dragX !== 0 ? Math.max(1 - Math.abs(dragX) / 200, 0.3) : undefined,
      }}
      className={`relative w-full overflow-hidden rounded-xl border ${style.border} ${style.bg} backdrop-blur-sm shadow-lg shadow-black/20 transition-all duration-200 ease-out ${
        visible && !leaving
          ? 'opacity-100 translate-y-0 sm:translate-x-0'
          : 'opacity-0 translate-y-2 sm:translate-y-0 sm:translate-x-4'
      }`}
    >
      <div className="flex items-start gap-3 p-4">
        <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${style.icon}`} />
        <p className="flex-1 text-sm text-slate-200 leading-snug">{message}</p>
        <button
          onClick={close}
          aria-label="Cerrar notificación"
          className="shrink-0 text-slate-500 hover:text-slate-300 transition-colors -m-1 p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {duration > 0 && (
        <div className="h-1 w-full bg-slate-700/50">
          <div className={`h-full ${style.bar}`} style={{ animation: `toast-progress ${duration}ms linear forwards` }} />
        </div>
      )}
    </div>
  );
}