const {endpoint} = require('./config');
const mongoose = require('mongoose');

// Setup the default mongo db connection

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

mongoose.connect(
    endpoint,
    { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'GOG'  },
    err => {
        console.log(err);
    },
);

module.exports = mongoose;