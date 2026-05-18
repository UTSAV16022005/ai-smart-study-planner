import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import AnalyticsChart from "../components/AnalyticsChart";

const Analytics = () => {
  const [tasks, setTasks] = useState([]);
  const [plans, setPlans] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    Promise.all([api.get("/tasks"), api.get("/plans"), api.get("/attendance")]).then(([taskRes, planRes, attendanceRes]) => {
      setTasks(taskRes.data);
      setPlans(planRes.data);
      setAttendance(attendanceRes.data);
    });
  }, []);

  const weekly = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => ({
    name: day,
    hours: plans.reduce((sum, plan) => sum + plan.dailySessions.filter((s) => s.completed && new Date(s.date).getDay() === (index + 1) % 7).reduce((inner, s) => inner + s.hours, 0), 0)
  }));
  const subjectHours = plans.map((plan) => ({ name: plan.subject, hours: plan.dailySessions.filter((s) => s.completed).reduce((sum, s) => sum + s.hours, 0) }));
  const taskDonut = [{ name: "Completed", value: tasks.filter((t) => t.status === "completed").length }, { name: "Pending", value: tasks.filter((t) => t.status !== "completed").length }];
  const attendanceData = attendance.map((item) => ({ name: item.subject, percentage: item.percentage || 0 }));
  const totalHours = subjectHours.reduce((sum, item) => sum + item.hours, 0);
  const bestDay = useMemo(() => weekly.reduce((best, day) => (day.hours > best.hours ? day : best), weekly[0] || { name: "N/A", hours: 0 }), [weekly]);
  const completionRate = tasks.length ? Math.round((taskDonut[0].value / tasks.length) * 100) : 0;

  return (
    <div className="page">
      <div><p className="label">Progress insights</p><h2 className="text-3xl font-bold tracking-tight">Analytics</h2></div>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[["Total Study Hours", totalHours], ["Average Daily Hours", (totalHours / 7).toFixed(1)], ["Best Study Day", bestDay?.name], ["Completion Rate", `${completionRate}%`]].map(([label, value]) => (
          <div className="card" key={label}><p className="label">{label}</p><p className="mt-2 text-3xl font-bold">{value}</p></div>
        ))}
      </section>
      <section className="grid gap-6 xl:grid-cols-2">
        <div className="card"><h3 className="text-xl font-bold">Weekly Study Hours</h3><AnalyticsChart data={weekly} dataKey="hours" /></div>
        <div className="card"><h3 className="text-xl font-bold">Task Completion</h3><AnalyticsChart type="donut" data={taskDonut} /></div>
        <div className="card"><h3 className="text-xl font-bold">Subject Study Hours</h3><AnalyticsChart data={subjectHours} dataKey="hours" /></div>
        <div className="card"><h3 className="text-xl font-bold">Attendance Overview</h3><AnalyticsChart data={attendanceData} dataKey="percentage" /></div>
      </section>
    </div>
  );
};

export default Analytics;
