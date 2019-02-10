export const environment = {
production: true,

CONSUMER_KEY: 'someReallyStupidTextWhichWeHumansCantRead',
codes: [ 'AB', 'AC', 'XYZ' ],


APP_NAME : "Chalk Portal",
APP_LOCALE : "en",
APP_REFRESH_COUNT : 0,

// app cache--
APP_CONFIG: "",
APP_VOCAB: "",
ROUTE_CONFIG: "",

// api paths --
apiHost: 'https://api.somedomain.com/prod/v1/',
API_LOGIN: 'https://api.somedomain.com/prod/v1/',
API_INVALID_PATH : "/indalid",
CONFIG_API : "/api/config",
ROUTE_CONFIG_API : "/getrouteconfigs/",
REFRESH_API : "/api/refresh",

// error codes --
HTTP_ERROR_404 : 404,
API_STATUS_SUCCESS : "success",
API_STATUS_FAILURE : "failure",

// NOTIFICATION CODES
APP_NOTIFICATION_LOADING : 0,
APP_NOTIFICATION_NO_POI_PRESENT : 1,
APP_NOTIFICATION_NO_POI_LOCATION_PRESENT : 2,
APP_NOTIFICATION_NO_INTERNET_ERROR : 3,
APP_NOTIFICATION_NO_SOMETHING_NOT_RIGHT : 4,


//broadcast messages
BROADCAST_LOGIN : "loggedIn",
BROADCAST_CHANGE_LANGUAGE : "changeLanguage",
BROADCAST_ERROR_CODE : "errorPassed",
}
