// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    
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
    API_INVALID_PATH : "/invalid",
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
    