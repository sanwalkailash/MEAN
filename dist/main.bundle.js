webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/activity/activity.component.css":
/***/ (function(module, exports) {

module.exports = ".timeseries{\n    border-radius: 50px;\n    /*border: 2px solid green;*/\n    width: -webkit-fit-content;\n    width: -moz-fit-content;\n    width: fit-content;\n    padding: 5px;\n    margin-top: 12px;\n    margin-left: -5px;\n}\n\n.timeseries:before {\n    content: '';\n    position: absolute;\n    width: 25px;\n    height: 25px;\n    /*right: -17px;*/\n    float:left;\n    margin-left: -28px;\n    background-color: white;\n    border: 4px solid #FF9F55;\n    top: 15px;\n    border-radius: 50%;\n    z-index: 1;\n}\n"

/***/ }),

/***/ "./src/app/activity/activity.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\"\n     id=\"recordssDiv\"\n     style=\"height: 80vh;\n        overflow: scroll;\">\n  <div class=\"col-sm-2 jumbotron jumbotron-fluid\" >\n    <ul style=\"display: inline-flex;\">\n      <li>\n        <button class=\"btn btn-outline-primary\" [ngClass]=\"{'active':activityJSON.activeTab==0}\" (click)=\"fetchMilestones()\">milestones</button>\n      </li>\n      <li>\n        <button class=\"btn btn-outline-primary\" [ngClass]=\"{'active':activityJSON.activeTab==1}\">analytics</button>\n      </li>\n    </ul>\n  </div>\n  <div class=\"col-sm-5\"  style=\"border-left: 2px solid green;\">\n    <div  *ngFor=\" let records of activityJSON.milestones \">\n      <h6 class=\"card-subtitle mb-2 text-muted timeseries\" >\n        {{records.created_at | date:'medium'}}\n      </h6>&nbsp;\n      <div class=\"card mb-3\" (click)=\"addView(records)\">\n        <img class=\"card-img-top rounded\" [src]=\"records.milestone.cover.result\" alt=\"Cover\" />\n        <br/>\n        <div class=\"card-body\">\n          <div style=\"float:right;width:fit-content;right:10px;position: absolute;\">\n                  <span class=\"card-link\">\n                    <span>{{records.milestone.views}}</span>\n                    <i class=\"material-icons\">\n                      face\n                    </i>\n                  </span>\n          </div>\n          <h5 class=\"card-title\">{{records.title}}</h5>\n\n          <p class=\"card-text\">\n            {{records.details}}\n          </p>\n          <p class=\"card-text\"><small class=\"text-muted\">Last updated {{records.updated_at}}</small></p>\n          <b (click)=\"addLike(records)\" class=\"card-link\">\n            <span>{{records.milestone.like}}</span>\n            <i class=\"material-icons\">\n              thumb_up_alt\n            </i>\n          </b>\n          <b class=\"card-link\">\n            <i class=\"material-icons\">\n              rate_review\n            </i>\n          </b>\n          <b class=\"card-link\" (click)=\"shareIdea(records)\">\n            <i class=\"material-icons\">\n              share\n            </i>\n          </b>\n          <b class=\"card-link\" (click)=\"_getDirectionsInGoogleMap(records.lat,records.lng)\">\n            <i class=\"material-icons\">\n              directions\n            </i>\n          </b>\n        </div>\n      </div>\n    </div>\n    <div *ngIf=\"activityJSON.milestones.length==0\">\n      No Activity present\n    </div>\n  </div>\n  <div class=\"col-sm-3 card-body\" >\n    <img class=\" rounded\" src=\"/assets/images/pnf.jpg\" alt=\"Cover\" />\n    <hr/>\n  </div>\n  <div class=\"col-sm-2 jumbotron jumbotron-fluid\" >\n    * Travelline Live\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/activity/activity.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
__webpack_require__("./node_modules/rxjs/_esm5/add/observable/throw.js");
__webpack_require__("./node_modules/rxjs/_esm5/add/operator/catch.js");
var environment_1 = __webpack_require__("./src/environments/environment.ts");
var ajax_service_1 = __webpack_require__("./src/app/services/ajax.service.ts");
var util_service_1 = __webpack_require__("./src/app/services/util.service.ts");
var common_1 = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
var app_component_1 = __webpack_require__("./src/app/app.component.ts");
var ActivityComponent = /** @class */ (function () {
    function ActivityComponent(ajax, util, location, app) {
        this.ajax = ajax;
        this.util = util;
        this.app = app;
        this.initActivityJSON();
    }
    ActivityComponent.prototype.initActivityJSON = function () {
        this.activityJSON = {
            "errors": [],
            "user_id": JSON.parse(localStorage.getItem("user"))._id,
            "milestones": [],
            "activeTab": 0,
        };
    };
    ActivityComponent.prototype.ngOnInit = function () {
        this.fetchMilestones();
        // this.sseSource.addEventListener('myEvent', (e) => {
        //   const messageData = e.data;
        //   console.info("message",e)
        //   // ...
        //   // ...
        // });
        // this.sseSource.onmessage = (e) => {
        //   const messageData = e.data;
        //   console.info("message",e)
        //   if (e.lastEventId === '-1') {
        //     // This is the end of the stream
        //     this.sseSource.close();
        //   }
        //   // ...
        //   // ...
        // };
        // When finished with the source close the connection
        //     sseSource.close();
    };
    ActivityComponent.prototype.ngOnDestroy = function () {
        // this.sseSource.close();
    };
    // public getActivtyStream(processName: string): Observable<any> {
    //   let headers: HttpHeaders = new HttpHeaders();
    //   headers = headers.append('X-Authorization', "");
    //   headers = headers.append('accept', 'text/event-stream');
    //
    //   let url = "/api"
    //   return Observable.create(observer => {
    //     let eventSource = new EventSourcePolyfill(url, { headers: headers });
    //     eventSource.onmessage = (event => {
    //       observer.next(event);
    //       this.zone.run(() => {
    //         console.log('prpprpr');
    //       });
    //     });
    //     eventSource.onopen = (event) => {
    //       observer.next(event);
    //     };
    //     eventSource.onerror = (error) => {
    //       if (eventSource.readyState === 0) {
    //         console.log('The stream has been closed by the server.');
    //         eventSource.close();
    //         observer.complete();
    //       } else {
    //         observer.error('EventSource error: ' + error);
    //       }
    //     };
    //   });
    // }
    ActivityComponent.prototype.fetchMilestones = function (page, _id) {
        var _this = this;
        if (page === void 0) { page = 1; }
        console.info("@fetchIdeas...");
        this.activityJSON.errors = [];
        this.activityJSON.activeTab = 0;
        // this.activityJSON.milestones=[]
        this.ajax.apiCall_GET({ page: page, id: this.activityJSON.user_id }, environment_1.environment.API_USER_DRIVE_MILESTONES)
            .subscribe(function (data) {
            console.info("response", data);
            if (data.status) {
                _this.activityJSON.milestones = data.milestones;
            }
            else {
                _this.activityJSON.errors = data.errors;
            }
        }, function (error) {
            console.info("error.status:: ", error);
            _this.activityJSON.errors = error;
        });
    };
    ActivityComponent = __decorate([
        core_1.Component({
            selector: 'app-activity',
            template: __webpack_require__("./src/app/activity/activity.component.html"),
            styles: [__webpack_require__("./src/app/activity/activity.component.css")]
        }),
        __metadata("design:paramtypes", [ajax_service_1.AjaxService, util_service_1.UtilService, common_1.Location, app_component_1.AppComponent])
    ], ActivityComponent);
    return ActivityComponent;
}());
exports.ActivityComponent = ActivityComponent;


/***/ }),

/***/ "./src/app/app-routing.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var environment_1 = __webpack_require__("./src/environments/environment.ts");
var auth_guard_1 = __webpack_require__("./src/app/auth/auth.guard.ts");
var signin_component_1 = __webpack_require__("./src/app/signin/signin.component.ts");
var page_not_found_component_1 = __webpack_require__("./src/app/page-not-found/page-not-found.component.ts");
var home_component_1 = __webpack_require__("./src/app/home/home.component.ts");
var ideas_component_1 = __webpack_require__("./src/app/ideas/ideas.component.ts");
var activity_component_1 = __webpack_require__("./src/app/activity/activity.component.ts");
var live_component_1 = __webpack_require__("./src/app/live/live.component.ts");
var routes = [
    { path: environment_1.environment.ROUTE_LOGIN, component: signin_component_1.SigninComponent },
    { path: environment_1.environment.ROUTE_HOME, component: home_component_1.HomeComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: environment_1.environment.ROUTE_IDEAS, component: ideas_component_1.IdeasComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: environment_1.environment.ROUTE_ADD_IDEA, component: ideas_component_1.IdeasComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: environment_1.environment.ROUTE_EDIT_IDEA, component: ideas_component_1.IdeasComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: environment_1.environment.ROUTE_SHARE_IDEA, component: ideas_component_1.IdeasComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: environment_1.environment.ROUTE_ACTIVITY, component: activity_component_1.ActivityComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: environment_1.environment.ROUTE_LIVE, component: live_component_1.LiveComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'oops', component: page_not_found_component_1.PageNotFoundComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/oops', pathMatch: 'full' },
];
var AppRoutingModule = /** @class */ (function () {
    /*
    * path: is represent to route
    * component:is represented that which component will execute on given path
    * canActive:is represented to authorized user
    */
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes, { useHash: true, initialNavigation: true })],
            exports: [router_1.RouterModule]
        })
        /*
        * path: is represent to route
        * component:is represented that which component will execute on given path
        * canActive:is represented to authorized user
        */
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;


