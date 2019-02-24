const mongoose = require('mongoose');
const moment = require('moment');
const expired_time = 65;

module.exports = function(connection) {

    const Schema = mongoose.Schema;

    const IdeaSchema = new Schema({
    "id":{type:Number},
    "uid":{type:Number},
    "title":{"type":String,"required":true},
    "details":{"type":String,"required":true},
    "lat":{"type":Number,"required":true},
    "lng":{"type":Number,"required":true},
    "created_at"    : { "type": Date,"default":Date.now },
    "updated_at"    : { "type": Date,"default":Date.now },
    "like":{}
    },{collection: 'activity'});


    const Idea = connection.model('idea', IdeaSchema);

    return Idea;
}
