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

export const deleteAppointment = async (appointmentId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/appointments/${appointmentId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete appointment');
  }
};

export const updateAppointment = async (appointmentId, appointmentData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/appointments/update/${appointmentId}`, appointmentData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update appointment');
  }
}; 