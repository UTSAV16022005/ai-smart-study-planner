import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { formatDate, quotes } from "../utils/helpers";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const getProgress = (plan) => {
  if (!plan?.dailySessions?.length) return 0;
  const completed = plan.dailySessions.filter((session) => session.completed).length;
  return Math.round((completed / plan.dailySessions.length) * 100);
};

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [plans, setPlans] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    Promise.all([api.get("/tasks"), api.get("/plans"), api.get("/attendance")]).then(
      ([taskRes, planRes, attendanceRes]) => {
        setTasks(taskRes.data);
        setPlans(planRes.data);
        setAttendance(attendanceRes.data);
      }
    );
  }, []);

  const quote = useMemo(() => quotes[new Date().getDate() % quotes.length], []);
  const completedTasks = tasks.filter((task) => task.status === "completed").length;
  const pendingTasks = tasks.filter((task) => task.status !== "completed");
  const taskRate = tasks.length ? Math.round((completedTasks / tasks.length) * 100) : 0;
  const planRate = plans.length ? Math.round(plans.reduce((sum, plan) => sum + getProgress(plan), 0) / plans.length) : 0;
  const averageAttendance = attendance.length
    ? Math.round(attendance.reduce((sum, item) => sum + (item.percentage || 0), 0) / attendance.length)
    : 0;
  const topSubjects = plans
    .map((plan) => ({ subject: plan.subject, progress: getProgress(plan) }))
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 5);

  return (
    <div className="min-h-[calc(100vh-7rem)] min-w-0 rounded-[22px] bg-[#f5f7fc] p-3 text-slate-950 shadow-sm dark:bg-gray-900 dark:text-white sm:rounded-[32px] sm:p-6">
      <div className="grid gap-6 xl:grid-cols-[1fr_300px]">
        <section className="space-y-6">
          <div className="rounded-[22px] bg-white/70 p-4 shadow-sm shadow-slate-200/70 sm:rounded-[26px] sm:p-5">
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-200 sm:h-12 sm:w-12">
                <svg className="h-6 w-6 sm:h-7 sm:w-7" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 5.5C4 4.7 4.7 4 5.5 4H10c1.1 0 2 .9 2 2v13c0-1.1-.9-2-2-2H5.5C4.7 17 4 16.3 4 15.5v-10Z" fill="currentColor" opacity="0.9" />
                  <path d="M20 5.5C20 4.7 19.3 4 18.5 4H14c-1.1 0-2 .9-2 2v13c0-1.1.9-2 2-2h4.5c.8 0 1.5-.7 1.5-1.5v-10Z" fill="currentColor" opacity="0.72" />
                  <path d="M7 8h2.5M14.5 8H17M7 11h2.5M14.5 11H17" stroke="#4f46e5" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </div>
              <div className="min-w-0">
                <h1 className="break-words text-[clamp(1.25rem,7vw,2.1rem)] font-bold leading-tight tracking-tight text-slate-950">
                  {getGreeting()}, {user?.name || "Student"}
                </h1>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                  Your personal study dashboard overview
                </p>
              </div>
            </div>
          </div>

          <div className="grid min-w-0 gap-5 lg:grid-cols-[230px_1fr]">
            <article className="rounded-[22px] bg-white p-5 shadow-xl shadow-slate-200/70 sm:rounded-[24px] sm:p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">Profile</h2>
                <span className="text-slate-400">R</span>
              </div>
              <div className="mt-6 flex flex-col items-center text-center sm:mt-7">
                <div className="grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-rose-200 via-white to-indigo-200 p-2 sm:h-24 sm:w-24">
                  <div className="grid h-full w-full place-items-center rounded-full bg-slate-900 text-3xl font-black text-white sm:text-4xl">
                    {user?.name?.charAt(0) || "S"}
                  </div>
                </div>
                <h3 className="mt-5 text-lg font-bold">{user?.name || "Student"}</h3>
                <p className="text-xs text-slate-500">Study Manager</p>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-2 text-center sm:mt-8">
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-sm font-bold">{tasks.length}</p>
                  <p className="text-[10px] uppercase text-slate-400">Tasks</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-sm font-bold">{plans.length}</p>
                  <p className="text-[10px] uppercase text-slate-400">Plans</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-sm font-bold">{user?.streak || 0}</p>
                  <p className="text-[10px] uppercase text-slate-400">Streak</p>
                </div>
              </div>
            </article>

            <div className="grid min-w-0 gap-5 md:grid-cols-2">
              <article className="min-h-44 overflow-hidden rounded-[22px] bg-[radial-gradient(circle_at_15%_20%,#eef2ff,transparent_35%),linear-gradient(135deg,#ddd6fe,#fecdd3,#fb7185)] p-5 shadow-xl shadow-rose-100 sm:min-h-48 sm:rounded-[24px] sm:p-6">
                <div>
                  <h2 className="max-w-full text-[clamp(1.15rem,5vw,1.5rem)] font-bold leading-[1.12] tracking-tight">
                    Prioritized tasks
                  </h2>
                </div>
                <p className="mt-12 text-[clamp(2.35rem,14vw,3rem)] font-light leading-none tracking-tight sm:mt-16">{taskRate}%</p>
                <p className="text-xs text-slate-600">Avg. completed</p>
              </article>

              <article className="min-h-44 overflow-hidden rounded-[22px] bg-[radial-gradient(circle_at_15%_20%,#99f6e4,transparent_35%),linear-gradient(135deg,#5eead4,#dbeafe,#60a5fa)] p-5 shadow-xl shadow-sky-100 sm:min-h-48 sm:rounded-[24px] sm:p-6">
                <div>
                  <h2 className="max-w-full text-[clamp(1.15rem,5vw,1.5rem)] font-bold leading-[1.12] tracking-tight">
                    Additional plans
                  </h2>
                </div>
                <p className="mt-12 text-[clamp(2.35rem,14vw,3rem)] font-light leading-none tracking-tight sm:mt-16">{planRate}%</p>
                <p className="text-xs text-slate-600">Avg. completed</p>
              </article>

              <article className="rounded-[22px] bg-white p-5 shadow-xl shadow-slate-200/70 sm:col-span-2 sm:rounded-[24px]">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <h2 className="font-bold">Trackers connected</h2>
                    <p className="text-sm text-slate-500">{attendance.length + plans.length} active connections</p>
                  </div>
                  <div className="flex shrink-0 -space-x-2">
                    {["T", "P", "A"].map((item, index) => (
                      <span
                        key={item}
                        className="grid h-10 w-10 place-items-center rounded-full border-4 border-white bg-slate-100 text-xs font-black text-blue-600"
                        style={{ zIndex: 3 - index }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </div>
          </div>

          <article className="rounded-[24px] bg-white p-4 shadow-xl shadow-slate-200/70 sm:rounded-[28px] sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl font-bold">Focusing</h2>
                <p className="text-sm text-slate-500">Productivity analytics</p>
              </div>
              <div className="w-fit rounded-2xl bg-slate-50 px-4 py-2 text-sm font-semibold">Range: Last month</div>
            </div>

            <div className="relative mt-6 h-72 overflow-hidden rounded-[22px] bg-gradient-to-b from-white to-slate-50 sm:mt-8 sm:h-64 sm:rounded-[24px]">
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 260" preserveAspectRatio="none">
                <defs>
                  <pattern id="dots" width="12" height="12" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="#d8dee9" />
                  </pattern>
                </defs>
                <rect width="800" height="260" fill="url(#dots)" opacity="0.55" />
                <path d="M40 150 C130 90 170 220 245 140 S350 95 420 145 S545 200 650 150 S760 105 790 160" fill="none" stroke="#818cf8" strokeWidth="4" />
                <path d="M40 170 C120 120 170 130 235 130 S330 48 385 145 S500 215 570 150 S705 120 790 185" fill="none" stroke="#fb7185" strokeWidth="4" />
              </svg>
              <div className="absolute left-1/2 top-5 -translate-x-1/2 rounded-2xl bg-white px-4 py-3 text-center shadow-lg shadow-slate-200 sm:left-[45%] sm:translate-x-0 sm:px-6">
                <p className="text-sm font-bold">Week 8</p>
                <p className="text-xs text-slate-500">Unbalanced</p>
              </div>
              <div className="absolute bottom-16 left-4 flex max-w-[calc(100%-2rem)] flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500 sm:bottom-5 sm:left-6 sm:max-w-[60%] sm:gap-x-5">
                <span><b className="mr-2 inline-block h-3 w-3 rounded bg-rose-400" />Maximum focus</span>
                <span><b className="mr-2 inline-block h-3 w-3 rounded bg-indigo-500" />Low focus</span>
              </div>
              <div className="absolute bottom-4 right-4 text-right sm:bottom-5 sm:right-6">
                <p className="text-3xl font-light sm:text-4xl">{averageAttendance || 41}%</p>
                <p className="text-xs text-slate-500">Avg. consistency</p>
              </div>
            </div>
          </article>
        </section>

        <aside className="min-w-0 space-y-6 border-t border-slate-200 pt-6 xl:border-l xl:border-t-0 xl:pl-6 xl:pt-0">
          <article className="rounded-[22px] bg-white p-5 shadow-xl shadow-slate-200/70 sm:rounded-[24px] sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Today tasks</h2>
              <span className="grid h-9 w-9 place-items-center rounded-2xl bg-slate-50 text-sm">Cal</span>
            </div>
            <div className="mt-6 space-y-5">
              {pendingTasks.slice(0, 4).map((task) => (
                <div key={task._id} className="flex min-w-0 items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-500">{formatDate(task.dueDate)}</p>
                    <h3 className="mt-1 truncate font-semibold">{task.title}</h3>
                    <p className="truncate text-xs text-slate-500">{task.subject}</p>
                  </div>
                  <span className="shrink-0 text-lg">-&gt;</span>
                </div>
              ))}
              {!pendingTasks.length && <p className="text-sm text-slate-500">No pending tasks for now.</p>}
            </div>
          </article>

          <article className="rounded-[22px] bg-white p-5 shadow-xl shadow-slate-200/70 sm:rounded-[24px] sm:p-6">
            <h2 className="text-lg font-bold">Developed areas</h2>
            <p className="text-sm text-slate-500">Most active study subjects</p>
            <div className="mt-6 space-y-5">
              {(topSubjects.length ? topSubjects : [{ subject: "Study Skills", progress: taskRate || 71 }]).map((item) => (
                <div key={item.subject} className="grid min-w-0 grid-cols-[minmax(70px,92px)_minmax(64px,1fr)_36px] items-center gap-3">
                  <span className="truncate text-sm font-semibold">{item.subject}</span>
                  <span className="h-2 rounded-full bg-slate-100">
                    <span className="block h-2 rounded-full bg-blue-600" style={{ width: `${item.progress}%` }} />
                  </span>
                  <span className="text-right text-xs text-slate-500">{item.progress}%</span>
                </div>
              ))}
            </div>
          </article>
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
