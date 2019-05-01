export const environment = {
    production: true,

    MAP_KEY: 'AIzaSyAcV5MCnHAvcYREiHZfZR58oMTs_msaJvc',
    codes: ['AB', 'AC', 'XYZ'],


    APP_NAME: "travellineOne",
    APP_LOCALE: "en",
    APP_REFRESH_COUNT: 0,

// app cache--
    APP_CONFIG: "",
    APP_VOCAB: "",
    ROUTE_CONFIG: "",

// app route paths
    ROUTE_LOGIN: 'login',
    ROUTE_SSO_GOOGLE: 'sso/google',
    ROUTE_UNKNOWN: 'unknown',
    ROUTE_HOME: 'home',
    ROUTE_IDEAS: 'ideas',
    ROUTE_ADD_IDEA: 'ideas/add',
    ROUTE_EDIT_IDEA: "ideas/edit/:id",
    ROUTE_SHARE_IDEA: "ideas/share/:id",

// api paths --
    apiHost: 'https://api.somedomain.com/prod/v1/',
    API_LOGIN: '/login/v1',
    API_REGISTER: '/register/v1',
    API_REFRESH : "/refresh/v1",
    API_INVALID_PATH: "/indalid",
    CONFIG_API: "/api/config",
    ROUTE_CONFIG_API: "/getrouteconfigs/",
    API_CITIES_INDIA: "/india/cities",
    REFRESH_API: "/api/refresh",
    API_SAVE_IDEAS: "/save/idea/v1",
    API_LIST_PUBLIC_IDEAS: "/list/ideas/v1",
    API_LIST_USER_IDEAS: "/list/user/ideas/v1",
    API_DELETE_IDEA: "ideas/delete/v1/",

// error codes --
    HTTP_ERROR_404: 404,
    API_STATUS_SUCCESS: 1,
    API_STATUS_FAILURE: 0,

// NOTIFICATION CODES
    APP_NOTIFICATION_LOADING: 0,
    APP_NOTIFICATION_NO_POI_PRESENT: 1,
    APP_NOTIFICATION_NO_POI_LOCATION_PRESENT: 2,
    APP_NOTIFICATION_NO_INTERNET_ERROR: 3,
    APP_NOTIFICATION_NO_SOMETHING_NOT_RIGHT: 4,


//broadcast messages
    BROADCAST_LOGIN: "loggedIn",
    BROADCAST_CHANGE_LANGUAGE: "changeLanguage",
    BROADCAST_ERROR_CODE: "errorPassed",
}
