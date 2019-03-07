module.exports = function (app, port,environment,server,console,models) {
const util = require("./Utility")(server,console)
  const appConstants = require('../AppConstants/Constants')
const tokenApi = require("./token")(app, port,environment,server,console,models)
   const mongoose = require("mongoose")

  return {
    createAppAccount : function(req,res,user){
        console.info("@createAppAccount..");
        try {
          if(util.isVoid(user._id)){
            models.accountSchema.find(
                              {
                            "email":user.email,
                                "appName":user.appName
                              }
                              )
                              .then(accountDetails => {
                                  if(util.isVoid(accountDetails)){
                                      new models.accountSchema(user)
                                                      .save()
                                                      .then(accountDetails => {
                                                         console.info("saved new accountDetails",accountDetails)
                                                          tokenApi.generateAuthToken(req,res,user);
                                                      },
                                                      err => {
                                                          errors.push(appConstants.serverError)
                                                          errors.push(err)
                                                          res.json({
                                                                    "status":appConstants.failure,
                                                                    "errors" : errors
                                                                });
                                                      })
                                  }else {
                                      errors.push("Already registered !");
                                      res.json({
                                            "status":appConstants.failure,
                                            "errors" : errors
                                        });
                                  }
                              },
                              err => {
                                  console.error(err)
                                  errors.push(appConstants.serverError)
                                  errors.push(err)
                                  res.json({
                                            "status":appConstants.failure,
                                            "errors" : errors
                                        });
                              })

        }else {
        console.info("updating accountDetails")
            models.accountSchema.findOneAndUpdate(
              {$and:[{_id:req.body._id}.{_id:req.body.email}]},
              { $set: user },
              {
                  multi:false,upsert:false
              }
            )
            .then(accountDetails => {
                console.info("saved new accountDetails",accountDetails)
                tokenApi.generateAuthToken(req,res,user);
            },
            err => {
                console.error(err)
                errors.push(appConstants.serverError)
                errors.push(err)
                res.json({
                          "status":appConstants.failure,
                          "errors" : errors
                      });
            })
        }
        }catch(e) {
          console.info("caught exception")
                 console.error(e);
                 res.json({
                   "status": appConstants.failure,
                   "message": e,
                   "errorcode": 500
                 });
               }

    }
  }
};



