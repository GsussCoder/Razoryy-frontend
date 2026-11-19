import { useState } from "react";

export function useNotifications() {
  const [granted, setGranted] = useState(
    typeof Notification !== "undefined"
      ? Notification.permission
      : "unsupported",
  );

  const askPermission = async () => {
    if (!("Notification" in window)) return "unsupported";

    const res = await Notification.requestPermission();

    setGranted(res);

    return res;
  };

  const showExample = async () => {
    const reg = await navigator.serviceWorker.ready;

    await reg.showNotification("Example", {
      body: "This is a local notification",
      icon: "/icons/favicon.png",
      tag: "example",
      data: {
        url: "/agenda"
      }
    });
  };

  return { granted, askPermission, showExample };
}
