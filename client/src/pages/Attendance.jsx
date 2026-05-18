import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";
import AttendanceCard from "../components/AttendanceCard";

const Attendance = () => {
  const [items, setItems] = useState([]);
  const [subject, setSubject] = useState("");

  const load = async () => {
    const { data } = await api.get("/attendance");
    setItems(data);
  };

  useEffect(() => { load(); }, []);

  const add = async (event) => {
    event.preventDefault();
    const { data } = await api.post("/attendance", { subject });
    setItems((value) => [...value, data].sort((a, b) => a.percentage - b.percentage));
    setSubject("");
    toast.success("Subject added");
  };

  const mark = async (id, status) => {
    const { data } = await api.put(`/attendance/${id}/mark`, { status });
    setItems((value) => value.map((item) => (item._id === id ? data : item)).sort((a, b) => a.percentage - b.percentage));
  };

  const remove = async (id) => {
    if (!confirm("Delete this subject?")) return;
    await api.delete(`/attendance/${id}`);
    setItems((value) => value.filter((item) => item._id !== id));
    toast.success("Subject deleted");
  };

  return (
    <div className="page">
      <div><p className="label">Attendance tracker</p><h2 className="text-3xl font-bold tracking-tight">Attendance</h2></div>
      <form onSubmit={add} className="card flex flex-col gap-3 sm:flex-row">
        <input className="input flex-1" placeholder="Subject name" value={subject} onChange={(e) => setSubject(e.target.value)} required />
        <button className="btn-primary">Add Subject</button>
      </form>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => <AttendanceCard key={item._id} item={item} onMark={mark} onDelete={remove} />)}
        {!items.length && <div className="card text-center text-gray-500">No attendance subjects yet. ✅</div>}
      </div>
    </div>
  );
};

export default Attendance;
