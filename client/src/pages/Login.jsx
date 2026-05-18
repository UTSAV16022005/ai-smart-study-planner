import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async (event) => {
    event.preventDefault();
    if (await login(form)) navigate("/");
  };

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-gradient-to-b from-sky-300 via-sky-100 to-white px-4 py-10 text-slate-950">
      <div className="absolute inset-x-[-10%] bottom-[-18%] h-[46%] rounded-[50%] bg-white/90 blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-6%] h-72 w-[44rem] rounded-full bg-white/85 blur-2xl" />
      <div className="absolute bottom-[-8%] right-[-8%] h-80 w-[48rem] rounded-full bg-white/80 blur-2xl" />
      <div className="absolute left-[8%] top-[42%] h-40 w-80 rounded-full bg-white/35 blur-2xl" />
      <div className="absolute right-[15%] top-[36%] h-36 w-96 rounded-full bg-white/40 blur-2xl" />
      <div className="absolute left-1/2 top-[55%] h-[32rem] w-[72rem] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/60" />
      <div className="absolute left-1/2 top-[60%] h-[28rem] w-[58rem] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-white/45" />

      <form
        onSubmit={submit}
        className="relative w-full max-w-[360px] rounded-[24px] border border-white/70 bg-white/45 px-8 pb-8 pt-7 text-center shadow-2xl shadow-sky-300/40 backdrop-blur-2xl"
      >
        <div className="mx-auto mb-7 grid h-14 w-14 place-items-center rounded-2xl border border-white/80 bg-white/75 text-2xl shadow-lg shadow-sky-300/40">
          <span className="leading-none">↪</span>
        </div>
        <h1 className="text-2xl font-extrabold tracking-tight">Sign in with email</h1>
        <p className="mx-auto mt-2 max-w-[260px] text-sm leading-5 text-slate-500">
          Make a new doc to bring your words, data, and teams together. For free
        </p>
        <div className="mt-6 space-y-3">
          <label className="flex h-11 items-center gap-3 rounded-xl bg-slate-100/75 px-4 text-slate-500 transition-all duration-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-sky-300">
            <span className="text-sm">✉</span>
            <input
              className="w-full bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </label>
          <label className="flex h-11 items-center gap-3 rounded-xl bg-slate-100/75 px-4 text-slate-500 transition-all duration-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-sky-300">
            <span className="text-sm">▣</span>
            <input
              className="w-full bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-500"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <span className="text-sm">⌧</span>
          </label>
        </div>
        <div className="mt-2 text-right">
          <Link className="text-xs font-semibold text-slate-800 hover:text-sky-700" to="/signup">
            Forgot password?
          </Link>
        </div>
        <button
          className="mt-4 h-11 w-full rounded-xl border border-slate-950 bg-gradient-to-b from-zinc-700 to-zinc-950 text-sm font-bold text-white shadow-lg shadow-slate-400/30 transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Get Started"}
        </button>
        <p className="mt-6 text-sm font-semibold text-slate-600">
          New here? <Link className="text-sky-700 hover:text-sky-900" to="/signup">Create an account</Link>
        </p>
      </form>
    </main>
  );
};

export default Login;
