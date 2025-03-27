import React from 'react';
import './Footer.css';
import logo from '../Assets/Logo.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo-container">
        <img
          src={logo}
          alt="QuizMaster Logo"
          className="footer-logo"
        />
        <span className="footer-logo-text">QuizMaster</span>
      </div>
      <div className="footer-interaction">
        <div className="comment-section">
          <h4>Leave a Comment</h4>
          <textarea className="comment-box" placeholder="Share your thoughts..." rows="4"></textarea>
          <button className="submit-comment">Submit Comment</button>
        </div>
        <div className="subscribe-section">
          <h4>Subscribe to Our Newsletter</h4>
          <input type="email" className="subscribe-box" placeholder="Enter your email" />
          <button className="subscribe-button">Subscribe</button>
        </div>
      </div>
      <div className="footer-links">
        <div>
          <h4>Product</h4>
          <ul>
            <li><a href="#">Features</a></li>
            <li><a href="#">Pricing</a></li>
          </ul>
        </div>
        <div>
          <h4>Resources</h4>
          <ul>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Support</a></li>
          </ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4>Plans & Pricing</h4>
          <ul>
            <li><a href="#">Free Plan</a></li>
            <li><a href="#">Premium</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p></p>
        <p>© 2025 QuizMaster. All rights reserved.</p>
        <div className="social-links">
          <a href="#"><img src="https://cdn.pixabay.com/photo/2017/08/23/11/30/twitter-2672572_1280.jpg" alt="Twitter" /></a>
          <a href="#"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG0JSLlZXZTWhYHDW6sx4clu4yqwgBIm4Dfg&s" alt="Facebook" /></a>
          <a href="#"><img src="https://png.pngtree.com/element_our/sm/20180509/sm_5af29f0006117.jpg" alt="Instagram" /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;