/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<app-header ></app-header>\n<app-message></app-message>\n<router-outlet></router-outlet>\n<h1>\n    {{Notification}}\n</h1>\n<app-footer></app-footer>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var broadcast_service_1 = __webpack_require__("./src/app/services/broadcast.service.ts");
var AppComponent = /** @class */ (function () {
    function AppComponent(broadcast) {
        var _this = this;
        this.broadcast = broadcast;
        this.title = 'ImHere';
        this.userLocation = {
            "lat": 0.0,
            "lng": 0.0
        };
        this.showError = function (error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    _this.Notification = "Please provide your location.";
                    break;
                case error.POSITION_UNAVAILABLE:
                    _this.Notification = "Location information is unavailable.";
                    break;
                case error.TIMEOUT:
                    _this.Notification = "The request to get user location timed out.";
                    break;
                case error.UNKNOWN_ERROR:
                    _this.Notification = "An unknown error occurred.";
                    break;
            }
        };
        this.setUserLocation = function (position) {
            console.info("gps-", position);
            _this.userLocation.lat = position.coords.latitude ? position.coords.latitude : 0;
            _this.userLocation.lng = position.coords.longitude ? position.coords.longitude : 0;
            // localStorage.setItem("gps",position);
            localStorage.setItem("userLoc", JSON.stringify(_this.userLocation));
            _this.broadcast.sendMessage("gps", position);
        };
    }
    AppComponent.prototype.ngOnInit = function () {
        localStorage.setItem("userLoc", JSON.stringify(this.userLocation));
        this.watchLocation();
        // let loctimer = setInterval(() => {
        //     this.watchLocation();
        //     console.info("updated user location--",this.userLocation)
        //     navigator.geolocation.clearWatch()
        // }, 1000*60*2);
        // clearInterval(loctimer);
    };
    AppComponent.prototype.watchLocation = function () {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(this.setUserLocation, this.showError);
        }
        else {
            this.Notification = "Geolocation is not supported by this browser.";
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [broadcast_service_1.BroadcastService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;


/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var app_component_1 = __webpack_require__("./src/app/app.component.ts");
var logger_service_1 = __webpack_require__("./src/app/services/logger.service.ts");
var util_service_1 = __webpack_require__("./src/app/services/util.service.ts");
var config_loader_service_1 = __webpack_require__("./src/app/services/config-loader.service.ts");
var route_configration_service_1 = __webpack_require__("./src/app/services/route-configration.service.ts");
var http_1 = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var forms_1 = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var auth_service_1 = __webpack_require__("./src/app/auth/auth.service.ts");
var auth_guard_1 = __webpack_require__("./src/app/auth/auth.guard.ts");
var token_interceptor_service_1 = __webpack_require__("./src/app/auth/token-interceptor.service.ts");
var ajax_service_1 = __webpack_require__("./src/app/services/ajax.service.ts");
var broadcast_service_1 = __webpack_require__("./src/app/services/broadcast.service.ts");
var app_routing_module_1 = __webpack_require__("./src/app/app-routing.module.ts");
var footer_component_1 = __webpack_require__("./src/app/footer/footer.component.ts");
var header_component_1 = __webpack_require__("./src/app/header/header.component.ts");
var message_component_1 = __webpack_require__("./src/app/message/message.component.ts");
var signin_component_1 = __webpack_require__("./src/app/signin/signin.component.ts");
var page_not_found_component_1 = __webpack_require__("./src/app/page-not-found/page-not-found.component.ts");
var home_component_1 = __webpack_require__("./src/app/home/home.component.ts");
var ideas_component_1 = __webpack_require__("./src/app/ideas/ideas.component.ts");
var activity_component_1 = __webpack_require__("./src/app/activity/activity.component.ts");
var live_component_1 = __webpack_require__("./src/app/live/live.component.ts");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                footer_component_1.FooterComponent,
                header_component_1.HeaderComponent,
                message_component_1.MessageComponent,
                signin_component_1.SigninComponent,
                page_not_found_component_1.PageNotFoundComponent,
                home_component_1.HomeComponent,
                ideas_component_1.IdeasComponent,
                activity_component_1.ActivityComponent,
                live_component_1.LiveComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpClientModule,
                app_routing_module_1.AppRoutingModule,
            ],
            providers: [
                logger_service_1.LoggerService,
                util_service_1.UtilService,
                config_loader_service_1.AppConfigLoaderService,
                config_loader_service_1.AppConfigLoaderService,
                route_configration_service_1.RouteConfigLoaderService,
                ajax_service_1.AjaxService,
                broadcast_service_1.BroadcastService,
                auth_service_1.AuthService,
                auth_guard_1.AuthGuard,
                token_interceptor_service_1.TokeninterceptorService,
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: token_interceptor_service_1.TokeninterceptorService,
                    multi: true,
                },
                {
                    provide: core_1.APP_INITIALIZER,
                    useFactory: init_app,
                    deps: [config_loader_service_1.AppConfigLoaderService],
                    multi: true
                },
                {
                    provide: core_1.APP_INITIALIZER,
                    useFactory: get_route_settings,
                    deps: [route_configration_service_1.RouteConfigLoaderService],
                    multi: true
                }
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
function init_app(appLoadService) {
    return function () { return appLoadService.getAppConfig(); };
}
exports.init_app = init_app;
function get_route_settings(appLoadService) {
    return function () { return appLoadService.setRouteConfig('login'); };
}
exports.get_route_settings = get_route_settings;


/***/ }),

/***/ "./src/app/auth/auth.guard.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var util_service_1 = __webpack_require__("./src/app/services/util.service.ts");
var auth_service_1 = __webpack_require__("./src/app/auth/auth.service.ts");
var AuthGuard = /** @class */ (function () {
    function AuthGuard(util, authService) {
        this.util = util;
        this.authService = authService;
    }
    AuthGuard.prototype.canActivate = function (next, state) {
        var url = state.url;
        console.warn('AuthGuard#canActivate called for --', url, "active : ", this.checkLogin(url));
        return this.checkLogin(url);
    };
    AuthGuard.prototype.checkLogin = function (url) {
        if (this.authService.isLoggedIn()) {
            return true;
        }
        // Store the attempted URL for redirecting
        this.authService.redirectUrl = url;
        // Navigate to the login page with extras
        this.util.getRouter().navigate(['/login']);
        return false;
    };
    AuthGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [util_service_1.UtilService, auth_service_1.AuthService])
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;


/***/ }),

/***/ "./src/app/auth/auth.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var environment_1 = __webpack_require__("./src/environments/environment.ts");
var util_service_1 = __webpack_require__("./src/app/services/util.service.ts");
var broadcast_service_1 = __webpack_require__("./src/app/services/broadcast.service.ts");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var AuthService = /** @class */ (function () {
    function AuthService(util, broadcast, router) {
        var _this = this;
        this.util = util;
        this.broadcast = broadcast;
        this.router = router;
        this.isLoggedIn = function () {
            console.info("@isLoggedIn token--", localStorage.getItem("token"));
            if (localStorage.getItem("token") !== null) {
                _this.broadcast.sendMessage("isLoggedIn", true);
                return true;
            }
            _this.broadcast.sendMessage("isLoggedIn", false);
            return false;
        };
    }
    AuthService.prototype.logOut = function () {
        localStorage.clear();
        localStorage.setItem("socialLogin", "false");
        this.broadcast.sendMessage("isLoggedIn", false);
        this.router.navigate([environment_1.environment.ROUTE_LOGIN]);
    };
    AuthService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [util_service_1.UtilService, broadcast_service_1.BroadcastService, router_1.Router])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;


/***/ }),

/***/ "./src/app/auth/token-interceptor.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var http_1 = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var Observable_1 = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
__webpack_require__("./node_modules/rxjs/_esm5/add/observable/throw.js");
__webpack_require__("./node_modules/rxjs/_esm5/add/operator/catch.js");
var environment_1 = __webpack_require__("./src/environments/environment.ts");
var util_service_1 = __webpack_require__("./src/app/services/util.service.ts");
var ajax_service_1 = __webpack_require__("./src/app/services/ajax.service.ts");
var auth_service_1 = __webpack_require__("./src/app/auth/auth.service.ts");
__webpack_require__("./node_modules/rxjs/_esm5/Rx.js");
var TokeninterceptorService = /** @class */ (function () {
    function TokeninterceptorService(inj, util) {
        this.inj = inj;
        this.util = util;
        this.appRefreshUnderWay = false;
        this.cachedRequests = [];
        this.ajaxService = inj.get(ajax_service_1.AjaxService);
        this.authService = inj.get(auth_service_1.AuthService);
    }
    TokeninterceptorService.prototype.intercept = function (req, next) {
        var _this = this;
        // as we want to intercept the possible errors, instead of directly returning the request execution, we return an Observable to control EVERYTHING
        return new Observable_1.Observable(function (subscriber) {
            // first try for the request
            next.handle(_this.addParamsInRequest(req))
                .subscribe(function (event) {
                if (event instanceof http_1.HttpResponse) {
                    // the request went well and we have valid response
                    // give response to user and complete the subscription
                    subscriber.next(event);
                    subscriber.complete();
                }
            }, function (error) {
                if (!_this.util.isVoid(error.status)) {
                    switch (error.status) {
                        case 401:
                        case 419:
                            if (environment_1.environment.APP_REFRESH_COUNT < 2) {
                                _this.appRefreshUnderWay = false;
                            }
                            console.info('@interceptor 401 error, trying to re-refresh');
                            _this.handle401Error(req, next, subscriber);
                            break;
                        case 500:
                        case 504:
                        case 400:
                            console.info('@interceptor 500/504 error, ignoring it. moving forward.');
                            subscriber.next();
                            subscriber.complete();
                            break;
                        default:
                            console.error("@interceptor unknown http error code ", error);
                            subscriber.error(error);
                    }
                }
                else {
                    console.error("@interceptor unknown error instance");
                    console.error("error ", error);
                    subscriber.error(error);
                    // this.util.infoOut();
                }
            });
        });
    };
    TokeninterceptorService.prototype.addParamsInRequest = function (req) {
        if (!req.headers.has('Content-Type')) {
            req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        }
        req = req.clone({ headers: req.headers.set('locale', environment_1.environment.APP_LOCALE) });
        req = req.clone({ headers: req.headers.set('appname', environment_1.environment.APP_NAME) });
        // console.info(req);
        var token = localStorage.getItem('token');
        if (token) {
            req = req.clone({ headers: req.headers.set('Authorization', token) });
        }
        else {
            console.info("could not set token to header,not present.");
        }
        return req;
    };
    TokeninterceptorService.prototype.retryFailedRequests = function (subscriber, next) {
        var _this = this;
        console.info("@retryFailedRequests...");
        // retry the requests. this method can
        // be called after the token is refreshed
        if (this.cachedRequests.length && this.cachedRequests[this.cachedRequests.length - 1] != undefined) {
            next.handle(this.addParamsInRequest(this.cachedRequests[this.cachedRequests.length - 1]))
                .subscribe(function (newEvent) {
                if (newEvent instanceof http_1.HttpResponse) {
                    // the second try went well and we have valid response
                    // give response to user and complete the subscription
                    subscriber.next(newEvent);
                    subscriber.complete();
                    console.info("refreshed api data successfully -", _this.cachedRequests[_this.cachedRequests.length - 1], "moving to next..");
                    _this.cachedRequests.pop();
                    _this.retryFailedRequests(subscriber, next);
                }
            }, function (error) {
                // second try went wrong -> throw error to subscriber
                subscriber.error(error);
                console.info("current api failed after refresh..");
                // this.util.infoOut();
            }, function () {
                console.info("finally for above ..");
            });
        }
        else {
            console.info("cleared cashe and reset refresh in progress to false");
            this.appRefreshUnderWay = false;
            this.cachedRequests = [];
            return;
        }
    };
    TokeninterceptorService.prototype.handle401Error = function (req, next, subscriber) {
        var _this = this;
        console.info("@handle401Error this.appRefreshUnderWayis ", this.appRefreshUnderWay);
        if (environment_1.environment.APP_REFRESH_COUNT == 2) {
            console.info("refresh tries crossed threshhold. loggin out.");
            subscriber.error("reach max refresh calls. quiting..");
            environment_1.environment.APP_REFRESH_COUNT = 0;
            this.authService.logOut();
            return null;
        }
        this.cachedRequests.push(req);
        console.info("saving unauthrized call to cache, now total cashed request are ", this.cachedRequests.length);
        if (!this.appRefreshUnderWay && !this.util.isVoid(localStorage.getItem("refreshToken"))) {
            environment_1.environment.APP_REFRESH_COUNT++;
            console.info("refresh called ", environment_1.environment.APP_REFRESH_COUNT, "times.");
            this.appRefreshUnderWay = true;
            // this.refreshApp.refreshToken(localStorage.getItem("refresh_token"))
            var body = { refreshToken: localStorage.getItem("refreshToken") };
            this.ajaxService.apiCall_POST(body, environment_1.environment.API_REFRESH)
                .subscribe(function (data) {
                console.info(environment_1.environment.APP_REFRESH_COUNT, "th refresh called,response", data);
                _this.util.setKeyVauleOnlocalStorage("token", data.token);
                _this.util.setKeyVauleOnlocalStorage("refreshToken", data.refreshToken);
                _this.retryFailedRequests(subscriber, next);
                _this.appRefreshUnderWay = false;
            }, function (err) { return function () {
                console.info("error in refresh:", err);
                if (environment_1.environment.APP_REFRESH_COUNT < 2) {
                    _this.appRefreshUnderWay = false;
                }
            }; });
        }
        else {
            console.info("refresh call under progress, saving current api call in cache.");
        }
    };
    TokeninterceptorService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_1.Injector, util_service_1.UtilService])
    ], TokeninterceptorService);
    return TokeninterceptorService;
}());
exports.TokeninterceptorService = TokeninterceptorService;


/***/ }),

/***/ "./src/app/footer/footer.component.css":
/***/ (function(module, exports) {

module.exports = "\n.footer {\n    width: 100%;\n    padding:18px 0;\n    background: #f6f6f6;\n\tposition:inherit;\n\tbottom:0px;\n\tz-index:9;\n\tmargin-top:37px;\n}\n.footer p {\n    text-align: center;\n    font-size: 10px;\n    color: #999;\n    font-weight: 600;\n\n}\n"

/***/ }),

/***/ "./src/app/footer/footer.component.html":
/***/ (function(module, exports) {

module.exports = "<footer class=\"footer\">\n    <p>&copy; 2019 travelline All rights reserved | Powered By Pahadi.Me.</p>\n    <div>\n        <button>\n            <i class=\"material-icons \">add_box</i>\n        </button>\n        <button>\n            <i class=\"material-icons \">add_comment</i>\n        </button>\n    </div>\n</footer>\n"

/***/ }),

