import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth.jsx';
import { showToast } from '../Toast';

function RegisterForm({ onSuccess, onToggle }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await register(formData.username, formData.email, formData.password);
      showToast(`Account created successfully! Welcome ${formData.username}! 🎉`, 'success');
      onSuccess(response.user);
    } catch (err) {
      showToast(err.message || 'Registration failed. Please try again.', 'error');
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
      <h2>🎯 Register</h2>
      
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
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password (min 6 characters)"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            disabled={loading}
          />
        </div>
        
        <button 
          type="submit" 
          className="btn btn-success"
          disabled={loading}
          style={{ width: '100%', marginBottom: '15px' }}
        >
          {loading ? 'Creating account...' : '🎉 Create Account'}
        </button>
      </form>
      
      <p style={{ textAlign: 'center', color: '#666' }}>
        Already have an account?{' '}
        <button className="link-button" onClick={onToggle} disabled={loading}>
          Login here
        </button>
      </p>
    </div>
  );
}

export default RegisterForm;