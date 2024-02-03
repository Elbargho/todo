import axios from "axios";

const getCategories = async () => {
  try {
    const res = await axios.get("http://127.0.0.1:5000/tracker/getCategories");
    return res.data;
  } catch (error) {
    alert(error);
    return null;
  }
};

const addCategory = async (title, color) => {
  const data = { title: title, color: color };
  try {
    const res = await axios.post("http://127.0.0.1:5000/tracker/addCategory", data);
    return res.data;
  } catch (error) {
    alert(error);
    return null;
  }
};

const updateCategory = async (id, new_title, new_color) => {
  const data = { id: id, new_title: new_title, new_color: new_color };
  try {
    const res = await axios.post("http://127.0.0.1:5000/tracker/updateCategory", data);
    return res.data;
  } catch (error) {
    alert(error);
    return null;
  }
};

const getCategoriesStatuses = async (fromDate, toDate) => {
  try {
    const res = await axios.get(
      `http://127.0.0.1:5000/tracker/getCategoriesStatuses?fromDate=${fromDate}&toDate=${toDate}`
    );
    return res.data;
  } catch (error) {
    alert(error);
    return null;
  }
};

const updateCategoryStatus = async (id, toAdd, date) => {
  const data = { id: id, toAdd: toAdd, date: date };
  try {
    const res = await axios.post("http://127.0.0.1:5000/tracker/updateCategoryStatus", data);
    return res.data;
  } catch (error) {
    alert(error);
    return null;
  }
};

const deleteCategory = async (id) => {
  const data = { id: id };
  try {
    const res = await axios.post("http://127.0.0.1:5000/tracker/deleteCategory", data);
    return { statusCode: res.status };
  } catch (error) {
    alert(error);
    return null;
  }
};

const API = {
  getCategories,
  addCategory,
  updateCategory,
  getCategoriesStatuses,
  updateCategoryStatus,
  deleteCategory,
};

export default API;
