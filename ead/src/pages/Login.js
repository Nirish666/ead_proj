import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../utils/jsonStorage';
import { useAuth } from '../context/AuthContext';
import './AuthForm.css'; // Reusing the same CSS

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setSuccess('');

    if (!formData.email || !formData.password) {
      setError('All fields are required.');
      return;
    }

    // --- Login using JSON storage ---
    const result = loginUser(formData.email, formData.password);

    if (result.success) {
      login(result.user);
      setSuccess('Login successful! Redirecting to Real Estate...');
      setTimeout(() => navigate('/real-estate'), 1500);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        
        {error && <p className="auth-error">{error}</p>}
        {success && <p className="auth-success">{success}</p>}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="auth-button">
          Login
        </button>

        <p className="auth-switch-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;