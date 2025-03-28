import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import java from '../Assets/java.png';
import apti from '../Assets/apti.png';
import cn from '../Assets/cn.webp';
import dbms from '../Assets/dbms.webp';

// Sample quiz data (you can replace this with an API call or dynamic data)
const quizzes = [
  {
    id: 1,
    title: 'Java/OOp',
    description: 'Test your Java skills with this exciting quiz! ☕💻.',
    updated: 'Updated 2 days ago',
    image: java,
  },
  {
    id: 2,
    title: 'Aptitude',
    description: 'Challenge your logical thinking with this aptitude quiz! 🧠🔢.',
    updated: 'Updated 3 days ago',
    image: apti,
  },
  {
    id: 3,
    title: 'Computer Network',
    description: 'Test your knowledge of computer networks with this quiz! 🌐💻.',
    updated: 'Updated 1 week ago',
    image: cn,
  },
  {
    id: 4,
    title: 'Data base management System',
    description: 'Evaluate your DBMS skills with this challenging quiz! 🗄️🔍.',
    updated: 'Updated 5 days ago',
    image: dbms,
  },
];

const Profile = () => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="pf-profile-page">
     

      {/* Stats Section */}
      <div className="pf-stats-section">
        <div className="pf-stat-card">
          <h3>Completed Quizzes</h3>
          <p className="pf-stat-value">7</p>
          <span className="pf-icon pf-trophy-icon">🏆</span>
        </div>
        <div className="pf-stat-card">
          <h3>Average Score</h3>
          <p className="pf-stat-value">85.5%</p>
          <span className="pf-icon pf-chart-icon">📊</span>
        </div>
        <div className="pf-stat-card pf-stats-overview">
          <h3>Statistics Overview</h3>
          <div className="pf-slider-container">
            <button className="pf-slider-arrow pf-arrow-left" onClick={scrollLeft}>
              ◄
            </button>
            <div className="pf-stat-slider" ref={sliderRef}>
              <div className="pf-stat-item">
                <p>Users Online</p>
                <p className="pf-stat-value">1,245</p>
                <p className="pf-stat-change positive">+85%</p>
                <div className="pf-placeholder-chart pf-bar-chart"></div>
              </div>
              <div className="pf-stat-item">
                <p>New Signups</p>
                <p className="pf-stat-value">320</p>
                <p className="pf-stat-change positive">+45%</p>
                <div className="pf-placeholder-chart pf-line-chart"></div>
              </div>
              <div className="pf-stat-item">
                <p>Page Views</p>
                <p className="pf-stat-value">8,750</p>
                <p className="pf-stat-change negative">-60%</p>
                <div className="pf-placeholder-chart pf-pie-chart"></div>
              </div>
            </div>
            <button className="pf-slider-arrow pf-arrow-right" onClick={scrollRight}>
              ►
            </button>
          </div>
        </div>
      </div>

      {/* Quiz Section */}
      <div className="pf-quiz-section">
        <div className="pf-quiz-grid">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="pf-quiz-card">
              <img src={quiz.image} alt={quiz.title} className="pf-quiz-image" />
              <div className="pf-quiz-content">
                <h3>{quiz.title}</h3>
                <p className="pf-description">{quiz.description}</p>
                <Link to={``} className="pf-start-quiz-btn">
                  Start Quiz
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Quiz Button */}
      <div className="pf-create-quiz-section">
        <Link to="/create" className="pf-create-quiz-btn">
          <span className="pf-plus-icon">➕</span> Create Quiz
        </Link>
      </div>

      <footer className="pf-footer">
      </footer>
    </div>
  );
};

export default Profile;