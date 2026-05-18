import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";
import StudyPlanCard from "../components/StudyPlanCard";

const StudyPlanner = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ subject: "", goalHours: "", examDate: "", priority: 3 });

  const loadPlans = async () => {
    const { data } = await api.get("/plans");
    setPlans(data);
    setLoading(false);
  };

  useEffect(() => { loadPlans(); }, []);

  const submit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.post("/plans", form);
      setPlans((items) => [...items, data]);
      setForm({ subject: "", goalHours: "", examDate: "", priority: 3 });
      toast.success("Smart plan created");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not create plan");
    }
  };

  const toggleSession = async (planId, sessionId, completed) => {
    const { data } = await api.put(`/plans/${planId}`, { sessionId, completed });
    setPlans((items) => items.map((item) => (item._id === planId ? data : item)));
    toast.success("Session updated");
  };

  const deletePlan = async (id) => {
    if (!confirm("Delete this study plan?")) return;
    await api.delete(`/plans/${id}`);
    setPlans((items) => items.filter((item) => item._id !== id));
    toast.success("Plan deleted");
  };

  return (
    <div className="page">
      <div><p className="label">Smart scheduling logic</p><h2 className="text-3xl font-bold tracking-tight">AI Study Planner</h2></div>
      <form onSubmit={submit} className="card grid gap-4 md:grid-cols-5">
        <input className="input md:col-span-2" placeholder="Subject name" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
        <input className="input" type="number" placeholder="Goal hours" value={form.goalHours} onChange={(e) => setForm({ ...form, goalHours: e.target.value })} required />
        <input className="input" type="date" value={form.examDate} onChange={(e) => setForm({ ...form, examDate: e.target.value })} required />
        <select className="input" value={form.priority} onChange={(e) => setForm({ ...form, priority: Number(e.target.value) })}>
          {[1, 2, 3, 4, 5].map((value) => <option key={value} value={value}>Priority {value}</option>)}
        </select>
        <button className="btn-primary md:col-span-5">Generate Plan</button>
      </form>
      {loading ? <p>Loading plans...</p> : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {plans.map((plan) => <StudyPlanCard key={plan._id} plan={plan} onToggleSession={toggleSession} onDelete={deletePlan} />)}
          {!plans.length && <div className="card text-center text-gray-500">No plans yet. 🧠</div>}
        </div>
      )}
    </div>
  );
};

export default StudyPlanner;
