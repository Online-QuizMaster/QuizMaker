// src/components/QuizForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { getTeacherId } from '../utils/auth'; // Import the function from auth.js
import './QuizForm.css'; // Make sure you have a corresponding CSS file

const QuizForm = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: '',
      options: ['', '', '', ''],
      correctAnswer: null,
    },
  ]);

  // Function to add a new question
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: questions.length + 1,
        text: '',
        options: ['', '', '', ''],
        correctAnswer: null,
      },
    ]);
  };

  // Function to remove a question
  const removeQuestion = (id) => {
    if (questions.length === 1) return; // At least one question should remain
    setQuestions(questions.filter((q) => q.id !== id));
  };

  // Function to update the question text
  const updateQuestionText = (id, text) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, text } : q))
    );
  };

  // Function to update options
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
  const setCorrectAnswer = (questionId, optionIndex) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId ? { ...q, correctAnswer: optionIndex } : q
      )
    );
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const teacherId = getTeacherId(); // Get the teacher ID from the token
    console.log('Teacher ID:', teacherId); // Log the teacher ID for debugging
    if (!teacherId) {
      alert('You must be logged in to create a quiz.');
      return;
    }

    const quizData = {
      title: quizTitle,
      description: quizDescription,
      teacherId: teacherId, // Add teacherId to the quiz data
      questions: questions.map((q) => ({
        questionText: q.text,
        options: q.options,
        correctAnswer: q.correctAnswer,
      })),
    };

    try {
      const response = await axios.post('http://localhost:5000/api/create-quiz', quizData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token in the request header
        },
      });
      alert('Quiz created successfully!');
      console.log('Server response:', response.data);

      // Reset form
      setQuizTitle('');
      setQuizDescription('');
      setQuestions([
        {
          id: 1,
          text: '',
          options: ['', '', '', ''],
          correctAnswer: null,
        },
      ]);
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
        {/* Quiz Title */}
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

        {/* Quiz Description */}
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

        {/* Quiz Type */}
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

        {/* Questions */}
        {questions.map((question) => (
          <div key={question.id} className="pf-question-block">
            <div className="pf-question-number">Question {question.id}</div>

            {/* Question Text */}
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

            {/* Options */}
            <div className="pf-options-group">
              {question.options.map((option, idx) => (
                <div key={idx} className="pf-option-item">
                  <input
                    type="radio"
                    name={`correct-${question.id}`}
                    checked={question.correctAnswer === idx}
                    onChange={() => setCorrectAnswer(question.id, idx)}
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

            {/* Remove Question Button */}
            <button
              type="button"
              className="pf-remove-question"
              onClick={() => removeQuestion(question.id)}
            >
              X
            </button>
          </div>
        ))}

        {/* Buttons */}
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
