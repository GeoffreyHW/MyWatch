const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const moviesRouter = require('./routes/movies');
const currentShowRouter = require('./routes/current-show');
const completedShowRouter = require('./routes/completed-show');
const futureWatchRouter = require('./routes/future-watch');

app.use('/movies', moviesRouter);
app.use('/current-show', currentShowRouter);
app.use('/completed-show', completedShowRouter);
app.use('/future', futureWatchRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});