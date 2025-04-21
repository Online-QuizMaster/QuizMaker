import React, { useEffect, useState } from 'react';
import './Header.css';
import logo from '../Assets/Logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { getUserInitialFromToken } from '../utils/auth'; // Import utility

const Header = () => {
  const [userInitial, setUserInitial] = useState(null);
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

  return (
    <header className="header">
      <div className="logo-nav">
        <img src={logo} alt="QuizMaster Logo" className="logo" />
        <h2 className='ram'><b>QuizMaster</b></h2>
        <nav className="left-nav">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/quiz">Quizzes</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </nav>
      </div>

      {userInitial ? (
        <div className="auth-buttons">
          <div className="user-circle">{userInitial}</div>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="auth-buttons">
          <Link to="/signup" className="auth-button signup-button">Sign Up</Link>
          <Link to="/login" className="auth-button login-button">Login</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
