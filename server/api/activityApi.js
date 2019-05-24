module.exports = function (app, port,environment,server,console,models) {
  const util = require("./Utility")(app, port,environment,server,console,models)
  const appConstants = require('../AppConstants/Constants')
   const mongoose = require("mongoose")

  return {
    saveIdea:function(req,res)        {
     console.info("@saveIdeas.. request body",req.body);
            console.info("@saveIdeas.. fetching ip");
        try {
            let errors = [];
            let user = util.getUsernameFromToken(util.decrypt(req.headers.authorization));
            if(user!=req.body.user){
                errors.push("Invalid Idea Owner");
            }
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
                req.body.cover["location"] = util.saveFile(appConstants.AppProperties.coverFolder,req.body.cover.name,req.body.cover.result);
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
                    console.info("Share idea query --",req.query.id)
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
                    let user = util.getUsernameFromToken(util.decrypt(req.headers.authorization));
                    console.info("list all ideas for ["+user+"]")
                    models.ideaSchema
                                    .find({private:false})
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
      listUserIdeas:function(req,res)        {
          try {
              console.info("@listUserIdeas...")
              let errors = [];
              let user = util.getUsernameFromToken(util.decrypt(req.headers.authorization));
              console.info("list all ideas for ["+user+"]")
              models.ideaSchema
                          .find({"user":user})
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
          }catch(e) {
              console.trace(e);
              res.json({
                  "status": appConstants.failure,
                  "message": e,
                  "errorcode": 500
              });
          }
      },
      listMoives:async function(req,res)        {
          try {
              console.info("@listMoives...")
              let errors = [];
              if(!req.query.page){
                  req.query.page=1
              }
              if(!req.query.per_page){
                  req.query.per_page=10
              }
              console.info(req.query.page,":",req.query.per_page)
              let movies = await models.moviesSchema
                  .find({"Title":{'$regex': req.query.Title, '$options': 'i'}})
                  .skip((req.query.page-1)*req.query.per_page)
                  .limit(req.query.per_page)
                  .sort({"Title":'asc'})
              let count = await models.moviesSchema.count();

              res.json({
                  "page": req.query.page,
                  "per_page": req.query.per_page,
                  "total": count,
                  "total_pages":Math.ceil(count/req.query.per_page),
                  "data":movies
              })
          }catch(e) {
              console.trace(e);
              res.json({
                  "status": appConstants.failure,
                  "message": e,
                  "errorcode": 500
              });
          }
      }
  }
};



