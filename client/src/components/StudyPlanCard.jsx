import { daysLeft, formatDate, priorityClass } from "../utils/helpers";

const StudyPlanCard = ({ plan, onToggleSession, onDelete }) => {
  const completed = plan.dailySessions.filter((session) => session.completed).length;
  const progress = plan.dailySessions.length ? Math.round((completed / plan.dailySessions.length) * 100) : 0;

  return (
    <article className="card hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold">{plan.subject}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{daysLeft(plan.examDate)} days left</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${priorityClass(plan.priority)}`}>
          Priority {plan.priority}
        </span>
      </div>
      <div className="mt-5">
        <div className="mb-2 flex justify-between text-sm font-semibold">
          <span>{completed}/{plan.dailySessions.length} sessions</span>
          <span>{progress}%</span>
        </div>
        <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-700">
          <div className="h-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-500" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="mt-5 max-h-56 space-y-2 overflow-auto pr-1">
        {plan.dailySessions.map((session) => (
          <label key={session._id} className="flex items-center justify-between rounded-xl bg-gray-50 p-3 text-sm dark:bg-gray-700">
            <span>{formatDate(session.date)} • {session.hours}h • {session.timeSlot}</span>
            <input
              type="checkbox"
              checked={session.completed}
              onChange={(event) => onToggleSession(plan._id, session._id, event.target.checked)}
              className="h-4 w-4 accent-indigo-600"
            />
          </label>
        ))}
      </div>
      <button className="btn-ghost mt-5 w-full text-rose-600" onClick={() => onDelete(plan._id)}>
        Delete Plan
      </button>
    </article>
  );
};

export default StudyPlanCard;
