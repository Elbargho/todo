import axios from "axios";

const getCategories = async () => {
  try {
    const res = await axios.get("http://127.0.0.1:5000/tasks/getCategories");
    return res.data;
  } catch (error) {
    alert(error);
    return null;
  }
};

const getCurrentDay = async () => {
  try {
    const res = await axios.get("http://127.0.0.1:5000/tasks/getCurrentDay");
    return res.data;
  } catch (error) {
    alert(error);
    return null;
  }
};

const getCategoryTasks = async (category_id, current_day) => {
  try {
    const res = await axios.get(
      `http://127.0.0.1:5000/tasks/getCategoryTasks?category_id=${category_id}&current_day=${current_day}`
    );
    return res.data;
  } catch (error) {
    alert(error);
    return null;
  }
};

const updateTaskStatus = async (task_id, sub_task_id, is_multi_task) => {
  const data = { task_id: task_id, sub_task_id: sub_task_id, is_multi_task: is_multi_task };
  try {
    const res = await axios.post("http://127.0.0.1:5000/tasks/updateTaskStatus", data);
    return res.data;
  } catch (error) {
    alert(error);
    return null;
  }
};

const editTask = async (task_id, category_id, raw_title, current_day) => {
  const data = { task_id: task_id, category_id: category_id, raw_title: raw_title, current_day: current_day };
  try {
    const res = await axios.post("http://127.0.0.1:5000/tasks/editTask", data);
    return res.data;
  } catch (error) {
    alert(error);
    return null;
  }
};

const deleteTask = async (id) => {
  const data = { task_id: id };
  try {
    const res = await axios.post("http://127.0.0.1:5000/tasks/deleteTask", data);
    return { statusCode: res.status };
  } catch (error) {
    alert(error);
    return null;
  }
};

const addTask = async (category_id, raw_title, current_day) => {
  const data = { category_id: category_id, raw_title: raw_title, current_day: current_day };
  try {
    const res = await axios.post("http://127.0.0.1:5000/tasks/addTask", data);
    return res.data;
  } catch (error) {
    alert(error);
    return null;
  }
};

const getNextDayTasks = async (category_id, current_day) => {
  try {
    const res = await axios.get(
      `http://127.0.0.1:5000/tasks/getNextDayTasks?category_id=${category_id}&current_day=${current_day}`
    );
    return res.data;
  } catch (error) {
    alert(error);
    return null;
  }
};

const addCategory = async (name) => {
  const data = { name: name };
  try {
    const res = await axios.post("http://127.0.0.1:5000/tasks/addCategory", data);
    return res.data;
  } catch (error) {
    alert(error);
    return null;
  }
};

const editCategory = async (id, new_name) => {
  const data = { id: id, new_name: new_name };
  try {
    const res = await axios.post("http://127.0.0.1:5000/tasks/editCategory", data);
    return res.data;
  } catch (error) {
    alert(error);
    return null;
  }
};

const deleteCategory = async (id) => {
  const data = { id: id };
  try {
    const res = await axios.post("http://127.0.0.1:5000/tasks/deleteCategory", data);
    return { statusCode: res.status };
  } catch (error) {
    alert(error);
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
  addTask,
  getNextDayTasks,
  addCategory,
  editCategory,
  deleteCategory,
};

export default API;
