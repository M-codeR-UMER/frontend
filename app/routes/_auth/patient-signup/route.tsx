import { Form, Link, useActionData, useNavigation } from "react-router";
import type { Route } from "./+types/route";
import { apiClient } from "~/lib/api/client";

type ActionResult = {
  success?: boolean;
  error?: string;
};

export async function action({ request }: Route.ActionArgs): Promise<ActionResult> {
  const formData = await request.formData();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!name || !email || !password) {
    return { error: "Please fill in all fields." };
  }

  try {
    await apiClient.patientSignup({ name, email, password });
    return { success: true };
  } catch (error: any) {
    return { error: error.message || "Could not create account. Please try again." };
  }
}

export function meta() {
  return [
    { title: "Patient Registration | Asaandoc" },
    {
      name: "description",
      content: "Create your Asaandoc patient account.",
    },
  ];
}

export default function PatientSignupPage() {
  const result = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold tracking-tight text-teal-700">
            asaan<span className="text-teal-500">doc</span>
          </Link>
          <h1 className="mt-6 text-3xl font-bold text-slate-900">Create Patient Account</h1>
          <p className="mt-2 text-sm text-slate-600">Join Asaandoc to manage your health</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          {result?.success ? (
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-teal-100">
                <svg className="h-8 w-8 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-teal-900">Account Created</h2>
              <p className="mt-2 text-sm text-teal-800">Your patient account has been created successfully.</p>
              <Link
                to="/patient/login"
                className="mt-6 inline-flex rounded-lg bg-teal-700 px-5 py-3 text-sm font-semibold text-white hover:bg-teal-800"
              >
                Go to Patient Login
              </Link>
            </div>
          ) : (
            <>
              {result?.error && (
                <div
                  role="alert"
                  className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800"
                >
                  {result.error}
                </div>
              )}

              <Form method="post" className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700">
                    Full name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Ayesha Khan"
                    required
                    className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="patient@example.com"
                    required
                    className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Create a secure password"
                    minLength={8}
                    required
                    className="mt-1 block w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-teal-700 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-800 focus:ring-2 focus:ring-teal-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Creating account..." : "Create account"}
                </button>
              </Form>

              <p className="mt-6 text-center text-sm text-slate-600">
                Already have an account?{" "}
                <Link to="/patient/login" className="font-semibold text-teal-700 hover:text-teal-900">
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          Are you a doctor?{" "}
          <Link to="/signup" className="font-semibold text-teal-700 hover:text-teal-900">
            Doctor Registration
          </Link>
        </p>
      </div>
    </main>
  );
}