# Environment Variables Configuration

## Important
`.env` files are **NOT tracked by git** (in `.gitignore` for security).

### Backend (Render) - Set in Dashboard

Go to your Render service dashboard and add these environment variables:

```
MONGO_URI=mongodb+srv://utsav:Utsavdk@cluster0.dd9txo4.mongodb.net/studyplanner?retryWrites=true&w=majority
JWT_SECRET=make_this_a_long_random_secret
PORT=5001
CLIENT_URL=https://ai-smart-study-planner-5thgy1qg6-utsav-s-projects1.vercel.app
```

### Frontend (Vercel) - Set in Dashboard

Go to Vercel project → Settings → Environment Variables and add:

```
VITE_API_URL=https://ai-smart-study-planner-doui.onrender.com/api/v1
```

### Local Development - Set in `.env` files

**server/.env**
```
MONGO_URI=mongodb+srv://utsav:Utsavdk@cluster0.dd9txo4.mongodb.net/studyplanner?retryWrites=true&w=majority
JWT_SECRET=make_this_a_long_random_secret
PORT=5001
CLIENT_URL=http://localhost:5173
```

**client/.env**
```
VITE_API_URL=http://localhost:5001/api/v1
```

## After Adding Environment Variables

1. **On Render**: Redeploy the backend service
2. **On Vercel**: Click "Redeploy" to rebuild with new env vars
3. **Test**: Visit your Vercel URL and try signup/login

## URLs Reference

- **Frontend (Vercel)**: https://ai-smart-study-planner-5thgy1qg6-utsav-s-projects1.vercel.app
- **Backend (Render)**: https://ai-smart-study-planner-doui.onrender.com
- **Local Dev Frontend**: http://localhost:5173
- **Local Dev Backend**: http://localhost:5001
