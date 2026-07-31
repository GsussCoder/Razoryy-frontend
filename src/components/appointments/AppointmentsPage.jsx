import { useState } from "react";
import { useAppointments } from "../../hooks/useAppointments";
import { useAuth } from "../../contexts/AuthContext";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import CalendarMobileView from "./CalendarMobileView";
import AppointmentModal from "./AppointmentModal";
import { usePageTour } from "../../tours/usePageTour";
import { useBreakpoint } from "../../tours/useBreakpoint";
import { createAgendaTour } from "../../tours/steps/agendaTour";

export default function AppointmentPage() {
  const { user } = useAuth();
  const isEmployee = user?.role === "employee";
  const role = isEmployee ? "EMPLOYEE" : "ADMIN";

  // Invocamos el hook pasando el rol para llamar al endpoint correspondiente
  const { data: appointments = [], isLoading } = useAppointments({ role });

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const isMobile = useBreakpoint();

  usePageTour("agenda", () => createAgendaTour({ role: user?.role, isMobile }));

  const handlePrevWeek = () => {
    const prev = new Date(currentDate);
    prev.setDate(prev.getDate() - 7);
    setCurrentDate(prev);
  };

  const handleNextWeek = () => {
    const next = new Date(currentDate);
    next.setDate(next.getDate() + 7);
    setCurrentDate(next);
  };

  const handleToday = () => setCurrentDate(new Date());

  const getWeekDays = (baseDate) => {
    const start = new Date(baseDate);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1); // Lunes
    start.setDate(diff);

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      return date;
    });
  };

  const weekDays = getWeekDays(currentDate);

  const formatDateKey = (dateObj) => {
    return dateObj.toISOString().split("T")[0];
  };

  const handleAction = async (actionFn, id) => {
    setActionLoading(true);
    try {
      await actionFn(id);
      setSelectedAppointment(null);
    } catch {
      // El error se maneja en el hook con el toast
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div id="panel-agenda" className="h-full flex flex-col space-y-3 sm:space-y-4 overflow-hidden">
      <CalendarHeader
        currentDate={currentDate}
        onPrevWeek={handlePrevWeek}
        onNextWeek={handleNextWeek}
        onToday={handleToday}
        tenantSlug={user?.barberSlug || null}
        isEmployee={isEmployee}
      />

      <CalendarGrid
        weekDays={weekDays}
        appointments={appointments}
        isLoading={isLoading}
        onSelectAppointment={setSelectedAppointment}
        formatDateKey={formatDateKey}
      />

      <CalendarMobileView
        weekDays={weekDays}
        appointments={appointments}
        isLoading={isLoading}
        onSelectAppointment={setSelectedAppointment}
        formatDateKey={formatDateKey}
      />

      <AppointmentModal
        appointment={selectedAppointment}
        onClose={() => setSelectedAppointment(null)}
        actionLoading={actionLoading}
        role={role}
      />
    </div>
  );
}
