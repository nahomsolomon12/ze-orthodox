# Theosis — Orthodox Christian Learning Platform

A full-stack web application for structured Eastern Orthodox Christian education. Users can create accounts, track lesson progress across modules, take quizzes, and contact the site team.

---

## Tech Stack

### Front End
| Technology | Purpose |
|---|---|
| React 19 | UI component framework |
| Vite 7 | Dev server and build tool |
| Supabase JS SDK | Auth session management (client-side) |
| Fetch API | Communication with the Express back end |

### Back End
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| Supabase JS SDK | Database access via service role key |
| dotenv | Environment variable loading |
| cors | Restrict requests to the front-end origin |

### Database & Auth
| Service | Purpose |
|---|---|
| Supabase (PostgreSQL) | Relational database hosting |
| Supabase Auth | User sign-up, sign-in, email confirmation, JWT issuance |

---

## Project Structure

```
ze-orthodox/
├── front-end/               # React + Vite application
│   ├── src/
│   │   ├── components/      # Nav, Footer, Icon, Ornament
│   │   ├── context/         # ThemeContext (light/dark mode)
│   │   ├── lib/
│   │   │   ├── supabase.js  # Supabase browser client (anon key)
│   │   │   └── api.js       # Authenticated fetch helpers for the back end
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── AuthPage.jsx     # Sign in / sign up via Supabase Auth
│   │   │   ├── ModulesPage.jsx  # Learning dashboard (live API data)
│   │   │   └── AboutPage.jsx    # About + contact form (live API)
│   │   └── styles/
│   │       └── global.css   # Full Byzantine-themed design system
│   └── .env.local           # Gitignored — see Environment Variables below
│
└── back-end/                # Node.js + Express REST API
    ├── src/
    │   ├── lib/
    │   │   └── supabase.js  # Supabase admin client (service role key)
    │   ├── middleware/
    │   │   └── auth.js      # JWT verification via supabase.auth.getUser()
    │   └── routes/
    │       ├── modules.js   # GET /api/modules, GET|POST /api/modules/:id/progress
    │       ├── quizzes.js   # GET /api/quizzes, POST /api/quizzes/:id/result
    │       └── contact.js   # POST /api/contact
    ├── supabase/
    │   └── schema.sql       # Database schema + seed data
    └── .env                 # Gitignored — see Environment Variables below
```

---

## Authentication Flow

1. The user signs up or signs in via `AuthPage.jsx` using the **Supabase JS client** (`supabase.auth.signUp` / `supabase.auth.signInWithPassword`).
2. Supabase issues a **JWT access token** and stores the session in `localStorage`.
3. `App.jsx` calls `supabase.auth.onAuthStateChange` on mount so the `user` state stays in sync across tabs and page refreshes.
4. When the front end calls the Express API, `src/lib/api.js` reads the current session token (`supabase.auth.getSession`) and attaches it as an `Authorization: Bearer <token>` header.
5. The back-end `auth.js` middleware calls `supabase.auth.getUser(token)` to verify the JWT and attaches the decoded user to `req.user` before passing to route handlers.
6. Sign-out calls `supabase.auth.signOut()`, which clears the session and triggers `onAuthStateChange` to null out the user state.

---

## API Endpoints

All routes are prefixed `/api`. Routes marked **Auth required** expect `Authorization: Bearer <jwt>`.

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/health` | No | Server health check |
| GET | `/api/modules` | Yes | List all learning modules |
| GET | `/api/modules/:id/progress` | Yes | Get the user's completed lesson count for a module |
| POST | `/api/modules/:id/progress` | Yes | Save/update lesson progress `{ completed_lessons: number }` |
| GET | `/api/quizzes` | Yes | List all quizzes with the user's score merged in |
| POST | `/api/quizzes/:id/result` | Yes | Save/update a quiz result `{ score: number }` — auto-sets `passed: true` if score ≥ 70 |
| POST | `/api/contact` | No | Submit a contact message `{ name, email, message }` |

---

## Database Schema

Five tables in Supabase (PostgreSQL). Run `back-end/supabase/schema.sql` in the Supabase SQL editor to create and seed them.

| Table | Description |
|---|---|
| `modules` | Course catalogue — title, description, lesson count, type, duration |
| `user_progress` | Per-user completed lesson count per module (PK: `user_id, module_id`) |
| `quizzes` | Quiz catalogue linked to a module |
| `quiz_results` | Per-user quiz score and pass/fail status (PK: `user_id, quiz_id`) |
| `contact_messages` | Contact form submissions |

`user_progress` and `quiz_results` both foreign-key to `auth.users` with `on delete cascade`, so all user data is removed automatically if an account is deleted.

---

## Environment Variables

### `front-end/.env.local`
```
VITE_SUPABASE_URL=        # Your Supabase project URL
VITE_SUPABASE_ANON_KEY=   # Supabase anon/publishable key (safe for the browser)
VITE_API_URL=             # Express server URL, e.g. http://localhost:4000
```

### `back-end/.env` (see `back-end/.env.example`)
```
SUPABASE_URL=             # Your Supabase project URL
SUPABASE_SERVICE_ROLE_KEY= # Supabase service role key — never expose this in the browser
PORT=4000
```

---

## Running Locally

**Prerequisites:** Node.js 18+, a Supabase project with the schema applied.

```bash
# 1. Apply the database schema
#    Paste back-end/supabase/schema.sql into the Supabase SQL editor and run it.

# 2. Start the back end
cd back-end
cp .env.example .env   # then fill in your credentials
npm install
npm run dev            # runs on http://localhost:4000

# 3. Start the front end (new terminal)
cd front-end
# create .env.local and fill in the three variables listed above
npm install
npm run dev            # runs on http://localhost:5173
```
