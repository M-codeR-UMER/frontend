import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import { ArrowRight, Stethoscope } from "lucide-react";
import { Mail, LockKeyhole, Eye, EyeOff } from "lucide-react";
import { Button } from "~/components/ui/button";
import { LabeledInput } from "~/components/ui/labeled-input";
import type { Language } from "~/lib/i18n/translations";
import { getTranslations } from "~/lib/i18n/translations";

export type { Language };

export function LoginForm({ language }: { language: Language }) {
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const t = getTranslations(language);
  const login = t.login;
  const common = t.common;
  const isUrdu = language === "ur";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Connect your authentication backend here.
    // Doctor access must also be verified on the server.
    setSubmitted(true);
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-5">
        <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1.5 text-sm font-semibold text-teal-700">
          <Stethoscope className="size-4" aria-hidden="true" />
          {common.portal}
        </span>

        <h1 className={`text-3xl font-bold text-slate-900 ${isUrdu ? "leading-relaxed" : "tracking-tight"}`}>
          {login.heading}
        </h1>

        <p className="mt-2 text-sm leading-7 text-slate-600">
          {login.description}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <LabeledInput
          id="doctor-email"
          name="email"
          type="email"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          label={login.email}
          icon={<Mail className="size-4" />}
          placeholder={login.emailPlaceholder}
          required
        />

        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label htmlFor="doctor-password" className="text-sm font-semibold text-slate-700">
              {login.password}
            </label>

            <Link to="/forgot-password" className="rounded py-1 text-sm font-semibold text-teal-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">
              {login.forgot}
            </Link>
          </div>

          <LabeledInput
            id="doctor-password"
            name="password"
            type="password"
            autoComplete="current-password"
            label={login.password}
            icon={<LockKeyhole className="size-4" />}
            placeholder={login.passwordPlaceholder}
            required
            showPasswordToggle
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword((v) => !v)}
            toggleAriaLabel={{ show: login.show, hide: login.hide }}
          />
        </div>

        <Button type="submit" className="h-12 w-full gap-2 rounded-xl bg-teal-700 text-base font-semibold text-white hover:bg-teal-800">
          {login.login}
          <ArrowRight className={`size-4 ${isUrdu ? "rotate-180" : ""}`} aria-hidden="true" />
        </Button>

        <div role="status" aria-live="polite" aria-atomic="true">
          {/* {submitted && (
            <p className="rounded-xl border border-teal-200 bg-teal-50 p-3 text-sm leading-7 text-teal-800">
              {login.demo}
            </p>
          )} */}
        </div>
      </form>

      <p className="mt-4 text-center text-sm leading-7 text-slate-600">
        {login.newAccount}{" "}
        <Link to="/signup" className="font-semibold text-teal-700 hover:underline">
          {login.register}
        </Link>
      </p>

      <div className="my-4 flex items-center gap-3">
        <span className="h-px flex-1 bg-slate-200" />
        <span className="text-sm text-slate-500">{login.patientQuestion}</span>
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <Link to="/patient/login" className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-center text-sm font-semibold text-slate-700 hover:border-teal-300 hover:bg-teal-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">
        {login.patientLogin}
        <ArrowRight className={`size-4 ${isUrdu ? "rotate-180" : ""}`} aria-hidden="true" />
      </Link>

      <p className="mt-4 text-center text-sm leading-6 text-slate-500">
        {login.reminder}
      </p>
    </div>
  );
}