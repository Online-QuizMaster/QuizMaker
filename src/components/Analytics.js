import React from 'react';
import './Analytics.css';
import quiz from '../Assets/quizlogo.jpg';
import learn from '../Assets/learn.jpg';

const Analytics = () => {
  return (
    <section className="analytics">
      <h2>Unlock the Power of Play</h2>
      <div className="analytics-grid">
        <div className="analytics-card">
          <img
            src={quiz}
            alt="Icon"
          />
          <h3>Interactive Quizzes</h3>
          <p>Quizee offers a fun, interactive experience for all users.</p>
        </div>
        <div className="analytics-card">
          <img
            src={learn}
            alt="Icon"
          />
          <h3>Learn & Grow</h3>
          <p>Enhance your knowledge with every quiz you take.</p>
        </div>
      </div>
    </section>
  );
};

export default Analytics;