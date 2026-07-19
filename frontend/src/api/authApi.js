import axios from "axios";

const API = "https://villagemart-tu66.onrender.com/api/auth";

export const loginUser = async (userData) => {
  const response = await axios.post(`${API}/login`, userData);
  return response.data;
};

export const signupUser = async (userData) => {
  const response = await axios.post(`${API}/signup`, userData);
  return response.data;
};