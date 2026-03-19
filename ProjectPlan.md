# Project: Ze-Orthodox - Architecture & Setup Plan

## Date Started: March 18, 2026

## Directory Structure Decision
Created two top-level directories:
- **front-end/** — Contains all React/Vite frontend code (src/, public/, package.json, etc.)
- **back-end/** — Empty, ready for Node/Express backend

---

## Frontend Architecture Overview

### Middleware & API Integration
- **Middleware in frontend** = State management (Redux, Context), HTTP interceptors, route guards
- **Location pattern:**
  ```
  src/
    api/
      client.js          ← Axios/fetch with interceptors
      endpoints.js       ← API URL constants
      services/
    middleware/
    hooks/
  ```

---

## Backend Architecture Decision: Node/Express + PostgreSQL

### Tech Stack
- **Framework:** Node.js + Express.js
- **Database:** PostgreSQL (via Supabase)
- **Why Supabase:** Zero setup, free tier, built-in auth/storage, already PostgreSQL

### Recommended Backend File Structure
```
back-end/src/
  middleware/          ← Auth, CORS, error handling, logging
  routes/              ← Endpoint definitions
  controllers/         ← Business logic
  models/              ← Database schemas
  config/              ← Database, environment config
  app.js              ← Express app setup
  server.js           ← Server startup
```

### Key Architecture Patterns
- Routes define URLs: `/api/users`, `/api/posts`, etc.
- Controllers contain logic that handles those routes
- Middleware processes requests before they reach routes
- Models define database table structures

---

## Frontend-to-Backend Communication
Frontend calls backend endpoints:
```
Frontend (front-end/src/): GET /api/users
  ↓
Backend Route (back-end/src/routes/users.js)
  ↓
Backend Controller (back-end/src/controllers/userController.js)
  ↓
Database (Supabase PostgreSQL): Fetch users
  ↓
Response back to Frontend
```

---

## Next Steps (To Be Completed)
1. [ ] Create basic backend folder structure with Express boilerplate
2. [ ] Set up Supabase project and get connection string
3. [ ] Define app features/use case (authentication? data storage? etc.)
4. [ ] Create necessary database schemas/models based on app needs

---

## Notes
- PostgreSQL = Supabase under the hood, learnable for future self-hosting
- Can switch from Supabase to self-hosted PostgreSQL later without major refactoring
```
