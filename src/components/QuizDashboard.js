import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './QuizDashboard.css';
import java from '../Assets/java.png';
import apti from '../Assets/apti.png';
import cn from '../Assets/cn.webp';
import dbms from '../Assets/dbms.webp';
import axios from 'axios';
import { getUserTypeFromToken } from '../utils/auth'; // <--- Import here

const staticQuizzes = [ 
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
  const [quizzes, setQuizzes] = useState(staticQuizzes);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    setUserType(getUserTypeFromToken()); // ← cleaner now!

    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/get-all-quizzes');
        const apiQuizzes = response.data.quizzes.map((quiz) => ({
          id: quiz._id,
          title: quiz.title,
          description: quiz.description,
          updated: 'Just now',
          image: java,
        }));
        setQuizzes((prevQuizzes) => [...prevQuizzes, ...apiQuizzes]);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="qd-quiz-dashboard">
      <div className="qd-quiz-section">
        <p className="qd-quiz-count">{quizzes.length} quizzes found</p>
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

      {/* Conditionally Render Create Quiz Button for Teacher */}
      {userType === 'teacher' && (
        <div className="qd-create-quiz-section">
          <Link to="/create" className="qd-create-quiz-btn">
            Create Quiz
          </Link>
        </div>
      )}

      <footer className="qd-footer"></footer>
    </div>
  );
};

export default QuizDashboard;
