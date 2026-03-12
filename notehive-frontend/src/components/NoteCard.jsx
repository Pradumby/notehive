function NoteCard({ note, onDelete, onPin }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-lg text-gray-800">{note.title}</h3>

        <button onClick={() => onPin(note._id)} className="text-yellow-500">
          {note.pinned ? "📌" : "📍"}
        </button>
      </div>

      <p className="text-gray-600 mt-2 text-sm">{note.content}</p>

      <div className="mt-4 flex justify-end">
        <button
          onClick={() => onDelete(note._id)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
