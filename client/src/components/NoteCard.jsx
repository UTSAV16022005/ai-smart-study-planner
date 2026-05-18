const NoteCard = ({ note, onPin, onDelete }) => (
  <article className="card break-inside-avoid hover:-translate-y-1">
    <div className="flex items-start justify-between gap-4">
      <div>
        <h3 className="text-lg font-bold">{note.title}</h3>
        <p className="label mt-1">{note.subject}</p>
      </div>
      <button className="btn-ghost px-3" onClick={() => onPin(note)}>
        {note.isPinned ? "★" : "☆"}
      </button>
    </div>
    <p className="mt-4 whitespace-pre-wrap text-sm text-gray-600 dark:text-gray-300">{note.content}</p>
    <div className="mt-4 flex flex-wrap gap-2">
      {note.tags?.map((tag) => (
        <span key={tag} className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300">
          #{tag}
        </span>
      ))}
    </div>
    <button className="btn-ghost mt-5 w-full text-rose-600" onClick={() => onDelete(note._id)}>
      Delete
    </button>
  </article>
);

export default NoteCard;
