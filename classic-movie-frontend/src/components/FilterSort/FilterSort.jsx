// src/components/FilterSort/FilterSort.jsx
import React, { useState } from 'react';
import './FilterSort.css';

const FilterSort = ({ genres, onFilterSort }) => {
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    minRating: '',
    sortBy: 'name',
    sortOrder: 'asc'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterSort(filters);
  };

  return (
    <form className="filter-sort" onSubmit={handleSubmit}>
      <select name="genre" value={filters.genre} onChange={handleChange}>
        <option value="">All Genres</option>
        {genres.map(genre => (
          <option key={genre._id} value={genre.name}>{genre.name}</option>
        ))}
      </select>
      <input
        type="number"
        name="year"
        placeholder="Year"
        value={filters.year}
        onChange={handleChange}
      />
      <input
        type="number"
        name="minRating"
        placeholder="Minimum Rating"
        min="0"
        max="10"
        step="0.1"
        value={filters.minRating}
        onChange={handleChange}
      />
      <select name="sortBy" value={filters.sortBy} onChange={handleChange}>
        <option value="name">Name</option>
        <option value="year">Year</option>
        <option value="aggregateRating.ratingValue">Rating</option>
      </select>
      <select name="sortOrder" value={filters.sortOrder} onChange={handleChange}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      <button type="submit">Apply</button>
    </form>
  );
};

export default FilterSort;