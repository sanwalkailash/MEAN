module.exports = function (app, port,environment,server,console,models) {
  var port = 6600;
const util = require("./Utility")(app, port,environment,server,console,models)
const tokenApi = require("./token")(app, port,environment,server,console,models)
const appAccountApi = require("./accountApi")(app, port,environment,server,console,models)
  const appConstants = require('../AppConstants/Constants')
   const mongoose = require("mongoose")

  return {
    register:function(req,res)        {
      console.info("login Invoked");
      try {
          let errors = [];
          if(util.isVoid(req.body.email)){
              errors.push("Email missing !");
          }
          // if(util.isVoid(req.body.location)){
          //               errors.push("Location missing !");
          //           }
          // if(util.isVoid(req.body.company)){
          //               errors.push("company missing !");
          //           }
          if(util.isVoid(req.body.name)){
                        errors.push("Name missing !");
                    }
           if(util.isVoid(req.body.appName)){
                                  errors.push("app name missing !");
                              }
          if(util.isVoid(req.body.password)){
                        errors.push("Enter missing !");
                    }
          if(req.body.password.length<6 || req.body.password.length>10){
                        errors.push("Password must be six to ten charactes !");
                    }
          if(errors.length){
                      errors.push("Please add details.");
                  }
          if(errors.length>0){
              res.json({
                  "status":appConstants.failure,
                  "errors" : errors
              });
          }else {
              let company = req.body.company;
              delete req.body.company;
              if(util.isVoid(req.body._id)){
                  models.userSchema.findOne(
                                    {
                                      "email":req.body.email,
                                      "appName":req.body.appName
                                    }
                                    )
                                    .then(user => {
                                        if(util.isVoid(user)){
                                          console.info("saving new user")
                                            new models.userSchema(req.body)
                                                            .save()
                                                            .then(user => {
                                                                if(user){
                                                                    // appAccountApi.createAppAccount(req,res,user,company);
                                                                    tokenApi.generateAuthToken(req,res,user);

                                                                }else {
                                                    res.json({
                                                        "status":appConstants.failure,
                                                        "errors" :appConstants.registrationFailure
                                                    });
                                                }
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
              console.info("updating user")
                  models.userSchema.findOneAndUpdate(
                    {$and:[{_id:req.body._id},{email:req.body.email}]},
                    { $set: req.body },
                    {
                        multi:false,upsert:false
                    }
                  )
                  .then(user => {
                      if(user){
                          // appAccountApi.createAppAccount(req,res,user,company);
                          tokenApi.generateAuthToken(req,res,user);
                      }else {
                          res.json({
                              "status":appConstants.failure,
                              "errors" : appConstants.registrationFailure
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
              }
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
    },
    updateProfile:function(req,res)        {
          console.info("login Invoked");
          try {
              let errors = [];
              if(util.isVoid(req.body.email)){
                  errors.push("Email missing !");
              }
              if(util.isVoid(req.body._id)){
                                errors.push("User does not exist !");
                            }
              if(util.isVoid(req.body.location)){
                            errors.push("Location missing !");
                        }
              if(util.isVoid(req.body.name)){
                            errors.push("Name missing !");
                        }
               if(util.isVoid(req.body.appName)){
                                      errors.push("app name missing !");
                                  }
              if(util.isVoid(req.body.password)){
                            errors.push("Enter missing !");
                        }
              if(req.body.password.length<6 || req.body.password.length>10){
                            errors.push("Password must be six to ten charactes !");
                        }
              if(errors.length){
                          errors.push("Please add details.");
                      }
              if(errors.length>0){
                  res.json({
                      "status":appConstants.failure,
                      "errors" : errors
                  });
              }else {
                  models.userSchema.findOne({
                    "_id":req.body._id,
                    "email":req.body.email,
                    "appName":req.body.appName
                  }).then(user => {
                      if(util.isVoid(user)){
                          errors.push("User doesn't exist !");
                          res.json({
                                "status":appConstants.failure,
                                "errors" : errors
                            });
                        console.info("saving new user")
                        models.userSchema.findOneAndUpdate(
                          {_id:req.body._id},
                          { $set: req.body },
                          {
                              multi:false,upsert:false
                          }
                        )
                        .then(user => {
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
        },
    login:function(req,res)        {
      console.info("login Invoked");
      try {
          let errors = [];
          if(util.isVoid(req.body.email)){
              errors.push("Email missing !");
          }

          if(util.isVoid(req.body.password)){
                        errors.push("Password missing !");
                    }
          if(errors.length>0){
              res.json({
                  "status":appConstants.failure,
                  "errors" : errors
              });
          }else {
               console.info("authonticating user")
               models.userSchema.findOne(
                  {
                    "email":req.body.email,
                    "password":req.body.password,
                    "appName":req.body.appName
                  }
                  )
                  .then(user => {
                      if(util.isVoid(user)){
                        errors.push("Not registered, Please Sign up !");
                        res.json({
                              "status":appConstants.failure,
                              "errors" : errors
                          });
                      }else {
                        tokenApi.generateAuthToken(req,res,user);
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
    },
    sso:function(req,res)        {
      console.info("login Invoked");
      try {
          let errors = [];
          if(util.isVoid(req.query.code)){
              errors.push("token missing !");
          }

          if(errors.length>0){
              res.json({
                  "status":appConstants.failure,
                  "errors" : errors
              });
          }else {
               console.info("SSO user")
               models.userSchema.findOne(
                  {
                    "email":req.body.email,
                    "password":req.body.password,
                    "appName":req.body.appName
                  }
                  )
                  .then(user => {
                      if(util.isVoid(user)){
                        errors.push("Not registered, Please Sign up !");
                        res.json({
                              "status":appConstants.failure,
                              "errors" : errors
                          });
                      }else {
                        tokenApi.generateAuthToken(req,res,user);
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
    },
    logout: function(req,res){
      req.user.token = null;
      req.user.save(function(err,user){
        if (err){
          res.send(500, {'message': err});
        }
        res.json({ message: 'See you!'});
      });
    },
    refresh: function (req, res) {
      console.info("Here in refresh", req.body);
      res.json({"status": appConstants.success, data: req.body});
    }

  }
};



