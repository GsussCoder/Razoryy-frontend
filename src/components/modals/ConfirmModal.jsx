import Modal from "../ui/Modal";

export default function ConfirmModal({ isOpen, onClose, onConfirm, itemName }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirmar acción">
      <div className="space-y-4">
        <p className="text-slate-300">
          ¿Estás seguro de que deseas continuar con <span className="font-semibold text-white">{itemName}</span>?
        </p>
        <p className="text-sm text-slate-400">
          Esta acción no se puede deshacer.
        </p>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 px-4 py-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors cursor-pointer"
          >
            Confirmar
          </button>
        </div>
      </div>
    </Modal>
  );
}
