const mongoose = require('mongoose');
const moment = require('moment');
const appConstants = require('../server/AppConstants/Constants')
const util = require("../server/api/Utility")()

module.exports = function (connection) {

    const Schema = mongoose.Schema;

    const CarPositionSchema = new Schema({
        "user_id":{type:String},
        "shift_state": {type:String},
        "speed": {type:Number},
        "power": {type:Number},
        "latitude": {type:Number},
        "longitude": {type:Number},
        "geohash": {type:String},
        "heading": {type:String},
        "gps_as_of": {type:String},
        "native_location_supported": {type:String},
        "native_latitude": {type:Number},
        "native_longitude": {type:Number},
        "native_geohash": {type:String},
        "native_type": {type:String},
        "milestone":{
            "name":{type: String},
            "size":{type: String},
            "type":{type: String},
            "lastModifiedDate":{type: String},
            "result":{type: String},
        },
        "isMilestone":{type: Boolean, default: false},
        "created_at": {type: Date, required: true, default: moment()},
        "updated_at": {type: Date, required: true, default: moment()},
        "deleted":{type:Number, default:0}
    });

    const CarPosition = connection.model('carPositions', CarPositionSchema);

    return CarPosition;
}
