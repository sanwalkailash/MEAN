var mongooseObj = require('mongoose');

module.exports = function(connection) {
    var Schema = mongooseObj.Schema;

    // create a schema
    var user_profle = new Schema({
        campaignId: String,
        userId:String,
        timeZone:String,
        reportDelivery:String,
        reportGenerateDate:{
            hourly:String,
            daily:String,
            weekly:String,
            monthly:String
        },
        created_at    : { type: Date },
        updated_at    : { type: Date },
    },{collection: 'user_profile'});

    // create a schema
    var user_profle = new Schema({
        campaignId: String,
        userId:String,
        timeZone:String,
        reportDelivery:String,
        reportGenerateDate:{
            hourly:String,
            daily:String,
            weekly:String,
            monthly:String
        },
        created_at    : { type: Date },
        updated_at    : { type: Date },
    },{collection: 'user_locations'});

    user_profle.pre('save', function(next){
        var currentDate = new Date();  // delete the dot and everything after
        if (!this.created_at) {
            this.created_at = currentDate;
        }
        next();
    });

    // the schema is useless so far
    // we need to create a model using it
    var user_profile = connection.model('user_profile', user_profle); //compiling our schema into a Model which is equivalent to mongo document.
    return user_profile;
}





