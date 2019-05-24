const mongoose = require('mongoose');
const moment = require('moment');
const appConstants = require('../server/AppConstants/Constants')
const util = require("../server/api/Utility")()

module.exports = function (connection) {

    const Schema = mongoose.Schema;

    const moviesSchema = new Schema({
        "Poster": {type: String},
        "Title": {type: String},
        "Type": {type: String},
        "Year": {type: Number},
        "imdbID": {type: String}
    });

    const movie = connection.model('movies', moviesSchema);

    return movie;
}
