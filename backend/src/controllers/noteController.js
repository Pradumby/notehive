const asyncHandler = require("../utils/asyncHandler");

const {
  createNoteService,
  getNotesService,
  updateNoteService,
  deleteNoteService,
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
  const notes = await getNotesService(req.user._id);

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

module.exports = {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
};
