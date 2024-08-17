import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import MovieCard from '../../components/MovieCard/MovieCard';
import MovieCarousel from '../../components/MovieCarousel/MovieCarousel';
import Pagination from '../../components/Pagination/Pagination';
import FilterSort from '../../components/FilterSort/FilterSort';
import Error from '../../components/Error/Error';
import Loading from '../../components/Loading/Loading';
import useApi from '../../hooks/useApi';
import { fetchMovies, searchMovies, fetchGenres } from '../../utils/api';
import './Home.css';

const Home = () => {
  const [searchParams, setSearchParams] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const { data: moviesData, loading: moviesLoading, error: moviesError, refetch: refetchMovies } = useApi(() => fetchMovies(currentPage, 20, searchParams.sortBy, searchParams.sortOrder));
  const { data: genresData, loading: genresLoading, error: genresError } = useApi(fetchGenres);
  const [highestRatedMovies, setHighestRatedMovies] = useState([]);
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [suggestedMovies, setSuggestedMovies] = useState({});

  useEffect(() => {
    refetchMovies();
  }, [currentPage, searchParams]);

  useEffect(() => {
    if (moviesData) {
      const sortedByRating = [...moviesData.movies].sort((a, b) => b.aggregateRating.ratingValue - a.aggregateRating.ratingValue);
      setHighestRatedMovies(sortedByRating.slice(0, 10));
      setFeaturedMovies(sortedByRating.slice(10, 14));
    }
  }, [moviesData]);

  useEffect(() => {
    if (genresData && moviesData) {
      const topGenres = genresData.slice(0, 4);
      const suggestedByGenre = {};
      topGenres.forEach(genre => {
        const genreMovies = moviesData.movies.filter(movie => movie.genre.some(g => g._id === genre._id)).slice(0, 4);
        suggestedByGenre[genre.name] = genreMovies;
      });
      setSuggestedMovies(suggestedByGenre);
    }
  }, [genresData, moviesData]);

  const handleSearch = (searchTerm) => {
    setSearchParams(prev => ({ ...prev, search: searchTerm }));
    setCurrentPage(1);
    refetchMovies(searchMovies, { ...searchParams, page: 1 });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterSort = (filters) => {
    setSearchParams(prev => ({ ...prev, ...filters }));
    setCurrentPage(1);
  };

  if (moviesLoading || genresLoading) return <Loading />;
  if (moviesError || genresError) return <Error message={moviesError || genresError} />;

  return (
    <div className="home">
      <div className="container">
        <h1 className="home-title">Classic Movie Store</h1>
        <SearchBar onSearch={handleSearch} />
        <FilterSort genres={genresData || []} onFilterSort={handleFilterSort} />
        
        <section className="featured-movies">
          <h2 className="section-title">Featured Movies</h2>
          <MovieCarousel movies={highestRatedMovies} />
        </section>
        
        <section className="suggested-movies">
          <h2 className="section-title">Suggested Movies</h2>
          {Object.entries(suggestedMovies).map(([genre, movies]) => (
            <div key={genre} className="genre-section">
              <h3 className="genre-title">{genre}</h3>
              <div className="movie-grid">
                {movies.map((movie) => (
                  <MovieCard key={movie._id} movie={movie} />
                ))}
              </div>
            </div>
          ))}
        </section>
        
        <section className="all-movies">
          <h2 className="section-title">All Movies</h2>
          <div className="movie-grid">
            {moviesData?.movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={moviesData?.totalPages || 1}
            onPageChange={handlePageChange}
          />
        </section>
      </div>
    </div>
  );
};

export default Home;