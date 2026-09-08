"use client";

import {
  getLocalSubscription,
  getNotificationPermissionStatus,
  requestNotificationPermission,
  subscribe,
  watchNotificationPermission,
} from "@/app/(app)/notifications/notification-client";
import { useEffect } from "react";
import { toast } from "sonner";

export default function SWRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const setup = async () => {
      try {
        await navigator.serviceWorker.register("/sw.js");
      } catch (error) {
        console.error("SW registration failed:", error);
      }

      const handleChange = async () => {
        const notificationPermissionStatus =
          await getNotificationPermissionStatus();
        if (notificationPermissionStatus === "granted") {
          try {
            await subscribe();
          } catch {}
        } else if (notificationPermissionStatus === "denied") {
          // TODO: delete subscription of this device using session token
        }
      };

      await watchNotificationPermission(handleChange);
    };

    setup();

    setTimeout(async () => {
      const subscription = await getLocalSubscription().catch();
      if (subscription) return;
      requestNotificationPermission().catch((error) => {
        toast.error("Could not enable notifications");
      });
    }, 15000);
  }, []);

  return null;
}
