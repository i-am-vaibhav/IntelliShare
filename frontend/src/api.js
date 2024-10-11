import axios from  'axios';

const API_URL = 'http://localhost:3000'; // backend url

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/register`, userData);
}

export const loginUser = async (userData) => {
  return await axios.post(`${API_URL}/login`, userData);
}

export const getUser = async (userId, token) => {
  return await axios.get(`${API_URL}/user/${userId}`, {
    headers : { Authorization : `Bearer ${token}`}
  });
}

export const updateUserProfile = async (userData, token) => {
  return await axios.post(`${API_URL}/user/update`, userData, {
    headers : { Authorization : `Bearer ${token}`}
  });
}

export const uploadContent = async (contentData, token) => {
  return await axios.post(`${API_URL}/content/upload`, contentData, {
    headers : { Authorization : `Bearer ${token}`}
  });
}

export const getRecommendations = async (userId, token) => {
  return await axios.get(`${API_URL}/content/recommendations/${userId}`, {
    headers : { Authorization : `Bearer ${token}`}
  });
}

export const getContent = async (userId, token) => {
  return await axios.get(`${API_URL}/content/${userId}`, {
    headers : { Authorization : `Bearer ${token}`}
  });
}

export const deleteContent = async (contentId, token) => {
  return await axios.get(`${API_URL}/content/delete/${contentId}`, {
    headers : { Authorization : `Bearer ${token}`}
  });
}