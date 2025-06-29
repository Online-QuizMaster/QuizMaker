import React, { useState } from "react";
import "./CreateAccount.css";
import { Link, useNavigate } from "react-router-dom";
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Star, 
  Shield, 
  Zap,
  Users,
  BookOpen,
  Award,
  Home
} from 'lucide-react';

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    userType: "student" 
  });
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false); 
  const [showPassword, setShowPassword] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("https://quizee-backend-vge7.onrender.com/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      navigate("/login"); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const features = [
    {
      icon: <BookOpen className="feature-icon" />,
      title: "Interactive Quizzes",
      description: "Engage with dynamic quizzes designed for effective learning"
    },
    {
      icon: <Users className="feature-icon" />,
      title: "Community Learning",
      description: "Join thousands of learners in our vibrant community"
    },
    {
      icon: <Award className="feature-icon" />,
      title: "Track Progress",
      description: "Monitor your learning journey with detailed analytics"
    }
  ];

  return (
    <div className={`create-account-container ${isLoaded ? 'account-loaded' : ''}`}>
      {/* Background Elements */}
      <div className="account-bg-elements">
        <div className="floating-element element-1"></div>
        <div className="floating-element element-2"></div>
        <div className="floating-element element-3"></div>
        <div className="floating-element element-4"></div>
      </div>

      {/* Form Section */}
      <div className="form-section">
        <div className="form-container">
          {/* Header */}
          <div className="form-header">
            <h1 className="form-title">
              <span className="title-line">Create Your</span>
              <span className="title-line highlight">Account</span>
            </h1>
            <p className="form-description">
              Start your learning journey with interactive quizzes and personalized experiences
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-container">
              <div className="error-message">
                <Shield className="error-icon" />
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="registration-form">
            {/* Full Name Field */}
            <div className="input-group">
              <label htmlFor="fullName" className="input-label">
                Full Name
              </label>
              <div className="input-wrapper">
                <User className="input-icon" />
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="form-input1"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="input-group">
              <label htmlFor="email" className="input-label">
                Email Address
              </label>
              <div className="input-wrapper">
                <Mail className="input-icon" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="form-input1"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="input-group">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <div className="input-wrapper">
                <Lock className="input-icon" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="form-input1 password-input"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="password-toggle"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* User Type Selection */}
            <div className="input-group">
              <label htmlFor="userType" className="input-label">
                Account Type
              </label>
              <div className="user-type-selection">
                <div 
                  className={`user-type-option ${formData.userType === 'student' ? 'selected' : ''}`}
                  onClick={() => setFormData({...formData, userType: 'student'})}
                >
                  <div className="option-icon">
                    <BookOpen />
                  </div>
                  <div className="option-content">
                    <span className="option-title">Student</span>
                    <span className="option-description">Take quizzes and track progress</span>
                  </div>
                  <div className="option-radio">
                    <div className={`radio-dot ${formData.userType === 'student' ? 'active' : ''}`}></div>
                  </div>
                </div>
                
                <div 
                  className={`user-type-option ${formData.userType === 'teacher' ? 'selected' : ''}`}
                  onClick={() => setFormData({...formData, userType: 'teacher'})}
                >
                  <div className="option-icon">
                    <Users />
                  </div>
                  <div className="option-content">
                    <span className="option-title">Teacher</span>
                    <span className="option-description">Create and manage quizzes</span>
                  </div>
                  <div className="option-radio">
                    <div className={`radio-dot ${formData.userType === 'teacher' ? 'active' : ''}`}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? (
                <div className="button-content">
                  <div className="loading-spinner"></div>
                  Creating Account...
                </div>
              ) : (
                <div className="button-content">
                  <span>Create Account</span>
                  <ArrowRight className="button-icon" />
                </div>
              )}
              <div className="button-shine"></div>
            </button>
          </form>

          {/* Login Link */}
          <div className="login-section">
            <p className="login-text">
              Already have an account?{' '}
              <Link to="/login" className="login-link">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="features-container">
          {/* Home Button */}
          <Link to="/" className="home-btn">
            <Home className="home-icon" />
            <span>Back to Home</span>
          </Link>

          {/* Features Header */}
          <div className="features-header">
            <div className="features-badge">
              <Zap className="badge-icon" />
              <span className="badge-text">Why Choose Quizee?</span>
            </div>
            <h2 className="features-title">
              <span className="title-line">Unlock Your</span>
              <span className="title-line highlight">Learning Potential</span>
            </h2>
            <p className="features-description">
              Join thousands of learners who have transformed their knowledge with our interactive platform
            </p>
          </div>

          {/* Features List */}
          <div className="features-list">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="feature-item"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="feature-icon-container">
                  {feature.icon}
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="features-stats">
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Active Users</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Quiz Categories</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">98%</span>
              <span className="stat-label">Success Rate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;