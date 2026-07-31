import { useEffect, useState } from "react";

/**
 * Devuelve true/false reactivamente según el media query dado.
 * Por defecto detecta "móvil" con el mismo breakpoint que usa Tailwind (`lg`)
 * en AppLayout.jsx (donde el sidebar se colapsa en un drawer).
 *
 * A diferencia de `window.innerWidth < 1024` calculado una sola vez (como
 * estaba en AdminOverview.jsx), esto se re-evalúa si el usuario rota el
 * dispositivo o cambia el tamaño de la ventana.
 */
export function useBreakpoint(query = "(max-width: 1023px)") {
  const getMatches = () =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false;

  const [matches, setMatches] = useState(getMatches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = (event) => setMatches(event.matches);

    // Sincroniza en caso de que haya cambiado entre el render inicial y el efecto
    setMatches(mediaQuery.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}
