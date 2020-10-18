const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const futureWatchSchema = new Schema({
    title: { type: String , require: true },
    content: { type: String, require: true }
}, {
    timestamps: true,
});

const FutureWatch = mongoose.model('FutureWatch', futureWatchSchema);

module.exports = FutureWatch;