import { notFound } from "next/navigation";

import { analyticsMessages } from "@/lib/analytics-messages";

const PrivacyPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  if (locale !== "en" && locale !== "es" && locale !== "pt") {
    notFound();
  }
  const messages = analyticsMessages[locale];
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-6 px-6 py-16">
      <h1 className="text-3xl font-semibold">{messages.privacy}</h1>
      <p>{messages.description}</p>
      <p>{messages.details}</p>
      <p>{messages.vercel}</p>
      <a className="underline" href="https://policies.google.com/privacy">
        {messages.googlePolicy}
      </a>
      <a
        className="underline"
        href="https://vercel.com/docs/analytics/privacy-policy"
      >
        {messages.vercelPolicy}
      </a>
    </main>
  );
};

export default PrivacyPage;