/***/ "./src/app/footer/footer.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent = __decorate([
        core_1.Component({
            selector: 'app-footer',
            template: __webpack_require__("./src/app/footer/footer.component.html"),
            styles: [__webpack_require__("./src/app/footer/footer.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], FooterComponent);
    return FooterComponent;
}());
exports.FooterComponent = FooterComponent;


/***/ }),

/***/ "./src/app/header/header.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/header/header.component.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-expand-sm navbar-light bg-light mb-3\">\n    <a class=\"navbar-brand\" href=\"/\"><img class=\"icon\" src=\"assets/images/company-logo/logo.png\" alt=\"travelline\"/></a>\n    <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarTogglerDemo02\"\n            aria-controls=\"navbarTogglerDemo02\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n        <span class=\"navbar-toggler-icon\"></span>\n    </button>\n    <div class=\"collapse navbar-collapse\" id=\"navbarTogglerDemo02\"  *ngIf=\"headerJSON.isLoggedIn\">\n        <ul class=\"navbar-nav mr-auto mt-2 mt-lg-0\">\n            <li class=\"nav-item active\">\n                <a class=\"nav-link\" href=\"#/home\">Market <span class=\"sr-only\">(current)</span></a>\n            </li>\n            <li class=\"nav-item\">\n                <a class=\"nav-link\" href=\"#/ideas\">Mine</a>\n            </li>\n            <li class=\"nav-item\">\n                <a class=\"nav-link\" href=\"#/live\">Live</a>\n            </li>\n            <li class=\"nav-item\">\n                <a class=\"nav-link\" href=\"#/activity\">Activity</a>\n            </li>\n        </ul>\n        <form class=\"form-inline my-2 my-lg-0\">\n            <input class=\"form-control mr-sm-2\" type=\"search\" placeholder=\"Search\">\n            <button class=\"btn btn-outline-success my-2 my-sm-0\" type=\"submit\">Search</button>\n        </form>\n    </div>\n    &nbsp;\n    <div class=\"btn-group\" *ngIf=\"headerJSON.isLoggedIn\">\n        <button type=\"button\" class=\"btn btn-secondary dropdown-toggle\" style=\"max-width:150px;overflow:hidden;text-overflow: ellipsis;\" data-toggle=\"dropdown\" aria-haspopup=\"true\"\n                aria-expanded=\"false\">\n            <img class=\"icon rounded\" style=\"width:20px;height:20px; border:1px solid white; margin-bottom:1px;  \" src=\"assets/images/company-logo/logo.png\" alt=\"travelline\"/>\n            {{headerJSON.user.name}}\n        </button>\n        <div class=\"dropdown-menu dropdown-menu-right\">\n            <button class=\"dropdown-item\" type=\"button\" (click)=\"logout()\">Logout</button>\n        </div>\n    </div>\n</nav>\n"

/***/ }),

/***/ "./src/app/header/header.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var util_service_1 = __webpack_require__("./src/app/services/util.service.ts");
var broadcast_service_1 = __webpack_require__("./src/app/services/broadcast.service.ts");
var auth_service_1 = __webpack_require__("./src/app/auth/auth.service.ts");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(util, broadcast, authService) {
        this.util = util;
        this.broadcast = broadcast;
        this.authService = authService;
        this.headerJSON = this.headerJSON = {
            "isLoggedIn": false,
            "user": localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
        };
    }
    HeaderComponent.prototype.initJSON = function () {
        var _this = this;
        this.status = this.broadcast.getMessage("isLoggedIn").subscribe(function (status) {
            console.info("login status", status);
            _this.headerJSON.isLoggedIn = status;
            _this.headerJSON.user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {};
            console.info("header", _this.headerJSON);
        });
    };
    HeaderComponent.prototype.ngOnInit = function () {
        this.initJSON();
    };
    HeaderComponent.prototype.logout = function () {
        this.authService.logOut();
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-header',
            template: __webpack_require__("./src/app/header/header.component.html"),
            styles: [__webpack_require__("./src/app/header/header.component.css")]
        }),
        __metadata("design:paramtypes", [util_service_1.UtilService, broadcast_service_1.BroadcastService, auth_service_1.AuthService])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;


/***/ }),

/***/ "./src/app/home/home.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\" *ngIf=\"homeJSON.errors.length>0\">\n  <p *ngFor=\" let error of homeJSON.errors\">{{error}} <br/></p>\n  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n</div>\n\n<div class=\"row\"\n     id=\"ideasDiv\"\n     style=\"height: 80vh;\n        overflow: scroll;\">\n  <div class=\"col-sm-2 jumbotron jumbotron-fluid\" >\n    <ul>\n      <a class=\"btn btn-outline-primary\" href=\"#\">Everything</a>\n      <a class=\"btn btn-outline-primary\" href=\"#\">Delhi</a>\n      <a class=\"btn btn-outline-primary\" href=\"#\">Gurgaon</a>\n      <a class=\"btn btn-outline-primary\" href=\"#\">Noida</a>\n      <a class=\"btn btn-outline-primary\" href=\"#\">Hotel</a>\n    </ul>\n  </div>\n  <div class=\"col-sm-5\">\n    <h3 class=\"mb-2\">\n      Trending Ideas\n      <b [routerLink]=\"['/ideas/add']\" class=\" btn btn-primary\">\n        <i class=\"material-icons \">add_box</i>\n      </b>\n    </h3>\n    <div  *ngFor=\" let idea of homeJSON.ideas \">\n      <div class=\"card mb-3\" (click)=\"addView(idea)\">\n        <img class=\"card-img-top rounded\" [src]=\"idea.cover.result\" alt=\"Cover\" />\n        <br/>\n        <div class=\"card-body\">\n          <div style=\"float:right;width:fit-content;right:10px;position: absolute;\">\n                  <span class=\"card-link\">\n                    <span>{{idea.views}}</span>\n                    <i class=\"material-icons\">\n                      face\n                    </i>\n                  </span>\n          </div>\n          <h5 class=\"card-title\">{{idea.title}}</h5>\n          <h6 class=\"card-subtitle mb-2 text-muted\">\n            {{idea.created_at}}\n          </h6>\n          <p class=\"card-text\">\n            {{idea.details}}\n          </p>\n          <p class=\"card-text\"><small class=\"text-muted\">Last updated {{idea.updated_at}}</small></p>\n          <b (click)=\"addLike(idea)\" class=\"card-link\">\n            <span>{{idea.like}}</span>\n            <i class=\"material-icons\">\n              thumb_up_alt\n            </i>\n          </b>\n          <b class=\"card-link\">\n            <i class=\"material-icons\">\n              rate_review\n            </i>\n          </b>\n          <b class=\"card-link\" (click)=\"shareIdea(idea)\">\n            <i class=\"material-icons\">\n              share\n            </i>\n          </b>\n          <b class=\"card-link\" (click)=\"_getDirectionsInGoogleMap(idea.lat,idea.lng)\">\n            <i class=\"material-icons\">\n              directions\n            </i>\n          </b>\n        </div>\n      </div>\n    </div>\n    <div *ngIf=\"homeJSON.ideas.length==0\">\n      No Ideas So Far\n    </div>\n  </div>\n  <div class=\"col-sm-3 card-body\" >\n    <img class=\" rounded\" src=\"/assets/images/pnf.jpg\" alt=\"Cover\" />\n    <hr/>\n    <div class=\"jumbotron jumbotron-fluid card-body\">\n      <hr style=\"width: 100%; height: 1px;\"/>\n      <div class=\"container\">\n        <div class=\"row\" *ngFor=\" let idea of homeJSON.ideas \">\n          <img class=\"col-sm-5 card-img-left rounded\" [src]=\"idea.cover.result\" alt=\"Cover\" style=\"max-height: 50px;max-width:100px;\" />\n          <div class=\"col-sm-7\" >\n            {{idea.user}}\n            <a class=\"btn btn-sm btn-outline-primary\" href=\"#\">Follow</a>\n          </div>\n          <hr style=\"width: 100%; height: 1px;\"/>\n        </div>\n      </div>\n    </div>\n  </div>\n  <div class=\"col-sm-2 card\" >\n    * Travelline Live\n    <img class=\" rounded\" src=\"/assets/images/pnf.jpg\" alt=\"Cover\" />\n  </div>\n</div>\n\n"

/***/ }),

