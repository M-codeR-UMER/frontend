# Asaandoc Frontend - Comprehensive Changes Documentation

## Project Overview
**Project**: Asaandoc - Doctor/Patient Portal for Pakistan Healthcare
**Stack**: React Router v8 (Framework Mode) + TypeScript + Tailwind CSS v4 + @base-ui/react + Axios
**Backend API**: `http://127.0.0.1:8000` (FastAPI/OpenAPI)

---

## Summary of Changes

### 1. Project Cleanup & Restructuring

#### Removed Dead/Unused Code
- Deleted `app/components/signup-layout.tsx` - duplicate of login page
- Deleted `app/routes/login-redirect.tsx` - trivial redirect route
- Deleted `.agents/` folder - skill/agent configuration
- Deleted `.kilo/` folder - planning/agent management
- Deleted `app/api/server/` - empty folder (old http.server.ts)
- Deleted `pnpm-workspace.yaml` - not needed for single package
- Deleted `components.json` - shadcn config (incompatible with Tailwind v4)
- Removed `@fontsource-variable/geist` - unused font dependency
- Removed `shadcn` dev dependency - not used

#### New Folder Structure
```
app/
├── api/
│   └── generated/client.ts          # Auto-generated OpenAPI types (untouched)
├── components/
│   ├── auth/
│   │   └── protected-route.tsx      # Route guards (DoctorOnly, PatientOnly, PublicOnly)
│   ├── marketing/
│   │   └── hero-section.tsx         # Shared marketing hero with language switcher
│   └── ui/
│       ├── button.tsx               # Base UI button (cva variants)
│       ├── input.tsx                # Base UI input (explicit Tailwind colors)
│       ├── label.tsx                # Base UI label
│       ├── field.tsx                # Form field components
│       ├── separator.tsx            # Separator component
│       ├── language-switcher.tsx    # EN/UR language toggle
│       └── labeled-input.tsx        # Icon + input wrapper with password toggle
├── lib/
│   ├── api/
│   │   ├── client.ts                # Axios API client (singleton)
│   │   └── types.ts                 # Shared API types (SignupActionResult)
│   ├── auth/
│   │   ├── context.tsx              # AuthContext + AuthProvider
│   │   └── hooks.ts                 # useAuth hook
│   ├── i18n/
│   │   └── translations.ts          # Centralized EN/UR translations
│   └── utils.ts                     # cn utility
└── routes/
    ├── _auth/                       # Public auth routes (no layout)
    │   ├── login/
    │   │   └── route.tsx            # Doctor login (/)
    │   ├── signup/
    │   │   └── route.tsx            # Doctor signup (/signup)
    │   ├── patient-login/
    │   │   └── route.tsx            # Patient login (/patient/login)
    │   └── patient-signup/
    │       └── route.tsx            # Patient signup (/patient/signup)
    ├── _app/                        # Protected app routes (with layouts)
    │   ├── doctor/
    │   │   ├── layout.tsx           # DoctorOnlyRoute + header/nav
    │   │   └── route.tsx            # Doctor dashboard (/doctor/dashboard)
    │   └── patient/
    │       ├── layout.tsx           # PatientOnlyRoute + header/nav
    │       └── route.tsx            # Patient dashboard (/patient/dashboard)
    └── routes.ts                    # Route configuration
```

---

### 2. Route Structure & Navigation

#### Public Routes (No Auth Required)
| Path | Component | Description |
|------|-----------|-------------|
| `/` | `_auth/login/route.tsx` | Doctor login with MarketingHero |
| `/signup` | `_auth/signup/route.tsx` | Doctor registration with MarketingHero |
| `/patient/login` | `_auth/patient-login/route.tsx` | Patient login |
| `/patient/signup` | `_auth/patient-signup/route.tsx` | Patient registration |

#### Protected Routes (Auth Required)
| Path | Layout | Access | Description |
|------|--------|--------|-------------|
| `/doctor/dashboard` | `_app/doctor/layout.tsx` | Doctor only | Doctor dashboard |
| `/patient/dashboard` | `_app/patient/layout.tsx` | Patient only | Patient dashboard |

#### Route Guards (`app/components/auth/protected-route.tsx`)
- `DoctorOnlyRoute` - Redirects to `/` if not authenticated doctor
- `PatientOnlyRoute` - Redirects to `/patient/login` if not authenticated patient
- `PublicOnlyRoute` - Redirects authenticated users to `/doctor/dashboard`
- Loading spinner during auth check

#### Fixed Navigation Links
- `/login` → `/` (login is at index)
- Patient "Doctor Login" link: `/login` → `/`
- Signup "Sign in" link: `/login` → `/`

---

### 3. Internationalization (i18n)

