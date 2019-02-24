/**
 * \
 *
 * Created by kailash on 14/1/19.
 */
module.exports = function () {
    // json format :"appname":{app details}
    var production_port = ":80";
    var dev_port = ":8056";
    var appDetails = {
        "test_travelline": {
            "appKey": "test@travelline",
            "ssoFor": {
                "nodeApiName": {
                    "method": "post",
                    "url": "/mailReport/fetchDataV2" // api path must  include slash in the begining.
                }
            },
            "appname": "travelline Portal",
            "theme": {
                "navbar": {
                    "bgColor": "#f08521",
                    "logo": "/assets/images/cd_logo.png",
                    "defaultUserLogo": "/assets/images/default.png"
                },
                "footer": {
                    "backgroundColor": "white",
                    "backgroundColorLogin": "#f08521",
                    "color": "black",
                    "colorLogin": "white",
                    "fontSize": "11px"
                },
                "loginForm": {
                    "header": {
                        "backgroundColor": "#fff",
                        "color": "black",
                        "fontSize": "11px"
                    },
                    "input": {
                        "borderBottom": "1px solid #bebebe"
                    },
                    "button": "#f08521"
                },
                "errorComponent": {
                    "noPoiPresent": {
                        "image": "../assets/images/no_uplive.png",
                    },
                    "loader": {
                        "background": "rgb(240, 133, 33)"
                    }
                },
                "listPoiComponent": {
                    "listPoiTablePaginationClass": "chalk-pagination-theme",
                    "listPoiTableEnabledStatusClass": "chalk-uplive-status green",
                    "listPoiTableDisabledStatusClass": "chalk-uplive-status red",
                    "monitoringStatusIconClass": "chalk-uplive-status ",
                    "monitoringEnabledImageSrc": "../assets/images/enableMonitorView.png",
                    "monitoringDisabledImageSrc": "../assets/images/disableMonitorView.png",
                },
                "ediPoiLocationsComponent":{
                    "mapPin":"/assets/images/pin.png",
                    "save":"/assets/images/save.png",
                    "save1":"/assets/images/save1.png",
                    "refresh":"/assets/images/refresh.png",
                    "close":"/assets/images/cancelIcon.png",
                    "clear":"/assets/images/clear.png",
                    "back":"/assets/images/back.png",
                    "retry":"/assets/images/retry.png",
                    "delete":"/assets/images/delete.png",
                    "pinRadius":"/assets/images/pinRadius.jpg",
                    "goBack":"/assets/images/left.png",
                    "goForward":"/assets/images/right.png"
                },
                "commonProperties": {
                    "addPoiButtonClass": "btn-chalk btn-theme-chalk btn-shadow-grey",
                    "editPoiLocationsButton": "btn-chalk btn-theme-grey",
                    "deletePoiLocationsButton": "btn-chalk btn-theme-red",
                    "chalkIconLarge":"portal-icons upliventer",
                    "chalkIconSmall":"small-icons upliventer",
                    "appCalenderPickerClass":"chalk-calender-picker",
                    "appRootLayoutClass":"appRootLayout"
                }
            },
            "contact": {
                        "toEmail": "support@pahadi.me",
                        "cc": ""
                      }
        },
    }

    var routeData = {
        'test_travelline': {
            "home": {
                "colors": { "label": "div1", "color": "grey" },
            },
            "login": {
                "colors": { "label": "div1", "color": "grey" },
            }
        },
        'uplive': {
                    "home": {
                        "colors": { "label": "div1", "color": "grey" },
                    },
                    "login": {
                        "colors": { "label": "div1", "color": "grey" },
                    }
                },

    };
    var routePath = {
        'test_travelline': routeData.uptest,
        'uplive': routeData.uplive,
    };
    return {
        appDetails: appDetails,
        routeConfig: routePath
    }
}
