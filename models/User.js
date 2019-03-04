const mongoose = require('mongoose');
const moment = require('moment');
const appConstants = require('../server/AppConstants/Constants')
const util = require("../server/api/Utility")()

module.exports = function(connection) {

    const Schema = mongoose.Schema;

    const UserSchema = new Schema({
        appName:{type:String},
        name:{type:String},
        email: {type: String},
        password: {type: String},
        location:{
            city: {type: String},
            latitude: {type:Number,default:0.0},
            longitude: {type:Number,default:0.0}
        },
        tokenDefaults : {type: String},
        created_at: {type: Date, required: true, default: moment()},
        updated_at: {type: Date, required: true, default: moment()}
  });

    UserSchema.pre("save",function(next){
        this.tokenDefaults = this.created_at+","+this.appName+","+this.email+","+this.password;
        console.info("@user schema default token..",this.tokenDefaults)
        next()
    })

    UserSchema.pre("update",function(next){
        this.tokenDefaults = this.created_at+","+this.appName+","+this.email+","+this.password;
        console.info("@user schema default token..",this.tokenDefaults)
        next()
    })


    const User = connection.model('users', UserSchema);

    return User;
}
