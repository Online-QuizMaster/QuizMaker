import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './QuizPage.css';
import { getUserId, getUserTypeFromToken } from '../utils/auth';

const QuizPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [started, setStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [marks, setMarks] = useState(0);

  useEffect(() => {
    fetchQuiz();
  }, []);

  useEffect(() => {
    let timer;
    if (started && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (started && timeLeft === 0) {
      handleSubmit(); 
    }
    return () => clearInterval(timer);
  }, [started, timeLeft]);

  const fetchQuiz = async () => {
    try {
      const response = await axios.get(`https://quizee-backend-vge7.onrender.com/api/get-quiz/${quizId}`);
      setQuiz(response.data);
    } catch (error) {
      console.error('Error fetching quiz:', error);
    }
  };

  const handleStart = () => {
    setStarted(true);
    setTimeLeft(quiz.questions.length * 60);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleOptionClick = (questionIndex, option) => {
    setSelectedOptions(prev => ({ ...prev, [questionIndex]: option }));
  };

  const calculateMarks = () => {
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (selectedOptions[index] === question.correctAnswer) {
        score += 100 / quiz.questions.length;
      }
    });
    return score;
  };

  const handleSubmit = async () => {
    const finalScore = calculateMarks();
    setMarks(finalScore);
    try {
      const userId = getUserId();
      const userType = getUserTypeFromToken();

      if (userId && userType === 'student') {
        await axios.post('https://quizee-backend-vge7.onrender.com/api/mark-quiz-complete', {
          _id: userId,
          quizId: quizId,
          marks: finalScore,
        });
      }
    } catch (err) {
      console.error('Error marking quiz complete:', err);
    }

    navigate('/profile');
  };

  if (!quiz) return <div className="qp-loading">Loading quiz...</div>;

  if (!started) {
    return (
      <div className="qp-start-page">
        <h1 className="qp-title">{quiz.title}</h1>
        <p className="qp-description">{quiz.description}</p>
        <button className="qp-start-btn" onClick={handleStart}>Start Quiz</button>
      </div>
    );
  }

  const question = quiz.questions[currentQuestionIndex];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="qp-quiz-container">
      <div className="qp-header">
        <h2 className="qp-quiz-title">{quiz.title}</h2>
        <div className="qp-timer">Time Left: {minutes}:{seconds < 10 ? '0' + seconds : seconds}</div>
      </div>

      <div className="qp-question-block">
        <h3 className="qp-question">Q{currentQuestionIndex + 1}: {question.questionText}</h3>
        <ul className="qp-options">
          {question.options.map((option, idx) => (
            <li
              key={idx}
              className={`qp-option-item ${selectedOptions[currentQuestionIndex] === option ? 'selected' : ''}`}
              onClick={() => handleOptionClick(currentQuestionIndex, option)}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>

      <div className="qp-navigation">
        <button
          className="qp-nav-btn"
          onClick={handlePrev}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>
        {currentQuestionIndex < quiz.questions.length - 1 ? (
          <button className="qp-nav-btn" onClick={handleNext}>Next</button>
        ) : (
          <button className="qp-submit-btn" onClick={handleSubmit}>Submit</button>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
