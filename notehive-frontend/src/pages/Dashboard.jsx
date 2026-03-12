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
  const [page, setPage] = useState(1);
  const limit = 10;

  // Fetch notes per page
  const fetchNotes = async (pageNumber = page) => {
    try {
      const res = await getNotes(pageNumber, limit);
      if (res?.data) {
        setNotes(res.data);
      } else {
        setNotes([]);
      }
    } catch (err) {
      console.error(err);
      setNotes([]);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [page]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim() === "") {
        fetchNotes();
      } else {
        try {
          const res = await searchNotes(query);
          setNotes(res?.data || []);
        } catch (err) {
          console.error(err);
          setNotes([]);
        }
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // Create new note
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

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

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setPage(1);
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
          className="w-full mb-6 p-3 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            className="w-full border p-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Note content"
            className="w-full border p-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
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
          {notes?.length > 0 ? (
            notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onDelete={handleDelete}
                onPin={handlePin}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No notes found</p>
          )}
        </div>

        {/* Pagination */}
        {notes?.length > 0 && (
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Prev
            </button>

            <span className="self-center">Page {page}</span>

            <button
              onClick={() =>
                notes?.length === limit && setPage((prev) => prev + 1)
              }
              disabled={notes?.length < limit}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
