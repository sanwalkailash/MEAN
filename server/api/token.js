module.exports = function (app, port,environment,server,console,models) {
    const util = require("./Utility")(app, port,environment,server,console,models)
    const appConstants = require('../AppConstants/Constants')
    const mongoose = require("mongoose")

    return {
        generateAuthToken : function(req,res,user){
            console.info("@generateAuthToken..");
            try {
                var errors=[];
                console.info("Authorizing user by generating token.. ")
                new models.tokenSchema({"token":user.created_at+","+user.appName+","+user.email+","+user.password})
                    .save()
                    .then(token => {
                        console.info("generated fresh token..",token)
                            res.json({
                                "status":appConstants.success,
                                "user":user,
                                "token":token.token,
                                "refreshToken":token.refreshToken
                            });
                    },
                    err => {
                        errors.push(appConstants.serverError)
                        errors.push(err)
                        res.json({
                            "status":appConstants.failure,
                            "errors" : errors
                        });
                    })
                }catch(e) {
                    console.info("caught exception")
                    console.error(e);
                    res.json({
                        "status": appConstants.failure,
                        "message": e,
                        "errorcode": 500
                    });
                }
        },
        authenticateToken(req,res,next){
            console.info("@authenticateToken token received [ ",req.headers.authorization," ]");
            try {
                var errors=[];
                if(util.isVoid(req.headers.authorization)){
                    errors.push("Required authentication.");
                    console.info("token not present, redirect to login.")
                    return res.redirect("/");
                }
                if(errors.length>0){
                    return res.status(401).json({
                        "status":appConstants.failure,
                        "errors" : errors,
                        "errorcode": 401
                    });
                }
                models.tokenSchema.findOne({"token":req.headers.authorization})
                    .then(token => {
                        if(util.isVoid(token)){
                            errors.push("Invlaid token.");
                            return res.status(401).json({
                                "status":appConstants.failure,
                                "errors" : errors,
                                "errorcode": 401
                            });
                        }
                        console.info("------####-----")
                        console.info("Decrypted token >>> " + util.decrypt(req.headers.authorization)+" <<<");
                        console.info("------####-----")
                        if(util.tokenExpired(util.decrypt(req.headers.authorization))) {
                            errors.push("Token Expired.");
                            return res.status(401).json({
                                "status": appConstants.failure,
                                "errors": errors,
                                "errorcode": 401
                            });
                        }
                        return next();
                },
                err => {
                    errors.push(appConstants.serverError)
                    errors.push(err)
                    res.status(401).json({
                        "status":appConstants.failure,
                        "errors" : errors
                    });
                    return next();
                })

            }catch(e) {
                console.info("caught exception")
                console.error(e);
                return res.status(401).json({
                    "status": appConstants.failure,
                    "message": e,
                    "errorcode": 401
                });
            }
        },
        authenticateRefreshToken(req,res,next){
            console.info("@authenticateToken token received [ ",req.headers.authorization," ]");
            try {
                var errors=[];
                if(util.isVoid(req.headers.authorization)){
                    errors.push("Required authentication.");
                    console.info("token not present, redirect to login.")
                }
                if(errors.length>0){
                    return res.status(401).json({
                        "status":appConstants.failure,
                        "errors" : errors,
                        "errorcode": 401
                    });
                }
                models.tokenSchema.findOne({"refreshToken":req.body.refreshToken})
                    .then(token => {
                        if(util.isVoid(token)){
                            errors.push("Invlaid token.");
                            return res.status(401).json({
                                "status":appConstants.failure,
                                "errors" : errors,
                                "errorcode": 401
                            });
                        }
                        console.info("------####-----")
                        console.info("Decrypted regresh token >>> " + util.decrypt(req.body.refreshToken)+" <<<");
                        console.info("------####-----")
                        if(util.tokenExpired(util.decrypt(req.body.refreshToken))) {
                            errors.push("Token Expired.");
                            return res.status(401).json({
                                "status": appConstants.failure,
                                "errors": errors,
                                "errorcode": 401
                            });
                        }
                        return next();
                },
                err => {
                    errors.push(appConstants.serverError)
                    errors.push(err)
                    return res.status(401).json({
                        "status":appConstants.failure,
                        "errors" : errors
                    });
                })
            }catch(e) {
                console.info("caught exception")
                console.error(e);
                return res.status(401).json({
                    "status": appConstants.failure,
                    "message": e,
                    "errorcode": 401
                });
            }
        },
        regenerateTokenFromToken:function(req,res){
            console.info("@regenerateTokenFromToken..");
            try {
                var errors=[];
                if(util.isVoid(req.headers.authorization)){
                    errors.push("Required authentication.");
                    console.info("token not present, redirect to login.")
                }
                if(errors.length>0){
                    res.status(401).json({
                        "status":appConstants.failure,
                        "errors" : errors,
                        "errorcode": 401
                    });
                }
                let oldToken=util.decrypt(req.headers.authorization)
                console.info("------####-----")
                console.info("Decrypted old token >>> " + oldToken+" <<<");
                console.info("common properties to carry >>> " + oldToken.substring(0,oldToken.indexOf(",timestamp"))+" <<<");
                console.info("------####-----")
                console.info("Authorizing user by generating token.. ")
                new models.tokenSchema({"token":oldToken.substring(0,oldToken.indexOf(",timestamp"))})
                    .save()
                    .then(token => {
                            console.info("regenerated fresh token..",token)
                            res.json({
                                "status":appConstants.success,
                                "token":token.token,
                                "refreshToken":token.refreshToken
                            });
                    },
                    err => {
                        errors.push(appConstants.serverError)
                        errors.push(err)
                        res.status(401).json({
                            "status":appConstants.failure,
                            "errors" : errors
                        });
                    })
            }catch(e) {
                console.info("caught exception")
                console.error(e);
                res.status(401).json({
                    "status": appConstants.failure,
                    "message": e,
                    "errorcode": 500
                });
            }
        },
    }
};


