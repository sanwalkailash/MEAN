module.exports = {
    "AppProperties":{
        "appName":"travellineOne",
        "database":process.env.NODE_ENV=='production'?"mongodb+srv://demo:demo@cluster0-tl9za.mongodb.net/test?retryWrites=true":"mongodb://127.0.0.1:27017/travelline",
        "secret":"QwErt!2#4",
        "GOOGLE_CLIENT_ID":"107698569510-edomo02jgeqr6k4hcqtl4kdhevnvrj17.apps.googleusercontent.com",
        "GOOGLE_CLIENT_SECRET":"jf3tFbZE1-WXMRRyqaBGFf9w",
        "googleOAuthcallbackURL":"/auth/google/callback",
        "providerGoogle":"google",
        "tokenLife":3600,
        "profileFolder":"uploads/profile/",
        "coverFolder":"uploads/covers/",
        "cookieOptions":{
            "maxAge": 1000 * 60 * 15, // would expire after 15 minutes
            "httpOnly": true, // The cookie only accessible by the web server
            "secure": false,
            "overwrite": true
        }
    },
    "success":1,
    "failure":0,
    "newIdea":{
        "id":"",
        "uid":"",
        "title":"",
        "details":"",
        "lat":"",
        "lng":"",
        "created_at":"",
        "created_at":"",
        "like":0,
        "views":0
    },
    "user":{
        "email": "",
        "password": "",
        "location":{
            "city": "",
            "latitude": 0.0,
            "longitude": 0.0
        },
        "token" : "",
    },
    "serverError":"Server Error, Please try again !",
    "registrationFailure":"Could not complete"
};
