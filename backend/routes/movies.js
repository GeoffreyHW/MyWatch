const router = require('express').Router();
let Movie = require('../models/movie.model');

router.route('/').get((req, res) => {
    Movie.find()
        .then(movies => res.json(movies))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const rating = Number(req.body.rating);
    const genre = req.body.genre;
    const comments = req.body.comments;
    const date = Date.parse(req.body.date);

    const newMovie = new Movie({ title, rating, genre, comments, date });

    newMovie.save()
        .then(() => res.json('Movie added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Movie.findById(req.params.id)
        .then(movie => res.json(movie))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Movie.findByIdAndDelete(req.params.id)
        .then(() => res.json('Movie deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Movie.findById(req.params.id)
        .then(movie => {
            movie.title = req.body.title;
            movie.rating = Number(req.body.rating);
            movie.genre = req.body.genre;
            movie.comments = req.body.genre;
            movie.date = Date.parse(req.body.date);

            movie.save()
                .then(() => res.json('Movie updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;