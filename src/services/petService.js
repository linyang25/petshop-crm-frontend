import axios from 'axios';
import { API_BASE_URL } from '../config/api';

export const addPet = async (petData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/pet/add`, petData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getPets = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pet/list`);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}; 