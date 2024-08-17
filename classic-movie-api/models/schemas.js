const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  url: { type: String, unique: true },
  type: { type: String, enum: ['Person', 'Organization'], required: true }
});

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 }
});

const ratingSchema = new mongoose.Schema({
  bestRating: String,
  worstRating: String,
  ratingValue: { type: Number, required: true, index: true },
  ratingCount: { type: Number, required: true },
  type: String
});

const trailerSchema = new mongoose.Schema({
  description: String,
  embedUrl: String,
  name: String,
  thumbnailUrl: String,
  uploadDate: Date,
  type: String
});

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  url: { type: String, unique: true },
  type: String,
  context: String,
  description: { type: String, index: 'text' },
  datePublished: { type: Date, index: true },
  year: { type: Number, index: true },
  contentRating: { type: String, index: true },
  duration: String,
  image: String,
  keywords: [{ type: String, index: true }],
  genre: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Genre', index: true }],
  aggregateRating: ratingSchema,
  actors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person', index: true }],
  directors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person', index: true }],
  creators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Person', index: true }],
  trailer: trailerSchema
});

// Compound indexes for common query patterns
movieSchema.index({ genre: 1, year: 1, 'aggregateRating.ratingValue': -1 });
movieSchema.index({ actors: 1, year: 1 });
movieSchema.index({ directors: 1, year: 1 });
movieSchema.index({ contentRating: 1, 'aggregateRating.ratingValue': -1 });
movieSchema.index({ keywords: 1, year: 1 });

const Movie = mongoose.model('Movie', movieSchema);
const Person = mongoose.model('Person', personSchema);
const Genre = mongoose.model('Genre', genreSchema);

module.exports = { Movie, Person, Genre };