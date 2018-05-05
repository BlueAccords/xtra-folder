import axios from 'axios';

const BASE_URL = 'https://5aeb604f046d7b0014fb6e2d.mockapi.io/api/articles';

const registerUser = async (params) => {
  try {
    const response = await axios.post(
      BASE_URL,
      params);
    return response.data;
  } catch(err) {
    throw err;
  }
}

export default {
  registerUser
}