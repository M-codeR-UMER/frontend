import { CalendarDays, ClipboardList, UsersRound } from "lucide-react";
import type { Language } from "~/lib/i18n/translations";
import { getTranslations } from "~/lib/i18n/translations";

const icons = [CalendarDays, UsersRound, ClipboardList];

interface MarketingHeroProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export function MarketingHero({ language, onLanguageChange }: MarketingHeroProps) {
  const isUrdu = language === "ur";
  const t = getTranslations(language);
  const marketing = t.marketing;

  return (
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

          <LanguageSwitcher language={language} onChange={onLanguageChange} />
        </div>

        <div className="mt-8 lg:mt-10">
          <p className="text-sm font-bold leading-7 text-teal-700">
            {marketing.eyebrow}
          </p>

          <h2
            id="practice-heading"
            className={`mt-3 text-3xl font-bold text-slate-900 sm:text-4xl ${
              isUrdu
                ? "leading-relaxed"
                : "leading-tight tracking-tight"
            }`}
          >
            {marketing.heading.map((line, index) => (
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
            {marketing.description}
          </p>
        </div>

        <ul className="mt-6 space-y-4 lg:mt-8 lg:space-y-5">
          {marketing.benefits.map((benefit, index) => {
            const Icon = icons[index];

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
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function LanguageSwitcher({
  language,
  onChange,
}: {
  language: Language;
  onChange: (lang: Language) => void;
}) {
  return (
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
          onClick={() => onChange(value)}
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
  );
}