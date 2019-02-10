module.exports = function(connection) {
   var statsSavedReport = require("./statsSavedReport")(connection);

    return {
        statsSavedReport: statsSavedReport,
    }
}
