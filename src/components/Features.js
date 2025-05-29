import React from 'react';
import './Features.css';
import intr from '../Assets/inter.jpg';
import analy from '../Assets/analy.jpg';

const Features = () => {
  return (
    <section className="features">
      <h2>Features Overview</h2>
      <p>Explore the unique features of Quizee to enhance your quiz experience.</p>
      <div className="features-grid">
        <div className="feature-card">
          <h3>Dynamic Quiz Creation</h3>
          <p>Create engaging quizzes with customizable questions and options.</p>
          <div className="feature-buttons">
            <button className="try-now">Try Now</button>
            <button className="learn-more">Learn More</button>
          </div>
        </div>
        <div className="feature-card">
          <img
            src={intr}
            alt="Quiz Creation Illustration"
          />
        </div>
        <div className="feature-card">
          <img
            src={analy}
            alt="Analytics Illustration"
          />
        </div>
        <div className="feature-card">
          <h3>Real-Time Analytics</h3>
          <p>Gain insights into performance and track progress in real-time.</p>
          <div className="feature-buttons">
            <button className="try-now">Try Now</button>
            <button className="learn-more">Learn More</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;