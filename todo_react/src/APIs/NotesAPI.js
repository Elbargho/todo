import axios from "axios";

const getNotesList = async () => {
  try {
    const res = await axios.get("http://127.0.0.1:5000/notes/getNotesList");
    return res.data;
  } catch (error) {
    alert(error);
    return null;
  }
};

const getNoteContents = async (note_list_id) => {
  try {
    const res = await axios.get(`http://127.0.0.1:5000/notes/getNoteContents?note_list_id=${note_list_id}`);
    return res.data;
  } catch (error) {
    alert(error);
    return null;
  }
};

const addNoteList = async (note_name) => {
  const data = { note_name: note_name };
  try {
    const res = await axios.post("http://127.0.0.1:5000/notes/addNoteList", data);
    return res.data;
  } catch (error) {
    alert(error);
    return null;
  }
};

const addNote = async (note_list_id, text) => {
  const data = { note_list_id: note_list_id, text: text };
  try {
    const res = await axios.post("http://127.0.0.1:5000/notes/addNote", data);
    return res.data;
  } catch (error) {
    alert(error);
    return null;
  }
};

const editNoteList = async (id, new_name) => {
  const data = { id: id, new_name: new_name };
  try {
    const res = await axios.post("http://127.0.0.1:5000/notes/editNoteList", data);
    return res.data;
  } catch (error) {
    alert(error);
    return null;
  }
};

const editNote = async (id, new_text) => {
  const data = { id: id, new_text: new_text };
  try {
    const res = await axios.post("http://127.0.0.1:5000/notes/editNote", data);
    return res.data;
  } catch (error) {
    alert(error);
    return null;
  }
};

const deleteNoteList = async (id) => {
  try {
    const res = await axios.delete(`http://127.0.0.1:5000/notes/deleteNoteList?id=${id}`);
    return { statusCode: res.status };
  } catch (error) {
    alert(error);
    return null;
  }
};

const deleteNote = async (id) => {
  try {
    const res = await axios.delete(`http://127.0.0.1:5000/notes/deleteNote?id=${id}`);
    return { statusCode: res.status };
  } catch (error) {
    alert(error);
    return null;
  }
};

const API = {
  getNotesList,
  getNoteContents,
  addNote,
  addNoteList,
  editNoteList,
  editNote,
  deleteNoteList,
  deleteNote,
};

export default API;
