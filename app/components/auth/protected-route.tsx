import { Navigate, Outlet } from "react-router";
import { useAuth } from "~/lib/auth/hooks";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children?: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children ?? <Outlet />;
}

export function DoctorOnlyRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isDoctor, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600" />
      </div>
    );
  }

  if (!isAuthenticated || !isDoctor) {
    return <Navigate to="/login" replace />;
  }

  return children ?? <Outlet />;
}

export function PatientOnlyRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isPatient, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600" />
      </div>
    );
  }

  if (!isAuthenticated || !isPatient) {
    return <Navigate to="/patient/login" replace />;
  }

  return children ?? <Outlet />;
}

export function PublicOnlyRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/doctor/dashboard" replace />;
  }

  return children ?? <Outlet />;
}