import { useEffect, useMemo, useState } from "react";

const modes = {
  work: 25 * 60,
  break: 5 * 60
};

const PomodoroTimer = () => {
  const [mode, setMode] = useState("work");
  const [seconds, setSeconds] = useState(modes.work);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(Number(localStorage.getItem("pomodoroSessions") || 0));
  const [focusMinutes, setFocusMinutes] = useState(Number(localStorage.getItem("focusMinutes") || 0));
  const progress = useMemo(() => 1 - seconds / modes[mode], [seconds, mode]);

  useEffect(() => {
    if (!running) return undefined;
    const interval = setInterval(() => setSeconds((value) => value - 1), 1000);
    return () => clearInterval(interval);
  }, [running]);

  useEffect(() => {
    if (seconds >= 0) return;
    if (mode === "work") {
      const nextSessions = sessions + 1;
      const nextFocus = focusMinutes + 25;
      setSessions(nextSessions);
      setFocusMinutes(nextFocus);
      localStorage.setItem("pomodoroSessions", String(nextSessions));
      localStorage.setItem("focusMinutes", String(nextFocus));
      setMode("break");
      setSeconds(modes.break);
    } else {
      setMode("work");
      setSeconds(modes.work);
    }
  }, [seconds, mode, sessions, focusMinutes]);

  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const displaySeconds = String(seconds % 60).padStart(2, "0");
  const circumference = 2 * Math.PI * 112;

  const reset = () => {
    setRunning(false);
    setSeconds(modes[mode]);
  };

  return (
    <div className="card mx-auto max-w-xl text-center">
      <div className="mb-6 flex justify-center gap-3">
        {["work", "break"].map((item) => (
          <button
            key={item}
            className={`rounded-xl px-4 py-2 font-semibold capitalize transition-all duration-300 ${mode === item ? "bg-indigo-600 text-white" : "bg-gray-100 dark:bg-gray-700"}`}
            onClick={() => {
              setMode(item);
              setSeconds(modes[item]);
              setRunning(false);
            }}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="relative mx-auto h-72 w-72">
        <svg viewBox="0 0 260 260" className="h-full w-full -rotate-90">
          <circle cx="130" cy="130" r="112" stroke="currentColor" strokeWidth="16" fill="none" className="text-gray-200 dark:text-gray-700" />
          <circle
            cx="130"
            cy="130"
            r="112"
            stroke="url(#timer)"
            strokeWidth="16"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
          />
          <defs>
            <linearGradient id="timer">
              <stop stopColor="#4f46e5" />
              <stop offset="1" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div>
            <p className="text-5xl font-extrabold tracking-tight">{minutes}:{displaySeconds}</p>
            <p className="label mt-2">{mode} mode</p>
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-center gap-3">
        <button className="btn-primary" onClick={() => setRunning((value) => !value)}>{running ? "Pause" : "Start"}</button>
        <button className="btn-ghost" onClick={reset}>Reset</button>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-700">Sessions completed today: <b>{sessions}</b></div>
        <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-700">Total focus time: <b>{focusMinutes} min</b></div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
