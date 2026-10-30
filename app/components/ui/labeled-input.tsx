import { cn } from "cn";
import { Input } from "~/components/ui/input";
import type { ReactNode, InputHTMLAttributes, ForwardRefExoticComponent, RefAttributes } from "react";

interface LabeledInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  hint?: string;
  error?: string;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
  showPassword?: boolean;
  toggleAriaLabel?: { show: string; hide: string };
}

export const LabeledInput = (
  {
    label,
    icon,
    iconPosition = "left",
    hint,
    error,
    showPasswordToggle = false,
    onTogglePassword,
    showPassword = false,
    toggleAriaLabel,
    className,
    id,
    type = "text",
    ...props
  }: LabeledInputProps
) => {
  const inputId = id;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <div className="relative" dir="ltr">
        {icon && iconPosition === "left" && (
          <span
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          >
            {icon}
          </span>
        )}

        <Input
          id={inputId}
          type={showPasswordToggle && showPassword ? "text" : type}
          aria-describedby={describedBy}
          aria-invalid={!!error}
          className={cn(
            "h-12 rounded-xl border-slate-200 bg-white pl-11 pr-12 text-left text-base text-slate-900 placeholder:text-slate-400 focus-visible:border-teal-600 focus-visible:ring-teal-600/20",
            iconPosition === "left" ? "pl-11" : "pl-4",
            showPasswordToggle ? "pr-12" : "pr-4",
            iconPosition === "right" && icon ? "pr-11" : "",
            className
          )}
          {...props}
        />

        {icon && iconPosition === "right" && (
          <span
            className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          >
            {icon}
          </span>
        )}

        {showPasswordToggle && onTogglePassword && toggleAriaLabel && (
          <button
            type="button"
            onClick={onTogglePassword}
            aria-label={showPassword ? toggleAriaLabel.hide : toggleAriaLabel.show}
            aria-controls={inputId}
            aria-pressed={showPassword}
            className="absolute right-3.5 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 hover:text-teal-700 focus-visible:outline-2 focus-visible:outline-teal-600"
          >
            {showPassword ? (
              <svg
                className="size-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            ) : (
              <svg
                className="size-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        )}
      </div>

      {hint && !error && (
        <p id={hintId} className="text-xs text-slate-500">
          {hint}
        </p>
      )}

      {error && (
        <p id={errorId} className="text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

LabeledInput.displayName = "LabeledInput";