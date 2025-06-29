import React, { useState, useEffect } from 'react';
import './Analytics.css';

const Analytics = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const analyticsFeatures = [
    {
      title: "Interactive Quizzes",
      description: "Engage with dynamic, interactive quizzes designed to make learning fun and memorable. Experience gamified education at its finest.",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpg?auto=compress&cs=tinysrgb&w=800",
      alt: "Interactive Quiz Interface",
      icon: "🎮",
      stats: "10K+ Active Users"
    },
    {
      title: "Learn & Grow",
      description: "Transform your knowledge journey with personalized learning paths. Track progress and unlock achievements as you master new concepts.",
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpg?auto=compress&cs=tinysrgb&w=800",
      alt: "Learning and Growth",
      icon: "🌱",
      stats: "95% Success Rate"
    },
    {
      title: "Real-Time Insights",
      description: "Get instant feedback and detailed analytics on your performance. Understand your strengths and areas for improvement.",
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpg?auto=compress&cs=tinysrgb&w=800",
      alt: "Analytics Dashboard",
      icon: "📊",
      stats: "Live Analytics"
    },
    {
      title: "Community Learning",
      description: "Join a vibrant community of learners. Share knowledge, compete in challenges, and learn together in an engaging environment.",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpg?auto=compress&cs=tinysrgb&w=800",
      alt: "Community Learning",
      icon: "👥",
      stats: "50K+ Community"
    }
  ];

  return (
    <section className={`analytics ${isLoaded ? 'analytics-loaded' : ''}`}>
      <div className="analytics-container">
        {/* Header Section */}
        <div className="analytics-header">
          <div className="section-badge">
            <span className="badge-icon">⚡</span>
            <span className="badge-text">Power of Play</span>
          </div>
          <h2 className="analytics-title">
            <span className="title-line">Unlock the</span>
            <span className="title-line highlight">Power of Play</span>
          </h2>
          <p className="analytics-description">
            Experience the perfect blend of entertainment and education. 
            Our platform transforms learning into an engaging adventure.
          </p>
        </div>

        {/* Analytics Grid */}
        <div className="analytics-grid">
          {analyticsFeatures.map((feature, index) => (
            <div 
              key={index} 
              className="analytics-card"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="card-header">
                <div className="card-image">
                  <img
                    src={feature.image}
                    alt={feature.alt}
                    loading="lazy"
                  />
                  <div className="image-overlay">
                    <div className="feature-icon">{feature.icon}</div>
                  </div>
                </div>
                <div className="card-stats">
                  <span className="stats-text">{feature.stats}</span>
                </div>
              </div>
              
              <div className="card-content">
                <h3 className="card-title">{feature.title}</h3>
                <p className="card-description">{feature.description}</p>
                
                <div className="card-footer">
                  <button className="explore-btn">
                    <span>Explore</span>
                    <span className="btn-arrow">→</span>
                  </button>
                </div>
              </div>
              
              <div className="card-glow"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="analytics-cta">
          <div className="cta-content">
            <h3 className="cta-title">Ready to Transform Your Learning?</h3>
            <p className="cta-description">
              Join thousands of learners who have already discovered the joy of interactive education.
            </p>
            <button className="cta-button">
              <span>Start Your Journey</span>
              <span className="button-shine"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Background Elements */}
      <div className="analytics-bg-elements">
        <div className="floating-element element-1"></div>
        <div className="floating-element element-2"></div>
        <div className="floating-element element-3"></div>
        <div className="floating-element element-4"></div>
      </div>
    </section>
  );
};

export default Analytics;