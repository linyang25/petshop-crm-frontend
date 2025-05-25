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

export const getAppointmentStats = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/stats/appointments`);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getDashboardData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/dashboard`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}; 