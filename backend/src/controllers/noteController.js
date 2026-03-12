const asyncHandler = require("../utils/asyncHandler");

const {
  createNoteService,
  getNotesService,
  updateNoteService,
  deleteNoteService,
  searchNotesService,
  togglePinService,
} = require("../services/noteService");

const createNote = asyncHandler(async (req, res) => {
  const note = await createNoteService(req.body, req.user._id);

  res.status(201).json({
    success: true,
    message: "Note created successfully",
    data: note,
  });
});

const getNotes = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const notes = await getNotesService(req.user._id, page, limit);
  res.status(200).json({
    success: true,
    message: "Notes fetched successfully",
    data: notes,
  });
});

const updateNote = asyncHandler(async (req, res) => {
  const note = await updateNoteService(req.params.id, req.body, req.user._id);

  res.status(200).json({
    success: true,
    message: "Note updated successfully",
    data: note,
  });
});

const deleteNote = asyncHandler(async (req, res) => {
  await deleteNoteService(req.params.id, req.user._id);

  res.status(200).json({
    success: true,
    message: "Note deleted successfully",
  });
});

const searchNotes = asyncHandler(async (req, res) => {
  const query = req.query.q;

  const notes = await searchNotesService(query, req.user._id);

  res.json(notes);
});

const togglePin = asyncHandler(async (req, res) => {
  const note = await togglePinService(req.params.id, req.user._id);

  res.json(note);
});

module.exports = {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  searchNotes,
  togglePin,
};
