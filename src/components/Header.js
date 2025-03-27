import React from 'react';
import './Header.css';
import logo from '../Assets/Logo.png';
import { Link } from 'react-router-dom';
const Header = () => {
  const poop = {
    fontFamily: "'Poppins', sans-serif",
  };
  return (
    <header className="header">
      <div className="logo-nav">
        <img
          src={logo}
          alt="QuizMaster Logo"
          className="logo"
        />
        <h2 className='ram' style={poop}><b>QuizMaster</b></h2>
        <nav className="left-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/quiz">Quizes</Link></li>
            <li><Link to="/ile">Profile</Link></li>
          </ul>
        </nav>
      </div>
      <div className="auth-buttons">
        <Link to="/signup" className="auth-button signup-button">Sign Up</Link>
        <Link to="/login" className="auth-button login-button">Login</Link>
      </div>
    </header>
  );
};

export default Header;