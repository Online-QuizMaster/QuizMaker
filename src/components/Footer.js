import React, { useState } from 'react';
import './Footer.css';
import { Mail, Send, MessageCircle, ArrowRight, Heart, Star } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isCommentSubmitted, setIsCommentSubmitted] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment) {
      setIsCommentSubmitted(true);
      setComment('');
      setTimeout(() => setIsCommentSubmitted(false), 3000);
    }
  };

  const footerLinks = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Templates', href: '#templates' },
      { name: 'Integrations', href: '#integrations' }
    ],
    resources: [
      { name: 'Blog', href: '#blog' },
      { name: 'Help Center', href: '#help' },
      { name: 'Tutorials', href: '#tutorials' },
      { name: 'API Docs', href: '#api' }
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Careers', href: '#careers' },
      { name: 'Contact', href: '#contact' },
      { name: 'Press Kit', href: '#press' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Cookie Policy', href: '#cookies' },
      { name: 'GDPR', href: '#gdpr' }
    ]
  };

  const socialLinks = [
    { name: 'Twitter', icon: '𝕏', href: '#twitter', color: '#1DA1F2' },
    { name: 'Facebook', icon: '📘', href: '#facebook', color: '#4267B2' },
    { name: 'Instagram', icon: '📷', href: '#instagram', color: '#E4405F' },
    { name: 'LinkedIn', icon: '💼', href: '#linkedin', color: '#0077B5' },
    { name: 'YouTube', icon: '📺', href: '#youtube', color: '#FF0000' }
  ];

  return (
    <footer className="footer">
      {/* Floating Background Elements */}
      <div className="footer-bg-elements">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>

      <div className="footer-container">
        {/* Header Section */}
        <div className="footer-header">
          <div className="footer-logo-section">
            <div className="logo-container1">
              <div className="logo-icon">
                <Star className="logo-star" />
              </div>
              <span className="footer-logo-text">Quizee</span>
            </div>
            <p className="footer-tagline">
              Transforming learning through interactive quizzes and engaging experiences.
            </p>
            <div className="footer-stats">
              <div className="stat-item">
                <span className="stat-number">50K+</span>
                <span className="stat-label">Happy Users</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">1M+</span>
                <span className="stat-label">Quizzes Created</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Section */}
        <div className="footer-interaction">
          {/* Newsletter Subscription */}
          <div className="subscribe-section">
            <div className="section-header">
              <Mail className="section-icon" />
              <h4>Stay Updated</h4>
            </div>
            <p className="section-description">
              Get the latest features, tips, and quiz inspiration delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="subscribe-form">
              <div className="input-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="subscribe-input"
                  placeholder="Enter your email address"
                  required
                />
                <button 
                  type="submit" 
                  className={`subscribe-btn ${isSubscribed ? 'success' : ''}`}
                  disabled={isSubscribed}
                >
                  {isSubscribed ? (
                    <>
                      <span>Subscribed!</span>
                      <Heart className="btn-icon" />
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <Send className="btn-icon" />
                    </>
                  )}
                </button>
              </div>
              {isSubscribed && (
                <div className="success-message">
                  <span>🎉 Welcome to our community!</span>
                </div>
              )}
            </form>
          </div>

          {/* Comment Section */}
          <div className="comment-section">
            <div className="section-header">
              <MessageCircle className="section-icon" />
              <h4>Share Your Thoughts</h4>
            </div>
            <p className="section-description">
              We'd love to hear your feedback and suggestions for improvement.
            </p>
            <form onSubmit={handleCommentSubmit} className="comment-form">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="comment-textarea"
                placeholder="Share your experience with Quizee..."
                rows="4"
                required
              />
              <button 
                type="submit" 
                className={`comment-btn ${isCommentSubmitted ? 'success' : ''}`}
                disabled={isCommentSubmitted}
              >
                {isCommentSubmitted ? (
                  <>
                    <span>Thank You!</span>
                    <Heart className="btn-icon" />
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <ArrowRight className="btn-icon" />
                  </>
                )}
              </button>
              {isCommentSubmitted && (
                <div className="success-message">
                  <span>💬 Your feedback has been received!</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>© 2025 Quizee. All rights reserved.</p>
              <p className="made-with">
                Made with <Heart className="heart-icon" /> for learners worldwide
              </p>
            </div>

            <div className="social-links">
              <span className="social-label">Follow us:</span>
              <div className="social-icons">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="social-link"
                    aria-label={social.name}
                    style={{ '--social-color': social.color }}
                  >
                    <span className="social-icon">{social.icon}</span>
                    <span className="social-name">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;