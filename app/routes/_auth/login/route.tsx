import { useState } from "react";
import { LoginForm, type Language } from "~/components/login-form";
import { MarketingHero } from "~/components/marketing/hero-section";
import { getTranslations } from "~/lib/i18n/translations";

export function meta() {
  return [
    { title: "Doctor Login | Asaandoc | ڈاکٹر لاگ اِن" },
    {
      name: "description",
      content: "Sign in to the Asaandoc doctor portal in English or Urdu.",
    },
  ];
}

export default function LoginPage() {
  const [language, setLanguage] = useState<Language>("en");
  const isUrdu = language === "ur";

  return (
    <main
      lang={language}
      dir={isUrdu ? "rtl" : "ltr"}
      className="grid min-h-svh w-full bg-white lg:grid-cols-2"
      style={{
        fontFamily: isUrdu
          ? '"Noto Sans Arabic", "Noto Naskh Arabic", "Segoe UI", Arial, sans-serif'
          : undefined,
      }}
    >
      <MarketingHero language={language} onLanguageChange={setLanguage} />

      <section
        aria-label={isUrdu ? "ڈاکٹر لاگ اِن" : "Doctor sign in"}
        className="flex items-center justify-center bg-white px-6 py-10 sm:px-10 lg:px-12 lg:py-8 xl:px-16"
      >
        <LoginForm language={language} />
      </section>
    </main>
  );
}