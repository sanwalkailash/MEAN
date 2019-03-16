const mongoose = require('mongoose');
const moment = require('moment');
const appConstants = require('../server/AppConstants/Constants')
const util = require("../server/api/Utility")()

module.exports = function (connection) {

    const Schema = mongoose.Schema;

    const attendanceSchema = new Schema({
        name: {type: String},
        email: {type: String},
        created_at: {type: Date, required: true, default: moment()},
        updated_at: {type: Date, required: true, default: moment()}
    });

    const User = connection.model('attendances', attendanceSchema);

    return User;
}
