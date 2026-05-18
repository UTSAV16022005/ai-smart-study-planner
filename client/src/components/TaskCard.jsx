import { formatDate, priorityClass } from "../utils/helpers";

const TaskCard = ({ task, onToggle, onEdit, onDelete }) => (
  <article className="card hover:-translate-y-1">
    <div className="flex items-start justify-between gap-4">
      <div>
        <h3 className={`text-lg font-bold ${task.status === "completed" ? "line-through opacity-60" : ""}`}>
          {task.title}
        </h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{task.description}</p>
      </div>
      <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${priorityClass(task.priority)}`}>
        {task.priority}
      </span>
    </div>
    <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
      <span>{task.subject}</span>
      <span>•</span>
      <span>Due {formatDate(task.dueDate)}</span>
    </div>
    <div className="mt-5 flex flex-wrap gap-2">
      <button className="btn-primary" onClick={() => onToggle(task)}>
        {task.status === "completed" ? "Mark Pending" : "Complete"}
      </button>
      <button className="btn-ghost" onClick={() => onEdit(task)}>
        Edit
      </button>
      <button className="btn-ghost text-rose-600" onClick={() => onDelete(task._id)}>
        Delete
      </button>
    </div>
  </article>
);

export default TaskCard;
