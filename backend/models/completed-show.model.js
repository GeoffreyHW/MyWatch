const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const completedShowSchema = new Schema({
    title: { type: String , require: true },
    rating: { type: Number, require: true  },
    genre: { type: String, require: true  },
    comments: { type: String, require: true  },
    numSeasons: { type: Number, require: false  },
    date: { type: Date, require: true },
}, {
    timestamps: true,
});

const CompletedShow = mongoose.model('CompletedShow', completedShowSchema);

module.exports = CompletedShow;