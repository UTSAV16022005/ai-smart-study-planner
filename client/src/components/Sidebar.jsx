import { NavLink } from "react-router-dom";

const links = [
  ["Dashboard", "/"],
  ["Study Planner", "/planner"],
  ["Tasks", "/tasks"],
  ["Pomodoro", "/pomodoro"],
  ["Attendance", "/attendance"],
  ["Notes", "/notes"],
  ["Analytics", "/analytics"]
];

const Sidebar = ({ open, setOpen }) => (
  <aside
    className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-slate-200 bg-[#f5f7fc] text-slate-950 transition-transform duration-300 dark:border-gray-800 dark:bg-gray-950 dark:text-white ${
      open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
    }`}
  >
    <div className="flex h-16 items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-200">
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 5.5C4 4.7 4.7 4 5.5 4H10c1.1 0 2 .9 2 2v13c0-1.1-.9-2-2-2H5.5C4.7 17 4 16.3 4 15.5v-10Z" fill="currentColor" opacity="0.9" />
            <path d="M20 5.5C20 4.7 19.3 4 18.5 4H14c-1.1 0-2 .9-2 2v13c0-1.1.9-2 2-2h4.5c.8 0 1.5-.7 1.5-1.5v-10Z" fill="currentColor" opacity="0.72" />
            <path d="M7 8h2.5M14.5 8H17M7 11h2.5M14.5 11H17" stroke="#4f46e5" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </div>
        <div>
          <p className="text-lg font-bold tracking-tight">AI Study</p>
          <p className="text-xs text-slate-500">Smart Planner</p>
        </div>
      </div>
      <button className="lg:hidden" onClick={() => setOpen(false)} aria-label="Close sidebar">
        x
      </button>
    </div>
    <nav className="mt-4 space-y-1 px-3">
      {links.map(([label, path]) => (
        <NavLink
          key={path}
          to={path}
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            `block rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
              isActive
                ? "bg-slate-950 text-white shadow-sm"
                : "text-slate-600 hover:bg-white hover:text-slate-950 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white"
            }`
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default Sidebar;
