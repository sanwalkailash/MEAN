const mongoose = require('mongoose');
const moment = require('moment');
const appConstants = require('../server/AppConstants/Constants')
const util = require("../server/api/Utility")()

module.exports = function (connection) {

    const Schema = mongoose.Schema;

    const TokenSchema = new Schema({
        token: {type: String},
        refreshToken: {type: String},
        created_at: {type: Date, required: true, default: moment()}
    });


    TokenSchema.pre('save', function (next) {
        this.token = util.encrypt(this.token + ",timestamp," + moment().format())
        this.refreshToken = util.encrypt(this.token + ",reftimestamp," + moment().add(1, 'hour').format())
        console.info("generated token...", this.token)
        console.info("generated refreshToken...", this.refreshToken)
        console.info(" token expire time ",moment().add(1, 'hour').format())
        console.info("refresh token expire time ",moment().add(2, 'hour').format())
        next();
    })

    const token = connection.model('tokens', TokenSchema);

    return token;
}
