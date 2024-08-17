// Description: This file contains the logic for handling requests from the genre routes.
const { Genre, Movie } = require('../models/schemas');

exports.getGenres = async (req, res) => {
  try {
    const genresWithImage = await Genre.aggregate([
      {
        $lookup: {
          from: 'movies',
          localField: '_id',
          foreignField: 'genre',
          as: 'movies'
        }
      },
      {
        $addFields: {
          randomMovie: { $arrayElemAt: ['$movies', { $floor: { $multiply: [{ $rand: {} }, { $size: '$movies' }] } }] }
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          count: 1,
          randomMovieImage: '$randomMovie.image'
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    res.json(genresWithImage);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching genres', error: error.message });
  }
};