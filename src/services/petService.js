import axios from 'axios';
import { API_BASE_URL } from '../config/api';

export const addPet = async (petData, file) => {
  try {
    const formData = new FormData();
    formData.append('info', JSON.stringify(petData));
    if (file) {
      formData.append('file', file);
    }

    const response = await axios.post(`${API_BASE_URL}/pet/add`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
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

export const getGroupedBreeds = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pet-breeds/grouped`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deletePet = async (petId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/pet/delete/${petId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}; 