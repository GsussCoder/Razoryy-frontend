import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { bookingApi } from "../../services/bookingApi";
import { BookingProgress } from "./BookingProgress";
import { BookingSuccess } from "./BookingSuccess";
import { BookingError } from "./BookingError";
import { StepService } from "./steps/StepService";
import { StepBarber } from "./steps/StepBarber";
import { StepDateTime } from "./steps/StepDateTime";
import { StepCustomerData } from "./steps/StepCustomerData";
import { useToast } from "../../contexts/ToastContext";

export default function Booking() {
  const { barberSlug } = useParams();
  const { showSuccess, showError } = useToast();

  const [barbershop, setBarbershop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [customerData, setCustomerData] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    reason: "",
  });

  useEffect(() => {
    if (!barberSlug) return;
    const load = async () => {
      try {
        const data = await bookingApi.getBarbershopBySlug(barberSlug);
        setBarbershop(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [barberSlug]);

  useEffect(() => {
    if (!selectedBarber || !selectedDate || !barbershop) return;
    const loadSlots = async () => {
      setIsLoadingSlots(true);
      try {
        const slots = await bookingApi.getAvailableSlots(
          barbershop.tenantId,
          selectedBarber.id,
          selectedDate,
        );
        setAvailableSlots(slots);
      } catch {
        setAvailableSlots([]);
      } finally {
        setIsLoadingSlots(false);
      }
    };
    loadSlots();
  }, [selectedBarber, selectedDate, barbershop]);

  const handleCustomerChange = (field, value) =>
    setCustomerData((prev) => ({ ...prev, [field]: value }));

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime("");
  };

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await bookingApi.createAppointment(barbershop.tenantId, {
        userId: selectedBarber.id,
        barberServiceId: selectedService.id,
        customerName: customerData.name,
        customerLastname: customerData.lastname,
        customerEmail: customerData.email,
        customerNumber: customerData.phone,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
        reason: customerData.reason,
      });
      
      setBookingSuccess(true);
    } catch (err) {
      showError("No se pudo confirmar la reserva. Inténtalo de nuevo.");
      console.error("Error al agendar:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fmt = (dateStr) =>
    dateStr
      ? new Date(dateStr).toLocaleDateString("es-CO", {
          weekday: "long",
          day: "numeric",
          month: "long",
        })
      : "—";

  // --- Estados de pantalla completa ---
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
          <p className="text-sm text-slate-500 animate-pulse">
            Cargando barbería...
          </p>
        </div>
      </div>
    );
  }

  if (error || !barbershop) return <BookingError />;

  if (bookingSuccess)
    return (
      <BookingSuccess
        barbershop={barbershop}
        selectedService={selectedService}
        selectedBarber={selectedBarber}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        customerData={customerData}
      />
    );

  // --- Wizard principal ---
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
        {/* Encabezado de la barbería */}
        <div className="text-center space-y-1">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl font-black text-indigo-600">
              {barbershop.barberName.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()}
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white">
            {barbershop.barberName}
          </h1>
          <p className="text-xs text-slate-500">Reserva tu cita fácilmente</p>
        </div>

        {/* Progreso */}
        <BookingProgress current={step} />

        {/* Tarjeta del paso actual */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6">
          {step === 1 && (
            <StepService
              services={barbershop.services}
              selectedService={selectedService}
              onSelect={(s) => {
                setSelectedService(s);
                setStep(2);
              }}
            />
          )}
          {step === 2 && (
            <StepBarber
              barbers={barbershop.barbers}
              selectedBarber={selectedBarber}
              onSelect={(b) => {
                setSelectedBarber(b);
                setStep(3);
              }}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <StepDateTime
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              availableSlots={availableSlots}
              isLoadingSlots={isLoadingSlots}
              onDateChange={handleDateChange}
              onTimeSelect={setSelectedTime}
              onNext={() => setStep(4)}
              onBack={() => setStep(2)}
            />
          )}
          {step === 4 && (
            <StepCustomerData
              customerData={customerData}
              onChange={handleCustomerChange}
              onSubmit={handleConfirmBooking}
              onBack={() => setStep(3)}
              isSubmitting={isSubmitting}
              summary={{
                service: selectedService?.nameService,
                barber: selectedBarber?.name,
                date: fmt(selectedDate),
                time: selectedTime.substring(0, 5),
              }}
            />
          )}
        </div>

        <p className="text-center text-xs text-slate-600">
          Powered by{" "}
          <a href="/" className="text-slate-500 font-semibold hover:text-indigo-500 transition-colors">Razoryy</a>
        </p>
      </div>
    </div>
  );
}
