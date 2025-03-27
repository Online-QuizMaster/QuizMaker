import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

// Sample quiz data (you can replace this with an API call or dynamic data)
const quizzes = [
  {
    id: 1,
    title: 'History Quiz',
    description: 'Test your knowledge on ancient civilizations.',
    image: 'https://via.placeholder.com/300x200?text=History+Quiz', // Replace with actual image
  },
  {
    id: 2,
    title: 'Math Quiz',
    description: 'Challenge your algebra and geometry.',
    image: 'https://via.placeholder.com/300x200?text=Math+Quiz', // Replace with actual image
  },
  {
    id: 3,
    title: 'Geography Quiz',
    description: 'Focuses on world capitals.',
    image: 'https://via.placeholder.com/300x200?text=Geography+Quiz', // Replace with actual image
  },
  {
    id: 4,
    title: 'Biology Quiz',
    description: 'Dive into the world of cells and organisms.',
    image: 'https://via.placeholder.com/300x200?text=Biology+Quiz', // Replace with actual image
  },
];

const Profile = () => {
  return (
    <div className="pf-profile-page">
      {/* Navigation Bar */}
      <nav className="pf-navbar">
        <div className="pf-logo">
          <span className="pf-logo-dot"></span>
          <h1>QuizMaster</h1>
        </div>
        <ul className="pf-nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/quizzes">Quizzes</Link>
          </li>
          <li>
            <Link to="/profile" className="pf-active">
              Profile
            </Link>
          </li>
        </ul>
        <div className="pf-nav-icons">
          <span className="pf-icon pf-search-icon">🔍</span>
          <span className="pf-icon pf-settings-icon">⚙️</span>
          <span className="pf-icon pf-profile-icon">👤</span>
        </div>
      </nav>

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
          <div className="pf-stat-item">
            <p>Users Online</p>
            <p className="pf-stat-value">1,245</p>
            <p className="pf-stat-change positive">+85%</p>
            {/* Placeholder for bar chart */}
            <div className="pf-placeholder-chart pf-bar-chart"></div>
          </div>
          <div className="pf-stat-item">
            <p>New Signups</p>
            <p className="pf-stat-value">320</p>
            <p className="pf-stat-change positive">+45%</p>
            {/* Placeholder for line chart */}
            <div className="pf-placeholder-chart pf-line-chart"></div>
          </div>
          <div className="pf-stat-item">
            <p>Page Views</p>
            <p className="pf-stat-value">8,750</p>
            <p className="pf-stat-change negative">-60%</p>
            {/* Placeholder for pie chart */}
            <div className="pf-placeholder-chart pf-pie-chart"></div>
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
                <Link to={`/quiz/${quiz.id}`} className="pf-start-quiz-btn">
                  Start Quiz
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Quiz Button */}
      <div className="pf-create-quiz-section">
        <Link to="/create-quiz" className="pf-create-quiz-btn">
          <span className="pf-plus-icon">➕</span> Create Quiz
        </Link>
      </div>

      {/* Footer (Visily watermark) */}
      <footer className="pf-footer">
        <p>
          Made with <span className="pf-visily">Visily</span>
        </p>
      </footer>
    </div>
  );
};

export default Profile;