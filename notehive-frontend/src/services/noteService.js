import API from "../api/axios";

export const getNotes = async () => {
  const res = await API.get("/notes");
  return res.data;
};

export const createNote = async (data) => {
  const res = await API.post("/notes", data);
  return res.data;
};

export const deleteNote = async (id) => {
  const res = await API.delete(`/notes/${id}`);
  return res.data;
};

export const togglePin = async (id) => {
  const res = await API.patch(`/notes/${id}/pin`);
  return res.data;
};

export const searchNotes = async (query) => {
  const res = await API.get(`/notes/search?q=${query}`);
  return res.data;
};
