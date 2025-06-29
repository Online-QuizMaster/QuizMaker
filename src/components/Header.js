import React, { useEffect, useState } from 'react';
import './Header.css';
import logo from '../Assets/Logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { getUserInitialFromToken } from '../utils/auth'; 

const Header = () => {
  const [userInitial, setUserInitial] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const initial = getUserInitialFromToken();
    console.log('User Initial:', initial); 
    setUserInitial(initial);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserInitial(null);
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-nav">
          <div className="logo-section">
            <img src={logo} alt="Quizee Logo" className="logo" />
            <h2 className="brand-name">Quizee</h2>
          </div>
          
          <nav className={`navigation ${isMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <span className="nav-text">Home</span>
                  <span className="nav-underline"></span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/quiz" className="nav-link">
                  <span className="nav-text">Quizzes</span>
                  <span className="nav-underline"></span>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/profile" className="nav-link">
                  <span className="nav-text">Profile</span>
                  <span className="nav-underline"></span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="header-actions">
          {userInitial ? (
            <div className="user-section">
              <div className="user-avatar">
                <span className="user-initial">{userInitial}</span>
                <div className="user-status"></div>
              </div>
              <button className="logout-btn" onClick={handleLogout}>
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="auth-section">
              <Link to="/signup" className="auth-btn signup-btn">
                <span>Sign Up</span>
              </Link>
              <Link to="/login" className="auth-btn login-btn">
                <span>Login</span>
              </Link>
            </div>
          )}
          
          <button className="mobile-menu-btn" onClick={toggleMenu}>
            <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;