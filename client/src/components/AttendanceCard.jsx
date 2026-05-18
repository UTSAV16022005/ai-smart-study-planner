const AttendanceCard = ({ item, onMark, onDelete }) => {
  const percentage = item.percentage || 0;
  const bar = percentage >= 75 ? "bg-emerald-500" : percentage >= 60 ? "bg-amber-500" : "bg-rose-500";

  return (
    <article className="card hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold">{item.subject}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{item.attendedClasses}/{item.totalClasses} classes</p>
        </div>
        {percentage < 75 && <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700">Warning</span>}
      </div>
      <div className="mt-5">
        <div className="mb-2 flex justify-between text-sm font-semibold">
          <span>Attendance</span>
          <span>{percentage}%</span>
        </div>
        <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-700">
          <div className={`h-3 rounded-full ${bar}`} style={{ width: `${percentage}%` }} />
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        <button className="btn-primary bg-emerald-500 hover:bg-emerald-600" onClick={() => onMark(item._id, "present")}>Mark Present</button>
        <button className="btn-primary bg-rose-500 hover:bg-rose-600" onClick={() => onMark(item._id, "absent")}>Mark Absent</button>
        <button className="btn-ghost text-rose-600" onClick={() => onDelete(item._id)}>Delete</button>
      </div>
    </article>
  );
};

export default AttendanceCard;
