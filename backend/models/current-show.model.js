const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const currentShowSchema = new Schema({
    title: { type: String , require: true },
    genre: { type: String, require: true  },
    season: { type: Number, require: true  },
    episode: { type: Number, require: true  },
    date: { type: Date, require: true },
}, {
    timestamps: true,
});

const CurrentShow = mongoose.model('CurrentShow', currentShowSchema);

module.exports = CurrentShow;