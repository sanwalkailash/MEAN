module.exports = function (serverInfo,console) {
  var port = 6600;


  var Utility = require("./Utility")(serverInfo)
  

  return {
    login:function(req,res)        {
      console.info("login Invoked");
      var request = require('request');
      var body = req.body;
      console.info("headers",req.headers);
      console.info('body::',body);
      var agentId = body.aID;
      var host = req.headers.host.split('.')[0];
      var appName = req.headers.appname;

      function callback(error, response, body) {
        try {
          console.info(error);
          console.info("Login Response", body)
          if (!error && response.statusCode == 200) {
            var responseProfile;
            if (toString.call(body) === "[object Object]") {
              responseProfile = body;
            }
            else {
              responseProfile = JSON.parse(body);
            }
            console.info(responseProfile);
            if (responseProfile.status == 0) {
              chalkToken = responseProfile.response.token;

              if (Utility.isVoid(responseProfile.response.agentInfo.agentPhoto)) {
                responseProfile.response.agentInfo.agentPhoto = 'images/default.png';
                res.json({
                  "status": "success",
                  "message": "",
                  "profile": responseProfile.response.agentInfo,
                  "auth_token": responseProfile.response.token,
                  "refreshToken": responseProfile.response.refreshToken,
                });
              }
              else
                res.json({
                  "status": "success",
                  "message": "",
                  "profile": responseProfile.response.agentInfo,
                  "auth_token": responseProfile.response.token,
                  "refreshToken": responseProfile.response.refreshToken,
                });
            } else {
              res.json({
                "status": "failure",
                "message": responseProfile.edesc,
                "errorcode": responseProfile.ec
              });
            }
          } else {
            res.json({
              "status": "failure",
              "message": "Error while logging in, Please try again later",
              "errorcode": 500
            });
          }
        }catch(e) {
          console.trace(e);
          res.json({
            "status": "failure",
            "message": "Error while logging in, Please try again later",
            "errorcode": 500
          });
        }
      }

      /*API Call*/
      console.info('other login process-----------');
      var password = body.password;
      var chalkLoginURL = {
        url: 'http://54.225.122.8:'+port+'/bh/login/v1',
        method:'post',
        json: {"username" : agentId,"password" : password,"appname":appName},
        headers: {'Content-Type': 'application/json'}
      };
      console.info("Chalk Login Url",chalkLoginURL);

      request(chalkLoginURL, callback);
    },

    logout: function(req,res)        {
      req.user.auth_token = null;
      req.user.save(function(err,user){
        if (err){
          res.send(500, {'message': err});
        }
        res.json({ message: 'See you!'});
      });
    },
    refresh: function (req, res) {
      console.info("Here in refresh", req.body);
      var request = require('request');
      var refreshData = {
        url: serverInfo.protocol+serverInfo.host+":"+port+'/bh/refreshtoken/v1',
        method: 'post',
        json: {refreshToken: req.body.refreshToken},
        headers: {'Content-Type': 'application/json'}
      };e
      console.info("Refresh Request Data ", refreshData);
      function callback(error, response, body) {
        if(!error && response.statusCode === 200) {
          console.info("Got Refresh Response ::: ", body, response.body);
          res.json({"status": "success", data: body});
        }
        else {
          console.info("Got Refresh Error ::::", error);
          res.send(419, {"status": "failure", "message": "Unauthorized"});
        }
      }
      request(refreshData, callback);

    }

  }
};



