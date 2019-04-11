module.exports = Object.freeze({
  "AppProperties":{
    "appName":"travelLine",
    "database":process.env.NODE_ENV=='production'?"mongodb+srv://demo:demo@cluster0-tl9za.mongodb.net/test?retryWrites=true":"mongodb://127.0.0.1:27017/travelline",
    "secret":"QwErt!2#4",
    "tokenLife":60,
    "profileFolder":"uploads/profile/",
    "coverFolder":"uploads/covers/",
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
  "serverError":"Server Error, Please try again !"
});
