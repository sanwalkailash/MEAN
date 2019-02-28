const mongoose = require('mongoose');
const moment = require('moment');
const tokenLimit = 65;


module.exports = function(connection) {

    const Schema = mongoose.Schema;

    const UserSchema = new Schema({
        uid:{type:Number},
        name:{type:String},
        email: {type: String},
        password: {type: String},
        location:{
            city: {type: String},
            latitude: {type:Number,default:0.0},
            longitude: {type:Number,default:0.0}
        },
        token : {
            auth_token: {type: String},
            created_at: {type: Date, required: true, default: moment()}
        },
    });

    UserSchema.methods.hasExpired = function() {
        return (moment().diff(this.token.created_at, 'minutes')) > tokenLimit;

    };

    const User = connection.model('user', UserSchema);

    return User;
}
