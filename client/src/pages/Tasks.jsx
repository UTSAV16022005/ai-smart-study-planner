import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";
import TaskCard from "../components/TaskCard";

const empty = { title: "", description: "", subject: "", priority: "medium", dueDate: "" };

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);

  const loadTasks = async () => {
    const { data } = await api.get("/tasks");
    setTasks(data);
  };

  useEffect(() => { loadTasks(); }, []);

  const visible = useMemo(() => (filter === "all" ? tasks : tasks.filter((task) => task.status === filter)), [tasks, filter]);

  const submit = async (event) => {
    event.preventDefault();
    try {
      const payload = editing ? { ...editing, ...form } : form;
      const { data } = editing ? await api.put(`/tasks/${editing._id}`, payload) : await api.post("/tasks", payload);
      setTasks((items) => (editing ? items.map((item) => (item._id === editing._id ? data : item)) : [data, ...items]));
      setEditing(null);
      setForm(empty);
      toast.success(editing ? "Task updated" : "Task created");
    } catch (error) {
      toast.error(error.response?.data?.message || "Task save failed");
    }
  };

  const edit = (task) => {
    setEditing(task);
    setForm({ title: task.title, description: task.description, subject: task.subject, priority: task.priority, dueDate: task.dueDate?.slice(0, 10) });
  };

  const toggle = async (task) => {
    const { data } = await api.put(`/tasks/${task._id}`, { status: task.status === "completed" ? "pending" : "completed" });
    setTasks((items) => items.map((item) => (item._id === task._id ? data : item)));
  };

  const remove = async (id) => {
    if (!confirm("Delete this task?")) return;
    await api.delete(`/tasks/${id}`);
    setTasks((items) => items.filter((item) => item._id !== id));
    toast.success("Task deleted");
  };

  return (
    <div className="page">
      <div><p className="label">Task manager</p><h2 className="text-3xl font-bold tracking-tight">Tasks</h2></div>
      <form onSubmit={submit} className="card grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <input className="input" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <input className="input" placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
        <input className="input" type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} required />
        <select className="input" value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}><option>low</option><option>medium</option><option>high</option></select>
        <textarea className="input md:col-span-2 xl:col-span-5" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <button className="btn-primary md:col-span-2 xl:col-span-5">{editing ? "Update Task" : "Add Task"}</button>
      </form>
      <div className="flex gap-2">{["all", "pending", "completed"].map((tab) => <button key={tab} className={filter === tab ? "btn-primary capitalize" : "btn-ghost capitalize"} onClick={() => setFilter(tab)}>{tab}</button>)}</div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {visible.map((task) => <TaskCard key={task._id} task={task} onToggle={toggle} onEdit={edit} onDelete={remove} />)}
        {!visible.length && <div className="card text-center text-gray-500">No tasks found. 📚</div>}
      </div>
    </div>
  );
};

export default Tasks;
