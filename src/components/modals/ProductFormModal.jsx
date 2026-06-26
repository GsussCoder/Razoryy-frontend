import { useState, useEffect } from "react";
import { useProducts } from "../../hooks/useProducts";
import Modal from "../ui/Modal";

export default function ProductFormModal({
  isOpen,
  onClose,
  onSuccess,
  productToEdit,
}) {
  const { createProduct, updateProduct } = useProducts();
  const [formData, setFormData] = useState({
    productName: "",
    description: "",
    price: 0,
    stock: 0,
  });

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        productName: productToEdit.productName || "",
        description: productToEdit.description || "",
        price: Number(productToEdit.price) || 0,
        stock: Number(productToEdit.stock) || 0,
      });
    } else {
      setFormData({
        productName: "",
        description: "",
        price: 0,
        stock: 0,
      });
    }
  }, [productToEdit, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    try {
      if (productToEdit) {
        console.log("CLIC actualizar")
        // CAMBIAR A PRODUCTOS, REVISAR BIEN
        await updateProduct(productToEdit.id, {
          productName: formData.productName,
          description: formData.description,
          price: Number(formData.price),
          stock: Number(formData.stock),
        });
      } else {
        await createProduct({
          productName: formData.productName,
          description: formData.description,
          price: Number(formData.price),
          stock: Number(formData.stock),
        });
      }
      setFormData({ nameService: "", description: "", price: 0 });
      onSuccess?.();
      onClose();
    } catch {
      // el toast de error ya se mostró desde el hook, el modal se queda abierto
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={productToEdit ? "Editar Producto" : "Nuevo Producto"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Nombre del Producto
          </label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
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

        <div className="grid grid-cols-2 gap-4">
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

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
            />
          </div>
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
            {productToEdit ? "Actualizar" : "Crear"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
