import axios from 'axios';
axios.defaults.withCredentials = true;

// const BASE_URL = '/api/auth/register'
const BASE_URL = 'http://localhost:3000/api';

const registerUser = async (params) => {
  try {
    const response = await axios.post(
      BASE_URL.concat('/auth/register'),
      params);
    return response.data;
  } catch(err) {
    throw err;
  }
}

const loginUser = async (params) => {
  try {
    const response = await axios.post(
      BASE_URL.concat('/auth/login'),
      params);
    return response.data;
  } catch(err) {
    throw err.response;
  }
}

const getUserFromSession = async () => {
  try {
    const response = await axios.get(
      BASE_URL.concat('/auth/validate'),
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      });
    return response.data;
  } catch(err) {
    throw err.response;
  }
}

export default {
  registerUser,
  loginUser,
  getUserFromSession
}