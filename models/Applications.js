const mongoose = require('mongoose');
const moment = require('moment');

module.exports = function(connection) {

    const Schema = mongoose.Schema;

    const applicationSchema = new Schema({
        name:{type:String},
        company: {type: String},
        created_at: {type: Date, required: true, default: moment()},
        updated_at: {type: Date,default:moment() }
    });

    const app = connection.model('applications', applicationSchema);

    return app;
}
