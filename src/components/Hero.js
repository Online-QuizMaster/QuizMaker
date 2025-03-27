import React from 'react';
import './Hero.css';
import img1 from '../Assets/image1.jpg';
import img2 from '../Assets/image2.jpg';
import img3 from '../Assets/image3.jpg';
import img4 from '../Assets/image4.jpg';
import img5 from '../Assets/image5.jpg';

const Hero = () => {
  return (
    <section className="hero">
      <div className="carousel">
        <div className="carousel-slides">
          <img
            src={img1}
            alt="Quiz Team"
          />
          <img
            src={img2}
            alt="Quiz Show"
          />
          <img
            src={img3}
            alt="Quiz Word"
          />
          <img
            src={img4}
            alt="Quiz Background"
          />
          <img
            src={img5}
            alt="Quiz Night"
          />
        </div>
      </div>
      <div className="hero-content">
        <h1>Unlock Your Potential with QuizMaster</h1>
        <p>Your ultimate quiz companion to challenge and enhance your knowledge.</p>
        <button className="cta-button">Get Started</button>
      </div>
    </section>
  );
};

export default Hero;