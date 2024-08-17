import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="film-reel-icon">🎞️</span> Classic Movie Store
          </Link>
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/checkout">Cart</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;