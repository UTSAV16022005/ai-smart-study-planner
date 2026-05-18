import PomodoroTimer from "../components/PomodoroTimer";

const Pomodoro = () => (
  <div className="page">
    <div>
      <p className="label">Focus timer</p>
      <h2 className="text-3xl font-bold tracking-tight">Pomodoro</h2>
    </div>
    <PomodoroTimer />
  </div>
);

export default Pomodoro;
