import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CreateQuiz.css';
import { 
  Plus, 
  BookOpen, 
  Users, 
  Clock, 
  Star, 
  Zap, 
  Target, 
  Award,
  ArrowRight,
  Sparkles,
  Brain,
  TrendingUp
} from 'lucide-react';

const CreateQuiz = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const features = [
    {
      icon: <Brain className="feature-icon" />,
      title: "Smart Question Builder",
      description: "Create engaging questions with our intelligent builder that suggests optimal formats and difficulty levels."
    },
    {
      icon: <Users className="feature-icon" />,
      title: "Real-time Collaboration",
      description: "Work together with your team to create comprehensive quizzes that engage and educate effectively."
    },
    {
      icon: <Target className="feature-icon" />,
      title: "Advanced Analytics",
      description: "Track performance, identify learning gaps, and optimize your quizzes with detailed insights and reports."
    }
  ];

  const stats = [
    { number: "50K+", label: "Quizzes Created", icon: <BookOpen /> },
    { number: "1M+", label: "Questions Asked", icon: <Sparkles /> },
    { number: "95%", label: "Success Rate", icon: <TrendingUp /> },
    { number: "24/7", label: "Support Available", icon: <Award /> }
  ];

  return (
    <section className={`create-quiz ${isLoaded ? 'quiz-loaded' : ''}`}>
      {/* Floating Background Elements */}
      <div className="quiz-bg-elements">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
      </div>

      <div className="quiz-container">
        {/* Header Section */}
        <div className="quiz-header">
          <div className="header-badge">
            <Zap className="badge-icon" />
            <span className="badge-text">Quiz Creation Platform</span>
          </div>
          
          <h2 className="quiz-title">
            <span className="title-line">Start Your</span>
            <span className="title-line highlight">Quiz Journey</span>
          </h2>
          
          <p className="quiz-description">
            Join Quizee to embark on an exciting quiz adventure. Challenge yourself and friends 
            in a world of knowledge while creating engaging educational experiences.
          </p>

          {/* CTA Buttons */}
          <div className="quiz-actions">
            <Link to="/signup" className="cta-button primary">
              <span className="button-text">Sign Up Now</span>
              <ArrowRight className="button-icon" />
              <div className="button-shine"></div>
            </Link>
            
            <Link to="/quiz" className="cta-button secondary">
              <span className="button-text">Explore Quizzes</span>
              <BookOpen className="button-icon" />
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="quiz-features">
          <div className="features-header">
            <h3 className="features-title">Why Choose Quizee?</h3>
            <p className="features-subtitle">
              Discover the powerful tools that make quiz creation effortless and engaging
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="feature-card"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="feature-icon-container">
                  {feature.icon}
                </div>
                <div className="feature-content">
                  <h4 className="feature-title">{feature.title}</h4>
                  <p className="feature-description">{feature.description}</p>
                </div>
                <div className="feature-glow"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="quiz-stats">
          <div className="stats-header">
            <h3 className="stats-title">Trusted by Educators Worldwide</h3>
          </div>
          
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="stat-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="stat-icon">
                  {stat.icon}
                </div>
                <div className="stat-content">
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="quiz-bottom-cta">
          <div className="cta-content">
            <div className="cta-icon">
              <Plus className="plus-icon" />
            </div>
            <h3 className="cta-title">Ready to Create Amazing Quizzes?</h3>
            <p className="cta-subtitle">
              Join thousands of educators and learners who are already transforming education with Quizee
            </p>
            <Link to="/signup" className="cta-final-button">
              <span>Get Started Today</span>
              <Star className="final-icon" />
              <div className="final-shine"></div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateQuiz;