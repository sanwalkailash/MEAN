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
var routes = [
    { path: 'login', component: signin_component_1.SigninComponent },
    { path: 'home', component: home_component_1.HomeComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: environment_1.environment.ROUTE_IDEAS, component: ideas_component_1.IdeasComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: environment_1.environment.ROUTE_ADD_IDEA, component: ideas_component_1.IdeasComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: environment_1.environment.ROUTE_EDIT_IDEA, component: ideas_component_1.IdeasComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: environment_1.environment.ROUTE_SHARE_IDEA, component: ideas_component_1.IdeasComponent, canActivate: [auth_guard_1.AuthGuard] },
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

module.exports = "<app-header></app-header>\n<app-message></app-message>\n<router-outlet></router-outlet>\n<h1>\n    {{Notification}}\n</h1>\n<app-footer></app-footer>\n"

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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        var _this = this;
        this.title = 'ImLive';
        this.userLocation = {
            "lat": 0.0,
            "lng": 0.0
        };
        this.showError = function (error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    _this.Notification = "User denied the request for Geolocation.";
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
            _this.userLocation.lat = position.coords.latitude;
            _this.userLocation.lng = position.coords.longitude;
            localStorage.setItem("userLoc", JSON.stringify(_this.userLocation));
        };
    }
    AppComponent.prototype.ngOnInit = function () {
        localStorage.setItem("userLoc", JSON.stringify(this.userLocation));
        this.getLocation();
    };
    AppComponent.prototype.getLocation = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setUserLocation, this.showError);
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
        })
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
var broatcast_service_1 = __webpack_require__("./src/app/services/broatcast.service.ts");
var app_routing_module_1 = __webpack_require__("./src/app/app-routing.module.ts");
var footer_component_1 = __webpack_require__("./src/app/footer/footer.component.ts");
var header_component_1 = __webpack_require__("./src/app/header/header.component.ts");
var message_component_1 = __webpack_require__("./src/app/message/message.component.ts");
var signin_component_1 = __webpack_require__("./src/app/signin/signin.component.ts");
var page_not_found_component_1 = __webpack_require__("./src/app/page-not-found/page-not-found.component.ts");
var home_component_1 = __webpack_require__("./src/app/home/home.component.ts");
var ideas_component_1 = __webpack_require__("./src/app/ideas/ideas.component.ts");
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
                ideas_component_1.IdeasComponent
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
                broatcast_service_1.BroadcastService,
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
var AuthService = /** @class */ (function () {
    function AuthService() {
        this.isLoggedIn = function () {
            console.info("@isLoggedIn token--", localStorage.getItem("token"));
            if (localStorage.getItem("token") !== null) {
                return true;
            }
            return false;
        };
    }
    AuthService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
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
__webpack_require__("./node_modules/rxjs/_esm5/Rx.js");
var TokeninterceptorService = /** @class */ (function () {
    function TokeninterceptorService(inj, util) {
        this.inj = inj;
        this.util = util;
        this.appRefreshUnderWay = false;
        this.cachedRequests = [];
        this.ajaxService = inj.get(ajax_service_1.AjaxService);
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
            this.util.logOut();
            return null;
        }
        this.cachedRequests.push(req);
        console.info("saving unauthrized call to cache, now total cashed request are ", this.cachedRequests.length);
        if (!this.appRefreshUnderWay && !this.util.isVoid(localStorage.getItem("refresh_token"))) {
            environment_1.environment.APP_REFRESH_COUNT++;
            this.appRefreshUnderWay = true;
            // this.refreshApp.refreshToken(localStorage.getItem("refresh_token"))
            var body = { refreshToken: localStorage.getItem("refresh_token") };
            this.util.getHttpClient().post(environment_1.environment.REFRESH_API, body).subscribe(function (data) {
                console.info(environment_1.environment.APP_REFRESH_COUNT, "th refresh called,response", data);
                _this.util.setKeyVauleOnlocalStorage("token", data.data.response.token);
                _this.util.setKeyVauleOnlocalStorage("refresh_token", data.data.response.refreshToken);
                _this.retryFailedRequests(subscriber, next);
            }, function (err) { return function () {
                console.info("refres failed, ", environment_1.environment.APP_REFRESH_COUNT, "times.");
                if (environment_1.environment.APP_REFRESH_COUNT == 1) {
                    _this.appRefreshUnderWay = false;
                }
            }; }, function () {
                console.info("refres done successfully..");
            });
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

module.exports = "\n.footer {\n    width: 100%;\n    padding:18px 0;\n    background: #f6f6f6;\n\tposition:relative;\n\tbottom:0;\n\tz-index:9;\n\tmargin-top:37px;\n}\n.footer p {\n    text-align: center;\n    font-size: 10px;\n    color: #999;\n    font-weight: 600;\n\n}\n"

/***/ }),

/***/ "./src/app/footer/footer.component.html":
/***/ (function(module, exports) {

module.exports = "<footer class=\"footer\" style=\"position:absolute;bottom:0px;margin:auto;\">\n  <p>&copy; 2019 travelline All rights reserved |  Powered By Pahadi.Me.</p>\n  <div>\n    <button>\n      <i class=\"material-icons \">add_box</i>\n    </button>\n    <button>\n      <i class=\"material-icons \">add_comment</i>\n    </button>\n  </div>\n</footer>\n"

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

module.exports = "<nav class=\"navbar navbar-expand-sm navbar-light bg-light mb-3\">\n    <a class=\"navbar-brand\" href=\"/\"><img class=\"icon\" src=\"assets/images/company-logo/logo.png\" alt=\"travelline\" /></a>\n    <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarTogglerDemo02\" aria-controls=\"navbarTogglerDemo02\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n        <span class=\"navbar-toggler-icon\"></span>\n    </button>\n    <div class=\"collapse navbar-collapse\" id=\"navbarTogglerDemo02\">\n        <ul class=\"navbar-nav mr-auto mt-2 mt-lg-0\">\n            <li class=\"nav-item active\">\n                <a class=\"nav-link\" href=\"/\">Home <span class=\"sr-only\">(current)</span></a>\n            </li>\n            <li class=\"nav-item\">\n                <a class=\"nav-link\" href=\"#/ideas\">Idea</a>\n            </li>\n            <li class=\"nav-item\">\n                <a class=\"nav-link\" href=\"#/ideas\">Live</a>\n            </li>\n        </ul>\n        <form class=\"form-inline my-2 my-lg-0\">\n            <input class=\"form-control mr-sm-2\" type=\"search\" placeholder=\"Search\">\n            <button class=\"btn btn-outline-success my-2 my-sm-0\" type=\"submit\">Search</button>\n        </form>\n    </div>\n</nav>"

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
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent() {
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-header',
            template: __webpack_require__("./src/app/header/header.component.html"),
            styles: [__webpack_require__("./src/app/header/header.component.css")]
        }),
        __metadata("design:paramtypes", [])
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

module.exports = "<p>\n  home works!\n</p>\n"

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
var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            template: __webpack_require__("./src/app/home/home.component.html"),
            styles: [__webpack_require__("./src/app/home/home.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;


/***/ }),

/***/ "./src/app/ideas/ideas.component.css":
/***/ (function(module, exports) {

module.exports = ".card-link{\ncolor:#28a745;\ncursor:default;\n}"

/***/ }),

/***/ "./src/app/ideas/ideas.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\" *ngIf=\"ideaJSON.errors.length>0\">\n  <p *ngFor=\" let error of ideaJSON.errors\">{{error}} <br/></p>\n  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n</div>\n\n<!--edit idea-->\n<div class=\"card card-body\" *ngIf=\"ideaJSON.viewCode==1\">\n  <h3>Whats your Idea ?</h3>\n  <form>\n    <div class=\"form-group\">\n      <label for=\"title\">Title</label>\n      <input type=\"text\" class=\"form-control\" name=\"title\" [(ngModel)]=\"ideaJSON.idea.title\" required>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"details\">Details</label>\n      <textarea class=\"form-control\" name=\"details\" [(ngModel)]=\"ideaJSON.idea.details\" required></textarea>\n    </div>\n    <button type=\"submit\" (click)=\"saveIdea()\" class=\"btn btn-primary\">Submit</button>\n  </form>\n</div>\n\n<!--list ideas -->\n\n<div class=\"card card-body\"\n     id=\"ideasDiv\"\n     style=\"height: 80vh;\n        overflow: scroll;\"\n     *ngIf=\"ideaJSON.viewCode==0\">\n  <h3 class=\"mb-2\">\n    Trending Ideas\n    <b (click)=\"newIdea()\" class=\" btn btn-primary\">\n      <i class=\"material-icons \">add_box</i>\n    </b>\n  </h3>\n\n  <div  *ngFor=\" let idea of ideaJSON.ideas \">\n    <div class=\"card\" (click)=\"addView(idea)\">\n      <div class=\"card-body\">\n        <div style=\"float:right;width:fit-content;right:10px;position: absolute;\">\n          <span  class=\"card-link\" >\n            <span>{{idea.views}}</span>\n            <i class=\"material-icons\">\n              face\n            </i>\n          </span>\n          <span  (click)=\"editIdea(idea)\"  class=\"card-link\" >\n            <i class=\"material-icons\">\n              edit\n            </i>\n          </span>\n          <span  (click)=\"deleteIdea(idea)\"  class=\"card-link\" >\n            <i class=\"material-icons\">\n              delete\n            </i>\n          </span>\n          <span  (click)=\"markPublic(idea)\"  class=\"card-link\" >\n            <i class=\"material-icons\">\n              public\n            </i>\n          </span>\n        </div>\n        <h5 class=\"card-title\">{{idea.title}}</h5>\n        <h6 class=\"card-subtitle mb-2 text-muted\">\n          {{idea.created_at}}\n\n        </h6>\n        <p class=\"card-text\">{{idea.details}}</p>\n        <b  (click)=\"addLike(idea)\" class=\"card-link\">\n          <span>{{idea.like}}</span>\n          <i class=\"material-icons\">\n            thumb_up_alt\n          </i>\n        </b>\n        <b  class=\"card-link\">\n          <i class=\"material-icons\">\n            rate_review\n          </i>\n        </b>\n        <span class=\"card-link\" (click)=\"shareIdea(idea)\" >\n          <i class=\"material-icons\">\n            share\n          </i>\n        </span>\n        <b class=\"card-link\"  (click)=\"_getDirectionsInGoogleMap(idea.lat,idea.lng)\" >\n          <i class=\"material-icons\">\n            directions\n          </i>\n        </b>\n      </div>\n\n    </div>\n  </div>\n  <div *ngIf=\"ideaJSON.ideas.length==0\">\n    No Ideas So Far\n\n  </div>\n</div>\n\n<!--share idea -->\n<div class=\"container md\"\n     id=\"shareDiv\"\n     style=\"height: 80vh;\n        overflow: scroll;\"\n     *ngIf=\"ideaJSON.viewCode==2\">\n  <div >\n    <div class=\"card\" (click)=\"addView(ideaJSON.ideas)\">\n      <!--list ideas -->\n      <div class=\"card-body\">\n        <div style=\"float:right;width:fit-content;right:10px;position: absolute;\">\n          <span  class=\"card-link\" >\n            <span>{{ideaJSON.ideas.views}}</span>\n            <i class=\"material-icons\">\n              face\n            </i>\n          </span>\n          <span  (click)=\"editIdea(ideaJSON.ideas)\"  class=\"card-link\" >\n            <i class=\"material-icons\">\n              edit\n            </i>\n          </span>\n          <span  (click)=\"deleteIdea(ideaJSON.ideas)\"  class=\"card-link\" >\n            <i class=\"material-icons\">\n              delete\n            </i>\n          </span>\n          <span  (click)=\"markPublic(ideaJSON.ideas)\"  class=\"card-link\" >\n            <i class=\"material-icons\">\n              public\n            </i>\n          </span>\n        </div>\n        <h5 class=\"card-title\">{{ideaJSON.ideas.title}}</h5>\n        <h6 class=\"card-subtitle mb-2 text-muted\">\n          {{ideaJSON.ideas.created_at}}\n\n        </h6>\n        <p class=\"card-text\">{{ideaJSON.ideas.details}}</p>\n        <b  (click)=\"addLike(ideaJSON.ideas)\" class=\"card-link\">\n          <span>{{ideaJSON.ideas.like}}</span>\n          <i class=\"material-icons\">\n            thumb_up_alt\n          </i>\n        </b>\n        <b  class=\"card-link\">\n          <i class=\"material-icons\">\n            rate_review\n          </i>\n        </b>\n        <span class=\"card-link\" (click)=\"shareIdea(ideaJSON.ideas)\" >\n          <i class=\"material-icons\">\n            share\n          </i>\n        </span>\n        <b class=\"card-link\"  (click)=\"_getDirectionsInGoogleMap(ideaJSON.ideas.lat,ideaJSON.ideas.lng)\" >\n          <i class=\"material-icons\">\n            directions\n          </i>\n        </b>\n      </div>\n    </div>\n  </div>\n</div>"

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
var IdeasComponent = /** @class */ (function () {
    function IdeasComponent(ajax, util, location) {
        this.ajax = ajax;
        this.util = util;
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
                "id": "",
                "uid": "",
                "title": "",
                "details": "",
                "lat": "",
                "lng": "",
                "created_at": "",
                "like": 0,
                "views": 0
            },
            "errors": [],
            "activeRoute": this.util.getCurrentRoutePath(),
            "ideas": [],
            "viewCode": 0
        };
        console.info("this.ideaJSON", this.ideaJSON);
    };
    IdeasComponent.prototype.setAppFlow = function () {
        console.warn("this.ideaJSON.activeRoute........", this.ideaJSON.activeRoute);
        if (this.ideaJSON.activeRoute == environment_1.environment.ROUTE_IDEAS) {
            this.ideaJSON.viewCode = 0;
            this.fetchIdeas();
        }
        if (this.ideaJSON.activeRoute.substring(0, 11) == "ideas/edit") {
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
    };
    IdeasComponent.prototype.deleteIdea = function (idea) {
        var _this = this;
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
        if (!this.util.isVoid(this.userLoc)) {
            console.info("saving device location", this.userLoc);
            this.ideaJSON.idea.lat = this.userLoc.lat;
            this.ideaJSON.idea.lng = this.userLoc.lng;
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
        this.ajax.apiCall_GET({ page: page, id: _id }, environment_1.environment.API_LIST_IDEAS)
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
    IdeasComponent = __decorate([
        core_1.Component({
            selector: 'app-ideas',
            template: __webpack_require__("./src/app/ideas/ideas.component.html"),
            styles: [__webpack_require__("./src/app/ideas/ideas.component.css")]
        }),
        __metadata("design:paramtypes", [ajax_service_1.AjaxService, util_service_1.UtilService, common_1.Location])
    ], IdeasComponent);
    return IdeasComponent;
}());
exports.IdeasComponent = IdeasComponent;


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
            case environment_1.environment.API_LIST_IDEAS:
                url = environment_1.environment.API_LIST_IDEAS + "?page=" + perameterjson.page + "&id=" + perameterjson.id;
                break;
            case environment_1.environment.API_CITIES_INDIA:
                url = environment_1.environment.API_CITIES_INDIA;
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

/***/ "./src/app/services/broatcast.service.ts":
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
    BroadcastService.prototype.clearMessage = function (key, a) {
        a[key].next();
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
var broatcast_service_1 = __webpack_require__("./src/app/services/broatcast.service.ts");
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
        __metadata("design:paramtypes", [util_service_1.UtilService, broatcast_service_1.BroadcastService])
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
    UtilService.prototype.logOut = function () {
        localStorage.clear();
        this.getRouter().navigate(['/login']);
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

module.exports = "<div class=\"container\">\n  <div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\" *ngIf=\"loginJSON.errors.length>0\">\n    <p *ngFor=\" let error of loginJSON.errors\">{{error}} <br/></p>\n    <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n  </div>\n  <div class=\"card \" style=\"max-width: 500px;margin: auto;\">\n    <div class=\"card-body\">\n      <div class=\"logo_continer_home\">\n        <a href=\"#\"><img src=\"assets/images/company-logo/logo.png\" alt=\"EXL Services\" /></a>\n      </div>\n      <div class=\"input_form\">\n        <h4 style=\"padding-bottom:0;\">Log In</h4>\n        <span class=\"tagline_short height_sht\">\n            Please log In to proceed....\n        </span>\n        <!--login box-->\n        <form class=\"px-4 py-3\" *ngIf=\"loginJSON.loginFormVeiw==0\">\n          <div class=\"form-group\" >\n            <label for=\"exampleDropdownFormEmail1\">Email address</label>\n            <input type=\"email\" class=\"form-control\" id=\"exampleDropdownFormEmail1\"\n                   [(ngModel)]=\"loginJSON.login.email\" name=\"email\" placeholder=\"email@example.com\" required>\n          </div>\n          <div class=\"form-group\" *ngIf=\"loginJSON.loginFormVeiw==0\">\n            <label for=\"exampleDropdownFormPassword1\">Password</label>\n            <input type=\"password\" class=\"form-control\" id=\"exampleDropdownFormPassword1\"\n                   [(ngModel)]=\"loginJSON.login.password\" name=\"pass\" placeholder=\"Password\" required>\n          </div>\n          <div class=\"form-check\" *ngIf=\"loginJSON.loginFormVeiw==0\">\n            <input type=\"checkbox\" class=\"form-check-input\" id=\"dropdownCheck\">\n            <label class=\"form-check-label\" for=\"dropdownCheck\">\n              Remember me\n            </label>\n          </div>\n          <button type=\"submit\" (click)=\"login()\" class=\"btn btn-primary\"> Sign in</button>\n        </form>\n        <!--sign up form-->\n        <form class=\"px-4 py-3\" *ngIf=\"loginJSON.loginFormVeiw==1\">\n          <div class=\"form-group\" >\n            <label for=\"exampleDropdownFormEmail1\">Name</label>\n            <input type=\"email\" class=\"form-control\" id=\"exampleDropdownFormname\"\n                   [(ngModel)]=\"loginJSON.register.name\" name=\"name\" placeholder=\"John Singh\" required>\n          </div>\n          <div class=\"form-group\" >\n            <label for=\"exampleDropdownFormEmail1\">Email address</label>\n            <input type=\"email\" class=\"form-control\" id=\"exampleDropdownFormEmail1\"\n                   [(ngModel)]=\"loginJSON.register.email\" name=\"email\" placeholder=\"email@example.com\" required>\n          </div>\n          <div class=\"form-group\" *ngIf=\"loginJSON.loginFormVeiw==0 || loginJSON.loginFormVeiw==1\">\n            <label for=\"exampleDropdownFormPassword1\">Password</label>\n            <input type=\"password\" class=\"form-control\" id=\"exampleDropdownFormPassword1\"\n                   [(ngModel)]=\"loginJSON.register.password\" name=\"pass\" placeholder=\"Password\" required>\n          </div>\n          <div class=\"form-check\" *ngIf=\"loginJSON.loginFormVeiw==0\">\n            <input type=\"checkbox\" class=\"form-check-input\" id=\"dropdownCheck\">\n            <label class=\"form-check-label\" for=\"dropdownCheck\">\n              Remember me\n            </label>\n          </div>\n          <select *ngIf=\"loginJSON.loginFormVeiw==1\"  class=\"input-subdomain_form margin-t\"\n                  [(ngModel)]=\"loginJSON.register.location\" name=\"loc\" required>\n            <option *ngFor=\"let city of loginJSON.cities\">{{city.city}}</option>\n          </select>\n          <button type=\"submit\" (click)=\"register()\"  class=\"btn btn-primary\"> Sign up</button>\n        </form>\n        <!--forgot password form -->\n        <form class=\"px-4 py-3\" *ngIf=\"loginJSON.loginFormVeiw==2\">\n          <div class=\"form-group\" >\n            <label for=\"exampleDropdownFormEmail1\">Email address</label>\n            <input type=\"email\" class=\"form-control\" id=\"exampleDropdownFormEmail1\"\n                   [(ngModel)]=\"loginJSON.login.email\" name=\"email\" placeholder=\"email@example.com\" required>\n          </div>\n          <button type=\"submit\" (click)=\"forgot()\"  class=\"btn btn-primary\">Send Link</button>\n        </form>\n        <div class=\"dropdown-divider\"></div>\n        <a class=\"dropdown-item\" href=\"#/login\" *ngIf=\"loginJSON.loginFormVeiw==0\" (click)=\"loginJSON.loginFormVeiw=1\">New around here? Sign up</a>\n        <a class=\"dropdown-item\" href=\"#/login\" *ngIf=\"loginJSON.loginFormVeiw==1\" (click)=\"loginJSON.loginFormVeiw=0\">Have account? Sign in</a>\n        <a class=\"dropdown-item\" href=\"#/login\"  *ngIf=\"loginJSON.loginFormVeiw!=2\" (click)=\"loginJSON.loginFormVeiw=2\">Forgot password?</a>\n      </div>\n    </div>\n  </div>\n</div>\n"

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
var environment_1 = __webpack_require__("./src/environments/environment.ts");
var SigninComponent = /** @class */ (function () {
    function SigninComponent(ajax, util) {
        this.ajax = ajax;
        this.util = util;
        this.initJSON();
    }
    SigninComponent.prototype.initJSON = function () {
        this.loginJSON = {
            "register": {
                "uid": 0,
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
                "remember": ""
            },
            "cities": [],
            "loginFormVeiw": 0,
            "errors": []
        };
        console.info("@initJSON..", this.loginJSON);
    };
    SigninComponent.prototype.ngOnInit = function () {
        this.fetchCities();
    };
    SigninComponent.prototype.login = function () {
        var _this = this;
        this.loginJSON.errors = [];
        console.info("@login..", this.loginJSON.login);
        this.ajax.apiCall_POST(this.loginJSON.login, environment_1.environment.API_LOGIN)
            .subscribe(function (data) {
            if (data.status) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                _this.util.getRouter().navigate(['/home']);
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
                _this.util.getRouter().navigate(['/home']);
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
    SigninComponent = __decorate([
        core_1.Component({
            selector: 'app-signin',
            template: __webpack_require__("./src/app/signin/signin.component.html"),
            styles: [__webpack_require__("./src/app/signin/signin.component.css")]
        }),
        __metadata("design:paramtypes", [ajax_service_1.AjaxService, util_service_1.UtilService])
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
    // api paths --
    apiHost: 'https://api.somedomain.com/prod/v1/',
    API_LOGIN: '/login/v1',
    API_REGISTER: '/register/v1',
    API_INVALID_PATH: "/indalid",
    CONFIG_API: "/api/config",
    ROUTE_CONFIG_API: "/getrouteconfigs/",
    API_CITIES_INDIA: "/india/cities",
    REFRESH_API: "/api/refresh",
    API_SAVE_IDEAS: "/save/idea/v1",
    API_LIST_IDEAS: "/list/ideas/v1",
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