import React, { useState, FormEvent } from 'react';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight } from 'lucide-react';
import './Login.css';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://quizee-backend-vge7.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // If you use cookies
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || 'Login failed');
      } else {
        alert('Login successful');

        localStorage.setItem('token', data.token);
        localStorage.setItem('name', data.name);
        localStorage.setItem('userType', data.userType);

        window.location.href = '/dashboard';
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Server error. Try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="background-pattern">
        <div className="bg-circle-1"></div>
        <div className="bg-circle-2"></div>
      </div>

      <div className="login-wrapper">
        <div className="login-card">
          <div className="header">
            <div className="logo-container">
              <User className="logo-icon" />
            </div>
            <h1 className="title">Access Account</h1>
            <p className="subtitle">Access your personalized quiz dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <div className="input-wrapper">
                <Mail className="input-icon" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input password-input"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-wrapper">
                <input type="checkbox" className="checkbox" />
                <span className="checkbox-label">Remember me</span>
              </label>
              <button type="button" className="forgot-password">
                Forgot password?
              </button>
            </div>

            <button type="submit" disabled={isLoading} className="login-button">
              {isLoading ? (
                <div className="button-content">
                  <div className="loading-spinner"></div>
                  Signing In...
                </div>
              ) : (
                <div className="button-content">
                  Log In
                  <ArrowRight className="button-icon" />
                </div>
              )}
            </button>
          </form>

          <div className="signup-section">
            <p className="signup-text">
              Need to create an account?{' '}
              <button className="signup-link">
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
