const router = require('express').Router();
let FutureWatch = require('../models/future-watch.model');

router.route('/').get((req, res) => {
    FutureWatch.find()
        .then(futureWatch => res.json(futureWatch))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const content = req.body.content;

    const newWatch = new FutureWatch({ title, content });

    newWatch.save()
        .then(() => res.json(`Future ${content} added`))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').delete((req, res) => {
    FutureWatch.findByIdAndDelete(req.params.id)
        .then(() => res.json('Future deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;