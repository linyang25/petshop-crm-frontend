import axios from 'axios';
import { API_BASE_URL } from '../config/api';

export const getPetStats = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/stats/pets`);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}; 