import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const { addToCart } = useCart();

  return (
    <div className="movie-card">
      <div className="movie-card-image">
        <img src={movie.image} alt={movie.name} />
        <div className="movie-card-overlay">
          <Link to={`/movie/${movie._id}`} className="movie-card-details-btn">View Details</Link>
          <button className="movie-card-cart-btn" onClick={() => addToCart({ ...movie, price: 29.99 })}>Add to Cart</button>
        </div>
      </div>
      <div className="movie-card-info">
        <h3 className="movie-card-title">{movie.name}</h3>
        <p className="movie-card-year">{movie.year}</p>
        <div className="movie-card-rating">
          <span className="movie-card-star">★</span>
          <span>{movie.aggregateRating?.ratingValue || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;