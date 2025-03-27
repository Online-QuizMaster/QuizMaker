import React from 'react';
import { Link } from 'react-router-dom';
import './QuizDashboard.css';
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

const QuizDashboard = () => {
  return (
    <div className="qd-quiz-dashboard">
      {/* Quiz Section */}
      <div className="qd-quiz-section">
        <p className="qd-quiz-count">4 quizzes found</p>
        <div className="qd-quiz-grid">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="qd-quiz-card">
              <img src={quiz.image} alt={quiz.title} className="qd-quiz-image" />
              <div className="qd-quiz-content">
                <h3>{quiz.title}</h3>
                <p className="qd-description">{quiz.description}</p>
                <p className="qd-updated">{quiz.updated}</p>
                <Link to={`/quiz/${quiz.id}`} className="qd-start-quiz-btn">
                  Start Quiz
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Quiz Button */}
      <div className="qd-create-quiz-section">
        <Link to="/create-quiz" className="qd-create-quiz-btn">
          Create Quiz
        </Link>
      </div>

      {/* Footer (Visily watermark) */}
      <footer className="qd-footer">
      </footer>
    </div>
  );
};

export default QuizDashboard;