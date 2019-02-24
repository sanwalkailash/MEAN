module.exports = function(app, port,environment,server,console,models) {

    console.info("App route Initialized")
    const util = require("./api/Utility")(app, port,environment,server,console,models)
    const loginApi = require('./api/login')(app, port,environment,server,console,models);
    const activityApi = require('./api/activityApi')(app, port,environment,server,console,models);

    // login api
    app.post('/login/v1', loginApi.login);
    app.post('/refresh/v1', loginApi.refresh);

    // activity apies
    app.post('/save/idea/v1',util.getClientIp,activityApi.saveIdea)
    app.get('/list/ideas/v1',util.getClientIp,activityApi.listIdeas)
    app.delete('/ideas/delete/v1/:id',util.getClientIp,activityApi.deleteIdea)


    // api route setting ends ---

    // ui routes setting --
    app.get('/', function (req, res) {
        console.info("from /")
        res.render('index');
    })

    app.get('/api/config', function (req, res) {
        try {
            var config = require("./configurations")();
            var appHost = req.headers.host.split(':')[0];
            if (appHost != "localhost") {
                appHost = req.headers.host.split('.')[0];
            } else {
                console.info("No host found, setting default host--uptest")
                appHost = "test_travelline";
            }
            var localeVocab = ""
            console.info("req.headers.locale -- ", req.headers.locale)
            if (req.headers.locale) {
                localeVocab = require("./resources/" + req.headers.locale + ".json")
            } else {
                localeVocab = require("./resources/en.json")
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
    app.get('/getrouteconfigs/:route', function (req, res, next) {
            console.info("/getrouteconfigs/");
            var route = req.params.route;
            console.info("current route is", route);
            var config = require("./configurations")();
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

    app.get('/india/cities', function (req, res, next) {
                console.info("/getrouteconfigs/");
                var route = req.params.route;
                console.info("current route is", route);
                var cities = require("./resources/cities")();
                if(cities["india"]){
                    res.send({ "cities": cities["india"]});
                }else {
                    console.info("route confix is not defined for route ["+route+"]")
                    res.send({ "cities": []});
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
