// Description: This file contains the routes for the movie API.
const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/', movieController.getMovies);
router.get('/:id', movieController.getMovieById);
router.post('/search', movieController.searchMovies);

module.exports = router;