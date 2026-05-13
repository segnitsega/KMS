# Department Knowledge Management System (KMS)

A full-stack knowledge management platform for departments to organize documents, articles, discussions, tasks, and expert directories—with an AI assistant powered by Google Gemini.

**Live demo:** [https://kms33.netlify.app/](https://kms33.netlify.app/)

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Application routes](#application-routes)
- [API overview](#api-overview)
- [Available scripts](#available-scripts)
- [Demo accounts](#demo-accounts)

---

## Features

- **Authentication** — JWT-based login with role-based access (Admin / User)
- **Documents** — Upload, search, preview, and download organizational files (Cloudinary storage)
- **Knowledge base** — Create, edit, and browse collaborative articles
- **Discussions** — Team threads with replies and engagement
- **Expert directory** — Discover colleagues, skills, and contact details
- **Library** — Shared book and learning resources
- **Tasks** — Submit and track work (admin task dashboard for administrators)
- **Analytics** — Usage metrics and activity reports (admin / expert roles)
- **Administration** — User and content management (admin only)
- **AI chatbot** — Gemini-powered assistant for knowledge search and support
- **Help & support** — In-app guidance and support channels
- **Responsive UI** — Mobile, tablet, and desktop layouts (Tailwind CSS)

---

## Tech stack

| Layer | Technologies |
|--------|----------------|
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS 4, TanStack Query, Zustand, React Router, Recharts, Radix UI / shadcn-style components |
| **Backend** | Node.js, Express 5, TypeScript, Prisma ORM |
| **Database** | PostgreSQL |
| **Auth** | JWT (access + refresh tokens), bcrypt |
| **Storage** | Cloudinary (documents & media) |
| **AI** | Google Generative AI (Gemini API) |

---

## Project structure

```
KMS/
├── README.md
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma      # Database models & migrations
│   │   ├── seed.ts            # Seed script
│   │   └── migrations/
│   ├── src/
│   │   ├── controllers/       # Route handlers
│   │   ├── middlewares/       # Auth, upload, validation, errors
│   │   ├── routes/            # Express routers
│   │   ├── utils/
│   │   └── server.ts          # App entry point
│   ├── package.json
│   └── .env                   # Backend secrets (not committed)
│
└── frontend/
    ├── src/
    │   ├── pages/             # Route pages (dashboard, documents, etc.)
    │   ├── components/        # UI components, modals, layout
    │   ├── cards/             # Reusable card views
    │   ├── hooks/
    │   ├── stores/            # Zustand (e.g. auth)
    │   ├── utility/           # API client, route guards
    │   ├── App.tsx
    │   └── main.tsx
    ├── index.html
    ├── vite.config.ts
    ├── package.json
    └── .env                   # VITE_* variables (not committed)
```

---

## Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** 9+
- **PostgreSQL** database (local or hosted)
- **Cloudinary** account (file uploads)
- **Google AI Studio** API key (Gemini chatbot)

---

## Getting started

### 1. Clone the repository

```bash
git clone <repository-url>
cd KMS
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create `backend/.env` (see [Environment variables](#environment-variables)).

Run migrations and optional seed:

```bash
npx prisma migrate deploy
npx prisma db seed
```

Start the API:

```bash
npm run dev
```

The server runs at `http://localhost:8000` by default.

### 3. Frontend setup

Open a new terminal:

```bash
cd frontend
npm install
```

Create `frontend/.env` (see [Environment variables](#environment-variables)).

Start the dev server:

```bash
npm run dev
```

The app runs at `http://localhost:5173` by default.

### 4. Production build

```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
npm run preview
```

---

## Environment variables

### Backend (`backend/.env`)

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string (`postgresql://USER:PASSWORD@HOST:PORT/DATABASE`) |
| `port` | HTTP port (default: `8000`) |
| `secret_key` | JWT access token secret |
| `refresh_key` | JWT refresh token secret |
| `CLOUDINARY_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_SECRET` | Cloudinary API secret |
| `GEMINI_API_KEY` | Google Gemini API key for the chatbot |

**Example:**

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/kms"
port=8000
secret_key=your_jwt_secret
refresh_key=your_refresh_secret
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
GEMINI_API_KEY=your_gemini_api_key
```

### Frontend (`frontend/.env`)

| Variable | Description |
|----------|-------------|
| `VITE_BACKEND_URL` | Backend API base URL (no trailing slash) |

**Example (local development):**

```env
VITE_BACKEND_URL=http://localhost:8000
```

For production, point this to your deployed API URL and ensure that origin is listed in `allowedOrigins` in `backend/src/server.ts`.

---

## Application routes

| Path | Description | Access |
|------|-------------|--------|
| `/` | Landing page | Public |
| `/login` | Sign in | Public |
| `/kms` | Dashboard (home) | Authenticated |
| `/kms/documents` | Document library | Authenticated |
| `/kms/knowledge-base` | Articles / wiki | Authenticated |
| `/kms/discussions` | Team discussions | Authenticated |
| `/kms/expert-directory` | People & skills | Authenticated |
| `/kms/library` | Shared library | Authenticated |
| `/kms/my-tasks` | User tasks | Authenticated |
| `/kms/tasks` | Admin task dashboard | Admin |
| `/kms/analytics` | Reports & charts | Admin / Expert |
| `/kms/administration` | User & content admin | Admin |
| `/kms/help-support` | Help center | Authenticated |

---

## API overview

Base URL: `http://localhost:8000` (or your `VITE_BACKEND_URL`)

| Prefix | Purpose |
|--------|---------|
| `/auth` | Login, refresh tokens |
| `/user` | Profiles, search, updates |
| `/docs` | Document CRUD, upload, download |
| `/articles` | Knowledge base articles |
| `/discussions` | Threads and replies |
| `/tasks` | Task submission and management |
| `/library` | Library resources |
| `/chat` | AI assistant (Gemini) |
| `/search` | Global search |
| `/status-count` | Dashboard statistics |
| `/admin` | Admin-only operations (requires JWT + admin role) |

Protected routes expect a valid JWT (typically sent via cookies or `Authorization` header, depending on client configuration).

---

## Available scripts

### Backend (`backend/`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with nodemon + ts-node |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run compiled production server |
| `npx prisma migrate dev` | Create/apply migrations (development) |
| `npx prisma migrate deploy` | Apply migrations (production) |
| `npx prisma db seed` | Seed database |
| `npx prisma studio` | Open Prisma database GUI |

### Frontend (`frontend/`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check and production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

---

## Demo accounts

Use these on the [live demo](https://kms33.netlify.app/) to explore different roles:

| Role | Email | Password |
|------|--------|----------|
| **Admin** | `admin@gmail.com` | `C0aQuwp*_x4J` |
| **Member** | `segni@gmail.com` | `9)p9^SQ2uT@a` |

> Do not use production secrets or demo passwords in real deployments. Rotate credentials and use environment-specific `.env` files.

---

## Deployment notes

- **Frontend** is deployed on Netlify (`https://kms33.netlify.app/`).
- Set `VITE_BACKEND_URL` at build time to your API URL.
- Add your frontend origin to `allowedOrigins` in `backend/src/server.ts` for CORS.
- Run `prisma migrate deploy` against your production database before starting the API.
- Keep `.env` files out of version control (already listed in `.gitignore`).

---

## License

ISC (backend package). See repository maintainers for overall project licensing.