/***/ "./src/app/home/home.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var environment_1 = __webpack_require__("./src/environments/environment.ts");
var ajax_service_1 = __webpack_require__("./src/app/services/ajax.service.ts");
var util_service_1 = __webpack_require__("./src/app/services/util.service.ts");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(ajax, util) {
        this.ajax = ajax;
        this.util = util;
        this.userLoc = JSON.parse(localStorage.getItem("userLoc"));
        this.homeJSON = {
            "idea": {
                "_id": "",
                "title": "",
                "details": "",
                "lat": "",
                "lng": "",
                "created_at": "",
                "like": 0,
                "views": 0,
                "cover": {
                    "name": "",
                    "size": "",
                    "type": "",
                    "lastModifiedDate": "",
                    "result": "/assets/images/cover.png"
                },
                "user": JSON.parse(localStorage.getItem("user")).email,
                "private": false
            },
            "ideas": [],
            "errors": [],
            "viewCode": 0
        };
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.fetchPublicIdeas();
    };
    HomeComponent.prototype.fetchPublicIdeas = function (page, _id) {
        var _this = this;
        if (page === void 0) { page = 1; }
        console.info("@fetchPublicIdeas...");
        this.homeJSON.errors = [];
        this.ajax.apiCall_GET({ page: page }, environment_1.environment.API_LIST_PUBLIC_IDEAS)
            .subscribe(function (data) {
            console.info("response", data);
            if (data.status) {
                _this.homeJSON.ideas = data.ideas;
            }
            else {
                _this.homeJSON.errors = data.errors;
            }
        }, function (error) {
            console.info("error.status:: ", error);
            _this.homeJSON.errors = error;
        });
    };
    HomeComponent.prototype.shareIdea = function (idea) {
        this.util.getRouter().navigate(["ideas/share/" + idea._id]);
    };
    HomeComponent.prototype._getDirectionsInGoogleMap = function (lat, lng) {
        window.open('https://www.google.com/maps/dir/?api=1&destination=' + lat + ',' + lng);
    };
    HomeComponent.prototype.saveIdea = function () {
        var _this = this;
        this.homeJSON.errors = [];
        localStorage.removeItem("editIdea");
        if (!this.util.isVoid(this.userLoc)) {
            console.info("saving device location", this.userLoc);
            this.homeJSON.idea.lat = this.userLoc.lat;
            this.homeJSON.idea.lng = this.userLoc.lng;
        }
        this.ajax.apiCall_POST(this.homeJSON.idea, environment_1.environment.API_SAVE_IDEAS)
            .subscribe(function (data) {
            console.info("response", data);
            if (data.status) {
                console.info("done");
            }
            else {
                _this.homeJSON.errors = data.errors;
            }
        }, function (error) {
            console.info("error.status:: ", error);
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            template: __webpack_require__("./src/app/home/home.component.html"),
            styles: [__webpack_require__("./src/app/home/home.component.css")]
        }),
        __metadata("design:paramtypes", [ajax_service_1.AjaxService, util_service_1.UtilService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;


/***/ }),

/***/ "./src/app/ideas/ideas.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/ideas/ideas.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\" *ngIf=\"ideaJSON.errors.length>0\">\n    <p *ngFor=\" let error of ideaJSON.errors\">{{error}} <br/></p>\n    <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n        <span aria-hidden=\"true\">&times;</span>\n    </button>\n</div>\n\n<!--edit idea-->\n<div class=\"card col-sm-6 offset-sm-3\" *ngIf=\"ideaJSON.viewCode==1\">\n    <h3>Whats your Idea ?</h3>\n    <form class=\"form-group card-body\">\n        <div >\n            <div class=\"upload custom-file\">\n                <input class=\"btn btn-outline-secondary\" placeholder=\"Add Cover\" type=\"file\" accept=\"image/*\"  (change)=fileEvent($event) >\n            </div>\n            <img class=\"card-img-top img-fluid rounded\" [src]=\"ideaJSON.idea.cover.result\" alt=\"Cover\" />\n            <label for=\"title\">Title</label>\n            <input type=\"text\" class=\"form-control\" name=\"title\" [(ngModel)]=\"ideaJSON.idea.title\" required>\n        </div>\n        <div >\n            <label for=\"details\">Details</label>\n            <textarea class=\"form-control\" name=\"details\" [(ngModel)]=\"ideaJSON.idea.details\" required></textarea>\n        </div>\n        <button type=\"submit\" (click)=\"saveIdea()\" class=\"btn btn-primary\">Submit</button>\n    </form>\n</div>\n\n<!--list ideas -->\n\n<div class=\"row \"\n     id=\"ideasDiv\"\n     style=\"height: 80vh;\n        overflow: scroll;\"\n     *ngIf=\"ideaJSON.viewCode==0\">\n    <div class=\"col-sm-2\" >\n        <p>demo</p>\n    </div>\n    <div class=\"col-sm-6 offset-sm-1\">\n        <h3 class=\"mb-2\">\n            Your Ideas\n            <b (click)=\"newIdea()\" class=\" btn btn-primary\">\n                <i class=\"material-icons \">add_box</i>\n            </b>\n        </h3>\n\n        <div  *ngFor=\" let idea of ideaJSON.ideas \">\n            <div class=\"card mb-3\" (click)=\"addView(idea)\">\n                <img class=\"card-img-top rounded\" [src]=\"idea.cover.result\" alt=\"Cover\" />\n                <br/>\n                <div class=\"card-body\">\n                    <div style=\"float:right;width:fit-content;right:10px;position: absolute;\">\n                  <span class=\"card-link\">\n                    <span>{{idea.views}}</span>\n                    <i class=\"material-icons\">\n                      face\n                    </i>\n                  </span>\n                        <span (click)=\"editIdea(idea)\" class=\"card-link\">\n                    <i class=\"material-icons\">\n                      edit\n                    </i>\n                  </span>\n                        <span (click)=\"deleteIdea(idea)\" class=\"card-link\">\n                    <i class=\"material-icons\">\n                      delete\n                    </i>\n                  </span>\n                        <span (click)=\"markPublic(idea)\" class=\"card-link\">\n                    <i class=\"material-icons\">\n                      public\n                    </i>\n                  </span>\n                    </div>\n                    <h5 class=\"card-title\">{{idea.title}}</h5>\n                    <h6 class=\"card-subtitle mb-2 text-muted\">\n                        {{idea.created_at}}\n                    </h6>\n                    <p class=\"card-text\">\n                        {{idea.details}}\n                    </p>\n                    <p class=\"card-text\"><small class=\"text-muted\">Last updated {{idea.updated_at}}</small></p>\n                    <b (click)=\"addLike(idea)\" class=\"card-link\">\n                        <span>{{idea.like}}</span>\n                        <i class=\"material-icons\">\n                            thumb_up_alt\n                        </i>\n                    </b>\n                    <b class=\"card-link\">\n                        <i class=\"material-icons\">\n                            rate_review\n                        </i>\n                    </b>\n                    <b class=\"card-link\" (click)=\"shareIdea(idea)\">\n                        <i class=\"material-icons\">\n                            share\n                        </i>\n                    </b>\n                    <b class=\"card-link\" (click)=\"_getDirectionsInGoogleMap(idea.lat,idea.lng)\">\n                        <i class=\"material-icons\">\n                            directions\n                        </i>\n                    </b>\n                </div>\n            </div>\n        </div>\n        <div *ngIf=\"ideaJSON.ideas.length==0\">\n            No public ideas so far\n        </div>\n    </div>\n</div>\n\n<!--share idea -->\n<div class=\"container md\"\n     id=\"shareDiv\"\n     style=\"height: 80vh;\n        overflow: scroll;\"\n     *ngIf=\"ideaJSON.viewCode==2\">\n    <div>\n        <div class=\"card\" (click)=\"addView(ideaJSON.ideas)\">\n            <!--list ideas -->\n            <img class=\"card-img-top img-fluid rounded\" [src]=\"ideaJSON.ideas.cover.result\" alt=\"Cover\" />\n            <div class=\"card-body\">\n                <div style=\"float:right;width:fit-content;right:10px;position: absolute;\">\n                  <span class=\"card-link\">\n                    <span>{{ideaJSON.ideas.views}}</span>\n                    <i class=\"material-icons\">\n                      face\n                    </i>\n                  </span>\n                            <span (click)=\"editIdea(ideaJSON.ideas)\" class=\"card-link\">\n                    <i class=\"material-icons\">\n                      edit\n                    </i>\n                  </span>\n                            <span (click)=\"deleteIdea(ideaJSON.ideas)\" class=\"card-link\">\n                    <i class=\"material-icons\">\n                      delete\n                    </i>\n                  </span>\n                            <span (click)=\"markPublic(ideaJSON.ideas)\" class=\"card-link\">\n                    <i class=\"material-icons\">\n                      public\n                    </i>\n                  </span>\n                </div>\n                <h5 class=\"card-title\">{{ideaJSON.ideas.title}}</h5>\n                <h6 class=\"card-subtitle mb-2 text-muted\">\n                    {{ideaJSON.ideas.created_at}}\n                </h6>\n                <p class=\"card-text\">{{ideaJSON.ideas.details}}</p>\n                <p class=\"card-text\"><small class=\"text-muted\">Last updated {{ideaJSON.ideas.updated_at}}</small></p>\n                <b (click)=\"addLike(ideaJSON.ideas)\" class=\"card-link\">\n                    <span>{{ideaJSON.ideas.like}}</span>\n                    <i class=\"material-icons\">\n                        thumb_up_alt\n                    </i>\n                </b>\n                <b class=\"card-link\">\n                    <i class=\"material-icons\">\n                        rate_review\n                    </i>\n                </b>\n                <span class=\"card-link\" (click)=\"shareIdea(ideaJSON.ideas)\">\n          <i class=\"material-icons\">\n            share\n          </i>\n        </span>\n                <b class=\"card-link\" (click)=\"_getDirectionsInGoogleMap(ideaJSON.ideas.lat,ideaJSON.ideas.lng)\">\n                    <i class=\"material-icons\">\n                        directions\n                    </i>\n                </b>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/ideas/ideas.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var ajax_service_1 = __webpack_require__("./src/app/services/ajax.service.ts");
var util_service_1 = __webpack_require__("./src/app/services/util.service.ts");
var environment_1 = __webpack_require__("./src/environments/environment.ts");
var common_1 = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
var app_component_1 = __webpack_require__("./src/app/app.component.ts");
var IdeasComponent = /** @class */ (function () {
    function IdeasComponent(ajax, util, location, app) {
        this.ajax = ajax;
        this.util = util;
        this.app = app;
        this.throttle = 300;
        this.scrollDistance = 1;
        this.scrollUpDistance = 2;
        this.userLoc = JSON.parse(localStorage.getItem("userLoc"));
        this.initProperties();
    }
    IdeasComponent.prototype.initProperties = function () {
        this.ideaJSON = {
            "idea": {
                "_id": "",
                "title": "",
                "details": "",
                "lat": "",
                "lng": "",
                "created_at": "",
                "like": 0,
                "views": 0,
                "cover": {
                    "name": "",
                    "size": "",
                    "type": "",
                    "lastModifiedDate": "",
                    "result": "/assets/images/cover.png"
                },
                "user": JSON.parse(localStorage.getItem("user")).email,
                "private": false
            },
            "errors": [],
            "activeRoute": this.util.getCurrentRoutePath(),
            "ideas": [],
            "viewCode": 0
        };
        console.info("this.ideaJSON", this.ideaJSON);
    };
    IdeasComponent.prototype.setAppFlow = function () {
        console.warn("this.ideaJSON.activeRoute.substring(0, 11)........", this.ideaJSON.activeRoute.substring(0, 11));
        if (this.ideaJSON.activeRoute == environment_1.environment.ROUTE_IDEAS) {
            this.ideaJSON.viewCode = 0;
            this.fetchIdeas();
        }
        if (this.ideaJSON.activeRoute.substring(0, 11) == "ideas/edit/") {
            this.ideaJSON.viewCode = 1;
            console.info("this.ideaJSON.activeRoute.substring(12)", this.ideaJSON.activeRoute.substring(12));
            if (!this.util.isVoid(localStorage.getItem("editIdea"))) {
                this.ideaJSON.idea = JSON.parse(localStorage.getItem("editIdea"));
            }
            else {
                console.error("nothing to edit");
            }
        }
        if (this.ideaJSON.activeRoute.substring(0, 11) == environment_1.environment.ROUTE_ADD_IDEA) {
            this.ideaJSON.viewCode = 1;
        }
        if (this.ideaJSON.activeRoute.substring(0, 11) == "ideas/share") {
            this.ideaJSON.viewCode = 2;
            console.info("this.ideaJSON.activeRoute.substring(12)", this.ideaJSON.activeRoute.substring(12));
            this.fetchIdeas(1, this.ideaJSON.activeRoute.substring(12));
        }
    };
    IdeasComponent.prototype.ngOnInit = function () {
        this.setAppFlow();
    };
    IdeasComponent.prototype.editIdea = function (idea) {
        console.info("@editIdea...");
        this.ideaJSON.idea = idea;
        localStorage.setItem("editIdea", JSON.stringify(this.ideaJSON.idea));
        this.util.getRouter().navigate(["ideas/edit/" + idea._id]);
    };
    IdeasComponent.prototype.shareIdea = function (idea) {
        this.util.getRouter().navigate(["ideas/share/" + idea._id]);
    };
    IdeasComponent.prototype.newIdea = function (idea) {
        this.util.getRouter().navigate([environment_1.environment.ROUTE_ADD_IDEA]);
    };
    IdeasComponent.prototype.addView = function (idea) {
        if (this.util.isVoid(idea.views)) {
            idea.views = 1;
        }
        else {
            idea.views += 1;
        }
        this.ideaJSON.idea = idea;
        this.saveIdea();
    };
    IdeasComponent.prototype.addLike = function (idea) {
        if (this.util.isVoid(idea.like)) {
            idea.like = 1;
        }
        else {
            idea.like += 1;
        }
        this.ideaJSON.idea = idea;
        this.saveIdea();
    };
    IdeasComponent.prototype.markPublic = function (idea) {
        idea.private = !idea.private;
        this.ideaJSON.idea = idea;
        this.saveIdea();
    };
    IdeasComponent.prototype.deleteIdea = function (idea) {
        var _this = this;
        this.ideaJSON.errors = [];
        this.ajax.apiCall_DELETE(idea, environment_1.environment.API_DELETE_IDEA)
            .subscribe(function (data) {
            console.info("response", data);
            if (data.status) {
                _this.fetchIdeas();
            }
            else {
                _this.ideaJSON.errors = data.errors;
            }
        }, function (error) {
            console.info("error.status:: ", error);
        });
    };
    IdeasComponent.prototype.saveIdea = function () {
        var _this = this;
        this.ideaJSON.errors = [];
        localStorage.removeItem("editIdea");
        if (!this.util.isVoid(this.userLoc) && this.userLoc.lat != 0.0) {
            console.info("saving device location", this.userLoc);
            this.ideaJSON.idea.lat = this.userLoc.lat;
            this.ideaJSON.idea.lng = this.userLoc.lng;
        }
        else {
            this.ideaJSON.errors.push("Please provide your location.");
            this.app.watchLocation();
            return;
        }
        this.ajax.apiCall_POST(this.ideaJSON.idea, environment_1.environment.API_SAVE_IDEAS)
            .subscribe(function (data) {
            console.info("response", data);
            if (data.status) {
                if (_this.ideaJSON.viewCode == 1) {
                    _this.util.getRouter().navigate([environment_1.environment.ROUTE_IDEAS]);
                }
            }
            else {
                _this.ideaJSON.errors = data.errors;
            }
        }, function (error) {
            console.info("error.status:: ", error);
        });
    };
    IdeasComponent.prototype.onScrollDown = function (event) {
        console.info("event", event);
        this.fetchIdeas(2);
    };
    IdeasComponent.prototype.onScrollUp = function (event) {
        console.info("event", event);
        this.fetchIdeas(1);
    };
    IdeasComponent.prototype.fetchIdeas = function (page, _id) {
        var _this = this;
        if (page === void 0) { page = 1; }
        console.info("@fetchIdeas...");
        this.ideaJSON.errors = [];
        this.ajax.apiCall_GET({ page: page, id: _id }, environment_1.environment.API_LIST_USER_IDEAS)
            .subscribe(function (data) {
            console.info("response", data);
            if (data.status) {
                _this.ideaJSON.ideas = data.ideas;
            }
            else {
                _this.ideaJSON.errors = data.errors;
            }
        }, function (error) {
            console.info("error.status:: ", error);
            _this.ideaJSON.errors = error;
        });
    };
    IdeasComponent.prototype._getDirectionsInGoogleMap = function (lat, lng) {
        window.open('https://www.google.com/maps/dir/?api=1&destination=' + lat + ',' + lng);
    };
    IdeasComponent.prototype.fileEvent = function (event) {
        this.ideaJSON.idea.cover = this.util.readfile(event);
        console.info("added cover -- ", this.ideaJSON);
    };
    IdeasComponent = __decorate([
        core_1.Component({
            selector: 'app-ideas',
            template: __webpack_require__("./src/app/ideas/ideas.component.html"),
            styles: [__webpack_require__("./src/app/ideas/ideas.component.css")]
        }),
        __metadata("design:paramtypes", [ajax_service_1.AjaxService, util_service_1.UtilService, common_1.Location, app_component_1.AppComponent])
    ], IdeasComponent);
    return IdeasComponent;
}());
exports.IdeasComponent = IdeasComponent;


/***/ }),

