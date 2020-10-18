const router = require('express').Router();
let CompletedShow = require('../models/completed-show.model');

router.route('/').get((req, res) => {
    CompletedShow.find()
        .then(completedShows => res.json(completedShows))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const rating = Number(req.body.rating);
    const genre = req.body.genre;
    const comments = req.body.comments;
    const numSeasons = Number(req.body.numSeasons);
    const date = Date.parse(req.body.date);

    const newCompletedShow = new CompletedShow({ title, rating, genre, comments, numSeasons, date });

    newCompletedShow.save()
        .then(() => res.json('Show completed'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    CompletedShow.findById(req.params.id)
        .then(compeltedShow => res.json(compeltedShow))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    CompletedShow.findByIdAndDelete(req.params.id)
        .then(() => res.json('Show deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    CompletedShow.findById(req.params.id)
        .then(completedShow => {
            completedShow.title = req.body.title;
            completedShow.rating = Number(req.body.rating);
            completedShow.genre = req.body.genre;
            completedShow.comments = req.body.genre;
            completedShow.numSeasons = Number(req.body.numSeasons);
            completedShow.date = Date.parse(req.body.date);

            completedShow.save()
                .then(() => res.json('Show updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;