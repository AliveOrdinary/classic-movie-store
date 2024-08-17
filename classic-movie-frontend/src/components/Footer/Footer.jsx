import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>Classic Movie Store is your gateway to the golden age of cinema. Discover and own timeless films that have shaped the history of moviemaking.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/genres">Genres</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: info@classicmoviestore.com</p>
            <p>Phone: (555) 123-4567</p>
            <p>Address: 123 Cinema Lane, Hollywood, CA 90001</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Classic Movie Store. All rights reserved.</p>
          <div className="social-icons">
  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">📽️</a>
  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">🎬</a>
  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">🎥</a>
</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;