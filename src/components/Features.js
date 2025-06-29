import React, { useState, useEffect } from 'react';
import './Features.css';

const Features = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const features = [
    {
      title: "Dynamic Quiz Creation",
      description: "Create engaging quizzes with customizable questions and options. Build interactive experiences that captivate your audience.",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpg?auto=compress&cs=tinysrgb&w=800",
      alt: "Quiz Creation Interface",
      type: "text"
    },
    {
      title: "Real-Time Analytics",
      description: "Gain insights into performance and track progress in real-time. Monitor engagement and optimize your quiz strategies.",
      image: "https://images.pexels.com/photos/669610/pexels-photo-669610.jpg?auto=compress&cs=tinysrgb&w=800",
      alt: "Analytics Dashboard",
      type: "text"
    },
    {
      title: "Interactive Learning",
      description: "Transform traditional learning into an engaging, interactive experience that keeps users motivated and focused.",
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpg?auto=compress&cs=tinysrgb&w=800",
      alt: "Interactive Learning",
      type: "text"
    },
    {
      title: "Smart Insights",
      description: "Leverage AI-powered insights to understand learning patterns and improve quiz effectiveness for better outcomes.",
      image: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpg?auto=compress&cs=tinysrgb&w=800",
      alt: "Smart Analytics",
      type: "text"
    }
  ];

  return (
    <section className={`features ${isLoaded ? 'features-loaded' : ''}`}>
      <div className="features-container1">
        <div className="features-header">
          <div className="section-badge">
            <span className="badge-icon">✨</span>
            <span className="badge-text">Powerful Features</span>
          </div>
          <h2 className="features-title">
            <span className="title-line">Everything You Need</span>
            <span className="title-line highlight">for Perfect Quizzes</span>
          </h2>
          <p className="features-description">
            Discover the comprehensive suite of tools designed to create, manage, 
            and analyze quizzes with unprecedented ease and effectiveness.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`features-card ${index % 2 === 0 ? 'card-left' : 'card-right'}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="card-content">
                <div className="card-image">
                  <img
                    src={feature.image}
                    alt={feature.alt}
                    loading="lazy"
                  />
                  <div className="image-overlay"></div>
                </div>
                <div className="card-text">
                  <div className="feature-number">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                  <div className="feature-icon">
                    {index === 0 && '🎯'}
                    {index === 1 && '📊'}
                    {index === 2 && '🎓'}
                    {index === 3 && '🧠'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="features-stats">
          <div className="stat-item">
            <span className="stat-number">50K+</span>
            <span className="stat-label">Quizzes Created</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">95%</span>
            <span className="stat-label">User Satisfaction</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">24/7</span>
            <span className="stat-label">Support Available</span>
          </div>
        </div>
      </div>

      {/* Floating Background Elements */}
      <div className="features-bg-elements">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>
    </section>
  );
};

export default Features;