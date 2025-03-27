import React, { useState } from "react";
import "./CreateAccount.css";

import { Link } from "react-router-dom";
const CreateAccount = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  
  const [showPassword, setShowPassword] = useState(false);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="create-account-container">
      <div className="form-section2">
        <h1>Create an account</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="fullName"
              placeholder="Full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="example.email@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group password-group">
          <input
              type={showPassword ? 'text' : 'password'} // Toggle between text and password
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="eye-icon"
              onClick={togglePasswordVisibility}
              style={{ cursor: 'pointer' }}
            >
              {showPassword ? "Hide" : "Show"} {/* Toggle between eye and eye-off icons */}
            </span>
          </div>
          <button type="submit" className="sign-in-btn">
            Sign in
          </button>
        </form>
        <div className="alternative-signin">
          <p>Or sign in with</p>
          <div className="social-buttons">
            <button className="social-btn google">G</button>
            <button className="social-btn facebook">f</button>
            <button className="social-btn apple"></button>
          </div>
        </div>
      </div>
      <div className="illustration-section">
        <Link to="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          class="bi bi-box-arrow-right"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
          />
          <path
            fill-rule="evenodd"
            d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
          />
        </svg>
        </Link>
      </div>
    </div>
  );
};

export default CreateAccount;
