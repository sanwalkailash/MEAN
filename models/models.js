module.exports = function (connection) {

    return {
        ideaSchema: require('./Idea')(connection),
        userSchema: require('./User')(connection),
        tokenSchema: require('./Token')(connection),
        applicationSchema: require('./Applications')(connection),
        accountSchema: require('./Accounts')(connection)
    }
}
