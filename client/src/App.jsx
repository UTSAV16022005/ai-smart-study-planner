import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import Analytics from "./pages/Analytics";
import Attendance from "./pages/Attendance";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Notes from "./pages/Notes";
import Pomodoro from "./pages/Pomodoro";
import Signup from "./pages/Signup";
import StudyPlanner from "./pages/StudyPlanner";
import Tasks from "./pages/Tasks";

const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f5f7fc] dark:bg-gray-900">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      {sidebarOpen && <button aria-label="Close overlay" className="fixed inset-0 z-30 bg-gray-950/40 lg:hidden" onClick={() => setSidebarOpen(false)} />}
      <div className="min-w-0 lg:pl-64">
        <Navbar setSidebarOpen={setSidebarOpen} />
        <main className="mx-auto min-w-0 max-w-[1500px] px-3 py-4 sm:px-4 sm:py-6 lg:px-8">
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="planner" element={<StudyPlanner />} />
            <Route path="tasks" element={<Tasks />} />
            <Route path="pomodoro" element={<Pomodoro />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="notes" element={<Notes />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="*" element={<div className="card text-center"><h2 className="text-3xl font-bold">404</h2><p className="mt-2 text-gray-500">This page does not exist.</p></div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App = () => (
  <>
    <Toaster position="top-right" />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/*" element={<AppLayout />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </>
);

export default App;
