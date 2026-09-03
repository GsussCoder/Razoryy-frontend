const PREFIX = "tour.";

export const TourStorage = {
  isCompleted(id, version = 1) {
    const stored = localStorage.getItem(`${PREFIX}${id}`);

    if (stored === null) return false; // nunca lo vio

    const storedVersion = stored === "true" ? 1 : Number(stored);

    if (Number.isNaN(storedVersion)) return false;

    return storedVersion >= version;
  },

  complete(id, version = 1) {
    localStorage.setItem(`${PREFIX}${id}`, String(version));
  },

  reset(id) {
    localStorage.removeItem(`${PREFIX}${id}`);
  },

  resetAll() {
    Object.keys(localStorage)
      .filter((key) => key.startsWith(PREFIX))
      .forEach((key) => localStorage.removeItem(key));
  },
};