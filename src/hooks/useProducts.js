import { useCallback, useEffect, useState } from "react";
import { useToast } from "../contexts/ToastContext";
import { productsApi } from "../services/productsApi";

export function useProducts() {
  const { showSuccess, showError } = useToast();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const refetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await productsApi.getAll();
      setData(response);
      setError("");
    } catch (err) {
      setError(err.message || "Error al cargar los productos.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const createProduct = async (productData) => {
    try {
      await productsApi.create(productData);
      showSuccess("Producto creado exitosamente");
      await refetch();
    } catch (err) {
      showError(err.message || "Error al crear producto");
      throw err;
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      await productsApi.update(id, productData);
      showSuccess("Producto actualizado exitosamente");
      await refetch();
    } catch (err) {
      showError(err.message || "Error al actualizar producto");
      throw err;
    }
  };

  const deleteProduct = async (id) => {
    try {
      await productsApi.delete(id);
      showSuccess("Producto eliminado exitosamente");
      await refetch();
    } catch (err) {
      showError(err.message || "Error al eliminar producto");
      throw err;
    }
  };

  return { refetch, data, isLoading, error, createProduct, updateProduct, deleteProduct };
}