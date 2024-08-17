import React from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import useApi from '../../hooks/useApi';
import { fetchMovieById } from '../../utils/api';
import Error from '../../components/Error/Error';
import Loading from '../../components/Loading/Loading';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const { data: movie, loading, error } = useApi(() => fetchMovieById(id));
  const { addToCart } = useCart();

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="movie-details">
      <div className="container">
        <div className="movie-details-content">
          <div className="movie-poster">
            <img src={movie.image} alt={movie.name} />
          </div>
          <div className="movie-info">
            <h1 className="movie-title">{movie.name}</h1>
            <p className="movie-meta">{movie.year} | {movie.contentRating} | {movie.duration}</p>
            <p className="movie-description">{movie.description}</p>
            <div className="movie-credits">
              <h3>Directors:</h3>
              <ul>
                {movie.directors.map(director => <li key={director._id}>{director.name}</li>)}
              </ul>
            </div>
            <div className="movie-credits">
              <h3>Actors:</h3>
              <ul>
                {movie.actors.map(actor => <li key={actor._id}>{actor.name}</li>)}
              </ul>
            </div>
            <button className="add-to-cart-btn" onClick={() => addToCart({ ...movie, price: 29.99 })}>
              Add to Cart ($29.99)
            </button>
          </div>
        </div>
        {movie.trailer && (
          <div className="movie-trailer">
            <h2>Trailer</h2>
            <div className="trailer-container">
              <iframe
                src={movie.trailer.embedUrl}
                title={movie.trailer.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;