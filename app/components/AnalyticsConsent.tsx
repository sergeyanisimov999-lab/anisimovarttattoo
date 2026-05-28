"use client";

import { useEffect, useState } from "react";

const GA_MEASUREMENT_ID = "G-4F5LZLPTM9";
const CONSENT_STORAGE_KEY = "anisimov_analytics_consent_v1";

type ConsentState = "granted" | "denied" | null;
type EventParameters = Record<string, string | number | boolean>;
type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

function getAnalyticsWindow(): AnalyticsWindow {
  return window as AnalyticsWindow;
}

function loadAnalytics(): void {
  if (typeof window === "undefined" || document.getElementById("ga4-script")) {
    return;
  }

  const analyticsWindow = getAnalyticsWindow();
  analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
  analyticsWindow.gtag = function gtag() {
    analyticsWindow.dataLayer?.push(arguments);
  };

  analyticsWindow.gtag("js", new Date());
  analyticsWindow.gtag("config", GA_MEASUREMENT_ID);

  const script = document.createElement("script");
  script.id = "ga4-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

export function sendAnalyticsEvent(
  eventName: string,
  parameters: EventParameters = {},
): void {
  if (typeof window === "undefined") return;
  if (window.localStorage.getItem(CONSENT_STORAGE_KEY) !== "granted") return;

  const analyticsWindow = getAnalyticsWindow();
  if (typeof analyticsWindow.gtag !== "function") return;

  analyticsWindow.gtag("event", eventName, parameters);
}

export default function AnalyticsConsent() {
  const [ready, setReady] = useState(false);
  const [consent, setConsent] = useState<ConsentState>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const savedConsent = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (savedConsent === "granted" || savedConsent === "denied") {
      setConsent(savedConsent);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (consent === "granted") loadAnalytics();
  }, [consent]);

  useEffect(() => {
    if (consent !== "granted") return;

    const trackLinkClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest("a");
      if (!link) return;

      const href = link.getAttribute("href") || "";
      if (href.startsWith("tel:")) {
        sendAnalyticsEvent("click_phone", { source_path: window.location.pathname });
      } else if (href === "/booking" || href.startsWith("/booking?")) {
        sendAnalyticsEvent("open_booking", { source_path: window.location.pathname });
      } else if (href.includes("#full-day")) {
        sendAnalyticsEvent("open_full_day_offer", {
          source_path: window.location.pathname,
        });
      }
    };

    document.addEventListener("click", trackLinkClick);
    return () => document.removeEventListener("click", trackLinkClick);
  }, [consent]);

  function chooseConsent(nextConsent: Exclude<ConsentState, null>) {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, nextConsent);
    setConsent(nextConsent);
    setSettingsOpen(false);

    if (nextConsent === "denied") {
      const analyticsWindow = getAnalyticsWindow();
      analyticsWindow.gtag?.("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
      if (document.getElementById("ga4-script")) window.location.reload();
    }
  }

  function reopenSettings() {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
    setConsent(null);
  }

  if (!ready) return null;

  if (consent !== null && !settingsOpen) {
    return (
      <button
        type="button"
        onClick={reopenSettings}
        className="fixed bottom-4 right-4 z-50 rounded-full border border-zinc-800 bg-black/90 px-3 py-2 text-[11px] text-zinc-400 shadow-xl transition hover:border-zinc-600 hover:text-zinc-200"
      >
        Аналитика
      </button>
    );
  }

  return (
    <aside className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-3xl border border-zinc-800 bg-zinc-950/95 p-4 shadow-2xl backdrop-blur sm:p-5">
      <p className="text-sm font-medium text-zinc-100">Помочь улучшить сайт?</p>
      <p className="mt-2 text-xs leading-relaxed text-zinc-400 sm:text-sm">
        Можно разрешить обезличенную статистику посещений через Google Analytics:
        просмотры страниц и действия вроде перехода к записи. Данные из полей
        формы и текст сообщений в аналитику не передаются. Подробнее — в{" "}
        <a className="underline underline-offset-4 hover:text-zinc-200" href="/privacy">
          политике конфиденциальности
        </a>
        .
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => chooseConsent("denied")}
          className="rounded-full border border-zinc-700 px-5 py-2.5 text-sm text-zinc-300 transition hover:border-zinc-400 hover:text-zinc-100"
        >
          Не разрешать
        </button>
        <button
          type="button"
          onClick={() => chooseConsent("granted")}
          className="rounded-full bg-zinc-100 px-5 py-2.5 text-sm font-medium text-black transition hover:bg-white"
        >
          Разрешить аналитику
        </button>
      </div>
    </aside>
  );
}
