import { useState } from "react";
import { Form, Link, useActionData, useNavigation } from "react-router";
import { ArrowRight, Stethoscope, UserRound } from "lucide-react";
import { Mail, LockKeyhole, Phone } from "lucide-react";
import { Button } from "~/components/ui/button";
import { LabeledInput } from "~/components/ui/labeled-input";
import type { Language } from "~/lib/i18n/translations";
import { getTranslations } from "~/lib/i18n/translations";
import type { SignupActionResult } from "~/lib/api/types";

export function SignupForm({ language }: { language: Language }) {
  const [showPassword, setShowPassword] = useState(false);
  const result = useActionData<SignupActionResult>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";
  const isUrdu = language === "ur";
  const t = getTranslations(language);
  const signup = t.signup;
  const common = t.common;

  if (result?.success) {
    return (
      <div className="w-full max-w-md">
        <div
          role="status"
          className="rounded-2xl border border-teal-200 bg-teal-50 p-6"
        >
          <h1 className="text-2xl font-bold text-teal-900">
            {signup.success}
          </h1>

          <p className="mt-3 text-sm leading-6 text-teal-800">
            {signup.successHint}
          </p>

          <Link
            to="/login"
            className="mt-5 inline-flex items-center gap-2 font-semibold text-teal-700 hover:text-teal-900"
          >
            {signup.goToLogin}
            <ArrowRight
              className={`size-4 ${isUrdu ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-5">
        <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1.5 text-sm font-semibold text-teal-700">
          <Stethoscope className="size-4" aria-hidden="true" />
          {common.portal}
        </span>

        <h1
          className={`text-3xl font-bold text-slate-900 ${
            isUrdu ? "leading-relaxed" : "tracking-tight"
          }`}
        >
          {signup.heading}
        </h1>

        <p className="mt-2 text-sm leading-7 text-slate-600">
          {signup.description}
        </p>
      </div>

      {result?.error && (
        <div
          role="alert"
          className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-800"
        >
          {result.error}
        </div>
      )}

      <Form method="post" className="space-y-4">
        <LabeledInput
          id="signup-name"
          name="name"
          type="text"
          autoComplete="name"
          label={signup.name}
          icon={<UserRound className="size-4" />}
          placeholder={signup.namePlaceholder}
          maxLength={32}
          required
        />

        <LabeledInput
          id="signup-email"
          name="email"
          type="email"
          autoComplete="email"
          label={signup.email}
          icon={<Mail className="size-4" />}
          placeholder={signup.emailPlaceholder}
          required
        />

        <LabeledInput
          id="signup-phone"
          name="phone_number"
          type="tel"
          autoComplete="tel"
          label={signup.phone}
          icon={<Phone className="size-4" />}
          placeholder={signup.phonePlaceholder}
          maxLength={20}
          required
          hint="Include your country code when possible."
        />

        <LabeledInput
          id="signup-password"
          name="password"
          type="password"
          autoComplete="new-password"
          label={signup.password}
          icon={<LockKeyhole className="size-4" />}
          placeholder={signup.passwordPlaceholder}
          minLength={8}
          maxLength={72}
          required
          showPasswordToggle
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword((current) => !current)}
          toggleAriaLabel={{ show: signup.show, hide: signup.hide }}
          hint={signup.passwordHint}
        />

        <div className="flex items-start gap-3">
          <input
            id="signup-terms"
            name="terms_accepted"
            type="checkbox"
            required
            className="mt-1 size-4 rounded border-slate-300 accent-teal-700"
          />

          <label
            htmlFor="signup-terms"
            className="text-sm leading-6 text-slate-600"
          >
            {signup.terms}
          </label>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full bg-teal-700 font-semibold text-white hover:bg-teal-800"
        >
          {isSubmitting ? signup.submitting : signup.submit}
        </Button>
      </Form>

      <p className="mt-6 text-center text-sm text-slate-600">
        {signup.existing}{" "}
        <Link
          to="/"
          className="font-semibold text-teal-700 hover:text-teal-900"
        >
          {signup.login}
        </Link>
      </p>
    </div>
  );
}