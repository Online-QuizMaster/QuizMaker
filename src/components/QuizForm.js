import React, { useState } from 'react';
import './QuizForm.css';

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

  const removeQuestion = (id) => {
    if (questions.length === 1) return; // Prevent removing the last question
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

  const setCorrectAnswer = (questionId, optionIndex) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId ? { ...q, correctAnswer: optionIndex } : q
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      title: quizTitle,
      description: quizDescription,
      questions,
    });
    // Add your form submission logic here (e.g., API call)
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
            <input type="radio" name="quizType" value="multiple" defaultChecked />
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
                    checked={question.correctAnswer === idx}
                    onChange={() => setCorrectAnswer(question.id, idx)}
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
          Save
        </button>
      </form>
    </div>
  );
};

export default QuizForm;