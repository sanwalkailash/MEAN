const mongoose = require('mongoose');
const moment = require('moment');
const tokenLimit = 65;


module.exports = function(connection) {

    const Schema = mongoose.Schema;

    const UserSchema = new Schema({
        email: {type: String},
        remember: {type: Boolean},
        token : {
            auth_token: {type: String},
            created_at: {type: Date, required: true, default: moment()}
        }
    });

    UserSchema.methods.hasExpired = function() {
        return (moment().diff(this.token.created_at, 'minutes')) > tokenLimit;

    };

    const User = connection.model('userAccessLog', UserSchema);

    return User;
}
