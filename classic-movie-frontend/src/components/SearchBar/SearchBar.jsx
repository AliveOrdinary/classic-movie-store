// src/components/SearchBar/SearchBar.jsx
import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="search-bar-container">
      <form className="search-bar" onSubmit={handleSubmit}>
      <input
  type="text"
  placeholder="Discover timeless classics..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="search-input"
/>
        <button type="submit" className="search-button">
          <span className="search-icon">🔍</span>
          <span className="search-text">Search</span>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;