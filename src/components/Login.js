import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, User, ArrowRight } from 'lucide-react';
import './Login.css';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <div className="login-container">
      <div className="background-pattern">
        <div className="bg-circle-1"></div>
        <div className="bg-circle-2"></div>
      </div>

      <div className="login-wrapper">
        {/* Main Login Card */}
        <div className="login-card">
          {/* Header */}
          <div className="header">
            <div className="logo-container">
              <User className="logo-icon" />
            </div>
            <h1 className="title">Access Account</h1>
            <p className="subtitle">Access your personalized quiz dashboard</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="form">
            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
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

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
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

            {/* Remember Me & Forgot Password */}
            <div className="form-options">
              <label className="checkbox-wrapper">
                <input
                  type="checkbox"
                  className="checkbox"
                />
                <span className="checkbox-label">Remember me</span>
              </label>
              <button
                type="button"
                className="forgot-password"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="login-button"
            >
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

          {/* Sign Up Link */}
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