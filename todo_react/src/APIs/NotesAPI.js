import axios from "axios";

let baseUrl = window.location.origin;
if(baseUrl.includes("localhost")) {
  baseUrl = "http://127.0.0.1:5000";
}

const getNotesList = async () => {
  try {
    const res = await axios.get(`${baseUrl}/notes/getNotesList`);
    return res.data;
  } catch (error) {
    alert(error);
    return null;
  }
};

const getNoteContents = async (note_list_id) => {
  try {
    const res = await axios.get(`${baseUrl}/notes/getNoteContents?note_list_id=${note_list_id}`);
    return res.data;
  } catch (error) {
    alert(error);
    return null;
  }
};

const addNoteList = async (note_name) => {
  const data = { note_name: note_name };
  try {
    const res = await axios.post(`${baseUrl}/notes/addNoteList`, data);
    return res.data;
  } catch (error) {
    alert(error);
    return null;
  }
};

const addNote = async (note_list_id, text) => {
  const data = { note_list_id: note_list_id, text: text };
  try {
    const res = await axios.post(`${baseUrl}/notes/addNote`, data);
    return res.data;
  } catch (error) {
    alert(error);
    return null;
  }
};

const editNoteList = async (id, new_name) => {
  const data = { id: id, new_name: new_name };
  try {
    const res = await axios.post(`${baseUrl}/notes/editNoteList`, data);
    return res.data;
  } catch (error) {
    alert(error);
    return null;
  }
};

const editNote = async (id, new_text) => {
  const data = { id: id, new_text: new_text };
  try {
    const res = await axios.post(`${baseUrl}/notes/editNote`, data);
    return res.data;
  } catch (error) {
    alert(error);
    return null;
  }
};

const deleteNoteList = async (id) => {
  try {
    const res = await axios.delete(`${baseUrl}/notes/deleteNoteList?id=${id}`);
    return { statusCode: res.status };
  } catch (error) {
    alert(error);
    return null;
  }
};

const deleteNote = async (id) => {
  try {
    const res = await axios.delete(`${baseUrl}/notes/deleteNote?id=${id}`);
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
