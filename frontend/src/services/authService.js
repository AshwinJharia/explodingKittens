import config from '../config/env';

class AuthService {
  async login(username, password) {
    const response = await fetch(`${config.API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const result = await response.json();
    return result.data; // Extract data from wrapper
  }

  async register(username, email, password) {
    const response = await fetch(`${config.API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    const result = await response.json();
    return result.data; // Extract data from wrapper
  }

  async getProfile() {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${config.API_URL}/api/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get profile');
    }

    const result = await response.json();
    return result.data; // Extract data from wrapper
  }

  get token() {
    return localStorage.getItem('token');
  }
}

export default new AuthService();