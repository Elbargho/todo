import axios from "axios";
import { baseUrl, showErrorPopUp } from "./Common";

const getCategories = async () => {
  try {
    const res = await axios.get(`${baseUrl}/tasks/getCategories`);
    return res.data;
  } catch (error) {
    showErrorPopUp(error);
    return null;
  }
};

const getCurrentDay = async () => {
  try {
    const res = await axios.get(`${baseUrl}/tasks/getCurrentDay`);
    return res.data;
  } catch (error) {
    showErrorPopUp(error);
    return null;
  }
};

const getCategoryTasks = async (category_id) => {
  try {
    const res = await axios.get(`${baseUrl}/tasks/getCategoryTasks?category_id=${category_id}`);
    return res.data;
  } catch (error) {
    showErrorPopUp(error);
    return null;
  }
};

const updateTaskStatus = async (task_id, sub_task_id, is_multi_task) => {
  const data = { task_id: task_id, sub_task_id: sub_task_id, is_multi_task: is_multi_task };
  try {
    const res = await axios.post(`${baseUrl}/tasks/updateTaskStatus`, data);
    return res.data;
  } catch (error) {
    showErrorPopUp(error);
    return null;
  }
};

const editTask = async (task_id, category_id, raw_title) => {
  const data = { task_id: task_id, category_id: category_id, raw_title: raw_title };
  try {
    const res = await axios.post(`${baseUrl}/tasks/editTask`, data);
    return res.data;
  } catch (error) {
    showErrorPopUp(error);
    return null;
  }
};

const deleteTask = async (id) => {
  const data = { task_id: id };
  try {
    const res = await axios.post(`${baseUrl}/tasks/deleteTask`, data);
    return { statusCode: res.status };
  } catch (error) {
    showErrorPopUp(error);
    return null;
  }
};

const disableTaskToday = async (id) => {
  const data = { task_id: id };
  try {
    const res = await axios.post(`${baseUrl}/tasks/disableTaskToday`, data);
    return { statusCode: res.status };
  } catch (error) {
    showErrorPopUp(error);
    return null;
  }
};

const updateTaskIsInMyDay = async (id) => {
  const data = { task_id: id };
  try {
    const res = await axios.post(`${baseUrl}/tasks/updateTaskIsInMyDay`, data);
    return res.data;
  } catch (error) {
    showErrorPopUp(error);
    return null;
  }
};

const addTask = async (category_id, raw_title) => {
  const data = { category_id: category_id, raw_title: raw_title };
  try {
    const res = await axios.post(`${baseUrl}/tasks/addTask`, data);
    return res.data;
  } catch (error) {
    showErrorPopUp(error);
    return null;
  }
};

const getNextDayTasks = async (category_id) => {
  try {
    const res = await axios.get(`${baseUrl}/tasks/getNextDayTasks?category_id=${category_id}`);
    return res.data;
  } catch (error) {
    showErrorPopUp(error);
    return null;
  }
};

const addCategory = async (name) => {
  const data = { name: name };
  try {
    const res = await axios.post(`${baseUrl}/tasks/addCategory`, data);
    return res.data;
  } catch (error) {
    showErrorPopUp(error);
    return null;
  }
};

const editCategory = async (id, new_name) => {
  const data = { id: id, new_name: new_name };
  try {
    const res = await axios.post(`${baseUrl}/tasks/editCategory`, data);
    return res.data;
  } catch (error) {
    showErrorPopUp(error);
    return null;
  }
};

const deleteCategory = async (id) => {
  const data = { id: id };
  try {
    const res = await axios.post(`${baseUrl}/tasks/deleteCategory`, data);
    return { statusCode: res.status };
  } catch (error) {
    showErrorPopUp(error);
    return null;
  }
};

const API = {
  getCategories,
  getCurrentDay,
  getCategoryTasks,
  updateTaskStatus,
  editTask,
  deleteTask,
  updateTaskIsInMyDay,
  disableTaskToday,
  addTask,
  getNextDayTasks,
  addCategory,
  editCategory,
  deleteCategory,
};

export default API;
