import { useState, useCallback } from 'react';
import apiService from '../services/api';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (apiCall) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiCall();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUser = useCallback((userData) => {
    return execute(() => apiService.createOrUpdateUser(userData));
  }, [execute]);

  const getUser = useCallback((username) => {
    return execute(() => apiService.getUserStatus(username));
  }, [execute]);

  const getLeaderboard = useCallback(() => {
    return execute(() => apiService.getLeaderboard());
  }, [execute]);

  return {
    loading,
    error,
    updateUser,
    getUser,
    getLeaderboard,
  };
};