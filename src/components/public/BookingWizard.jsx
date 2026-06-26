import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Loader2, CheckCircle, Calendar, User, Scissors, Clock, Mail, Phone } from 'lucide-react';
import { publicBookingApi } from '../../services/publicBookingApi';

const STEPS = ['Servicio', 'Barbero', 'Fecha y hora', 'Tus datos', 'Confirmación'];

export default function BookingWizard({ tenant, services, barbers, onBack }) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [slots, setSlots] = useState([]);
  const [success, setSuccess] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);

  const [form, setForm] = useState({
    serviceId: '',
    barberId: '',
    date: '',
    time: '',
    customerName: '',
    customerLastname: '',
    customerEmail: '',
    customerNumber: '',
    reason: '',
  });

  const [errors, setErrors] = useState({});

  const primaryColor = tenant.primaryColor || '#4f46e5';

  const selectedService = services.find(s => s.id === Number(form.serviceId));
  const selectedBarber = barbers.find(b => b.id === Number(form.barberId));

  // Load available slots when date or barber changes
  useEffect(() => {
    if (form.date && form.barberId) {
      loadSlots();
    }
  }, [form.date, form.barberId]);

  const loadSlots = async () => {
    try {
      const data = await publicBookingApi.getAvailableSlots(tenant.id, Number(form.barberId), form.date);
      setSlots(data);
    } catch (err) {
      console.error('Error loading slots:', err);
      setSlots([]);
    }
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 0 && !form.serviceId) newErrors.serviceId = 'Selecciona un servicio';
    if (step === 1) { /* barberId is optional - "cualquiera disponible" */ }
    if (step === 2) {
      if (!form.date) newErrors.date = 'Selecciona una fecha';
      if (!form.time) newErrors.time = 'Selecciona una hora';
    }
    if (step === 3) {
      if (!form.customerName.trim()) newErrors.customerName = 'Requerido';
      if (!form.customerLastname.trim()) newErrors.customerLastname = 'Requerido';
      if (!form.customerEmail.trim()) newErrors.customerEmail = 'Requerido';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.customerEmail)) newErrors.customerEmail = 'Email inválido';
      if (!form.customerNumber.trim()) newErrors.customerNumber = 'Requerido';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (step === 4) {
      handleSubmit();
    } else {
      setStep(step + 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        user: Number(form.barberId) || null,
        barberService: Number(form.serviceId),
        customerName: form.customerName,
        customerLastname: form.customerLastname,
        customerEmail: form.customerEmail,
        customerNumber: form.customerNumber,
        appointmentDate: form.date,
        appointmentTime: form.time,
        reason: form.reason || '',
      };
      const result = await publicBookingApi.createPublicAppointment(tenant.id, payload);
      setBookingResult(result);
      setSuccess(true);
    } catch (err) {
      alert('Error al agendar: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: primaryColor }}>
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Cita agendada</h2>
          <p className="text-slate-600 mb-6">Tu cita ha sido registrada exitosamente</p>

          <div className="bg-slate-50 rounded-xl p-4 text-left space-y-2 mb-6">
            <p className="text-sm"><span className="text-slate-500">Servicio:</span> <span className="font-medium">{selectedService?.nameService}</span></p>
            {selectedBarber && <p className="text-sm"><span className="text-slate-500">Barbero:</span> <span className="font-medium">{selectedBarber.name}</span></p>}
            <p className="text-sm"><span className="text-slate-500">Fecha:</span> <span className="font-medium">{form.date}</span></p>
            <p className="text-sm"><span className="text-slate-500">Hora:</span> <span className="font-medium">{form.time}</span></p>
            <p className="text-sm"><span className="text-slate-500">Cliente:</span> <span className="font-medium">{form.customerName} {form.customerLastname}</span></p>
          </div>

          <button
            onClick={onBack}
            className="w-full py-3 text-white font-semibold rounded-xl"
            style={{ backgroundColor: primaryColor }}
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <button onClick={step > 0 ? () => setStep(step - 1) : onBack} className="p-2 hover:bg-slate-100 rounded-lg">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <h1 className="text-lg font-bold text-slate-900">{tenant.barberName}</h1>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Progress */}
        <div className="flex items-center gap-1 mb-8">
          {STEPS.map((s, i) => (
            <div key={i} className="flex-1 flex items-center">
              <div className={`h-1.5 flex-1 rounded-full ${i <= step ? '' : 'bg-slate-200'}`} style={i <= step ? { backgroundColor: primaryColor } : {}} />
            </div>
          ))}
        </div>
        <p className="text-sm text-slate-500 mb-6">Paso {step + 1} de {STEPS.length}: {STEPS[step]}</p>

        {/* Step 0: Service */}
        {step === 0 && (
          <div className="space-y-3">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => { setForm({ ...form, serviceId: service.id }); setErrors({}); }}
                className={`w-full text-left bg-white rounded-xl border p-4 transition-all ${
                  form.serviceId === String(service.id) ? 'border-2 shadow-md' : 'border-slate-200 hover:border-slate-300'
                }`}
                style={form.serviceId === String(service.id) ? { borderColor: primaryColor } : {}}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-slate-900">{service.nameService}</h3>
                    {service.description && <p className="text-sm text-slate-500 mt-1">{service.description}</p>}
                  </div>
                  <p className="text-lg font-bold" style={{ color: primaryColor }}>${service.price?.toLocaleString()}</p>
                </div>
              </button>
            ))}
            {errors.serviceId && <p className="text-sm text-red-500">{errors.serviceId}</p>}
          </div>
        )}

        {/* Step 1: Barber */}
        {step === 1 && (
          <div className="space-y-3">
            <button
              onClick={() => { setForm({ ...form, barberId: '' }); setErrors({}); }}
              className={`w-full text-left bg-white rounded-xl border p-4 transition-all ${
                form.barberId === '' ? 'border-2 shadow-md' : 'border-slate-200 hover:border-slate-300'
              }`}
              style={form.barberId === '' ? { borderColor: primaryColor } : {}}
            >
              <h3 className="font-semibold text-slate-900">Cualquiera disponible</h3>
              <p className="text-sm text-slate-500">El sistema asignará el primer barbero libre</p>
            </button>
            {barbers.map((barber) => (
              <button
                key={barber.id}
                onClick={() => { setForm({ ...form, barberId: barber.id }); setErrors({}); }}
                className={`w-full text-left bg-white rounded-xl border p-4 transition-all ${
                  form.barberId === String(barber.id) ? 'border-2 shadow-md' : 'border-slate-200 hover:border-slate-300'
                }`}
                style={form.barberId === String(barber.id) ? { borderColor: primaryColor } : {}}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                    <User className="w-5 h-5 text-slate-500" />
                  </div>
                  <h3 className="font-semibold text-slate-900">{barber.name}</h3>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Step 2: Date & Time */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Fecha</label>
              <input
                type="date"
                value={form.date}
                min={today}
                onChange={(e) => setForm({ ...form, date: e.target.value, time: '' })}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 bg-white"
                style={{ '--tw-ring-color': primaryColor }}
              />
              {errors.date && <p className="text-sm text-red-500 mt-1">{errors.date}</p>}
            </div>
            {form.date && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Hora disponible</label>
                {slots.length === 0 ? (
                  <p className="text-sm text-slate-500">No hay horarios disponibles para esta fecha</p>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {slots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => { setForm({ ...form, time: slot }); setErrors({}); }}
                        className={`py-2.5 rounded-lg text-sm font-medium border transition-all ${
                          form.time === slot ? 'text-white border-transparent' : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                        style={form.time === slot ? { backgroundColor: primaryColor } : {}}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                )}
                {errors.time && <p className="text-sm text-red-500 mt-1">{errors.time}</p>}
              </div>
            )}
          </div>
        )}

        {/* Step 3: Customer info */}
        {step === 3 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
                <input
                  type="text"
                  value={form.customerName}
                  onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 bg-white"
                  placeholder="Tu nombre"
                />
                {errors.customerName && <p className="text-sm text-red-500 mt-1">{errors.customerName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Apellido</label>
                <input
                  type="text"
                  value={form.customerLastname}
                  onChange={(e) => setForm({ ...form, customerLastname: e.target.value })}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 bg-white"
                  placeholder="Tu apellido"
                />
                {errors.customerLastname && <p className="text-sm text-red-500 mt-1">{errors.customerLastname}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                type="email"
                value={form.customerEmail}
                onChange={(e) => setForm({ ...form, customerEmail: e.target.value })}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 bg-white"
                placeholder="tu@email.com"
              />
              {errors.customerEmail && <p className="text-sm text-red-500 mt-1">{errors.customerEmail}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Teléfono</label>
              <input
                type="tel"
                value={form.customerNumber}
                onChange={(e) => setForm({ ...form, customerNumber: e.target.value })}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 bg-white"
                placeholder="+57 300 123 4567"
              />
              {errors.customerNumber && <p className="text-sm text-red-500 mt-1">{errors.customerNumber}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Motivo (opcional)</label>
              <textarea
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 bg-white"
                rows="2"
                placeholder="Alguna nota adicional..."
              />
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4">Resumen de tu cita</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Scissors className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-500">Servicio</p>
                  <p className="font-medium text-slate-900">{selectedService?.nameService} — ${selectedService?.price?.toLocaleString()}</p>
                </div>
              </div>
              {selectedBarber && (
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">Barbero</p>
                    <p className="font-medium text-slate-900">{selectedBarber.name}</p>
                  </div>
                </div>
              )}
              {!selectedBarber && (
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">Barbero</p>
                    <p className="font-medium text-slate-900">Cualquiera disponible</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-500">Fecha y hora</p>
                  <p className="font-medium text-slate-900">{form.date} a las {form.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-500">Contacto</p>
                  <p className="font-medium text-slate-900">{form.customerName} {form.customerLastname}</p>
                  <p className="text-sm text-slate-500">{form.customerEmail} · {form.customerNumber}</p>
                </div>
              </div>
              {form.reason && (
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-sm text-slate-500">Notas</p>
                    <p className="font-medium text-slate-900">{form.reason}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={step > 0 ? () => setStep(step - 1) : onBack}
            className="px-5 py-2.5 text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-sm font-medium"
          >
            {step === 0 ? 'Volver' : 'Atrás'}
          </button>
          <button
            onClick={handleNext}
            disabled={loading}
            className="px-6 py-2.5 text-white rounded-xl text-sm font-medium flex items-center gap-2 disabled:opacity-50"
            style={{ backgroundColor: primaryColor }}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : step === 4 ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
            {step === 4 ? 'Confirmar cita' : 'Siguiente'}
          </button>
        </div>
      </main>
    </div>
  );
}
