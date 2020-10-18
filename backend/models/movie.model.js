const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: { type: String , require: true },
    rating: { type: Number, require: true  },
    genre: { type: String, require: true  },
    comments: { type: String, require: false  },
    date: { type: Date, require: true },
}, {
    timestamps: true,
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;