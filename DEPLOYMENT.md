# Deployment Guide

## Problem
The frontend is deployed on Vercel, but the backend is NOT deployed anywhere. This causes 405 errors on login/signup because the API endpoints don't exist.

## Solution: Deploy Backend Separately

Choose one of these options:

### Option 1: Railway (Recommended - Free tier available)
1. Go to https://railway.app
2. Connect your GitHub repo
3. Create a new service, select this repo
4. Set Root Directory to `server`
5. Add environment variables:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret
   - `CLIENT_URL`: Your Vercel frontend URL (e.g., https://your-app.vercel.app)
6. Deploy

### Option 2: Render
1. Go to https://render.com
2. Create new Web Service from GitHub
3. Set Start Command to `npm start`
4. Root Directory: `server`
5. Add env vars same as above
6. Deploy

### Option 3: Heroku
1. Go to https://heroku.com
2. Connect GitHub repo
3. Set Root Directory to `server`
4. Add Config Vars (environment variables)
5. Deploy

## After Deploying Backend

1. Get your backend URL (e.g., `https://your-backend.railway.app`)
2. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
3. Add: `VITE_API_URL=https://your-backend.railway.app/api/v1`
4. Redeploy on Vercel

## Local Development
```bash
# Terminal 1: Backend
cd server
npm install
npm run dev

# Terminal 2: Frontend  
cd client
npm install
npm run dev
```

## Verify
- Backend should be running on `http://localhost:5001`
- Frontend should be on `http://localhost:5173`
- Test signup/login — it should work now
