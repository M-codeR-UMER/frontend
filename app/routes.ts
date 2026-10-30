import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  // Public auth routes
  index("routes/_auth/login/route.tsx"),
  route("signup", "routes/_auth/signup/route.tsx"),
  route("patient/login", "routes/_auth/patient-login/route.tsx"),
  route("patient/signup", "routes/_auth/patient-signup/route.tsx"),

  // Protected doctor routes
  layout("routes/_app/doctor/layout.tsx", [
    route("doctor/dashboard", "routes/_app/doctor/route.tsx"),
  ]),

  // Protected patient routes
  layout("routes/_app/patient/layout.tsx", [
    route("patient/dashboard", "routes/_app/patient/route.tsx"),
  ]),
] satisfies RouteConfig;