import { Outlet, Link } from "react-router";
import { PatientOnlyRoute } from "~/components/auth/protected-route";

interface LayoutProps {
  children: React.ReactNode;
}

export default function PatientLayout({ children }: LayoutProps) {
  return (
    <PatientOnlyRoute>
      <div className="min-h-screen bg-slate-50">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <nav className="flex items-center justify-between" aria-label="Global">
              <div className="flex items-center gap-8">
                <Link to="/patient/dashboard" className="text-xl font-bold text-teal-700">
                  Asaandoc
                </Link>
                <div className="hidden md:flex md:gap-6">
                  <Link to="/patient/dashboard" className="text-sm font-medium text-slate-700 hover:text-teal-700">
                    Dashboard
                  </Link>
                  <Link to="/patient/appointments" className="text-sm font-medium text-slate-700 hover:text-teal-700">
                    Appointments
                  </Link>
                  <Link to="/patient/records" className="text-sm font-medium text-slate-700 hover:text-teal-700">
                    Records
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-600">Patient</span>
                <form action="/patient/logout" method="post">
                  <button type="submit" className="text-sm font-medium text-teal-700 hover:text-teal-900">
                    Sign out
                  </button>
                </form>
              </div>
            </nav>
          </div>
        </header>
        <main className="py-8">
          {children}
        </main>
      </div>
    </PatientOnlyRoute>
  );
}