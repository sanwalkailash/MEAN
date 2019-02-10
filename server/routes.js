module.exports = function(app, port,environment,server_detail,console,models) {

    console.info("App Initialized")
    var auth_key ='';
//    const ssoApi = require('./sso.js')(app, port, auth_key, environment,server_detail,console,models);
    const loginApi = require('./api/login')(server_detail,console);
    app.post('/api/login', loginApi.login);
    app.post('/api/refresh', loginApi.refresh);

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
                appHost = "uptest";
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
            console.info("dashboard api called");
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

    function validateApiForAuthToken(req,res,next) {
        if (Utility.isVoid(req.headers.authorization)) {
            console.info("401 Not Authorized");
            res.send(401, {"status":401, 'message': 'Route UnAuthorized: token is missing in header.'});
            return;
        }else {
            return next();
        }
    }

}
