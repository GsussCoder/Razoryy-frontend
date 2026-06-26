import { useState, useEffect } from 'react';
import { Scissors, Calendar, Loader2, AlertCircle } from 'lucide-react';
import { publicBookingApi } from '../../services/publicBookingApi';
import BookingWizard from './BookingWizard';

export default function PublicLanding({ tenantSlug }) {
  const [tenant, setTenant] = useState(null);
  const [services, setServices] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    loadTenantData();
  }, [tenantSlug]);

  const loadTenantData = async () => {
    try {
      const tenantData = await publicBookingApi.getTenantBySlug(tenantSlug);
      if (!tenantData || !tenantData.isActive) {
        setError('Esta barbería no está disponible en este momento.');
        setLoading(false);
        return;
      }
      setTenant(tenantData);

      const [servicesData, barbersData] = await Promise.all([
        publicBookingApi.getPublicServices(tenantData.id),
        publicBookingApi.getPublicBarbers(tenantData.id),
      ]);
      setServices(servicesData);
      setBarbers(barbersData);
    } catch (err) {
      setError('No se pudo cargar la información de la barbería.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-900 mb-2">No disponible</h1>
          <p className="text-slate-600">{error}</p>
        </div>
      </div>
    );
  }

  if (showBooking) {
    return (
      <BookingWizard
        tenant={tenant}
        services={services}
        barbers={barbers}
        onBack={() => setShowBooking(false)}
      />
    );
  }

  const primaryColor = tenant.primaryColor || '#4f46e5';

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center gap-4">
          {tenant.logo ? (
            <img src={tenant.logo} alt={tenant.barberName} className="w-14 h-14 rounded-xl object-cover" />
          ) : (
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: primaryColor }}
            >
              <Scissors className="w-7 h-7 text-white" />
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{tenant.barberName}</h1>
            <p className="text-slate-500 text-sm">{tenant.description}</p>
          </div>
        </div>
      </header>

      {/* Services */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Nuestros Servicios</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-slate-900">{service.nameService}</h3>
                  {service.description && (
                    <p className="text-sm text-slate-500 mt-1">{service.description}</p>
                  )}
                </div>
                <p className="text-lg font-bold" style={{ color: primaryColor }}>
                  ${service.price?.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => setShowBooking(true)}
            className="inline-flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-xl shadow-lg transition-all hover:shadow-xl text-lg"
            style={{ backgroundColor: primaryColor }}
          >
            <Calendar className="w-5 h-5" />
            Agendar cita
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 mt-12 py-6">
        <p className="text-center text-sm text-slate-400">
          Powered by BarberPro SaaS
        </p>
      </footer>
    </div>
  );
}
