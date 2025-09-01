import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth.jsx';
import { showToast } from '../Toast';

function LoginForm({ onSuccess, onToggle }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login(formData.username, formData.password);
      showToast(`Welcome back, ${formData.username}! 🎉`, 'success');
      onSuccess(response.user);
    } catch (err) {
      showToast(err.message || 'Login failed. Please check your credentials.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="auth-form">
      <h2>🎮 Login</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
          style={{ width: '100%', marginBottom: '15px' }}
        >
          {loading ? 'Logging in...' : '🚀 Login'}
        </button>
      </form>
      
      <p style={{ textAlign: 'center', color: '#666' }}>
        Don't have an account?{' '}
        <button className="link-button" onClick={onToggle} disabled={loading}>
          Register here
        </button>
      </p>
    </div>
  );
}

export default LoginForm;