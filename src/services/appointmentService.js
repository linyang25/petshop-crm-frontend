import axios from 'axios';
import { API_BASE_URL } from '../config/api';

export const getAppointments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/appointments/list`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch appointments');
  }
}; 