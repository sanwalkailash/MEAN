module.exports = function(connection) {

    return {
        ideaSchema: require('./Idea')(connection),
        userSchema: require('./User')(connection)
    }
}
