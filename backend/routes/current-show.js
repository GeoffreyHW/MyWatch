const router = require('express').Router();
let CurrentShow = require('../models/current-show.model');

router.route('/').get((req, res) => {
    CurrentShow.find()
        .then(currentShows => res.json(currentShows))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const genre = req.body.genre;
    const season = Number(req.body.season);
    const episode = Number(req.body.episode);
    const date = Date.parse(req.body.date);

    const newShow = new CurrentShow({ title, genre, season, episode, date });

    newShow.save()
        .then(() => res.json('Show added'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    CurrentShow.findById(req.params.id)
        .then(currentShow => res.json(currentShow))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    CurrentShow.findByIdAndDelete(req.params.id)
        .then(() => res.json('Show deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    CurrentShow.findById(req.params.id)
        .then(currentShow => {
            currentShow.title = req.body.title;
            currentShow.genre = req.body.genre;
            currentShow.season = Number(req.body.season);
            currentShow.episode = Number(req.body.episode);
            currentShow.date = Date.parse(req.body.date);

            currentShow.save()
                .then(() => res.json('Show updated'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;