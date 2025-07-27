// frontend/src/components/Login.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../constants';
import { decodedTokenData } from '../services/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('security_token')); // Initialize with existing token
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('security_token', data.token); // Store token
        setToken(data.token); // Update state to trigger useEffect
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Server error');
    }
    setIsLoading(false);
  };
  // Navigate after login based on token
  useEffect(() => {
    if (token) {
      const decoded = decodedTokenData(token);
      const route = decoded.role === 'resident' ? '/create-visit' : `/${decoded.role}-dashboard`;
      navigate(route, { replace: true });
    }
  }, [token, navigate]);

  return (
    <div className="container">
      <div className="header">
        <h1>Visitor Management Login</h1>
      </div>
      <form className="form" onSubmit={handleLogin}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <button type="submit" disabled={isLoading} className="button">
          Login
        </button>
      </form>
      {isLoading && (
        <div
          style={{
            width: '24px',
            height: '24px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '10px auto',
          }}
        />
      )}
      {error && (
        <div
          style={{
            color: '#d32f2f',
            backgroundColor: '#ffebee',
            padding: '10px',
            border: '1px solid #d32f2f',
            borderRadius: '4px',
            margin: '10px auto',
            maxWidth: '400px',
            textAlign: 'center',
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}

export default Login;
