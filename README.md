<<<<<<< HEAD
# PhysioConnect

Production-ready full-stack physiotherapy marketplace.

## Stack
- **Frontend:** React + TypeScript + Tailwind CSS + Zustand + React Hook Form + Zod
- **Backend:** Node.js + Express + MongoDB + JWT + bcryptjs
- **Integrations:** Claude API (symptom analysis), Razorpay (payments)

## Features
- Component architecture: `Navigation`, `Hero`, `Booking`, `SymptomChecker`, `Dashboard`
- REST APIs for auth, physios, bookings, symptoms, payments, and reviews
- JWT auth, password hashing, rate limiting, CORS, validation, error middleware, logging
- Real-time in-app notifications via Zustand store updates and toast notifications
- Dockerized local development and deployment guides for Vercel + Render

## Project structure
```
frontend/  # React app
backend/   # Express API
```

## Local setup
### Backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

### Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

### Docker
```bash
cp backend/.env.example backend/.env
docker compose up --build
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Health: http://localhost:5000/health

## API endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile`
- `GET /api/physios`
- `GET /api/physios/:id`
- `GET /api/physios/:id/availability`
- `POST /api/physios/match`
- `POST /api/bookings`
- `GET /api/bookings`
- `GET /api/bookings/:id`
- `PATCH /api/bookings/:id`
- `DELETE /api/bookings/:id`
- `POST /api/symptoms/analyze`
- `GET /api/symptoms/history`
- `POST /api/payments/create-order`
- `POST /api/payments/verify`
- `GET /api/payments/history`
- `POST /api/reviews`
- `GET /api/reviews/physio/:physioId`
- `PATCH /api/reviews/:id`
- `DELETE /api/reviews/:id`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment.
=======
# physioconnect
AI-Powered Physiotherapy Marketplace
>>>>>>> d11f2ee2e1a03af3dcc7cfa48d14522210e6f3d9
