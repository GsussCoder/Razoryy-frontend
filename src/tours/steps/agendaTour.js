/**
 * Compartido por admin y employee (misma ruta /agenda, mismo componente
 * AppointmentsPage.jsx). El copy puede variar según el rol si hace falta.
 */
export function createAgendaTour({ role, isMobile }) {
  const steps = [];

  if (document.querySelector("#panel-agenda")) {
    steps.push({
      element: "#panel-agenda",
      popover: {
        title: "📅 " + (role === "employee" ? "Tus citas" : "Calendario de citas"),
        // TODO: describe cómo crear/editar/cancelar una cita.
        description:
          role === "employee"
            ? "Consulta tu agenda y los horarios que tienes asignados."
            : "Gestiona la agenda de tu barbería y la disponibilidad de tu equipo.",
        side: isMobile ? "bottom" : "right",
      },
    });
  }

  return steps;
}
