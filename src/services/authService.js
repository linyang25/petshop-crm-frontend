import axios from 'axios';

const API_BASE_URL = 'http://13.236.94.52:8080';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', {
      username: userData.username,
      password: userData.password,
      fullName: userData.fullName,
      email: userData.email,
      phone: userData.phone
    });
    return response.data;
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Registration failed' };
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', {
      username: credentials.username,
      password: credentials.password
    });
    // Store the token in localStorage
    localStorage.setItem('token', response.data.token);
    // Set the token in axios headers for future requests
    api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'Login failed' };
  }
};

export const logout = async () => {
  try {
    await api.post('/auth/logout');
    // Clear the token from localStorage
    localStorage.removeItem('token');
    // Remove the token from axios headers
    delete api.defaults.headers.common['Authorization'];
  } catch (error) {
    console.error('Logout error:', error.response?.data || error.message);
    // Even if the API call fails, we should still clear the local auth state
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  }
}; 