/***/ "./src/app/live/live.component.css":
/***/ (function(module, exports) {

module.exports = "#maps-container{\n    position: fixed !important;\n    width: 100%;\n    height: 900px;\n    /* Firefox */\n    /* WebKit */\n    /* Opera */\n    min-height: -o-calc(100% - 50px);\n    /* Standard */\n    min-height: calc(100% - 50px);\n    margin: auto;\n    display: -webkit-inline-box;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n     padding-right: 25px;\n    /* padding-left: 20px; */\n}\n\n#map-canvas {\n    width: calc(100% - 1px);\n    height: calc(100% - 1px;);\n    margin: 0px;\n}\n\n#street-view {\n    position:fixed !important;\n    width: 333px;\n    height: 150px;\n    bottom:10px;\n    float:left;\n}\n\n.menu{\n    top:55px;\n    width: calc(100% - 1px);\n    position:fixed;\n    background:white;\n}\n"

/***/ }),

/***/ "./src/app/live/live.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div id=\"maps-container\">\n  <div id=\"map-canvas\"></div>\n  <div id=\"street-view\" [hidden]=\"!liveJSON.enableStreetView\"></div>\n</div>\n<div class=\"menu\">\n  <ul class=\"nav nav-pills\">\n    <li class=\"nav-item\">\n      <b class=\"btn btn-outline-primary\" [ngClass]=\"{'active':liveJSON.enableStreetView}\" (click)=\"toggleStreetView()\">Streets</b>\n    </li>\n    <li class=\"nav-item\">\n      <div>\n        <input class=\"btn btn-outline-primary\"  type=\"button\" id=\"milestone\" value=\"Add Milestone\" onclick=\"document.getElementById('file').click()\" />\n        <input style=\"display:none;\" id=\"file\" name=\"file\" type=\"file\" accept=\"image/*\" capture=\"camera\" onclick=\"this.value = null\" (change)=fileEvent($event)>\n      </div>\n    </li>\n    <li class=\"nav-item\">\n      <b class=\"btn btn-outline-primary\" (click)=\"updateUserLocation()\">Update</b>\n    </li>\n    <li class=\"nav-item\">\n      <b class=\"btn btn-outline-primarydisabled\" (click)=\"toggleMapView()\">Disabled</b>\n    </li>\n  </ul>\n  <div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\" *ngIf=\"liveJSON.errors.length>0\">\n    <p *ngFor=\" let error of liveJSON.errors\">{{error}} <br/></p>\n    <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/live/live.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var environment_1 = __webpack_require__("./src/environments/environment.ts");
var ajax_service_1 = __webpack_require__("./src/app/services/ajax.service.ts");
var util_service_1 = __webpack_require__("./src/app/services/util.service.ts");
var common_1 = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
var app_component_1 = __webpack_require__("./src/app/app.component.ts");
var broadcast_service_1 = __webpack_require__("./src/app/services/broadcast.service.ts");
var LiveComponent = /** @class */ (function () {
    function LiveComponent(ajax, util, location, app, broadcast) {
        this.ajax = ajax;
        this.util = util;
        this.app = app;
        this.broadcast = broadcast;
        this.pipe = new common_1.DatePipe('en-US'); // Use your own locale
    }
    LiveComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initializeLiveJSON();
        this.broadcast.getMessage("gps").subscribe(function (status) {
            _this.updateUserLocation();
        });
    };
    LiveComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.initializaMapProperties();
            _this.updateUserLocation();
        }, 100);
    };
    LiveComponent.prototype.initializeLiveJSON = function () {
        this.liveJSON = {
            "errors": [],
            "map": undefined,
            "mapOptions": {
                disableDefaultUI: true,
                center: new google.maps.LatLng(environment_1.environment.DEFAULT_MAP_SETTINGS.lat, environment_1.environment.DEFAULT_MAP_SETTINGS.lng),
                zoom: environment_1.environment.DEFAULT_MAP_SETTINGS.zoom,
                zoomControl: false,
                scrollwheel: false,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.LARGE,
                    position: google.maps.ControlPosition.RIGHT_CENTER
                },
                draggableCursor: 'pointer',
                mapTypeControl: false,
                mapTypeControlOptions: {
                    mapTypeIds: [google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.ROADMAP],
                    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                    position: google.maps.ControlPosition.TOP_CENTER
                },
                streetViewControl: false,
                streetViewControlOptions: {
                    position: google.maps.ControlPosition.LEFT_CENTER,
                    addressControl: true,
                    panControl: true,
                    zoomControl: true,
                    fullscreenControl: false
                },
                rotateControlOptions: {
                    position: google.maps.ControlPosition.LEFT_TOP
                },
                fullscreenControl: false,
                styles: [{ elementType: 'labels', stylers: [{ visibility: 'on' }] }],
                tilt: 10
            },
            "streetViewPanorama": undefined,
            "enableStreetView": true,
            "streetViewOptions": {
                disableDefaultUI: true,
                mapTypeControl: false,
                position: environment_1.environment.DEFAULT_MAP_SETTINGS.streetViewDefaultPosition,
                pov: environment_1.environment.DEFAULT_MAP_SETTINGS.pov,
                addressControl: false,
                addressControlOptions: {
                    position: google.maps.ControlPosition.TOP_LEFT
                },
                fullscreenControl: false,
                linksControl: false,
                panControl: false,
                panControlOptions: {
                    position: google.maps.ControlPosition.TOP_LEFT
                },
                zoomControl: false,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.LARGE,
                    position: google.maps.ControlPosition.TOP_LEFT
                },
                enableCloseButton: false,
                disableDoubleClickZoom: true
            },
            "userLocation": JSON.parse(localStorage.getItem("userLoc")) ? JSON.parse(localStorage.getItem("userLoc")) : {
                "lat": 0,
                "lng": 0
            },
            "userMapMarker": "",
            "activity": {
                "user_id": JSON.parse(localStorage.getItem("user"))._id,
                "shift_state": "",
                "speed": 0,
                "power": 0,
                "latitude": 0,
                "longitude": 0,
                "geohash": "",
                "heading": "",
                "gps_as_of": "",
                "native_location_supported": "",
                "native_latitude": 0,
                "native_longitude": 0,
                "native_geohash": "",
                "native_type": "",
                "milestone": {
                    "cover": {
                        "name": "",
                        "size": "",
                        "type": "",
                        "lastModifiedDate": "",
                        "result": "",
                    },
                    "views": 0,
                    "likes": 0,
                    "comments": []
                },
                "isMilestone": false
            },
            "markerInfoWindow": new google.maps.InfoWindow()
        };
    };
    LiveComponent.prototype.initializaMapProperties = function () {
        this.liveJSON.map = new google.maps.Map(document.getElementById('map-canvas'), this.liveJSON.mapOptions);
        this.liveJSON.streetViewPanorama = new google.maps.StreetViewPanorama(document.getElementById('street-view'), this.liveJSON.streetViewOptions);
        this.liveJSON.userMapMarker = new google.maps.Marker({
            position: this.getGoogleLatLangObject(this.liveJSON.userLocation.lat, this.liveJSON.userLocation.lng),
            map: this.liveJSON.map,
            animation: google.maps.Animation.DROP,
            draggable: true
        });
        this.addEventListnersOnMarker();
        this.refreshMaps();
    };
    LiveComponent.prototype.getGoogleLatLangObject = function (lat, lng) {
        return new google.maps.LatLng(lat, lng);
    };
    LiveComponent.prototype.refreshMaps = function () {
        this.liveJSON.map.panTo(this.liveJSON.userMapMarker.getPosition());
        // this.liveJSON.map.setCenter(this.liveJSON.userMapMarker.getPosition());
        this.liveJSON.streetViewPanorama = new google.maps.StreetViewPanorama(document.getElementById('street-view'), this.liveJSON.streetViewOptions);
        this.liveJSON.streetViewPanorama.setPosition(this.liveJSON.userMapMarker.getPosition());
        google.maps.event.trigger(this.liveJSON.map, 'resize');
        google.maps.event.trigger(this.liveJSON.streetViewPanorama, 'resize');
    };
    LiveComponent.prototype.toggleMapView = function () {
        var _this = this;
        console.info("map defaults :::", this.liveJSON.mapOptions);
        console.info("street view defaults :::", this.liveJSON.streetViewOptions);
        this.liveJSON.enableStreetView = !this.liveJSON.enableStreetView;
        if (this.liveJSON.enableStreetView) {
            setTimeout(function () {
                _this.liveJSON.map.setMapTypeId(google.maps.MapTypeId.HYBRID);
                _this.liveJSON.streetViewPanorama.setPosition({
                    lat: _this.liveJSON.userLocation.lat,
                    lng: _this.liveJSON.userLocation.lng
                });
            }, 0);
        }
        else {
            this.liveJSON.map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
            this.refreshMaps();
        }
    };
    LiveComponent.prototype.toggleStreetView = function () {
        this.liveJSON.enableStreetView = !this.liveJSON.enableStreetView;
    };
    LiveComponent.prototype.fileEvent = function (event) {
        var _this = this;
        console.info("fileEvent..");
        this.liveJSON.activity.milestone.cover = this.util.readfile(event);
        setTimeout(function () {
            console.info("added cover -- ", _this.liveJSON.activity);
            _this.logActivity(true);
        }, 2000);
    };
    LiveComponent.prototype.updateUserLocation = function () {
        console.info("updateUserLocation..");
        this.liveJSON.userLocation = JSON.parse(localStorage.getItem("userLoc"));
        this.liveJSON.userMapMarker.setPosition(this.getGoogleLatLangObject(this.liveJSON.userLocation.lat, this.liveJSON.userLocation.lng));
        this.refreshMaps();
    };
    LiveComponent.prototype.logActivity = function (milestone) {
        var _this = this;
        if (milestone === void 0) { milestone = false; }
        this.liveJSON.errors = [];
        this.liveJSON.activity.isMilestone = milestone;
        this.liveJSON.activity.latitude = this.liveJSON.userMapMarker.getPosition().lat();
        this.liveJSON.activity.longitude = this.liveJSON.userMapMarker.getPosition().lng();
        this.ajax.apiCall_POST(this.liveJSON.activity, environment_1.environment.API_USER_DRIVE)
            .subscribe(function (data) {
            if (data.status) {
                console.info("activity saved");
                if (milestone) {
                    _this.liveJSON.errors.push("Activity Saved.");
                }
            }
            else {
                _this.liveJSON.errors = data.errors;
            }
            if (milestone) {
                // this.liveJSON.activity.milestone={
                //   "cover":{
                //     "name":"",
                //     "size":"",
                //     "type":"",
                //     "lastModifiedDate":"",
                //     "result":"",
                //   },
                //   "views":0,
                //   "likes":0,
                //   "comments":[]
                // }
                _this.liveJSON.activity.isMilestone = false;
            }
        }, function (error) {
            console.info("error.status:: ", error);
        });
    };
    LiveComponent.prototype.addEventListnersOnMarker = function (marker) {
        var _this = this;
        if (marker === void 0) { marker = this.liveJSON.userMapMarker; }
        google.maps.event.addListener(marker, 'position_changed', function () {
            console.info("userMapMarker position changes t0 --", _this.liveJSON.streetViewPanorama.getPosition());
            var content;
            content = "ImHere";
            if (!_this.util.isVoid(_this.liveJSON.activity.milestone.cover.result)) {
                content += '<h4 id="milestone">' + _this.liveJSON.activity.milestone.cover.name + '</h4>';
                content += '<img style="width:150px;height:100px;" src="' + _this.liveJSON.activity.milestone.cover.result + '"></img>';
                content += '<p>' + _this.pipe.transform(_this.liveJSON.activity.milestone.cover.lastModifiedDate, "yyyy-MM-dd hh:mm:ss") + '</p>';
            }
            _this.liveJSON.markerInfoWindow.setContent(content);
            _this.liveJSON.markerInfoWindow.setPosition(_this.getGoogleLatLangObject(marker.getPosition().lat(), marker.getPosition().lng()));
            _this.liveJSON.markerInfoWindow.open(_this.liveJSON.map, marker);
            _this.logActivity(false);
            _this.refreshMaps();
        });
        google.maps.event.addListener(marker, "click", function (event) {
            var content;
            content = '<h4 id="milestone">' + _this.liveJSON.activity.milestone.cover.name + '</h4>';
            content += '<img style="width:150px;height:100px;" src="' + _this.liveJSON.activity.milestone.cover.result + '"></img>';
            content += '<p>' + _this.liveJSON.activity.milestone.cover.lastModifiedDate + '</p>';
            _this.liveJSON.markerInfoWindow.setContent(content);
            _this.liveJSON.markerInfoWindow.setPosition(_this.getGoogleLatLangObject(marker.getPosition().lat(), marker.getPosition().lng()));
            _this.liveJSON.markerInfoWindow.open(_this.liveJSON.map, marker);
        });
    };
    LiveComponent = __decorate([
        core_1.Component({
            selector: 'app-live',
            template: __webpack_require__("./src/app/live/live.component.html"),
            styles: [__webpack_require__("./src/app/live/live.component.css")]
        }),
        __metadata("design:paramtypes", [ajax_service_1.AjaxService, util_service_1.UtilService, common_1.Location, app_component_1.AppComponent, broadcast_service_1.BroadcastService])
    ], LiveComponent);
    return LiveComponent;
}());
exports.LiveComponent = LiveComponent;


