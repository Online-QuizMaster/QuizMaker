import React, { useState } from 'react';
import axios from 'axios';
import { getTeacherId } from '../utils/auth'; 
import './QuizForm.css'; 

const QuizForm = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: '',
      options: ['', '', '', ''],
      correctAnswer: '', 
    },
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: questions.length + 1,
        text: '',
        options: ['', '', '', ''],
        correctAnswer: '', 
      },
    ]);
  };

  const removeQuestion = (id) => {
    if (questions.length === 1) return; 
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const updateQuestionText = (id, text) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, text } : q))
    );
  };

  const updateOption = (questionId, optionIndex, value) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt, idx) =>
                idx === optionIndex ? value : opt
              ),
            }
          : q
      )
    );
  };

  const setCorrectAnswer = (questionId, optionText) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId ? { ...q, correctAnswer: optionText } : q
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const teacherId = getTeacherId(); 
    if (!teacherId) {
      alert('You must be logged in to create a quiz.');
      return;
    }

    const quizData = {
      title: quizTitle,
      description: quizDescription,
      teacherId: teacherId, 
      questions: questions.map((q) => ({
        questionText: q.text,
        options: q.options,
        correctAnswer: q.correctAnswer, 
      })),
    };

    try {
      const response = await axios.post('http://localhost:5000/api/create-quiz', quizData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
      });
      alert('Quiz created successfully!');

      setQuizTitle('');
      setQuizDescription('');
      setQuestions([{
        id: 1,
        text: '',
        options: ['', '', '', ''],
        correctAnswer: '',
      }]);
    } catch (error) {
      console.error('Error creating quiz:', error.response?.data || error.message);
      alert('Failed to create quiz');
    }
  };

  return (
    <div className="pf-quiz-form-container">
      <div className="pf-quiz-form-header">
        <h2>Create Quiz</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="pf-form-group">
          <label htmlFor="quizTitle">Quiz Title</label>
          <input
            type="text"
            id="quizTitle"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            placeholder="Science: The Planets of Our Solar System"
            required
          />
        </div>

        <div className="pf-form-group">
          <label htmlFor="quizDescription">Quiz Description</label>
          <textarea
            id="quizDescription"
            value={quizDescription}
            onChange={(e) => setQuizDescription(e.target.value)}
            placeholder="This is a general science quiz covering key topics..."
            required
          />
        </div>

        <div className="pf-form-group">
          <label>Quiz Type</label>
          <div className="pf-quiz-type">
            <input
              type="radio"
              name="quizType"
              value="multiple"
              defaultChecked
              disabled
            />
            <span>Multiple Choice</span>
          </div>
        </div>

        {questions.map((question) => (
          <div key={question.id} className="pf-question-block">
            <div className="pf-question-number">Question {question.id}</div>

            <div className="pf-form-group">
              <label>Question</label>
              <textarea
                value={question.text}
                onChange={(e) =>
                  updateQuestionText(question.id, e.target.value)
                }
                placeholder="What is the capital of Italy?"
                required
              />
            </div>

            <div className="pf-options-group">
              {question.options.map((option, idx) => (
                <div key={idx} className="pf-option-item">
                  <input
                    type="radio"
                    name={`correct-${question.id}`}
                    checked={question.correctAnswer === option}
                    onChange={() => setCorrectAnswer(question.id, option)} 
                    required
                  />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) =>
                      updateOption(question.id, idx, e.target.value)
                    }
                    placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                    required
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              className="pf-remove-question"
              onClick={() => removeQuestion(question.id)}
            >
              X
            </button>
          </div>
        ))}
        <button type="button" className="pf-add-question-btn" onClick={addQuestion}>
          Add Question
        </button>

        <button type="submit" className="pf-submit-quiz-btn">
          Save Quiz
        </button>
      </form>
    </div>
  );
};

export default QuizForm;
