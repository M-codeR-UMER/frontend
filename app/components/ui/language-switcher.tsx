import type { Language } from "~/lib/i18n/translations";

interface LanguageSwitcherProps {
  language: Language;
  onChange: (lang: Language) => void;
  className?: string;
}

export function LanguageSwitcher({
  language,
  onChange,
  className,
}: LanguageSwitcherProps) {
  return (
    <div
      role="group"
      aria-label="Language / زبان"
      dir="ltr"
      className={`flex gap-1 rounded-xl border border-teal-200 bg-white p-1 ${className ?? ""}`}
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