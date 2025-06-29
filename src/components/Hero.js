import React, { useState, useEffect } from 'react';
import './Hero.css';
import img1 from '../Assets/image1.jpg';
import img2 from '../Assets/image2.png';
import img3 from '../Assets/image3.png';
import img4 from '../Assets/image4.png';
import img5 from '../Assets/image5.png';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const slides = [
    { src: img1, alt: "Quiz Team" },
    { src: img2, alt: "Quiz Show" },
    { src: img3, alt: "Quiz Word" },
    { src: img4, alt: "Quiz Background" },
    { src: img5, alt: "Quiz Night" }
  ];

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className={`hero ${isLoaded ? 'hero-loaded' : ''}`}>
      {/* Background Carousel */}
      <div className="carousel-container">
        <div className="carousel-wrapper">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className="carousel-image"
              />
              <div className="slide-overlay"></div>
            </div>
          ))}
        </div>
        
        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="hero-bg-elements">
        <div className="floating-element element-1"></div>
        <div className="floating-element element-2"></div>
        <div className="floating-element element-3"></div>
        <div className="floating-element element-4"></div>
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        <div className="content-wrapper">
          <div className="hero-badge">
            <span className="badge-icon">🎯</span>
            <span className="badge-text">Ultimate Quiz Experience</span>
          </div>
          
          <h1 className="hero-title">
            <span className="title-line">Unlock Your</span>
            <span className="title-line highlight">Potential</span>
            <span className="title-line">with Quizee</span>
          </h1>
          
          <p className="hero-description">
            Your ultimate quiz companion to challenge and enhance your knowledge. 
            Discover, learn, and compete with interactive quizzes designed to boost your skills.
          </p>
          
          <div className="hero-actions">
            <Link to="/quiz" className="cta-button primary">
              <span className="button-text">Get Started</span>
              <span className="button-icon">→</span>
              <div className="button-shine"></div>
            </Link>
            
            <button className="cta-button secondary">
              <span className="button-text">Watch Demo</span>
              <span className="button-icon">▶</span>
            </button>
          </div>
          
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Active Users</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Quiz Categories</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">98%</span>
              <span className="stat-label">Success Rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
        <span className="scroll-text">Scroll to explore</span>
      </div>
    </section>
  );
};

export default Hero;