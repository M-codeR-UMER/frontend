import { useLoaderData } from "react-router";
import type { Route } from "./+types/route";
import { apiClient } from "~/lib/api/client";

export async function loader({ request }: Route.LoaderArgs) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader) {
    throw new Response("Unauthorized", { status: 401 });
  }

  try {
    apiClient.setTokens({ access_token: authHeader.replace("Bearer ", ""), token_type: "Bearer" });
    const doctor = await apiClient.getDoctorDashboard();
    return doctor;
  } catch {
    throw new Response("Unauthorized", { status: 401 });
  }
}

export default function DoctorDashboard() {
  const doctor = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Doctor Dashboard</h1>
          <p className="mt-2 text-slate-600">Welcome back, {doctor.name || "Doctor"}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Appointments</h3>
            <p className="mt-2 text-3xl font-bold text-teal-700">—</p>
            <p className="mt-2 text-sm text-slate-500">No appointments scheduled</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Patients</h3>
            <p className="mt-2 text-3xl font-bold text-teal-700">—</p>
            <p className="mt-2 text-sm text-slate-500">No patients yet</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Schedule</h3>
            <p className="mt-2 text-3xl font-bold text-teal-700">—</p>
            <p className="mt-2 text-sm text-slate-500">No schedule set</p>
          </div>
        </div>
      </div>
    </div>
  );
}