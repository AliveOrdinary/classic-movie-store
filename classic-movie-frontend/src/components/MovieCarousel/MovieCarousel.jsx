// src/components/MovieCarousel/MovieCarousel.jsx
import React, { useState } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './MovieCarousel.css';

const MovieCarousel = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length);
  };

  return (
    <div className="movie-carousel">
      <button onClick={prevSlide}>Previous</button>
      <div className="carousel-content">
        {movies.slice(currentIndex, currentIndex + 4).map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
      <button onClick={nextSlide}>Next</button>
    </div>
  );
};

export default MovieCarousel;