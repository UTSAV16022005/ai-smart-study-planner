import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Navbar = ({ setSidebarOpen }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-[#f5f7fc]/85 px-3 py-3 backdrop-blur dark:border-gray-700 dark:bg-gray-900/80 sm:px-4 lg:px-8">
      <div className="flex min-w-0 items-center justify-between gap-2 sm:gap-4">
        <button
          className="shrink-0 rounded-2xl bg-white px-3 py-2 text-sm font-bold shadow-sm lg:hidden"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          Menu
        </button>
        <div className="min-w-0 flex-1">
          <p className="hidden text-sm text-slate-500 dark:text-gray-400 sm:block">Plan smarter, study calmer</p>
          <h1 className="truncate text-sm font-bold tracking-tight text-slate-950 dark:text-white sm:text-base">
            AI Smart Study Planner
          </h1>
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            className="grid h-10 min-w-10 place-items-center rounded-2xl bg-white px-2 text-[11px] font-bold shadow-sm transition-all duration-300 hover:-translate-y-0.5 dark:bg-gray-800 sm:h-11 sm:min-w-11 sm:px-3 sm:text-xs"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>
          <div className="hidden items-center gap-3 sm:flex">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-white shadow-sm">
              {user?.name?.charAt(0) || "S"}
            </div>
            <span className="text-sm font-semibold">{user?.name}</span>
          </div>
          <button
            className="rounded-2xl bg-slate-950 px-3 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 sm:px-4"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