/***/ }),

/***/ "./src/app/message/message.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/message/message.component.html":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/message/message.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var MessageComponent = /** @class */ (function () {
    function MessageComponent() {
    }
    MessageComponent.prototype.ngOnInit = function () {
    };
    MessageComponent = __decorate([
        core_1.Component({
            selector: 'app-message',
            template: __webpack_require__("./src/app/message/message.component.html"),
            styles: [__webpack_require__("./src/app/message/message.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], MessageComponent);
    return MessageComponent;
}());
exports.MessageComponent = MessageComponent;


/***/ }),

/***/ "./src/app/page-not-found/page-not-found.component.css":
/***/ (function(module, exports) {

module.exports = "#parent {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  text-align:center\n\n}\n\n\n#child {\n  width: 100vw;\n  height: 85vh;\n}\n"

/***/ }),

/***/ "./src/app/page-not-found/page-not-found.component.html":
/***/ (function(module, exports) {

module.exports = "\n\n<div id=\"parent\">\n  <div id=\"child\">\n    <p>\n      Oops !\n    </p>\n    <br/>\n    <a href=\"#\"><img src=\"assets/images/pnf.jpg\" alt=\"Page No Found\" /></a>\n\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/page-not-found/page-not-found.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var PageNotFoundComponent = /** @class */ (function () {
    function PageNotFoundComponent() {
    }
    PageNotFoundComponent.prototype.ngOnInit = function () {
    };
    PageNotFoundComponent = __decorate([
        core_1.Component({
            selector: 'app-page-not-found',
            template: __webpack_require__("./src/app/page-not-found/page-not-found.component.html"),
            styles: [__webpack_require__("./src/app/page-not-found/page-not-found.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], PageNotFoundComponent);
    return PageNotFoundComponent;
}());
exports.PageNotFoundComponent = PageNotFoundComponent;


/***/ }),

/***/ "./src/app/services/ajax.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var Observable_1 = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
var environment_1 = __webpack_require__("./src/environments/environment.ts");
var util_service_1 = __webpack_require__("./src/app/services/util.service.ts");
__webpack_require__("./node_modules/rxjs/_esm5/Rx.js");
var AjaxService = /** @class */ (function () {
    function AjaxService(util) {
        this.util = util;
    }
    // ajax calls --
    AjaxService.prototype.login = function (body) {
        return this.util.getHttpClient().post(environment_1.environment.API_LOGIN, body);
    };
    AjaxService.prototype.contactUs = function (body) {
        return this.util.getHttpClient().post(environment_1.environment.API_LOGIN, body);
    };
    AjaxService.prototype.retryGeocode = function (body) {
        return this.util.getHttpClient().put("const", body);
    };
    AjaxService.prototype.getApiCall = function (countries, page, pageSize, key) {
        return this.util.getHttpClient().get("api consta" + "?countryNames=" + countries + "&page=" + page + "&pageSize=" + pageSize + "&key=" + key);
    };
    AjaxService.prototype.refreshToken = function (token) {
        console.log("Refresh Token Reached");
        var body = { refreshToken: token };
        return this.util.getHttpClient().post(environment_1.environment.REFRESH_API, body);
    };
    // ajax calls ends --
    AjaxService.prototype.apiCall_GET = function (perameterjson, apiPath) {
        console.log("perameter json for get call is ", perameterjson);
        var url = environment_1.environment.API_INVALID_PATH;
        switch (apiPath) {
            case environment_1.environment.API_LIST_USER_IDEAS:
                url = environment_1.environment.API_LIST_USER_IDEAS + "?page=" + perameterjson.page + "&id=" + perameterjson.id;
                break;
            case environment_1.environment.API_LIST_PUBLIC_IDEAS:
                url = environment_1.environment.API_LIST_PUBLIC_IDEAS + "?page=" + perameterjson.page + "&id=" + perameterjson.id;
                break;
            case environment_1.environment.API_CITIES_INDIA:
                url = environment_1.environment.API_CITIES_INDIA;
                break;
            case environment_1.environment.API_USER_DRIVE_MILESTONES:
                url = environment_1.environment.API_USER_DRIVE_MILESTONES + "?page=" + perameterjson.page + "&id=" + perameterjson.id;
                break;
            default:
                console.error("ERROR -- : @apiCall_GET api path not added.");
                return Observable_1.Observable.throw("api path not added.");
        }
        console.log("called api [" + url + "]");
        return this.util.getHttpClient().get(url)
            .catch(function (error) { return Observable_1.Observable.throw(error || 'Server error'); });
    };
    AjaxService.prototype.apiCall_DELETE = function (data, apiPath) {
        console.log("apiCall_DELETE data ", data);
        var url = environment_1.environment.API_INVALID_PATH;
        switch (apiPath) {
            case environment_1.environment.API_DELETE_IDEA:
                url = environment_1.environment.API_DELETE_IDEA + data._id;
                break;
            default:
                console.error("ERROR -- : @apiCall_DELETE api path not added.");
                return Observable_1.Observable.throw("api path not added.");
        }
        console.log("called api [" + url + "]");
        return this.util.getHttpClient().delete(url)
            .catch(function (error) { return Observable_1.Observable.throw(error || 'Server error'); });
    };
    AjaxService.prototype.apiCall_PUT = function (data, apiPath) {
        console.log("put data ", data);
        var url = environment_1.environment.API_INVALID_PATH;
        switch (apiPath) {
            case environment_1.environment.API_DELETE_IDEA:
                url = environment_1.environment.API_DELETE_IDEA;
                break;
            default:
                console.error("ERROR -- : @apiCall_PUT api path not added.");
                return Observable_1.Observable.throw("api path not added.");
        }
        console.log("called api [" + url + "]");
        return this.util.getHttpClient().put(url, data)
            .catch(function (error) { return Observable_1.Observable.throw(error || 'Server error'); });
    };
    AjaxService.prototype.apiCall_POST = function (data, apiPath) {
        console.log("post data ", data);
        console.log("post apiPath ", apiPath);
        var url = environment_1.environment.API_INVALID_PATH;
        switch (apiPath) {
            case environment_1.environment.API_LOGIN:
                url = environment_1.environment.API_LOGIN;
                break;
            case environment_1.environment.API_SAVE_IDEAS:
                url = environment_1.environment.API_SAVE_IDEAS;
                break;
            case environment_1.environment.API_REGISTER:
                url = environment_1.environment.API_REGISTER;
                break;
            case environment_1.environment.API_REFRESH:
                url = environment_1.environment.API_REFRESH;
                break;
            case environment_1.environment.API_USER_DRIVE:
                url = environment_1.environment.API_USER_DRIVE;
                break;
            default:
                console.error("ERROR -- : @apiCall_POST api path not added.");
                return Observable_1.Observable.throw("api path not added.");
        }
        console.log("called api [" + url + "]");
        return this.util.getHttpClient().post(url, data)
            .catch(function (error) { return Observable_1.Observable.throw(error || 'Server error'); });
    };
    AjaxService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [util_service_1.UtilService])
    ], AjaxService);
    return AjaxService;
}());
exports.AjaxService = AjaxService;


/***/ }),

/***/ "./src/app/services/broadcast.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var Subject_1 = __webpack_require__("./node_modules/rxjs/_esm5/Subject.js");
var BroadcastService = /** @class */ (function () {
    function BroadcastService() {
        this.subject = [];
    }
    BroadcastService.prototype.sendMessage = function (key, data) {
        if (!this.subject[key]) {
            this.subject[key] = new Subject_1.Subject();
        }
        this.subject[key].next(data);
    };
    BroadcastService.prototype.getMessage = function (key) {
        if (!this.subject[key]) {
            this.subject[key] = new Subject_1.Subject();
        }
        /*let a = this.subject;
        this.clearMessage(key,a);*/
        return this.subject[key].asObservable();
    };
    BroadcastService.prototype.clearMessage = function (key) {
        this.subject[key].next(null);
    };
    BroadcastService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], BroadcastService);
    return BroadcastService;
}());
exports.BroadcastService = BroadcastService;


/***/ }),

/***/ "./src/app/services/config-loader.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var environment_1 = __webpack_require__("./src/environments/environment.ts");
var util_service_1 = __webpack_require__("./src/app/services/util.service.ts");
var broadcast_service_1 = __webpack_require__("./src/app/services/broadcast.service.ts");
var AppConfigLoaderService = /** @class */ (function () {
    function AppConfigLoaderService(util, broadcaster) {
        this.util = util;
        this.broadcaster = broadcaster;
    }
    AppConfigLoaderService.prototype.getAppConfig = function () {
        var _this = this;
        var promise = this.util.getHttpClient().get(environment_1.environment.CONFIG_API)
            .toPromise()
            .then(function (settings) {
            // console.log(`Settings from API: `, settings);
            var config = settings['config'];
            var vocab = settings['vocab'];
            environment_1.environment.APP_CONFIG = config;
            environment_1.environment.APP_VOCAB = vocab;
            console.log('app-configration', config);
            // this.util.setAuthAppConfigInStorage(config);
            console.log('app-vocab', vocab);
            // this.util.setAuthAppVocabInStorage(vocab)
            _this.broadcaster.sendMessage(environment_1.environment.BROADCAST_CHANGE_LANGUAGE, "change portal language");
            return settings;
        });
        return promise;
    };
    AppConfigLoaderService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [util_service_1.UtilService, broadcast_service_1.BroadcastService])
    ], AppConfigLoaderService);
    return AppConfigLoaderService;
}());
exports.AppConfigLoaderService = AppConfigLoaderService;


/***/ }),

/***/ "./src/app/services/logger.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var LoggerService = /** @class */ (function () {
    function LoggerService() {
    }
    LoggerService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], LoggerService);
    return LoggerService;
}());
exports.LoggerService = LoggerService;


/***/ }),

