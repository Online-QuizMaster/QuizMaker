import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './QuizDashboard.css';
import quizeeImg from '../Assets/Quizee.jpg';
import axios from 'axios';
import { getUserTypeFromToken, getTeacherId } from '../utils/auth'; 

const staticQuizzes = [
  {
    id: 1,
    title: 'Java/OOp',
    description: 'Test your Java skills with this exciting quiz! ☕💻.',
    updated: 'Updated 2 days ago',
    image: quizeeImg,
  },
  {
    id: 2,
    title: 'Aptitude',
    description: 'Challenge your logical thinking with this aptitude quiz! 🧠🔢.',
    updated: 'Updated 3 days ago',
    image: quizeeImg,
  },
  {
    id: 3,
    title: 'Computer Network',
    description: 'Test your knowledge of computer networks with this quiz! 🌐💻.',
    updated: 'Updated 1 week ago',
    image: quizeeImg,
  },
  {
    id: 4,
    title: 'Data base management System',
    description: 'Evaluate your DBMS skills with this challenging quiz! 🗄️🔍.',
    updated: 'Updated 5 days ago',
    image: quizeeImg,
  },
];

const QuizDashboard = () => {
  const [quizzes, setQuizzes] = useState(staticQuizzes);
  const [userType, setUserType] = useState(null);
  const [teacherId, setTeacherId] = useState(null);

  useEffect(() => {
    const type = getUserTypeFromToken();
    const id = getTeacherId();
    setUserType(type);
    setTeacherId(id);
    console.log('User Type:', type);
    console.log('Teacher ID:', id);

    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('https://quizee-backend-vge7.onrender.com/api/get-all-quizzes');
        console.log('Server response:', response.data);

        const apiQuizzes = response.data.quizzes
          .filter((quiz) => {
            if (type === 'teacher') {
              return quiz.teacherId === id;
            }
            return true;
          })
          .map((quiz) => ({
            id: quiz._id,
            title: quiz.title,
            description: quiz.description,
            updated: 'Just now',
            image: quizeeImg, 
          }));

        setQuizzes((prevQuizzes) => {
          const allQuizzes = [...prevQuizzes, ...apiQuizzes];
          const uniqueQuizzes = allQuizzes.filter(
            (value, index, self) =>
              index === self.findIndex((t) => t.id === value.id)
          );
          return uniqueQuizzes;
        });
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, [userType, teacherId]);

  const handleDelete = async (quizId) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;

    try {
      await axios.delete(`https://quizee-backend-vge7.onrender.com/api/delete-quiz/${quizId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert("Quiz deleted successfully!");
      setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz.id !== quizId));
    } catch (error) {
      console.error("Failed to delete quiz:", error);
      alert("Failed to delete quiz.");
    }
  };

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
                <p className="qd-description">
                  {quiz.description.split(' ').slice(0, 20).join(' ')}{quiz.description.split(' ').length > 20 ? '...' : ''}
                </p>
                <p className="qd-updated">{quiz.updated}</p>
                <div className='butset'>
                <Link to={`/quiz/${quiz.id}`} className="qd-start-quiz-btn">
                  Start Quiz
                </Link>
                {userType === 'teacher' && (
                  <button
                    onClick={() => handleDelete(quiz.id)}
                    className="qd-create-quiz-btn"
                  >
                    Delete Quiz
                  </button>
                )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {userType === 'teacher' && (
        <div className='center-create'>
        <Link to="/create" className="qd-create-quiz-btn ">
          Create Quiz
        </Link>
        </div>
      )}

    </div>
  );
};

export default QuizDashboard;
