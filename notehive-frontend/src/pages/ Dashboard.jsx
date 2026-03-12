import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteCard from "../components/NoteCard";

import {
  getNotes,
  createNote,
  deleteNote,
  togglePin,
  searchNotes,
} from "../services/noteService";

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [query, setQuery] = useState("");

  const fetchNotes = async () => {
    const data = await getNotes();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    await createNote({ title, content });

    setTitle("");
    setContent("");

    fetchNotes();
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    fetchNotes();
  };

  const handlePin = async (id) => {
    await togglePin(id);
    fetchNotes();
  };

  const handleSearch = async (e) => {
    setQuery(e.target.value);

    if (e.target.value === "") {
      fetchNotes();
    } else {
      const data = await searchNotes(e.target.value);
      setNotes(data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        {/* Search */}

        <input
          value={query}
          onChange={handleSearch}
          placeholder="Search notes..."
          className="w-full mb-6 p-3 border rounded"
        />

        {/* Create Note */}

        <form
          onSubmit={handleCreate}
          className="bg-white p-5 rounded shadow mb-6"
        >
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            className="w-full border p-2 mb-3 rounded"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Note content"
            className="w-full border p-2 mb-3 rounded"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Note
          </button>
        </form>

        {/* Notes Grid */}

        <div className="grid md:grid-cols-2 gap-4">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onDelete={handleDelete}
              onPin={handlePin}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