/***/ "./src/app/services/route-configration.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var environment_1 = __webpack_require__("./src/environments/environment.ts");
var util_service_1 = __webpack_require__("./src/app/services/util.service.ts");
var RouteConfigLoaderService = /** @class */ (function () {
    function RouteConfigLoaderService(util) {
        this.util = util;
    }
    RouteConfigLoaderService.prototype.setRouteConfig = function (route) {
        var promise = this.util.getHttpClient().get(environment_1.environment.ROUTE_CONFIG_API + route)
            .toPromise()
            .then(function (settings) {
            console.log("Settings from API: ", settings);
            var config = settings['routeconfig'];
            environment_1.environment.ROUTE_CONFIG = config;
            console.log('route-configration', config);
            // this.util.setAuthAppRouteDataInStorage(config);
            return settings;
        });
        return promise;
    };
    RouteConfigLoaderService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [util_service_1.UtilService])
    ], RouteConfigLoaderService);
    return RouteConfigLoaderService;
}());
exports.RouteConfigLoaderService = RouteConfigLoaderService;


/***/ }),

/***/ "./src/app/services/util.service.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var router_1 = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var environment_1 = __webpack_require__("./src/environments/environment.ts");
var UtilService = /** @class */ (function () {
    function UtilService(injector) {
        this.injector = injector;
    }
    UtilService.prototype.getEnvironmentConstants = function () {
        return environment_1.environment;
    };
    UtilService.prototype.isVoid = function (obj) {
        switch (typeof (obj)) {
            case "undefined":
            case "object":
                for (var x in obj) {
                    if (obj.hasOwnProperty(x))
                        return false;
                    else
                        return true;
                }
                return true;
            case "number":
            case "boolean":
                return false;
            case "string":
                if (obj == "")
                    return true;
                else
                    return false;
            default:
                return false;
        }
    };
    UtilService.prototype.getRouter = function () {
        return this.injector.get(router_1.Router);
    };
    UtilService.prototype.getActiveRoute = function () {
        return this.injector.get(router_1.ActivatedRoute);
    };
    UtilService.prototype.refreshComponent = function (route) {
        var _this = this;
        setTimeout(function () {
            _this.getRouter().navigated = false;
            _this.getRouter().navigate([_this.getRouter().url]);
            console.warn("refreshed current route");
        }, 100);
    };
    UtilService.prototype.getCurrentRoutePath = function () {
        var targetPath = this.getRouter().url.split('#/'); // "http://localhost:8888/#/ideas/add";
        return targetPath[targetPath.length - 1].substring(1); // [http://localhost:8888 , ideas/add]
    };
    UtilService.prototype.getHttpClient = function () {
        return this.injector.get(http_1.HttpClient);
    };
    UtilService.prototype.getAuthToken = function () {
        return localStorage.getItem('token');
    };
    UtilService.prototype.saveToStorage = function (key, value) {
        if (typeof value == 'object') {
            localStorage.setItem(key, JSON.stringify(value));
        }
        else {
            localStorage.setItem(key, value);
        }
    };
    UtilService.prototype.getFromStorage = function (key) {
        return JSON.parse(localStorage.getItem(key));
    };
    UtilService.prototype.getAuthAppConfigFromStorage = function () {
        return JSON.parse(localStorage.getItem('config'));
    };
    UtilService.prototype.setAuthAppConfigInStorage = function (config) {
        localStorage.setItem("config", JSON.stringify(config));
    };
    UtilService.prototype.getAuthAppVocabFromStorage = function () {
        return JSON.parse(localStorage.getItem('vocab'));
    };
    UtilService.prototype.setAuthAppVocabInStorage = function (vocab) {
        localStorage.setItem("vocab", JSON.stringify(vocab));
    };
    UtilService.prototype.getAuthAppRouteDataFromStorage = function () {
        return JSON.parse(localStorage.getItem('routeData'));
    };
    UtilService.prototype.setAuthAppRouteDataInStorage = function (vocab) {
        localStorage.setItem("routeData", JSON.stringify(vocab));
    };
    UtilService.prototype.setKeyVauleOnlocalStorage = function (key, value) {
        if (typeof value == 'object') {
            localStorage.setItem(key, JSON.stringify(value));
        }
        else {
            localStorage.setItem(key, value);
        }
    };
    UtilService.prototype.getDataFromStorageUsingKey = function (key) {
        return JSON.parse(localStorage.getItem(key));
    };
    UtilService.prototype.readfile = function (event) {
        var fileObj = {
            "name": "",
            "type": "",
            "size": "",
            "lastModifiedDate": "",
            "result": ""
        };
        fileObj.name = event.target.files[0].name;
        fileObj.type = event.target.files[0].type;
        fileObj.size = event.target.files[0].size;
        fileObj.lastModifiedDate = event.target.files[0].lastModifiedDate;
        var reader = new FileReader();
        reader.onload = function (evt) {
            console.info("reader object onload: ", evt);
            fileObj.result = evt.target["result"];
        };
        reader.readAsDataURL(event.target.files[0]);
        // console.info("fileSelected",this.util.uploadFile(event.target.files[0]))
        // console.info("fileObj",fileObj)
        return fileObj;
    };
    UtilService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_1.Injector])
    ], UtilService);
    return UtilService;
}());
exports.UtilService = UtilService;


/***/ }),

/***/ "./src/app/signin/signin.component.css":
/***/ (function(module, exports) {

module.exports = "/*------------------------ Responsive stylesheet start ---------------------------------*/\n\n.logo_continer_home{\n\tmargin:auto;\n\twidth:95px;\n}\n\n.logo_continer_home a{\n\n\tdisplay:block;\n\twidth:95px;\n\theight:80px;\n\ttext-align:center;\n\toutline:none;\n\n\n\n\n}\n\n.logo_continer_home a img{\n\twidth:100%;\n}\n\n.input_form {\n    width:100;\n    padding:0PX 8% 0 8%;\n\tmargin:0 auto;\n\tposition:relative;\n\n}\n\n.input_form h4 {\n    font-size:32px;\n    font-weight: 700;\n    font-family: 'Open Sans', sans-serif;\n    color: #ff6503;\n    padding-bottom:35px;\n\tletter-spacing:-3PX;\n\ttext-align:center;\n}\n\n.input_form p {\n    font-size: 14px;\n    color: #555;\n    text-align: left;\n    font-weight: 600;\n    padding: 0 0;\n    line-height: 1.5em;\n    padding-bottom: 22px;\n    padding-top: 30px;\n\ttext-align:center;\n}\n\n.tagline_short{\n\tfont-size:14px;\n\tfont-weight:500;\n\tcolor:#ccc;\n\tdisplay:block;\n\tpadding-right:0;\n\theight:normal;\n\tfont-style:normal;\n\ttext-align:center;\n}\n\n.form_vma {\n    position: relative;\n}\n\n.input-append {\n    position: relative;\n    width:100%;\n\n}\n\n.input-subdomain_form {\n    padding:12px 12px 12px 12px;\n    width:100%;\n    outline: none;\n    display:block;\n    border: 2px solid #c9c9c9;\n    color: #555;\n    font-size:14px;\n    font-family: 'Open Sans', sans-serif;\n\tline-height:20px;\n    font-weight:600;\n    position: relative;\n    z-index: 99;\n\tborder-radius:5px;\n\tmargin-bottom:0;\n}\n\n.margin-t{\n\n\tmargin-top:16px!important;\n}\n\n.btn_big {\n    font: normal 19px/53px 'Open Sans', sans-serif;\n    text-align: center;\n    display:block;\n    padding: 0 0;\n    width:100%;\n    background: #ff6503;\n    border-radius:5px;\n    font-weight: 700;\n    outline: none;\n    cursor: pointer;\n    color: #fff;\n    border: 1px solid #ff6503;\n    margin:16px 0 16px 0;\n\ttext-decoration:none;\n}\n\n.btn_big:hover {\n    background: #fe924e;\n\t border: 1px solid #fe924e;\n\t text-decoration:none!important;\n}\n\n.btn_big {\n    font: normal 19px/53px 'Open Sans', sans-serif;\n    text-align: center;\n    display:block;\n    padding: 0 0;\n    width:100%;\n    background: #ff6503;\n    border-radius:5px;\n    font-weight: 700;\n    outline: none;\n    cursor: pointer;\n    color: #fff;\n    border: 1px solid #ff6503;\n    margin:16px 0 16px 0;\n\ttext-decoration:none;\n}\n\n.btn_big:hover {\n    background: #fe924e;\n\tborder: 1px solid #fe924e;\n\ttext-decoration:none!important;\n}\n\n.bottom_sht_link {\n    display: block;\n    font-size:14px;\n    text-align:left;\n    font-weight:600;\n\tline-height:1.5em;\n    color: #555;\n    text-decoration: none;\n    width:auto\n}\n\n.bottom_sht_link a {\n    font-size:14px;\n    text-align:left;\n    margin-top: 1px;\n    display: inline-block;\n\tline-height:1.5em;\n    color: #555;\n    text-decoration:none;\n}\n\n.bottom_sht_link a:hover {\n    text-decoration: underline\n}\n\n.height_sht{\n\theight:74px;\n}\n\n.forgot_pwd_stay{\n\n\twidth:100%;\n\tpadding-top:16px;\n}\n\n.stay-Login{\n\n\tfloat:none;\n}\n\n.stay-Login label{\n\n\tfont-size:14px;\n\t font-weight:600;\n\tcolor:#555;\n\tpadding-left:5px;\n}\n\n.forgot-password-s{\n\n\tfloat:none;\n\tfont-size:14px;\n    text-align:left;\n    font-weight:600;\n\tline-height:1.5em;\n    color: #555;\n\tpadding-top:8px;\n}\n\n.forgot-password-s a{\n\n\ttext-decoration:none;\n\tcolor:#555;\n}\n\n.forgot-password-s a{\n\n\ttext-decoration:underline;\n\n}\n\n/*------------------------ Responsive stylesheet end ---------------------------------*/\n\n/*------------------------ Desktop stylesheet start ---------------------------------*/\n\n@media screen and (min-width:980px){\n.logo_continer_home{\n\tmargin:auto;\n\twidth:120px;\n}\n\n\n.logo_continer_home a{\n\tdisplay:block;\n\twidth:120px;\n\t\tcursor:default;\n}\n\n.logo_continer_home a img{\n\twidth:100%;\n}\n\n\n.input_form h4 {\n    font-size:44px;\n    font-weight: 700;\n    font-family: 'Open Sans', sans-serif;\n    color: #ff6503;\n    padding-bottom:35px;\n\tletter-spacing:-3PX;\n\ttext-align:left;\n}\n\n.input_form p {\n    font-size: 14px;\n    color: #555;\n    text-align:left;\n    font-weight: 600;\n    padding: 0 0;\n    line-height: 1.5em;\n    padding-bottom:22px;\n\tpadding-top:30px;\n\ttext-align:left;\n}\n\n.tagline_short{\n\tfont-size:14px;\n\tfont-weight:500;\n\tcolor:#ccc;\n\tdisplay:block;\n\tpadding-right:75px;\n\theight:55px;\n\tfont-style:italic;\n\ttext-align:left\n}\n\n.form_vma {\n    position: relative;\n\n}\n\n.footer {\n    width: 100%;\n    padding:18px 0;\n    background: #f6f6f6;\n\tposition:fixed;\n\tbottom:0;\n\tz-index:-9;\n\tmargin-top:0;\n}\n.footer p {\n    text-align: center;\n    font-size: 13px;\n    color: #999;\n    font-weight: 600;\n\n}\n\n.height_sht{\n\theight:55px;\n}\n\n.forgot_pwd_stay{\n\n\twidth:100%;\n\tpadding-top:16px;\n}\n\n.stay-Login{\n\n\tfloat:left;\n}\n\n.stay-Login label{\n\n\tfont-size:14px;\n\tfont-weight:700;\n\tcolor:#555;\n\tpadding-left:8px;\n}\n\n.forgot-password-s{\n\n\tfloat:right;\n\t font-size:14px;\n    text-align:left;\n    font-weight:600;\n\tline-height:1.5em;\n    color: #555;\n\tpadding-top:0;\n}\n\n\n.forgot-password-s a{\n\n\ttext-decoration:none;\n\tcolor:#555;\n}\n\n.forgot-password-s a:hover{\n\n\ttext-decoration:underline;\n\n}\n\n\n}\n\n/*------------------------ Desktop stylesheet end ---------------------------------*/\n"

/***/ }),

