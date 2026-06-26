/**
 * Servicio para el flujo público de reserva de citas (sin autenticación).
 * TODO: Cuando el backend exponga endpoints públicos para el sitio de reserva,
 * reemplazar estas implementaciones mock por llamadas reales.
 */

// Mock de datos para desarrollo
const MOCK_SERVICES = [
  { id: 1, nameService: 'Corte clásico', description: 'Corte de cabello tradicional con tijera o máquina', price: 25000 },
  { id: 2, nameService: 'Corte + barba', description: 'Corte de cabello y perfilado de barba', price: 35000 },
  { id: 3, nameService: 'Afeitado tradicional', description: 'Afeitado con navaja y toalla caliente', price: 20000 },
  { id: 4, nameService: 'Diseño de barba', description: 'Perfilado y diseño de barba', price: 15000 },
];

const MOCK_BARBERS = [
  { id: 1, name: 'Carlos', user: 'carlos' },
  { id: 2, name: 'Miguel', user: 'miguel' },
  { id: 3, name: 'Andrés', user: 'andres' },
];

export const publicBookingApi = {
  getTenantBySlug: (slug) => {
    console.warn('TODO: GET /api/public/tenants/{slug} no existe aún. Usando mock.');
    return Promise.resolve({
      id: 1,
      barberName: `Barbería ${slug}`,
      description: 'La mejor barbería de la ciudad',
      primaryColor: '#4f46e5',
      logo: null,
      isActive: true,
    });
  },

  getPublicServices: (tenantId) => {
    console.warn('TODO: GET /api/public/tenants/{id}/services no existe aún. Usando mock.');
    return Promise.resolve(MOCK_SERVICES);
  },

  getPublicBarbers: (tenantId) => {
    console.warn('TODO: GET /api/public/tenants/{id}/barbers no existe aún. Usando mock.');
    return Promise.resolve(MOCK_BARBERS);
  },

  getAvailableSlots: (tenantId, barberId, date) => {
    console.warn('TODO: GET /api/public/availability no existe aún. Usando mock.');
    const slots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
    return Promise.resolve(slots);
  },

  createPublicAppointment: (tenantId, data) => {
    console.warn('TODO: POST /api/public/appointments no existe aún. Usando mock.');
    return Promise.resolve({
      id: Date.now(),
      ...data,
      status: 'PROCESSING',
    });
  },
};
