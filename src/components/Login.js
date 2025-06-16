import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Store credentials in environment variables or config
  // For development, using hardcoded values
  // In production, these should be environment variables
  const ADMIN_USERNAME = process.env.REACT_APP_ADMIN_USERNAME || 'admin';
  const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD || 'portfolio2025';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    if (credentials.username === ADMIN_USERNAME && credentials.password === ADMIN_PASSWORD) {
      // Store authentication in localStorage with expiration
      const authData = {
        isAuthenticated: true,
        timestamp: Date.now(),
        // Expire after 24 hours
        expiry: Date.now() + (24 * 60 * 60 * 1000)
      };
      localStorage.setItem('adminAuth', JSON.stringify(authData));
      onLogin(true);
    } else {
      setError('Invalid username or password. Please try again.');
    }

    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Admin Login</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleInputChange}
            placeholder="Enter username"
            required
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            placeholder="Enter password"
            required
            disabled={isLoading}
          />
        </div>
        <button 
          type="submit" 
          className="login-btn"
          disabled={isLoading || !credentials.username || !credentials.password}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