#### Centralized Translations (`app/lib/i18n/translations.ts`)
- **Namespaces**: `common`, `marketing`, `login`, `signup`
- **Languages**: English (`en`) + Urdu (`ur`)
- **RTL Support**: Automatic `dir` and `lang` attributes
- **Font**: Urdu uses `Noto Sans Arabic` font stack

#### Language Switcher
- Component: `app/components/ui/language-switcher.tsx`
- Integrated in `MarketingHero` for both login/signup pages
- Persists language per page via React state

---

### 4. Shared Components

#### MarketingHero (`app/components/marketing/hero-section.tsx`)
- Split-screen layout (lg:grid-cols-2)
- Logo, benefits list, language switcher
- Decorative gradient blobs
- RTL-aware typography

#### LabeledInput (`app/components/ui/labeled-input.tsx`)
- Label + icon + input wrapper
- Password visibility toggle
- Hint/error text support
- Explicit Tailwind colors (no CSS variables)

#### Form Components (refactored)
- `login-form.tsx` - Uses LabeledInput, centralized translations
- `signup-form.tsx` - Uses LabeledInput, centralized translations
- Both use `useActionData` for server action results

---

### 5. API Client (`app/lib/api/client.ts`)

#### Axios Singleton with Interceptors
```typescript
// Request interceptor: Auto-attaches Bearer token
// Response interceptor: 401 → clear tokens + redirect to /login
// Error normalization: Extracts validation details from 422 responses
```

#### Configuration
- Base URL: `import.meta.env.VITE_API_BASE_URL` (default: `http://127.0.0.1:8000`)
- Timeout: 10s
- Credentials: `withCredentials: true` (cookie support)
- Form data support for OAuth2 password grant

#### Typed Methods
| Method | Endpoint | Purpose |
|--------|----------|---------|
| `doctorSignup()` | POST `/doctor/signup` | Register doctor |
| `doctorLogin()` | POST `/doctor/token` | OAuth2 password grant |
| `doctorLogout()` | POST `/doctor/logout` | Logout doctor |
| `getDoctorDashboard()` | GET `/doctor/dashboard` | Protected doctor data |
| `patientSignup()` | POST `/patient/signup` | Register patient |
| `patientLogin()` | POST `/patient/token` | OAuth2 password grant |
| `patientLogout()` | POST `/patient/logout` | Logout patient |
| `getPatientDashboard()` | GET `/patient/dashboard` | Protected patient data |

---

### 6. Authentication System

#### AuthContext (`app/lib/auth/context.tsx`)
- **State**: user, tokens, isLoading
- **Actions**: `loginAsDoctor()`, `loginAsPatient()`, `logout()`
- **Derived**: `isAuthenticated`, `isDoctor`, `isPatient`
- **Provider**: Wraps entire app in `app/root.tsx`

#### Token Management
- In-memory storage (singleton ApiClient)
- Automatic Bearer header injection
- Auto-clear on 401/logout
- Redirect to appropriate login on auth failure

---

### 7. Styling & Tailwind CSS v4

#### Fixed CSS Variable Issues
- **Problem**: @base-ui/react components used CSS variables (`border-input`, `ring-ring`, etc.) not loaded in SSR HTML
- **Solution**: Replaced all CSS variables with explicit Tailwind colors in:
  - `button.tsx` - teal/slate/red variants
  - `input.tsx` - slate/teal/red colors with dark mode
  - `separator.tsx` - slate colors

#### Tailwind Config (`app/app.css`)
- Simplified theme variables
- Fixed `@variant dark` syntax (Tailwind v4)
- Urdu font class: `.urdu { font-family: var(--font-urdu) }`

---

### 8. Configuration Files

#### Package.json
```json
{
  "scripts": {
    "build": "react-router build",
    "dev": "react-router dev",
    "start": "react-router-serve ./build/server/index.js",
    "typecheck": "react-router typegen && tsc",
    "api:generate": "openapi-typescript http://127.0.0.1:8000/openapi.json -o app/api/generated/client.ts"
  },
  "dependencies": {
    "@base-ui/react": "^1.9.0",
    "@react-router/node": "^8.5.0",
    "@react-router/serve": "^8.5.0",
    "axios": "^1.20.0",
    "class-variance-authority": "^0.7.1",
    "cn": "^0.5.0",
    "isbot": "^5.1.36",
    "lucide-react": "^1.61.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "react-router": "^8.5.0",
    "tw-animate-css": "^1.4.0"
  }
}
```

#### Dockerfile
- Uses `pnpm` with `corepack enable`
- Multi-stage build (deps → build → runtime)
- Fixed to use `pnpm` commands instead of `npm`

