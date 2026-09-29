import { env } from "@nest-arch-web/env/web";
import { sendGAEvent } from "@next/third-parties/google";
import Cookies from "js-cookie";

import type { Locale } from "@/lib/i18n";

const CONSENT_KEY = "nest-arch-analytics-v1";
const CONSENT_EVENT = "nest-arch-analytics-change";
const CONSENT_DURATION_MS = 180 * 24 * 60 * 60 * 1000;
export type AnalyticsConsent = "accepted" | "rejected" | "unknown";

export const gaMeasurementId = env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const getAnalyticsConsent = (): AnalyticsConsent => {
  if (typeof window === "undefined") {
    return "unknown";
  }
  try {
    const value: unknown = JSON.parse(
      localStorage.getItem(CONSENT_KEY) ?? "null"
    );
    if (
      typeof value === "object" &&
      value !== null &&
      "choice" in value &&
      "expires" in value &&
      typeof value.expires === "number" &&
      value.expires > Date.now() &&
      (value.choice === "accepted" || value.choice === "rejected")
    ) {
      return value.choice;
    }
  } catch {
    // Unavailable or invalid storage never grants consent.
  }
  return "unknown";
};

// useSyncExternalStore requires a synchronous subscription callback.
// oxlint-disable-next-line promise/prefer-await-to-callbacks
export const subscribeToAnalyticsConsent = (callback: () => void) => {
  // This subscription checks expiration even when no storage event occurs.
  const timer = window.setInterval(callback, 60_000);
  window.addEventListener("storage", callback);
  window.addEventListener(CONSENT_EVENT, callback);
  return () => {
    window.clearInterval(timer);
    window.removeEventListener("storage", callback);
    window.removeEventListener(CONSENT_EVENT, callback);
  };
};

export const disableGoogleAnalytics = () => {
  if (!gaMeasurementId) {
    return;
  }
  Reflect.set(window, `ga-disable-${gaMeasurementId}`, true);
  const domainParts = window.location.hostname.split(".");
  for (const name of Object.keys(Cookies.get())) {
    if (name !== "_ga" && !name.startsWith("_ga_")) {
      continue;
    }
    Cookies.remove(name, { path: "/" });
    for (let index = 0; index < domainParts.length - 1; index += 1) {
      Cookies.remove(name, {
        domain: domainParts.slice(index).join("."),
        path: "/",
      });
    }
  }
};

export const saveAnalyticsConsent = (choice: "accepted" | "rejected") => {
  if (choice === "rejected") {
    disableGoogleAnalytics();
  }
  localStorage.setItem(
    CONSENT_KEY,
    JSON.stringify({ choice, expires: Date.now() + CONSENT_DURATION_MS })
  );
  window.dispatchEvent(new Event(CONSENT_EVENT));
};

type AnalyticsEvent =
  | { name: "demo_start"; locale: Locale; placement: "hero" | "terminal" }
  | { name: "demo_complete"; locale: Locale }
  | {
      name: "cta_click";
      locale: Locale;
      placement: "banner" | "footer";
      destination: "npm" | "github";
    };

export const trackAnalyticsEvent = ({
  name,
  ...parameters
}: AnalyticsEvent) => {
  if (!gaMeasurementId || getAnalyticsConsent() !== "accepted") {
    return;
  }
  if (typeof window === "undefined" || !Reflect.get(window, "dataLayer")) {
    return;
  }
  sendGAEvent("event", name, parameters);
};
