import config from '../config/env';
import authService from './authService';

class ApiService {
  constructor() {
    this.baseURL = config.API_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...authService.getAuthHeader(),
      },
    };

    try {
      const response = await fetch(url, { ...defaultOptions, ...options });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async createOrUpdateUser(userData) {
    return this.request('/api/user', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async getUserStatus(username) {
    if (!username) throw new Error('Username is required');
    return this.request(`/api/user/${encodeURIComponent(username)}`);
  }

  async getLeaderboard() {
    return this.request('/api/leaderboard');
  }
}

export default new ApiService();