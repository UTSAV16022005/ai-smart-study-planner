import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";
import NoteCard from "../components/NoteCard";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [form, setForm] = useState({ title: "", subject: "", content: "", tags: "" });

  const load = async () => {
    const { data } = await api.get("/notes");
    setNotes(data);
  };

  useEffect(() => { load(); }, []);

  const subjects = useMemo(() => [...new Set(notes.map((note) => note.subject))], [notes]);
  const filtered = notes.filter((note) => {
    const matchesSearch = `${note.title} ${note.content}`.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (!subjectFilter || note.subject === subjectFilter);
  });

  const submit = async (event) => {
    event.preventDefault();
    const payload = { ...form, tags: form.tags.split(",").map((tag) => tag.trim()).filter(Boolean) };
    const { data } = await api.post("/notes", payload);
    setNotes((value) => [data, ...value]);
    setForm({ title: "", subject: "", content: "", tags: "" });
    setModal(false);
    toast.success("Note created");
  };

  const pin = async (note) => {
    const { data } = await api.put(`/notes/${note._id}`, { isPinned: !note.isPinned });
    setNotes((value) => value.map((item) => (item._id === note._id ? data : item)).sort((a, b) => Number(b.isPinned) - Number(a.isPinned)));
  };

  const remove = async (id) => {
    if (!confirm("Delete this note?")) return;
    await api.delete(`/notes/${id}`);
    setNotes((value) => value.filter((item) => item._id !== id));
    toast.success("Note deleted");
  };

  return (
    <div className="page">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div><p className="label">Knowledge base</p><h2 className="text-3xl font-bold tracking-tight">Notes</h2></div>
        <button className="btn-primary" onClick={() => setModal(true)}>Create Note</button>
      </div>
      <div className="card grid gap-3 md:grid-cols-2">
        <input className="input" placeholder="Search notes" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="input" value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)}>
          <option value="">All subjects</option>
          {subjects.map((subject) => <option key={subject}>{subject}</option>)}
        </select>
      </div>
      <div className="columns-1 gap-6 md:columns-2 xl:columns-3">
        {filtered.map((note) => <div key={note._id} className="mb-6"><NoteCard note={note} onPin={pin} onDelete={remove} /></div>)}
      </div>
      {!filtered.length && <div className="card text-center text-gray-500">No notes yet. 📝</div>}
      {modal && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-gray-950/50 p-4">
          <form onSubmit={submit} className="card w-full max-w-xl animate-[fadeIn_0.25s_ease-in-out]">
            <h3 className="text-xl font-bold">Create note</h3>
            <div className="mt-4 space-y-3">
              <input className="input w-full" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              <input className="input w-full" placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
              <textarea className="input min-h-40 w-full" placeholder="Content" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required />
              <input className="input w-full" placeholder="Tags separated by commas" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
            </div>
            <div className="mt-5 flex justify-end gap-3">
              <button type="button" className="btn-ghost" onClick={() => setModal(false)}>Cancel</button>
              <button className="btn-primary">Save Note</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Notes;
