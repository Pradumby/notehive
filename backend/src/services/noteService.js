const Note = require("../models/Note");

const createNoteService = async (data, userId) => {
  const note = await Note.create({
    ...data,
    user: userId,
  });

  return note;
};

const getNotesService = async (userId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const notes = await Note.find({ user: userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return notes;
};

const updateNoteService = async (noteId, data, userId) => {
  const note = await Note.findOneAndUpdate(
    { _id: noteId, user: userId },
    data,
    { new: true }
  );

  if (!note) {
    const error = new Error("Note not found");
    error.statusCode = 404;
    throw error;
  }

  return note;
};

const deleteNoteService = async (noteId, userId) => {
  const note = await Note.findOneAndDelete({
    _id: noteId,
    user: userId,
  });

  if (!note) {
    const error = new Error("Note not found");
    error.statusCode = 404;
    throw error;
  }

  return note;
};

const searchNotesService = async (query, userId) => {
  const notes = await Note.find({
    user: userId,
    $text: { $search: query },
  });

  return notes;
};

const togglePinService = async (noteId, userId) => {
  const note = await Note.findOne({ _id: noteId, user: userId });

  if (!note) {
    const error = new Error("Note not found");
    error.statusCode = 404;
    throw error;
  }

  note.pinned = !note.pinned;

  await note.save();

  return note;
};

module.exports = {
  createNoteService,
  getNotesService,
  updateNoteService,
  deleteNoteService,
  searchNotesService,
  togglePinService,
};
