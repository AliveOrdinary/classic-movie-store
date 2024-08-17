// src/utils/api.js
const API_BASE_URL = 'http://localhost:3000/api'; // Adjust this to your API's URL

export const fetchMovies = async (page = 1, limit = 20, sortBy = 'name', sortOrder = 'asc') => {
  const response = await fetch(`${API_BASE_URL}/movies?page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`);
  if (!response.ok) throw new Error('Failed to fetch movies');
  return response.json();
};

export const fetchMovieById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/movies/${id}`);
  if (!response.ok) throw new Error('Failed to fetch movie details');
  return response.json();
};

export const searchMovies = async (searchParams) => {
  const response = await fetch(`${API_BASE_URL}/movies/search`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(searchParams),
  });
  if (!response.ok) throw new Error('Failed to search movies');
  return response.json();
};

export const fetchGenres = async () => {
  const response = await fetch(`${API_BASE_URL}/genres`);
  if (!response.ok) throw new Error('Failed to fetch genres');
  return response.json();
};