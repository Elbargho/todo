import axios from "axios";

let baseUrl = window.location.origin;
if(baseUrl.includes("localhost")) {
  baseUrl = "http://127.0.0.1:5000";
}

const getCategories = async () => {
  try {
    const res = await axios.get(`${baseUrl}/tracker/getCategories`);
    return res.data;
  } catch (error) {
    alert(error);
    return null;
  }
};

const addCategory = async (title, color) => {
  const data = { title: title, color: color };
  try {
    const res = await axios.post(`${baseUrl}/tracker/addCategory`, data);
    return res.data;
  } catch (error) {
    alert(error);
    return null;
  }
};

const updateCategory = async (id, new_title, new_color) => {
  const data = { id: id, new_title: new_title, new_color: new_color };
  try {
    const res = await axios.post(`${baseUrl}/tracker/updateCategory`, data);
    return res.data;
  } catch (error) {
    alert(error);
    return null;
  }
};

const getCategoriesStatuses = async (fromDate, toDate) => {
  try {
    const res = await axios.get(
      `${baseUrl}/tracker/getCategoriesStatuses?fromDate=${fromDate}&toDate=${toDate}`
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
    const res = await axios.post(`${baseUrl}/tracker/updateCategoryStatus`, data);
    return res.data;
  } catch (error) {
    alert(error);
    return null;
  }
};

const deleteCategory = async (id) => {
  const data = { id: id };
  try {
    const res = await axios.post(`${baseUrl}/tracker/deleteCategory`, data);
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
