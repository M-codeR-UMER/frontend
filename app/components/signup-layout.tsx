import { useState } from "react"
import { CalendarDays, ClipboardList, UsersRound } from "lucide-react"
import type { Language } from "~/components/login-form"
import { SignupForm } from "~/components/signup-form"

const translations = {
  en: {
    eyebrow: "Care made simple",
    heading: [
      "Your patients.",
      "Your practice.",
      "One connected platform.",
    ],
    description:
      "Asaandoc helps doctors and patients across Pakistan take the next step toward better care.",
    benefits: [
      {
        title: "Appointments, organized",
        description: "Manage your consultations and daily schedule.",
      },
      {
        title: "Stay connected",
        description: "Help patients connect with your practice.",
      },
      {
        title: "Your practice, simplified",
        description: "Spend less time coordinating and more time caring.",
      },
    ],
  },
  ur: {
    eyebrow: "صحت کا آسان راستہ",
    heading: [
      "آپ کے مریض۔",
      "آپ کی پریکٹس۔",
      "سب ایک ہی پلیٹ فارم پر۔",
    ],
    description:
      "آسان ڈاک پاکستان بھر میں ڈاکٹروں اور مریضوں کو بہتر صحت کی جانب قدم بڑھانے میں مدد دیتا ہے۔",
    benefits: [
      {
        title: "اپائنٹمنٹس کا آسان انتظام",
        description: "اپنی مشاورت اور روزانہ کے شیڈول کا انتظام کریں۔",
      },
      {
        title: "مریضوں سے رابطے میں رہیں",
        description: "مریضوں کے لیے آپ سے رابطہ کرنا آسان بنائیں۔",
      },
      {
        title: "پریکٹس کا انتظام، اب آسان",
        description:
          "انتظامی کاموں پر کم اور مریضوں کی دیکھ بھال پر زیادہ وقت دیں۔",
      },
    ],
  },
}

const icons = [CalendarDays, UsersRound, ClipboardList]

export function meta() {
  return [
    { title: "Doctor Login | Asaandoc | ڈاکٹر لاگ اِن" },
    {
      name: "description",
      content: "Sign in to the Asaandoc doctor portal in English or Urdu.",
    },
  ]
}

export default function LoginPage() {
  const [language, setLanguage] = useState<Language>("en")
  const isUrdu = language === "ur"
  const t = translations[language]

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
      <section
        aria-labelledby="practice-heading"
        className="relative flex items-center justify-center overflow-hidden bg-teal-50 px-6 py-8 sm:px-10 sm:py-12 lg:px-12 lg:py-8 xl:px-16"
      >
        <div
          className="pointer-events-none absolute -end-24 -top-24 size-80 rounded-full bg-teal-100/70 sm:size-96"
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute -bottom-32 -start-32 size-96 rounded-full bg-cyan-100/50"
          aria-hidden="true"
        />

        <div className="relative z-10 w-full max-w-lg">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <img
              src="/logo-landscape.png"
              alt={isUrdu ? "آسان ڈاک" : "Asaandoc"}
              width={1000}
              height={400}
              className="h-auto w-40 object-contain sm:w-48"
            />

            <div
              role="group"
              aria-label="Language / زبان"
              dir="ltr"
              className="flex gap-1 rounded-xl border border-teal-200 bg-white p-1"
            >
              {(["en", "ur"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  lang={value}
                  aria-pressed={language === value}
                  onClick={() => setLanguage(value)}
                  className={`min-h-11 rounded-lg px-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 ${
                    language === value
                      ? "bg-teal-700 text-white"
                      : "text-slate-600 hover:bg-teal-50"
                  }`}
                >
                  {value === "en" ? "English" : "اردو"}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 lg:mt-10">
            <p className="text-sm font-bold leading-7 text-teal-700">
              {t.eyebrow}
            </p>

            <h2
              id="practice-heading"
              className={`mt-3 text-3xl font-bold text-slate-900 sm:text-4xl ${
                isUrdu
                  ? "leading-relaxed"
                  : "leading-tight tracking-tight"
              }`}
            >
              {t.heading.map((line, index) => (
                <span
                  key={index}
                  className={`block ${
                    index === 2 ? "text-teal-700" : ""
                  }`}
                >
                  {line}
                </span>
              ))}
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">
              {t.description}
            </p>
          </div>

          <ul className="mt-6 space-y-4 lg:mt-8 lg:space-y-5">
            {t.benefits.map((benefit, index) => {
              const Icon = icons[index]

              return (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white text-teal-700 shadow-sm">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>

                  <div>
                    <h3 className="text-sm font-semibold leading-6 text-slate-800">
                      {benefit.title}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {benefit.description}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section
        aria-label={isUrdu ? "ڈاکٹر لاگ اِن" : "Doctor sign in"}
        className="flex items-center justify-center bg-white px-6 py-10 sm:px-10 lg:px-12 lg:py-8 xl:px-16"
      >
        <SignupForm language={language} />      </section>
    </main>
  )
}