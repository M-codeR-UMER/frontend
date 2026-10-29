import { useState } from "react"
import { Form, Link, useActionData, useNavigation } from "react-router"
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Phone,
  Stethoscope,
  UserRound,
} from "lucide-react"

import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import type { Language } from "~/components/login-form"
import type { SignupActionResult } from "~/routes/signup"

const translations = {
  en: {
    portal: "Doctor portal",
    heading: "Create your account",
    description:
      "Start your Asaandoc journey with your account and contact details.",
    name: "Full name",
    namePlaceholder: "Dr. Ayesha Khan",
    email: "Email address",
    emailPlaceholder: "doctor@example.com",
    phone: "Mobile number",
    phonePlaceholder: "+92 300 1234567",
    password: "Password",
    passwordPlaceholder: "Create a password",
    passwordHint: "At least 8 characters; maximum 72 UTF-8 bytes.",
    terms: "I have read and accept the Asaandoc terms and conditions.",
    submit: "Create doctor account",
    submitting: "Creating account...",
    existing: "Already have an account?",
    login: "Sign in",
    show: "Show password",
    hide: "Hide password",
    success: "Your account has been created.",
    successHint: "Doctor sign-in is not connected yet.",
    goToLogin: "Go to doctor login",
  },
  ur: {
    portal: "ڈاکٹر پورٹل",
    heading: "اپنا اکاؤنٹ بنائیں",
    description:
      "اپنے اکاؤنٹ اور رابطے کی تفصیلات کے ساتھ آسان ڈاک پر آغاز کریں۔",
    name: "پورا نام",
    namePlaceholder: "ڈاکٹر عائشہ خان",
    email: "ای میل",
    emailPlaceholder: "doctor@example.com",
    phone: "موبائل نمبر",
    phonePlaceholder: "+92 300 1234567",
    password: "پاس ورڈ",
    passwordPlaceholder: "پاس ورڈ بنائیں",
    passwordHint: "کم از کم 8 حروف؛ زیادہ سے زیادہ 72 UTF-8 بائٹس۔",
    terms: "میں نے آسان ڈاک کی شرائط پڑھ لی ہیں اور انہیں قبول کرتا/کرتی ہوں۔",
    submit: "ڈاکٹر اکاؤنٹ بنائیں",
    submitting: "اکاؤنٹ بنایا جا رہا ہے...",
    existing: "پہلے سے اکاؤنٹ ہے؟",
    login: "لاگ اِن کریں",
    show: "پاس ورڈ دکھائیں",
    hide: "پاس ورڈ چھپائیں",
    success: "آپ کا اکاؤنٹ بن گیا ہے۔",
    successHint: "ڈاکٹر لاگ اِن ابھی منسلک نہیں ہے۔",
    goToLogin: "ڈاکٹر لاگ اِن پر جائیں",
  },
}

const labelClass = "block text-sm font-semibold text-slate-700"
const inputClass =
  "h-11 border-slate-200 bg-white text-slate-900 focus-visible:ring-teal-500"

export function SignupForm({ language }: { language: Language }) {
  const [showPassword, setShowPassword] = useState(false)
  const result = useActionData<SignupActionResult>()
  const navigation = useNavigation()
  const isSubmitting = navigation.state !== "idle"
  const isUrdu = language === "ur"
  const t = translations[language]

  if (result?.success) {
    return (
      <div className="w-full max-w-md">
        <div
          role="status"
          className="rounded-2xl border border-teal-200 bg-teal-50 p-6"
        >
          <h1 className="text-2xl font-bold text-teal-900">
            {t.success}
          </h1>

          <p className="mt-3 text-sm leading-6 text-teal-800">
            {t.successHint}
          </p>

          <Link
            to="/login"
            className="mt-5 inline-flex items-center gap-2 font-semibold text-teal-700 hover:text-teal-900"
          >
            {t.goToLogin}
            <ArrowRight
              className={`size-4 ${isUrdu ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-5">
        <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1.5 text-sm font-semibold text-teal-700">
          <Stethoscope className="size-4" aria-hidden="true" />
          {t.portal}
        </span>

        <h1
          className={`text-3xl font-bold text-slate-900 ${
            isUrdu ? "leading-relaxed" : "tracking-tight"
          }`}
        >
          {t.heading}
        </h1>

        <p className="mt-2 text-sm leading-7 text-slate-600">
          {t.description}
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
        <div className="space-y-2">
          <label htmlFor="signup-name" className={labelClass}>
            {t.name}
          </label>

          <div className="relative">
            <UserRound
              className="pointer-events-none absolute start-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />

            <Input
              id="signup-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder={t.namePlaceholder}
              maxLength={32}
              required
              className={`${inputClass} ps-10`}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="signup-email" className={labelClass}>
            {t.email}
          </label>

          <div className="relative" dir="ltr">
            <Mail
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />

            <Input
              id="signup-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder={t.emailPlaceholder}
              required
              className={`${inputClass} pl-10`}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="signup-phone" className={labelClass}>
            {t.phone}
          </label>

          <div className="relative" dir="ltr">
            <Phone
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />

            <Input
              id="signup-phone"
              name="phone_number"
              type="tel"
              autoComplete="tel"
              placeholder={t.phonePlaceholder}
              maxLength={20}
              required
              className={`${inputClass} pl-10`}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="signup-password" className={labelClass}>
            {t.password}
          </label>

          <div className="relative" dir="ltr">
            <LockKeyhole
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />

            <Input
              id="signup-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder={t.passwordPlaceholder}
              minLength={8}
              maxLength={72}
              required
              aria-describedby="signup-password-hint"
              className={`${inputClass} pl-10 pr-12`}
            />

            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? t.hide : t.show}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-teal-700"
            >
              {showPassword ? (
                <EyeOff className="size-4" aria-hidden="true" />
              ) : (
                <Eye className="size-4" aria-hidden="true" />
              )}
            </button>
          </div>

          <p id="signup-password-hint" className="text-xs text-slate-500">
            {t.passwordHint}
          </p>
        </div>

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
            {t.terms}
          </label>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full bg-teal-700 font-semibold text-white hover:bg-teal-800"
        >
          {isSubmitting ? t.submitting : t.submit}
        </Button>
      </Form>

      <p className="mt-6 text-center text-sm text-slate-600">
        {t.existing}{" "}
        <Link
          to="/login"
          className="font-semibold text-teal-700 hover:text-teal-900"
        >
          {t.login}
        </Link>
      </p>
    </div>
  )
}