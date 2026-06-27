// hooks/useUpdateBusinessName.js — nuevo
import { useState } from 'react';
import { tenantsApi } from '../services/tenantsApi';
import { useToast } from '../contexts/ToastContext';

export function useUpdateBusinessName() {
  const { showSuccess, showError } = useToast();
  const [saving, setSaving] = useState(false);

  const updateName = async (barberName) => {
    setSaving(true);
    try {
      await tenantsApi.updateName(barberName);
      showSuccess('Nombre del local actualizado correctamente.');
    } catch (err) {
      showError(err.message || 'No se pudo actualizar el nombre del local.');
      throw err;
    } finally {
      setSaving(false);
    }
  };

  return { updateName, saving };
}