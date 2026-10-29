import { Form, Link, useActionData, useNavigation } from "react-router";
import type { Route } from "./+types/signup";

type ActionResult = {
  success?: boolean;
  error?: string;
};

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
}: Route.ActionArgs): Promise<ActionResult> {
  // Reject cross-origin form submissions when the browser supplies Origin.
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

const inputClass =
  "mt-2 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:ring-4 focus:ring-teal-100";

export default function SignupPage() {
  const result = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 sm:py-12">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/70 lg:grid-cols-2">
        {/* Intro panel */}
        <section className="bg-teal-800 p-8 text-white sm:p-12">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight text-white"
          >
            asaan<span className="text-teal-200">doc</span>
          </Link>

          <div className="mt-12 lg:mt-20">
            <p className="text-sm font-semibold uppercase tracking-widest text-teal-200">
              Doctor portal
            </p>

            <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
              Your practice starts here.
            </h1>

            <p className="mt-5 max-w-md text-base leading-7 text-teal-50">
              Create your doctor account to take the first step toward a
              simpler, more connected practice.
            </p>

            <div className="mt-10 rounded-2xl border border-white/20 bg-white/10 p-5">
              <p className="font-semibold">Step 1: Account details</p>
              <p className="mt-2 text-sm leading-6 text-teal-50">
                Start with your contact information and a secure password.
                Additional professional details can be collected in a later
                step.
              </p>
            </div>
          </div>
        </section>

        {/* Form panel */}
        <section className="p-8 sm:p-12">
          {result?.success ? (
            <div
              role="status"
              className="rounded-2xl border border-teal-200 bg-teal-50 p-6"
            >
              <h2 className="text-2xl font-bold text-teal-900">
                Account created
              </h2>

              <p className="mt-3 text-sm leading-6 text-teal-900">
                Your account details have been registered. Doctor sign-in is
                being connected and is not available yet.
              </p>

              <Link
                to="/login"
                className="mt-6 inline-flex rounded-xl bg-teal-700 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-800"
              >
                Go to doctor login
              </Link>
            </div>
          ) : (
            <>
              <p className="text-sm font-semibold text-teal-700">
                CREATE YOUR ACCOUNT
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight">
                Register as a doctor
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Enter your account and contact information below.
              </p>

              {result?.error && (
                <div
                  role="alert"
                  className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                >
                  {result.error}
                </div>
              )}

              <Form method="post" className="mt-8 space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    Full name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Dr. Ayesha Khan"
                    maxLength={32}
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="doctor@example.com"
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone_number"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    Mobile number
                  </label>

                  <input
                    id="phone_number"
                    name="phone_number"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+92 300 1234567"
                    maxLength={20}
                    required
                    aria-describedby="phone-hint"
                    className={inputClass}
                  />

                  <p id="phone-hint" className="mt-2 text-xs text-slate-500">
                    Include your country code when possible.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Create a secure password"
                    minLength={8}
                    maxLength={72}
                    required
                    aria-describedby="password-hint"
                    className={inputClass}
                  />

                  <p
                    id="password-hint"
                    className="mt-2 text-xs leading-5 text-slate-500"
                  >
                    At least 8 characters and no more than 72 UTF-8 bytes.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    id="terms_accepted"
                    name="terms_accepted"
                    type="checkbox"
                    required
                    className="mt-1 h-4 w-4 rounded border-slate-300 accent-teal-700"
                  />

                  <label
                    htmlFor="terms_accepted"
                    className="text-sm leading-6 text-slate-600"
                  >
                    I have read and accept the Asaandoc terms and conditions.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-teal-700 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-teal-800 focus:outline-none focus:ring-4 focus:ring-teal-200 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Creating account..." : "Create account"}
                </button>
              </Form>

              <p className="mt-6 text-center text-sm text-slate-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-teal-700 hover:text-teal-900"
                >
                  Sign in
                </Link>
              </p>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
