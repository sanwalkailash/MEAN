const mongoose = require('mongoose');
const moment = require('moment');
const appConstants = require('../server/AppConstants/Constants')
const util = require("../server/api/Utility")()

module.exports = function (connection) {

    const Schema = mongoose.Schema;

    const GoogleUserSchema = new Schema({
        googleId: {type: String},
        appName:{type:String},
        password:{type:String},
        provider: {type: String},
        name: {type: String},
        given_name: {type: String},
        family_name: {type: String},
        picture: {type: String},
        locale: {type: String},
        email: {type: String},
        accessToken: {type: String},
        refreshToken: {type: String},
        created_at: {type: Date, required: true, default: moment()},
        updated_at: {type: Date, required: true, default: moment()},
        deleted:{type:Number, default:0}
    });

    const User = connection.model('google_users', GoogleUserSchema);

    return User;
}
