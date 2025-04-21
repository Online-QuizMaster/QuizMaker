import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const QuizPage = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/get-quiz/${quizId}`);
      setQuiz(response.data);
    } catch (error) {
      console.error('Error fetching quiz:', error);
    }
  };

  if (!quiz) {
    return <div>Loading quiz...</div>;
  }

  return (
    <div className="quiz-page">
      <h1>{quiz.title}</h1>
      <p>{quiz.description}</p>

      {quiz.questions.map((question, index) => (
        <div key={index} className="question-block">
          <h3>Q{index + 1}: {question.questionText}</h3>
          <ul>
            {question.options.map((option, idx) => (
              <li key={idx}>{option}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default QuizPage;
