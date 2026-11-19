self.addEventListener("install", (event) => {
  console.log("[SW] Instalando...");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("[SW] Activado");
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  // Sin caché por ahora: solo dejamos pasar la petición.
  // Lo dejamos vacío a propósito.
});

self.addEventListener("message", (event) => {
  console.log("[SW] Mensaje de la página:", event.data);
});

self.addEventListener("notificationclick", (event) => {
    event.notification.close();

    const url = event.notification.data?.url || '/';

    event.waitUntil(clients
        .matchAll({ type: "window", includeUncontrolled: true })
        .then((windows) => {
            for (const w of windows) {
                if (w.url.includes(self.location.origin)) {
                    w.focus();
                    w.navigate(url);

                    return;
                }
            }

            return clients.openWindow(url);
        })
    );
});
