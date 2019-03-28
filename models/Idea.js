const mongoose = require('mongoose');
const moment = require('moment');
const expired_time = 65;

module.exports = function (connection) {

    const Schema = mongoose.Schema;

    const IdeaSchema = new Schema({
        "id": {type: Number},
        "title": {"type": String, "required": true},
        "details": {"type": String, "required": true},
        "lat": {"type": Number, "required": true},
        "lng": {"type": Number, "required": true},
        "created_at": {type: Date, "default": moment()},
        "updated_at": {"type": Date, "default": moment()},
        "like": {type: Number},
        "views": {type: Number},
        "cover":  {
            "name":{type: String},
            "size":{type: String},
            "type":{type: String},
            "lastModifiedDate":{type: String},
            "result":{type: String},
            "location":{type:String}
        }
    });

    const Idea = connection.model('ideas', IdeaSchema);

    return Idea;
}
