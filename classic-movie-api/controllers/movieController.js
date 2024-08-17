// Description: This file contains the logic for handling movie related requests.
const { Movie, Person, Genre } = require('../models/schemas');

exports.getMovies = async (req, res) => {
  try {
    const { page = 1, limit = 20, sortBy = 'name', sortOrder = 'asc' } = req.query;
    const skip = (page - 1) * limit;

    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const movies = await Movie.find()
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('genre', 'name')
      .populate('actors', 'name')
      .populate('directors', 'name');

    const total = await Movie.countDocuments();

    res.json({
      movies,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movies', error: error.message });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id)
      .populate('genre', 'name')
      .populate('actors', 'name')
      .populate('directors', 'name')
      .populate('creators', 'name');

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching movie', error: error.message });
  }
};

exports.searchMovies = async (req, res) => {
  try {
    const { 
      search, genre, year, minRating, actor, director, 
      contentRating, keyword, page = 1, limit = 20 
    } = req.body;
    
    let query = {};
    
    if (search) query.$text = { $search: search };
    if (genre) {
      const genreDoc = await Genre.findOne({ name: genre });
      if (genreDoc) query.genre = genreDoc._id;
    }
    if (year) query.year = parseInt(year);
    if (minRating) query['aggregateRating.ratingValue'] = { $gte: parseFloat(minRating) };
    if (contentRating) query.contentRating = contentRating;
    if (keyword) query.keywords = keyword;

    if (actor || director) {
      const personQuery = actor ? { name: actor } : { name: director };
      const person = await Person.findOne(personQuery);
      if (person) {
        if (actor) query.actors = person._id;
        if (director) query.directors = person._id;
      }
    }

    const movies = await Movie.find(query)
      .sort({ 'aggregateRating.ratingValue': -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .populate('genre', 'name')
      .populate('actors', 'name')
      .populate('directors', 'name');

    const total = await Movie.countDocuments(query);

    res.json({
      movies,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: 'Error searching movies', error: error.message });
  }
};