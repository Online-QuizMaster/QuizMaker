import React from 'react';
import './Hero.css';
import img1 from '../Assets/image1.jpg';
import img2 from '../Assets/image2.png';
import img3 from '../Assets/image3.png';
import img4 from '../Assets/image4.png';
import img5 from '../Assets/image5.png';
import { Link } from 'react-router-dom';
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
        <h1>Unlock Your Potential with Quizee</h1>
        <p>Your ultimate quiz companion to challenge and enhance your knowledge.</p>
        <button className="cta-button">
          <Link to="/quiz" className='cta-link'>Get Started</Link>
        </button>
      </div>
    </section>
  );
};

export default Hero;