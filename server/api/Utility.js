const appConstants = require('../AppConstants/Constants')
const CryptoJS = require('crypto-js');
const fs = require('fs');
const moment = require('moment');
module.exports = function (app, port,environment,server,console,models) {

    return{
        isVoid:function(obj){
            switch(typeof(obj)){
                case "undefined":
                case "object":
                    for(var x in obj){
                        if(obj.hasOwnProperty(x))
                            return false;
                        else
                            return true;
                    }
                    return true;
                case "number":
                case "boolean":
                    return false;
                    break;
                case "string":
                    if(obj == "")
                        return true;
                    else
                        return false;
                default:
                    return false;
            }
        },
        getClientIp : function(req,res,next) {
            console.info("@getClientIp...")
            var ipAddress;
            // The request may be forwarded from local web server.
            var forwardedIpsStr = req.header('x-forwarded-for');
            if (forwardedIpsStr) {
                // 'x-forwarded-for' header may return multiple IP addresses in
                // the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
                // the first one
                var forwardedIps = forwardedIpsStr.split(',');
                ipAddress = forwardedIps[0];
            }
            if (!ipAddress) {
                // If request was not forwarded
                ipAddress = req.connection.remoteAddress;
            }
            console.info("client ip is -- ",ipAddress)
            next()
        },
        encrypt: function(word) {
            var ciphertext = CryptoJS.AES.encrypt(word, appConstants.AppProperties.secret);
            return ciphertext.toString();
        },
        decrypt: function(word){
            var decrypt = CryptoJS.AES.decrypt(word, appConstants.AppProperties.secret);
            return CryptoJS.enc.Utf8.stringify(decrypt).toString();
        },
        mkdirIfNotExist : function(dir){
            console.info("@mkdirIfNotExist, create dir if not exist.", dir);
            fs.promises.mkdir(dir, { recursive: true }).catch(error => { console.error('@mkdirIfNotExist caught exception : ', error.message); });
        },
        saveFile:function(dir,filename,content){
            fs.promises.mkdir(dir, { recursive: true })
                .then(result => { console.info("dir check done.") })
                .catch(error => { console.error('caught exception : ', error.message); throw error });
            let base64Data = content.split(';base64,').pop();
            // console.info("base64Data",base64Data);
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!

            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd;
            }
            if (mm < 10) {
                mm = '0' + mm;
            }
            var today = yyyy+ dd + mm;
            fs.writeFile(dir+today+filename, base64Data,{encoding: 'base64'}, function (err) {
                if (err) throw err;
                console.info('file saved!');
            });
            return dir+today+filename;
        },
        tokenObjExpired: function (token) {
            console.info("current -- ",moment(new Date()).format("YYYY-MM-DD HH:mm:ss"))
            console.info("token -- token.created_at ",token.created_at,moment(token.created_at).format("YYYY-MM-DD HH:mm:ss"))
            console.info("2019-03-28T04:58:58.000Z -- ",moment("2019-03-28T04:58:58.000Z").format("YYYY-MM-DD HH:mm:ss"))
            console.info("token to check -- ",token);
            console.info("session time :: ",(moment().diff(moment(token.created_at), 'seconds')))
            return (moment().diff(token.created_at, 'seconds', true)) > appConstants.AppProperties.tokenLife;
        },
        tokenExpired: function(tokenString){
            console.warn("@tokenExpired..tokenString---",tokenString)
            let tokenProperties=tokenString.split(",");
            console.warn("tokenProperties--",tokenProperties);
            console.warn("token time --",tokenProperties[tokenProperties.length-1])
            console.warn("token session in seconds --",(moment().diff(tokenProperties[tokenProperties.length-1], 'seconds', true)))
            return (moment().diff(tokenProperties[tokenProperties.length-1], 'seconds', true)) > appConstants.AppProperties.tokenLife;
        },
        getUsernameFromToken: function(tokenString){
            let tokenProperties=tokenString.split(",");
            console.warn("@getUsernameFromToken tokenProperties--",tokenProperties[2]);
            return tokenProperties[2];
        },
        getRandomInRange : function(from, to, fixed) {
            return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
            // .toFixed() returns string, so ' * 1' is a trick to convert to number
        }
    }
}
