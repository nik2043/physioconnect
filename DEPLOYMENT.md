# Deployment Guide

## 1) MongoDB Atlas
1. Create a cluster and database named `physioconnect`.
2. Create a DB user and whitelist your deployment IPs.
3. Copy the connection string to `MONGODB_URI`.

## 2) Backend on Render
1. Create a new **Web Service** from `backend/`.
2. Build command: `npm install && npm run build`
3. Start command: `npm run start`
4. Add env vars from `backend/.env.example`.
5. Set `FRONTEND_URL` to your Vercel URL.

## 3) Frontend on Vercel
1. Import repo and set project root to `frontend/`.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Add `VITE_API_URL` (Render backend URL + `/api`).

## 4) Production checklist
- Strong `JWT_SECRET`
- HTTPS-only URLs
- Rate limit enabled
- CORS `FRONTEND_URL` updated
- Razorpay and Claude keys set
