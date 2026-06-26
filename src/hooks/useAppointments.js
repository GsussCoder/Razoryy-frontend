// hooks/useAppointments.js
import { useState, useEffect, useCallback } from 'react';
import { appointmentsApi } from '../services/appointmentsApi';
import { useToast } from '../contexts/ToastContext';

export function useAppointments() {
  const { showSuccess, showError } = useToast();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await appointmentsApi.getAll();
      setData(response);
      setError(null);
    } catch (err) {
      setError(err.message);
      showError('Error al cargar citas');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const createAppointment = async (appointmentData) => {
    try {
      const created = await appointmentsApi.create(appointmentData);
      showSuccess('Cita creada exitosamente');
      await refetch();
      return created;
    } catch (err) {
      showError(err.message || 'Error al crear cita');
      throw err;
    }
  };

  const updateAppointment = async (id, appointmentData) => {
    try {
      const updated = await appointmentsApi.update(id, appointmentData);
      showSuccess('Cita actualizada exitosamente');
      await refetch();
      return updated;
    } catch (err) {
      showError(err.message || 'Error al actualizar cita');
      throw err;
    }
  };

  const confirmAppointment = async (id) => {
    try {
      await appointmentsApi.confirm(id);
      showSuccess('Cita confirmada');
      await refetch();
    } catch (err) {
      showError(err.message || 'Error al confirmar cita');
      throw err;
    }
  };

  const cancelAppointment = async (id) => {
    try {
      await appointmentsApi.cancel(id);
      showSuccess('Cita cancelada');
      await refetch();
    } catch (err) {
      showError(err.message || 'Error al cancelar cita');
      throw err;
    }
  };

  const completeAppointment = async (id) => {
    try {
      await appointmentsApi.complete(id);
      showSuccess('Cita completada');
      await refetch();
    } catch (err) {
      showError(err.message || 'Error al completar cita');
      throw err;
    }
  };

  return { data, isLoading, error, refetch, createAppointment, updateAppointment, confirmAppointment, cancelAppointment, completeAppointment };
}