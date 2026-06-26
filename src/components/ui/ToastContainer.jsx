import Toast from './Toast';

export default function ToastContainer({ toasts, onDismiss }) {
  if (toasts.length === 0) return null;

  return (
    <div
      className="
        fixed z-100 flex flex-col gap-2
        bottom-0 left-0 right-0 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]
        sm:bottom-auto sm:left-auto sm:top-4 sm:right-4 sm:w-96 sm:p-0
      "
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}