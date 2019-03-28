module.exports = function (app, port,environment,server,console,models) {
const util = require("./Utility")(app, port,environment,server,console,models)
  const appConstants = require('../AppConstants/Constants')
const tokenApi = require("./token")(app, port,environment,server,console,models)
   const mongoose = require("mongoose")

  return {
    createAppAccount : function(req,res,user,company){
        console.info("@createAppAccount..");
        try {
            let accountDetails = {
                appName: user.appName,
                email: user.email,
                role: "admin",
                accountUid: user._id, // this is user _id account owner.
                company: company,
            }
            console.info("account to save ",accountDetails)
          if(util.isVoid(accountDetails._id)){
            models.accountSchema.find(
                              {
                                "email":accountDetails.email,
                                "appName":accountDetails.appName
                              }
                              )
                              .then(accountDetails => {
                                  if(util.isVoid(accountDetails)){
                                      new models.accountSchema(accountDetails)
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
              {$and:[{_id:req.body._id},{email:req.body.email}]},
              { $set: accountDetails },
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