#### Environment (`.env.example`)
```bash
VITE_API_BASE_URL=http://127.0.0.1:8000
```

---

### 9. TypeScript Configuration

#### tsconfig.json
- Strict mode enabled
- Module resolution: bundler
- Path aliases: `~/*` → `./app/*`
- Verbatim module syntax
- No emit (typecheck only)

---

### 10. Validation Status

| Check | Status |
|-------|--------|
| `pnpm run typecheck` | ✅ Passes |
| `pnpm run build` | ✅ Passes (client + SSR) |
| Route discovery | ✅ All 6 routes registered |
| SSR HTML generation | ✅ Works |
| CSS in SSR | ✅ Critical CSS extracted |

---

## Files Modified/Created

### Created (~25 new files)
- `app/lib/i18n/translations.ts`
- `app/components/marketing/hero-section.tsx`
- `app/components/ui/language-switcher.tsx`
- `app/components/ui/labeled-input.tsx`
- `app/lib/api/client.ts` (rewritten)
- `app/lib/api/types.ts`
- `app/lib/auth/context.tsx`
- `app/lib/auth/hooks.ts`
- `app/components/auth/protected-route.tsx`
- `app/routes/_auth/login/route.tsx`
- `app/routes/_auth/signup/route.tsx`
- `app/routes/_auth/patient-login/route.tsx`
- `app/routes/_auth/patient-signup/route.tsx`
- `app/routes/_app/doctor/layout.tsx`
- `app/routes/_app/doctor/route.tsx`
- `app/routes/_app/patient/layout.tsx`
- `app/routes/_app/patient/route.tsx`
- `README.md` (rewritten)

### Modified (~8 files)
- `app/routes.ts` - new route structure
- `app/root.tsx` - added AuthProvider
- `app/components/login-form.tsx` - refactored with shared components
- `app/components/signup-form.tsx` - refactored with shared components
- `app/components/ui/button.tsx` - explicit colors
- `app/components/ui/input.tsx` - explicit colors
- `app/components/ui/separator.tsx` - explicit colors
- `app/app.css` - simplified theme
- `package.json` - removed unused deps
- `Dockerfile` - pnpm support
- `.env.example` - VITE_API_BASE_URL

### Deleted (~6 files)
- `app/components/signup-layout.tsx`
- `app/routes/login-redirect.tsx`
- `app/api/server/http.server.ts`
- `.agents/` (folder)
- `.kilo/` (folder)
- `pnpm-workspace.yaml`
- `components.json`

---

## For Chatbot/AI Understanding

### Key Patterns to Recognize
1. **Route modules** use `route.tsx` naming (React Router v8)
2. **Layouts** co-located with routes in `_app/*/layout.tsx`
3. **Group prefixes** `_auth` (public), `_app` (protected) for organization
4. **Server actions** in route files with `action()` export
5. **Loaders** for protected data with auth header extraction
6. **Centralized translations** imported from `~/lib/i18n/translations`
4. **Axios singleton** with interceptors for auth
5. **Explicit Tailwind colors** - no CSS variables for SSR compatibility

### Common Imports
```typescript
// Translations
import { getTranslations, type Language } from "~/lib/i18n/translations";

// Auth
import { useAuth } from "~/lib/auth/hooks";
import { DoctorOnlyRoute, PatientOnlyRoute } from "~/components/auth/protected-route";

// API
import { apiClient } from "~/lib/api/client";
import type { SignupActionResult } from "~/lib/api/types";

// UI
import { Button } from "~/components/ui/button";
import { LabeledInput } from "~/components/ui/labeled-input";
import { MarketingHero } from "~/components/marketing/hero-section";
```

---

## Future Considerations

### Potential Enhancements
1. **Token persistence** - localStorage/cookie sync for page refresh
2. **Route params** - `/doctor/patients/:id` for patient details
3. **Role-based UI** - Conditional rendering based on `isDoctor`/`isPatient`
4. **API error boundaries** - Global error handling for network failures
5. **Testing** - Vitest + React Testing Library setup
6. **Storybook** - Component documentation

### Known Limitations
- No token refresh mechanism (relies on long-lived tokens)
- No offline support
- Urdu translations hardcoded (could use i18n library)
- No E2E tests configured

---

## Deployment Notes

### Build Output
```
build/
├── client/          # Static assets + manifest
└── server/          # SSR bundle (index.js)
```

### Production Commands
```bash
pnpm build          # Creates build/
pnpm start          # Runs react-router-serve ./build/server/index.js
```

### Docker
```bash
docker build -t asaandoc-frontend .
docker run -p 3000:3000 -e VITE_API_BASE_URL=https://api.asaandoc.com asaandoc-frontend
```