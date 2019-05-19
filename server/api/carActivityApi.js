const moment = require('moment');

module.exports =  function (app, port,environment,server,console,models) {
    const Geohash = require('latlon-geohash')
    const mongoose = require("mongoose")
    const util = require("./Utility")(app, port,environment,server,console,models)
    const appConstants = require('../AppConstants/Constants')
    const precision = 12;
    return {
        saveCarPosition:function(req,res){
            let errors = []
            if(util.isVoid(req.body.user_id)){
                errors.push("User does not exist.")
            }

            req.body.geohash=Geohash.encode(req.body.latitude,req.body.longitude,[precision]);
            // new models.carPositionSchema({
            //         "user_id":"5caf92bdb7e8a638f268f99e",
            //         "shift_state": moment(),
            //         "speed": null,
            //         "power": 0,
            //         "latitude": lat,
            //         "longitude": lon,
            //         "geohash":Geohash.encode(lat, lon, [precision]),
            //         "native_geohash":Geohash.encode(40.459729, -79.923444, [precision]),
            //         "heading": "340",
            //         "gps_as_of": "1532927048",
            //         "native_location_supported": 1,
            //         "native_latitude": 40.459729,
            //         "native_longitude": -79.923444,
            //         "native_type": "wgs",
            //         "milestone":
            // }).save()
            new models.carPositionSchema(req.body).save()
                .then( carActivityLog => {
                console.info("saved car position",carActivityLog)
                res.json({
                    "status":appConstants.success,
                    "carActivityLog":carActivityLog
                });
            },
                err => {
                console.info("error occured ",err)
                errors.push(appConstants.serverError)
                errors.push(err)
                res.json({
                    "status":appConstants.failure,
                    "errors" : errors
                });
            })
        },
        fetchCarActivityForTheDay:function(req,res){
            console.info("@fetchCarActivityForTheDay.")
            let errors = []
            if(util.isVoid(req.body.user_id)){
                errors.push("User does not exist.")
            }

            // if(errors.length>0){
            //     res.json({
            //         "status":appConstants.failure,
            //         "errors" : errors
            //     });

            models.carPositionSchema.find({"user_id":"5caf92bdb7e8a638f268f99e"}).skip(0).limit(10000)
                .then( carActivityLog => {
                res.json({
                    "status":appConstants.success,
                    "carActivityLog":carActivityLog
                });
            },
                err => {
                console.info("error occured ",err);
                errors.push(appConstants.serverError)
                errors.push(err)
                res.json({
                    "status":appConstants.failure,
                    "errors" : errors
                });
            })
        },
        streamCarActivityToClient:function(req,res){
                    res.writeHead(200, {
                        'Content-Type': 'text/event-stream',
                        'Cache-Control': 'no-cache',
                        'Connection': 'keep-alive',
                    });
                    res.write('\n');
            let id = 1;
            // Send event every 3 seconds or so forever...
            setInterval(() => {
                res.write(
                    `event: myEvent\nid: ${id}\ndata:This is event ${id}.`
                );
            res.write('\n\n');
            id++;
        }, 1000);



            console.info("@fetchCarActivityForTheDay.")
            let errors = []
            if(util.isVoid(req.body.user_id)){
                errors.push("User does not exist.")
            }
            let messageId = 0;

            // if(errors.length>0){
            //     res.json({
            //         "status":appConstants.failure,
            //         "errors" : errors
            //     });

            // models.carPositionSchema.find({"user_id":"5caf92bdb7e8a638f268f99e"})
            //     .then( carActivityLog => {

            //         if(!util.isVoid(carActivityLog)){
            //             for(let index=0;index<carActivityLog.length;index+=1000){
            //                 console.info("chunck [",index,index+1000,"]");
            //                 res.writeHead(200, {
            //                     'Content-Type': 'text/event-stream',
            //                     'Cache-Control': 'no-cache',
            //                     'Connection': 'keep-alive',
            //                 });
            //                 res.write('\n');
            //                 res.write(`id: ${messageId}\n`);
            //                 res.write(`data: ${JSON.stringify(carActivityLog.subarray(index, index+1000))}\n\n`);
            //                 messageId += 1;
            //             }
            //         }else {
            //             errors.push("No Activity present")
            //             res.json({
            //                 "status":appConstants.failure,
            //                 "errors" : errors
            //             });
            //         }
            //
            //         req.on('close', () => {
            //             console.info("data streamed completely")
            //         });
            //     },
            //     err => {
            //         console.info("error occured ",err);
            //         errors.push(appConstants.serverError)
            //         errors.push(err)
            //         res.json({
            //             "status":appConstants.failure,
            //             "errors" : errors
            //         });
            //     })
        }
    }
}
