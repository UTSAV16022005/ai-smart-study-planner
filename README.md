# AI Smart Study Planner

A full-stack productivity dashboard for students to plan study sessions, track tasks, run Pomodoro focus sessions, monitor attendance, keep notes, and review analytics.

## Screenshot

Add screenshots here after running the app locally.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 18, Vite, React Router v6 |
| Styling | Tailwind CSS v3, dark mode class strategy |
| State | Context API, useReducer |
| Backend | Node.js, Express.js, MVC routes/controllers |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcryptjs |
| Charts | Recharts |
| HTTP | Axios |
| Notifications | react-hot-toast |

## Local Setup

1. Clone repo.
2. Install server deps: `cd server && npm install`
3. Install client deps: `cd client && npm install`
4. Create `server/.env` with `MONGO_URI`, `JWT_SECRET`, `PORT`, and `CLIENT_URL`.
5. Start server: `npm run dev`
6. Start client: `npm run dev`
7. Open `http://localhost:5173`

## API Endpoints

| Resource | Method | Endpoint | Description |
| --- | --- | --- | --- |
| Auth | POST | `/api/v1/auth/register` | Create user and return JWT |
| Auth | POST | `/api/v1/auth/login` | Login and return JWT |
| Auth | GET | `/api/v1/auth/me` | Return current user |
| Tasks | GET | `/api/v1/tasks` | List user tasks |
| Tasks | POST | `/api/v1/tasks` | Create task |
| Tasks | PUT | `/api/v1/tasks/:id` | Update task |
| Tasks | DELETE | `/api/v1/tasks/:id` | Delete task |
| Plans | GET | `/api/v1/plans` | List study plans |
| Plans | POST | `/api/v1/plans` | Create smart study plan |
| Plans | PUT | `/api/v1/plans/:id` | Update plan or session |
| Plans | DELETE | `/api/v1/plans/:id` | Delete plan |
| Attendance | GET | `/api/v1/attendance` | List subjects |
| Attendance | POST | `/api/v1/attendance` | Add subject |
| Attendance | PUT | `/api/v1/attendance/:id/mark` | Mark present or absent |
| Attendance | DELETE | `/api/v1/attendance/:id` | Delete subject |
| Notes | GET | `/api/v1/notes` | List and search notes |
| Notes | POST | `/api/v1/notes` | Create note |
| Notes | PUT | `/api/v1/notes/:id` | Update note |
| Notes | DELETE | `/api/v1/notes/:id` | Delete note |

## Folder Structure

```text
ai-smart-study-planner/
├── client/   React + Vite frontend
├── server/   Express + MongoDB backend
└── README.md
```

## Features

- [x] JWT authentication with protected routes
- [x] Dark and light theme persistence
- [x] Smart study plan generation
- [x] Task CRUD with filters
- [x] Pomodoro timer with session counts
- [x] Attendance tracking with warnings
- [x] Notes with search, subject filter, and pinning
- [x] Analytics charts and summary stats
- [x] Toast notifications and loading states
- [x] Responsive SaaS dashboard layout

## License

MIT
