import { useState, useEffect } from "react";
import { useBarberServices } from "../../hooks/useBarberServices";
import Modal from "../ui/Modal";

export default function ServiceFormModal({ isOpen, onClose, onSuccess, serviceToEdit }) {
  const { createService, updateService } = useBarberServices();
  const [formData, setFormData] = useState({
    nameService: "",
    description: "",
    price: 0,
  });

  useEffect(() => {
    if (serviceToEdit) {
      setFormData({
        nameService: serviceToEdit.nameService || "",
        description: serviceToEdit.description || "",
        price: Number(serviceToEdit.price) || "",
      });
    } else {
      setFormData({
        nameService: "",
        description: "",
        price: 0,
      });
    }
  }, [serviceToEdit, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (serviceToEdit) {
        await updateService(serviceToEdit.id, {
          nameService: formData.nameService,
          description: formData.description,
          price: Number(formData.price),
        });
      } else {
        await createService({
          nameService: formData.nameService,
          description: formData.description,
          price: Number(formData.price),
        });
      }

      setFormData({
        nameService: "",
        description: "",
        price: 0,
      });

      onSuccess?.();
      onClose();
    } catch (err) {
      
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={serviceToEdit ? "Editar Servicio" : "Nuevo Servicio"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Nombre del Servicio
          </label>
          <input
            type="text"
            name="nameService"
            value={formData.nameService}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Descripción
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Precio
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500"
          >
            {serviceToEdit ? "Actualizar" : "Crear"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
