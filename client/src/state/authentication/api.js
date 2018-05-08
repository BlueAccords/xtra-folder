import axios from 'axios';

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

export default {
  registerUser
}