import { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Componente Modal reutilizable
 * 
 * @param {boolean} isOpen - Controla si el modal está visible
 * @param {function} onClose - Función llamada al cerrar el modal
 * @param {ReactNode} children - Contenido del modal
 * @param {string} title - Título del modal (opcional)
 * @param {string} size - Tamaño del modal: 'sm', 'md', 'lg', 'xl' (default: 'md')
 * 
 * @example
 * <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Nuevo usuario">
 *   <form>...</form>
 * </Modal>
 */
export default function Modal({ 
  isOpen, 
  onClose, 
  children, 
  title = null,
  size = 'md' 
}) {
  // Cerrar con Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div className={`relative w-full ${sizeClasses[size]} bg-slate-800 border border-slate-700 rounded-xl shadow-2xl animate-in fade-in zoom-in duration-200`}>
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="px-6 py-4">
          {children}
        </div>
      </div>
    </div>
  );
}
