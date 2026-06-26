import { createContext, useContext, useState, useCallback } from 'react';
import ToastContainer from '../components/ui/ToastContainer';

const ToastContext = createContext(null);
let nextId = 1;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message, type = 'info', duration = 5000) => {
    const id = nextId++;
    setToasts((prev) => [...prev, { id, message, type, duration }]);
    return id;
  }, []);

  const value = {
    showToast,
    showSuccess: (msg) => showToast(msg, 'success', 4000),
    showError:   (msg) => showToast(msg, 'error', 6000),
    showWarning: (msg) => showToast(msg, 'warning', 5000),
    showInfo:    (msg) => showToast(msg, 'info', 4000),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast debe usarse dentro de un <ToastProvider>');
  return ctx;
}