import { useState } from "react";
import type { Route } from "./+types/route";
import { SignupForm } from "~/components/signup-form";
import { MarketingHero } from "~/components/marketing/hero-section";
import { getTranslations } from "~/lib/i18n/translations";
import type { SignupActionResult } from "~/lib/api/types";

export function meta() {
  return [
    { title: "Doctor Registration | Asaandoc" },
    {
      name: "description",
      content: "Create your Asaandoc doctor account.",
    },
  ];
}

export async function action({
  request,
}: Route.ActionArgs): Promise<SignupActionResult> {
  const origin = request.headers.get("Origin");

  if (origin && origin !== new URL(request.url).origin) {
    return { error: "Invalid request origin. Please refresh and try again." };
  }

  const formData = await request.formData();

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phoneNumber = String(formData.get("phone_number") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const termsAccepted = formData.get("terms_accepted") === "on";

  if (!name || !email || !phoneNumber || !password) {
    return { error: "Please fill in all account details." };
  }

  if (!termsAccepted) {
    return { error: "Please accept the terms to create your account." };
  }

  const baseUrl = process.env.API_BASE_URL;

  if (!baseUrl) {
    console.error("API_BASE_URL is not configured.");
    return {
      error: "Registration is temporarily unavailable. Please try again later.",
    };
  }

  let response: Response;

  try {
    response = await fetch(
      `${baseUrl.replace(/\/+$/, "")}/doctor/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone_number: phoneNumber,
          password,
          terms_accepted: termsAccepted,
        }),
        signal: AbortSignal.timeout(10_000),
      },
    );
  } catch (error) {
    console.error("Doctor signup request failed:", error);

    return {
      error:
        "Could not connect to the registration service. Please try again.",
    };
  }

  if (response.status === 409) {
    return {
      error: "An account with this email already exists.",
    };
  }

  if (response.status === 422) {
    return {
      error:
        "Please check your details. Use a valid email, a phone number with 7–15 digits, and a password of at least 8 characters and no more than 72 UTF-8 bytes.",
    };
  }

  if (!response.ok) {
    console.error("Doctor signup returned status:", response.status);

    return {
      error: "We could not create your account. Please try again.",
    };
  }

  return { success: true };
}

export default function SignupPage() {
  const [language, setLanguage] = useState<"en" | "ur">("en");
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
        aria-label={isUrdu ? "ڈاکٹر رجسٹریشن" : "Doctor registration"}
        className="flex items-center justify-center bg-white px-6 py-10 sm:px-10 lg:px-12 lg:py-8 xl:px-16"
      >
        <SignupForm language={language} />
      </section>
    </main>
  );
}