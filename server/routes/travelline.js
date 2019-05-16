//const express = require('express');
//const router = express.Router()
module.exports = function(router, port,environment,server,console,models,passport) {

    console.info("travelline App route Initialized")
    const util = require("./../api/Utility")(router, port,environment,server,console,models)
    const passportApi = require('../api/passport')(router, port,environment,server,console,models,passport);
    const loginApi = require('../api/loginApi')(router, port,environment,server,console,models);
    const tokenApi = require('./../api/token')(router, port,environment,server,console,models);
    const activityApi = require('./../api/activityApi')(router, port,environment,server,console,models);
    const carActivityApi = require('../api/carActivityApi')(router, port,environment,server,console,models);

    // passport O auth
    router.get("/auth/google",passportApi.googleOAuth);
    router.get('/auth/google/callback',
        passportApi.googleCallbackHandler,
        tokenApi.generateTokenForSocialMediaUser);

    // login api
    router.post('/login/v1', loginApi.login);
    router.post('/register/v1', loginApi.register);
    router.post('/user/update/v1', loginApi.updateProfile);
    router.post('/refresh/v1', tokenApi.authenticateRefreshToken,tokenApi.regenerateTokenFromToken);
    router.get('/auth/sso',loginApi.sso)

    // activity apies
    router.post('/save/idea/v1',tokenApi.authenticateToken,util.getClientIp,activityApi.saveIdea)
    router.get('/list/ideas/v1',tokenApi.authenticateToken,activityApi.listIdeas)
    router.get('/list/user/ideas/v1',tokenApi.authenticateToken,activityApi.listUserIdeas)
    router.delete('/ideas/delete/v1/:id',tokenApi.authenticateToken,util.getClientIp,activityApi.deleteIdea)


    //car activity api
    router.get('/car/drive/v1',carActivityApi.saveCarPosition)
    router.get('/car/drive/history/v1',carActivityApi.fetchCarActivityForTheDay)
    router.get('/car/stream/activity/v1',carActivityApi.streamCarActivityToClient)
    // api route setting ends ---

    // ui routes setting --
    router.get('/', function (req, res) {
        console.info("from /")
        res.render('index');
    })

    router.get('/api/config', function (req, res) {
        try {
            var config = require("./../configurations")();
            var appHost = req.headers.host.split(':')[0];
            if (appHost != "localhost") {
                appHost = req.headers.host.split('.')[0];
            } else {
                console.info("No host found, setting default host--test_travelline")
                appHost = "test_travelline";
            }
            var localeVocab = ""
            console.info("req.headers.locale -- ", req.headers.locale)
            if (req.headers.locale) {
                localeVocab = require("./../resources/" + req.headers.locale + ".json")
            } else {
                localeVocab = require("./../resources/en.json")
            }
            console.info("host is :: ", appHost);
            var appData = config.appDetails[appHost];
            console.info('config', appData);
            console.info('vocab', localeVocab)
            res.send({ "vocab": localeVocab, "config": appData });
            // res.sendStatus(200);
        } catch (e) {
            console.info(e);
            res.sendStatus(500);
        }
    });

    // ui route setting ends ---
    router.get('/getrouteconfigs/:route', function (req, res, next) {
            console.info("/getrouteconfigs/");
            var route = req.params.route;
            console.info("current route is", route);
            var config = require("./../configurations")();
            var appHost = req.headers.host.split(':')[0];
            if (appHost != "localhost") {
                appHost = req.headers.host.split('.')[0];
            }
            console.info("host is :: ", appHost);
            var appData = config.routeConfig[appHost];
            console.info('config', appData);
            if(appData){
                res.send({ "routeconfig": appData});
            }else {
                console.info("route confix is not defined for route ["+route+"]")
                res.send({ "routeconfig": {}});
            }
        }
    );

    router.get('/india/cities', function (req, res, next) {
                var cities = require("./../resources/cities.json")
                if(cities.india){
                    res.json({ "cities": cities["india"]});
                }else {
                    console.info("route confix is not defined for route ["+route+"]")
                    res.json({ "cities": []});
                }
            }
        );

    function validateApiForAuthToken(req,res,next) {
        if (Utility.isVoid(req.headers.Authorization)) {
            console.info("401 Not Authorized");
            res.send(401, {"status":401, 'message': 'Route UnAuthorized: token is missing in header.'});
            return;
        }else {
            return next();
        }
    }

}
