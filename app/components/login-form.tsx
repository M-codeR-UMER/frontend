import { useState, type FormEvent } from "react"
import { Link } from "react-router"
import { ArrowRight, Eye, EyeOff, Mail, LockKeyhole, Stethoscope } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"

export type Language = "en" | "ur"

const translations = {
  en: {
    portal: "Doctor portal",
    heading: "Welcome back, Doctor",
    description: "Sign in to manage appointments and stay connected with your patients.",
    email: "Email address",
    password: "Password",
    passwordHint: "Enter your password",
    forgot: "Forgot password?",
    show: "Show password",
    hide: "Hide password",
    login: "Sign in as Doctor",
    newAccount: "Don't have an account?",
    register: "Register as a doctor",
    patientQuestion: "Looking for a doctor?",
    patientLogin: "Continue to Patient Login",
    reminder: "Using a shared device? Sign out when you finish.",
    demo: "Authentication is not connected yet. No login request has been sent.",
  },
  ur: {
    portal: "ڈاکٹر پورٹل",
    heading: "ڈاکٹر صاحب، خوش آمدید",
    description: "اپنی اپائنٹمنٹس کا انتظام کرنے اور مریضوں سے رابطے میں رہنے کے لیے لاگ اِن کریں۔",
    email: "ای میل",
    password: "پاس ورڈ",
    passwordHint: "اپنا پاس ورڈ درج کریں",
    forgot: "پاس ورڈ بھول گئے؟",
    show: "پاس ورڈ دکھائیں",
    hide: "پاس ورڈ چھپائیں",
    login: "بطور ڈاکٹر لاگ اِن کریں",
    newAccount: "ابھی اکاؤنٹ نہیں ہے؟",
    register: "بطور ڈاکٹر رجسٹر ہوں",
    patientQuestion: "ڈاکٹر تلاش کرنا چاہتے ہیں؟",
    patientLogin: "مریض کے طور پر لاگ اِن کریں",
    reminder: "مشترکہ ڈیوائس پر کام مکمل ہونے کے بعد لاگ آؤٹ ضرور کریں۔",
    demo: "لاگ اِن کی سہولت ابھی منسلک نہیں ہے۔ کوئی درخواست نہیں بھیجی گئی۔",
  },
}

export function LoginForm({ language }: { language: Language }) {
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const t = translations[language]
  const isUrdu = language === "ur"

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // Connect your authentication backend here.
    // Doctor access must also be verified on the server.
    setSubmitted(true)
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-5">
        <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1.5 text-sm font-semibold text-teal-700">
          <Stethoscope className="size-4" aria-hidden="true" />
          {t.portal}
        </span>

        <h1 className={`text-3xl font-bold text-slate-900 ${isUrdu ? "leading-relaxed" : "tracking-tight"}`}>
          {t.heading}
        </h1>

        <p className="mt-2 text-sm leading-7 text-slate-600">
          {t.description}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" action={(data) =>{
        console.log(data.get("email"))
        console.log(data.get("password"))
      }}>
        <div className="space-y-2">
          <label htmlFor="doctor-email" className="block text-sm font-semibold text-slate-700">
            {t.email}
          </label>

          <div className="relative" dir="ltr">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <Input
              id="doctor-email"
              name="email"
              type="email"
              autoComplete="username"
              autoCapitalize="none"
              spellCheck={false}
              placeholder="doctor@example.com"
              required
              className="h-12 rounded-xl border-slate-200 bg-white pl-11 text-left text-base text-slate-900 placeholder:text-slate-400 focus-visible:border-teal-600 focus-visible:ring-teal-600/20"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label htmlFor="doctor-password" className="text-sm font-semibold text-slate-700">
              {t.password}
            </label>

            <Link to="/forgot-password" className="rounded py-1 text-sm font-semibold text-teal-700 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">
              {t.forgot}
            </Link>
          </div>

          <div className="relative" dir="ltr">
            <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <Input
              id="doctor-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder={t.passwordHint}
              required
              className="h-12 rounded-xl border-slate-200 bg-white pl-11 pr-12 text-left text-base text-slate-900 placeholder:text-slate-400 focus-visible:border-teal-600 focus-visible:ring-teal-600/20"
            />

            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? t.hide : t.show}
              aria-controls="doctor-password"
              aria-pressed={showPassword}
              className="absolute right-0.5 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 hover:text-teal-700 focus-visible:outline-2 focus-visible:outline-teal-600"
            >
              {showPassword ? (
                <EyeOff className="size-4" aria-hidden="true" />
              ) : (
                <Eye className="size-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        <Button type="submit" className="h-12 w-full gap-2 rounded-xl bg-teal-700 text-base font-semibold text-white hover:bg-teal-800">
          {t.login}
          <ArrowRight className={`size-4 ${isUrdu ? "rotate-180" : ""}`} aria-hidden="true" />
        </Button>

        <div role="status" aria-live="polite" aria-atomic="true">
          {/* {submitted && (
            <p className="rounded-xl border border-teal-200 bg-teal-50 p-3 text-sm leading-7 text-teal-800">
              {t.demo}
            </p>
          )} */}
        </div>
      </form>

      <p className="mt-4 text-center text-sm leading-7 text-slate-600">
        {t.newAccount}{" "}
        <Link to="/register" className="font-semibold text-teal-700 hover:underline">
          {t.register}
        </Link>
      </p>

      <div className="my-4 flex items-center gap-3">
        <span className="h-px flex-1 bg-slate-200" />
        <span className="text-sm text-slate-500">{t.patientQuestion}</span>
        <span className="h-px flex-1 bg-slate-200" />
      </div>

      <Link to="/patient/login" className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-center text-sm font-semibold text-slate-700 hover:border-teal-300 hover:bg-teal-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">
        {t.patientLogin}
        <ArrowRight className={`size-4 ${isUrdu ? "rotate-180" : ""}`} aria-hidden="true" />
      </Link>

      <p className="mt-4 text-center text-sm leading-6 text-slate-500">
        {t.reminder}
      </p>
    </div>
  )
}