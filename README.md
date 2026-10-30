# Asaandoc Frontend

React Router v8 (Framework Mode) + TypeScript + Tailwind CSS v4 + @base-ui/react

## Tech Stack

- **Framework**: React Router v8 (SSR + SPA hybrid)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 + @base-ui/react (headless components)
- **API**: Axios with interceptors for auth
- **Auth**: JWT tokens with automatic refresh/redirect

## Project Structure

```
app/
├── api/
│   └── generated/client.ts          # Auto-generated OpenAPI types
├── components/
│   ├── auth/protected-route.tsx     # Route guards (DoctorOnly, PatientOnly, PublicOnly)
│   ├── marketing/hero-section.tsx
│   └── ui/                          # Reusable UI components
│       ├── button.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── field.tsx
│       ├── separator.tsx
│       ├── language-switcher.tsx
│       └── labeled-input.tsx
├── lib/
│   ├── api/
│   │   ├── client.ts                # Axios API client (singleton)
│   │   └── types.ts                 # Shared API types
│   ├── auth/
│   │   ├── context.tsx              # AuthContext + AuthProvider
│   │   └── hooks.ts                 # useAuth hook
│   ├── i18n/translations.ts         # EN/UR translations
│   └── utils.ts
└── routes/
    ├── _auth/                       # Public auth routes (no layout)
    │   ├── login/route.tsx          # Doctor login (/)
    │   ├── signup/route.tsx         # Doctor registration (/signup)
    │   ├── patient-login/route.tsx  # Patient login (/patient/login)
    │   └── patient-signup/route.tsx # Patient registration (/patient/signup)
    ├── _app/                        # Protected app routes (with layouts)
    │   ├── doctor/
    │   │   ├── layout.tsx           # Protected doctor layout
    │   │   └── route.tsx            # Doctor dashboard (/doctor/dashboard)
    │   └── patient/
    │       ├── layout.tsx           # Protected patient layout
    │       └── route.tsx            # Patient dashboard (/patient/dashboard)
    └── routes.ts                    # Route configuration
```

## Routes

| Path | Access | Description |
|------|--------|-------------|
| `/` | Public | Doctor login |
| `/signup` | Public | Doctor registration |
| `/patient/login` | Public | Patient login |
| `/patient/signup` | Public | Patient registration |
| `/doctor/dashboard` | Doctor only | Doctor dashboard |
| `/patient/dashboard` | Patient only | Patient dashboard |

## Commands

```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Type checking
pnpm typecheck

# Production build
pnpm build

# Start production server
pnpm start

# Regenerate API types (requires backend running at VITE_API_BASE_URL)
pnpm api:generate
```

## Environment Variables

Create `.env` from `.env.example`:

```bash
VITE_API_BASE_URL=http://127.0.0.1:8000
```

## API Client

The API client (`app/lib/api/client.ts`) uses Axios with:
- Automatic Bearer token injection
- 401 handling → token clear + redirect to login
- Form data support for OAuth2 password grant
- Request/response interceptors
- Type-safe methods for all endpoints

## Internationalization

EN/UR translations in `app/lib/i18n/translations.ts`. Language switcher in hero section.

## Docker

```bash
docker build -t asaandoc-frontend .
docker run -p 3000:3000 -e VITE_API_BASE_URL=http://host.docker.internal:8000 asaandoc-frontend
```