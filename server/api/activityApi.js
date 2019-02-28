module.exports = function (app, port,environment,server,console,models) {
  const util = require("./Utility")(server,console)
  const appConstants = require('../AppConstants/Constants')
   const mongoose = require("mongoose")

  return {
    saveIdea:function(req,res)        {
     console.info("@saveIdeas.. request body",req.body);
            console.info("@saveIdeas.. fetching ip");
        try {
            let errors = [];
            if(util.isVoid(req.body.title)){
                errors.push("Please add title");
            }
            if(util.isVoid(req.body.details)){
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
                    console.info("saving new idea")
                    new models.ideaSchema(req.body)
                                    .save()
                                    .then(idea => {
                                        res.json({
                                                 "status":appConstants.success
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
                }else {
                console.info("updating idea")
                    models.ideaSchema.findOneAndUpdate(
                    {_id:req.body._id},
                    { $set: req.body },
                    {
                        multi:false,upsert:false
                    }
                    )
                    .then(idea => {
                        res.json({
                                 "status":appConstants.success,
                                 "idea":idea
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
    deleteIdea:function(req,res)        {
         console.info("@deleteIdea.. id ",req.params.id);
            try {
                let errors = [];
                if(util.isVoid(req.params.id)){
                    errors.push("Invalid document. Id not found");
                }
                if(errors.length>0){
                    res.json({
                        "status":appConstants.failure,
                        "errors" : errors
                    });
                }else {
                    models.ideaSchema.remove({_id:req.params.id})
                        .then(idea => {
                            res.json({
                                     "status":appConstants.success,
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
    listIdeas:function(req,res)        {
            try {
        console.info("@listIdeas...")
                let errors = [];
                if(!util.isVoid(req.query.id) && req.query.id != "undefined"){
                    console.info("find by id --",req.query.id)
                    models.ideaSchema
                                    .findById(req.query.id)
                                    .sort({updated_at:'desc'})
                                    .then(ideas => {
                                        res.json({
                                                 "status":appConstants.success,
                                                 "ideas":ideas
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
                } else {
                    console.info("list all ideas")
                    models.ideaSchema
                                    .find({})
                                    .sort({updated_at:'desc'})
                                    .then(ideas => {
                                        res.json({
                                                 "status":appConstants.success,
                                                 "ideas":ideas
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
            }catch(e) {
                       console.trace(e);
                       res.json({
                         "status": appConstants.failure,
                         "message": e,
                         "errorcode": 500
                       });
                     }


        },
  }
};