/***/ "./src/app/signin/signin.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n    <div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\" *ngIf=\"loginJSON.errors.length>0\">\n        <p *ngFor=\" let error of loginJSON.errors\">{{error}} <br/></p>\n        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n            <span aria-hidden=\"true\">&times;</span>\n        </button>\n    </div>\n    <div class=\"card \" style=\"max-width: 500px;margin: auto;\">\n        <div class=\"card-body\">\n            <div class=\"logo_continer_home\">\n                <a href=\"#\"><img src=\"assets/images/company-logo/logo.png\" alt=\"EXL Services\"/></a>\n            </div>\n            <div class=\"input_form\">\n                <h4 style=\"padding-bottom:0;\">Log In</h4>\n                <span class=\"tagline_short height_sht\">\n            Please log In to proceed....\n        </span>\n                <!--login box-->\n                <form class=\"px-4 py-3\" *ngIf=\"loginJSON.loginFormVeiw==0\">\n                    <div class=\"form-group\">\n                        <label for=\"exampleDropdownFormEmail1\">Email address</label>\n                        <input type=\"email\" class=\"form-control\" id=\"exampleDropdownFormEmail1\"\n                               [(ngModel)]=\"loginJSON.login.email\" name=\"email\" placeholder=\"email@example.com\"\n                               required>\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"exampleDropdownFormPassword1\">Password</label>\n                        <input type=\"password\" class=\"form-control\" id=\"exampleDropdownFormPassword1\"\n                               [(ngModel)]=\"loginJSON.login.password\" name=\"pass\" placeholder=\"Password\" required>\n                    </div>\n                    <div class=\"form-check\">\n                        <input type=\"checkbox\" class=\"form-check-input\" id=\"dropdownCheck\">\n                        <label class=\"form-check-label\" for=\"dropdownCheck\">\n                            Remember me\n                        </label>\n                    </div>\n                    <button type=\"submit\" (click)=\"login()\" class=\"btn btn-primary\"> Sign in</button>\n                </form>\n                <!--sign up form-->\n                <form class=\"px-4 py-3\" *ngIf=\"loginJSON.loginFormVeiw==1\">\n                    <div class=\"form-group\">\n                        <label for=\"exampleDropdownFormEmail1\">Name</label>\n                        <input type=\"email\" class=\"form-control\" id=\"exampleDropdownFormname\"\n                               [(ngModel)]=\"loginJSON.register.name\" name=\"name\" placeholder=\"John Singh\" required>\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"exampleDropdownFormEmail1\">Email address</label>\n                        <input type=\"email\" class=\"form-control\" id=\"exampleDropdownFormEmail1\"\n                               [(ngModel)]=\"loginJSON.register.email\" name=\"email\" placeholder=\"email@example.com\"\n                               required>\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"exampleDropdownFormEmail1\">Company Name</label>\n                        <input type=\"email\" class=\"form-control\" id=\"company\"\n                               [(ngModel)]=\"loginJSON.register.company\" name=\"company\" placeholder=\"abc limited\"\n                               required>\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"exampleDropdownFormPassword1\">Password</label>\n                        <input type=\"password\" class=\"form-control\" id=\"exampleDropdownFormPassword1\"\n                               [(ngModel)]=\"loginJSON.register.password\" name=\"pass\" placeholder=\"Password\" required>\n                    </div>\n                    <div class=\"form-check\" *ngIf=\"loginJSON.loginFormVeiw==0\">\n                        <input type=\"checkbox\" class=\"form-check-input\" id=\"dropdownCheck\">\n                        <label class=\"form-check-label\" for=\"dropdownCheck\">\n                            Remember me\n                        </label>\n                    </div>\n                    <select\n                            [(ngModel)]=\"loginJSON.register.location\" name=\"loc\" required>\n                        <option *ngFor=\"let city of loginJSON.cities\">{{city.city}}</option>\n                    </select>\n                    <button type=\"submit\" (click)=\"register()\" class=\"btn btn-primary\"> Sign up</button>\n                </form>\n                <!--forgot password form -->\n                <form class=\"px-4 py-3\" *ngIf=\"loginJSON.loginFormVeiw==2\">\n                    <div class=\"form-group\">\n                        <label for=\"exampleDropdownFormEmail1\">Email address</label>\n                        <input type=\"email\" class=\"form-control\" id=\"exampleDropdownFormEmail1\"\n                               [(ngModel)]=\"loginJSON.login.email\" name=\"email\" placeholder=\"email@example.com\"\n                               required>\n                    </div>\n                    <button type=\"submit\" (click)=\"forgot()\" class=\"btn btn-primary\">Send Link</button>\n                    <button type=\"submit\" (click)=\"loginJSON.loginFormVeiw=0\" class=\"btn btn-primary\">Cancel</button>\n                </form>\n                <div class=\"dropdown-divider\"></div>\n                <a class=\"dropdown-item\" href=\"#/login\" *ngIf=\"loginJSON.loginFormVeiw==0\"\n                   (click)=\"loginJSON.loginFormVeiw=1\">New around here? Sign up</a>\n                <a class=\"dropdown-item\" href=\"#/login\" *ngIf=\"loginJSON.loginFormVeiw==1\"\n                   (click)=\"loginJSON.loginFormVeiw=0\">Have account? Sign in</a>\n                <a class=\"dropdown-item\" href=\"#/login\" *ngIf=\"loginJSON.loginFormVeiw!=2\"\n                   (click)=\"loginJSON.loginFormVeiw=2\">Forgot password?</a>\n                <a class=\"dropdown-item\" href=\"\" onclick=\"event.preventDefault()\" (click)=\"googleLogin()\" *ngIf=\"loginJSON.loginFormVeiw!=2\">\n                    Login With Google\n                </a>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ }),

/***/ "./src/app/signin/signin.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var util_service_1 = __webpack_require__("./src/app/services/util.service.ts");
var ajax_service_1 = __webpack_require__("./src/app/services/ajax.service.ts");
var auth_service_1 = __webpack_require__("./src/app/auth/auth.service.ts");
var environment_1 = __webpack_require__("./src/environments/environment.ts");
var SigninComponent = /** @class */ (function () {
    function SigninComponent(ajax, util, auth) {
        this.ajax = ajax;
        this.util = util;
        this.auth = auth;
        this.initJSON();
    }
    SigninComponent.prototype.initJSON = function () {
        this.loginJSON = {
            "register": {
                "appName": environment_1.environment.APP_NAME,
                "name": "",
                "email": "",
                "password": "",
                "location": {
                    "city": "",
                    "latitude": 0.0,
                    "longitude": 0.0
                },
                "token": "",
                "remember": ""
            },
            "login": {
                "email": "",
                "password": "",
                "appName": environment_1.environment.APP_NAME,
                "remember": ""
            },
            "cities": [],
            "loginFormVeiw": 0,
            "errors": []
        };
        console.info("@initJSON..", this.loginJSON);
    };
    SigninComponent.prototype.ngOnInit = function () {
        if (document.cookie && localStorage.getItem("socialLogin") == "true") {
            var decodedCookie = decodeURIComponent(document.cookie);
            var cookies = decodedCookie.split(';');
            console.info("document.cookie array --- ", cookies);
            var keyvals = void 0;
            for (var i = 0; i < cookies.length; i++) {
                keyvals = cookies[i].split("=");
                console.info("keyvals--", keyvals);
                if (keyvals[0].trim() == "token") {
                    localStorage.setItem("token", keyvals[1]);
                }
                else if (keyvals[0].trim() == "refreshToken") {
                    localStorage.setItem("refreshToken", keyvals[1]);
                }
                else if (keyvals[0].trim() == "user") {
                    localStorage.setItem("user", keyvals[1]);
                }
            }
            if (this.auth.isLoggedIn()) {
                this.util.getRouter().navigate([environment_1.environment.ROUTE_HOME]);
            }
        }
        this.fetchCities();
    };
    SigninComponent.prototype.login = function () {
        var _this = this;
        this.loginJSON.errors = [];
        console.info("@login..", this.loginJSON.login);
        this.ajax.apiCall_POST(this.loginJSON.login, environment_1.environment.API_LOGIN)
            .subscribe(function (data) {
            if (data.status) {
                localStorage.setItem("user", data.user);
                localStorage.setItem("token", data.token);
                localStorage.setItem("refreshToken", data.refreshToken);
                _this.util.getRouter().navigate([environment_1.environment.ROUTE_HOME]);
            }
            else {
                _this.loginJSON.errors = data.errors;
            }
        }, function (error) {
            console.info("error.status:: ", error.status);
            _this.loginJSON.errors = error;
        });
    };
    SigninComponent.prototype.register = function () {
        var _this = this;
        this.loginJSON.errors = [];
        console.info("@register..", this.loginJSON.register);
        this.ajax.apiCall_POST(this.loginJSON.register, environment_1.environment.API_REGISTER)
            .subscribe(function (data) {
            if (data.status) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                localStorage.setItem("refreshToken", data.refreshToken);
                _this.util.getRouter().navigate([environment_1.environment.ROUTE_HOME]);
            }
            else {
                _this.loginJSON.errors = data.errors;
            }
        }, function (error) {
            console.info("error.status:: ", error.status);
            _this.loginJSON.errors = error;
        });
    };
    SigninComponent.prototype.forgot = function () {
    };
    SigninComponent.prototype.fetchCities = function () {
        var _this = this;
        console.info("@fetchCities..");
        this.ajax.apiCall_GET({}, environment_1.environment.API_CITIES_INDIA)
            .subscribe(function (data) {
            _this.loginJSON.cities = data.cities;
        }, function (error) {
            console.info("error.status:: ", error.status);
        });
    };
    SigninComponent.prototype.googleLogin = function () {
        localStorage.setItem("socialLogin", "true");
        window.location.href = "/auth/google";
    };
    SigninComponent = __decorate([
        core_1.Component({
            selector: 'app-signin',
            template: __webpack_require__("./src/app/signin/signin.component.html"),
            styles: [__webpack_require__("./src/app/signin/signin.component.css")]
        }),
        __metadata("design:paramtypes", [ajax_service_1.AjaxService, util_service_1.UtilService, auth_service_1.AuthService])
    ], SigninComponent);
    return SigninComponent;
}());
exports.SigninComponent = SigninComponent;


/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    production: true,
    MAP_KEY: 'AIzaSyAcV5MCnHAvcYREiHZfZR58oMTs_msaJvc',
    DEFAULT_MAP_SETTINGS: {
        "lat": 32.715738,
        "lng": -117.161084,
        "zoom": 18,
        "geofeneZoom": 21,
        "pov": {
            heading: 360,
            pitch: 10
        },
        "streetViewDefaultPosition": { lat: 42.345573, lng: -71.098326 }
    },
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
    ROUTE_UNKNOWN: 'unknown',
    ROUTE_HOME: 'home',
    ROUTE_IDEAS: 'ideas',
    ROUTE_ADD_IDEA: 'ideas/add',
    ROUTE_EDIT_IDEA: "ideas/edit/:id",
    ROUTE_SHARE_IDEA: "ideas/share/:id",
    ROUTE_ACTIVITY: "activity",
    ROUTE_LIVE: "live",
    // api paths --
    apiHost: 'https://api.somedomain.com/prod/v1/',
    API_LOGIN: '/login/v1',
    API_REGISTER: '/register/v1',
    API_REFRESH: "/refresh/v1",
    API_INVALID_PATH: "/indalid",
    CONFIG_API: "/api/config",
    ROUTE_CONFIG_API: "/getrouteconfigs/",
    API_CITIES_INDIA: "/india/cities",
    REFRESH_API: "/api/refresh",
    API_SAVE_IDEAS: "/save/idea/v1",
    API_LIST_PUBLIC_IDEAS: "/list/ideas/v1",
    API_LIST_USER_IDEAS: "/list/user/ideas/v1",
    API_DELETE_IDEA: "/ideas/delete/v1/",
    API_USER_DRIVE: "/user/drive/v1",
    API_USER_DRIVE_MILESTONES: "/user/drive/milestones/v1",
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
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var platform_browser_dynamic_1 = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
var app_module_1 = __webpack_require__("./src/app/app.module.ts");
var environment_1 = __webpack_require__("./src/environments/environment.ts");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule)
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map