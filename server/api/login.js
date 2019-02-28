module.exports = function (app, port,environment,server,console,models) {
  var port = 6600;
const util = require("./Utility")(server,console)
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
          if(util.isVoid(req.body.location)){
                        errors.push("Location missing !");
                    }
          if(util.isVoid(req.body.name)){
                        errors.push("Name missing !");
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
              if(util.isVoid(req.body._id)){
                  delete req.body._id;
                  console.info("saving new user")
                  new models.userSchema(req.body)
                                  .save()
                                  .then(user => {
                                      res.json({
                                               "status":appConstants.success,
                                               "user":user,
                                               "token":"secret"
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
              }else {
              console.info("updating user")
                  models.userSchema.findOneAndUpdate(
                    {_id:req.body._id},
                    { $set: req.body },
                    {
                        multi:false,upsert:false
                    }
                  )
                  .then(user => {
                      res.json({
                               "status":appConstants.success,
                               "user":user
                           });
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
               console.info("authorizing user")
               models.userSchema.findById(
                  {email:req.body.email}
                  )
                  .then(user => {
                      if(util.isVoid(user)){
                        errors.push("Not registered, Please Sign up !");
                        res.json({
                              "status":appConstants.failure,
                              "errors" : errors
                          });
                      }else {
                        res.json({
                               "status":appConstants.success,
                               "user":user,
                               "token":"secret"
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

    logout: function(req,res)        {
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



