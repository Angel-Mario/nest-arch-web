"use client";

import { Button } from "@nest-arch-web/ui/components/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@nest-arch-web/ui/components/card";
import { GoogleAnalytics } from "@next/third-parties/google";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { useUi } from "@/components/locale-provider";
import {
  disableGoogleAnalytics,
  gaMeasurementId,
  getAnalyticsConsent,
  saveAnalyticsConsent,
  subscribeToAnalyticsConsent,
} from "@/lib/analytics";
import { analyticsMessages } from "@/lib/analytics-messages";

const getServerConsent = () => "unknown" as const;

export const AnalyticsPreferences = () => {
  const { locale } = useUi();
  const messages = analyticsMessages[locale];
  const consent = useSyncExternalStore(
    subscribeToAnalyticsConsent,
    getAnalyticsConsent,
    getServerConsent
  );
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const wasAccepted = useRef(false);

  useEffect(() => {
    if (consent === "accepted" && gaMeasurementId) {
      Reflect.set(window, `ga-disable-${gaMeasurementId}`, false);
    }
    if (consent !== "accepted" && wasAccepted.current) {
      disableGoogleAnalytics();
      window.location.reload();
    }
    wasAccepted.current = consent === "accepted";
  }, [consent]);

  const choose = (choice: "accepted" | "rejected") => {
    try {
      saveAnalyticsConsent(choice);
      setError(false);
      setOpen(false);
    } catch {
      setError(true);
    }
  };

  return (
    <>
      <Link href={`/${locale}/privacy`}>{messages.privacy}</Link>
      {gaMeasurementId ? (
        <>
          <Button variant="link" onClick={() => setOpen(true)}>
            {messages.title}
          </Button>
          {open || consent === "unknown" ? (
            <section
              aria-label={messages.title}
              className="fixed inset-x-4 bottom-4 z-50 mx-auto max-h-[80dvh] max-w-xl overflow-y-auto"
            >
              <Card>
                <CardHeader>
                  <CardTitle>
                    <h2>{messages.title}</h2>
                  </CardTitle>
                  <CardDescription>{messages.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{messages.vercel}</p>
                  <Link href={`/${locale}/privacy`} className="underline">
                    {messages.privacy}
                  </Link>
                  {error ? <p role="alert">{messages.error}</p> : null}
                </CardContent>
                <CardFooter className="flex-wrap gap-2">
                  <Button variant="outline" onClick={() => choose("rejected")}>
                    {messages.reject}
                  </Button>
                  <Button variant="outline" onClick={() => choose("accepted")}>
                    {messages.accept}
                  </Button>
                  {consent === "unknown" ? null : (
                    <Button variant="ghost" onClick={() => setOpen(false)}>
                      {messages.close}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </section>
          ) : null}
          {consent === "accepted" ? (
            <GoogleAnalytics gaId={gaMeasurementId} />
          ) : null}
        </>
      ) : null}
    </>
  );
};
