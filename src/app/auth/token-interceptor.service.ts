import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';
import {environment} from '../../environments/environment';
import {UtilService} from '../services/util.service';
import {AjaxService} from '../services/ajax.service';
import 'rxjs/Rx';

@Injectable()
export class TokeninterceptorService implements HttpInterceptor {
    refreshCount: number;
    private refreshApp;
    private ajaxService;
    private appRefreshUnderWay = false;
    cachedRequests: Array<HttpRequest<any>> = [];

    constructor(private inj: Injector, private util: UtilService) {
        this.ajaxService = inj.get(AjaxService);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // as we want to intercept the possible errors, instead of directly returning the request execution, we return an Observable to control EVERYTHING
        return new Observable<HttpEvent<any>>(subscriber => {

            // first try for the request
            next.handle(this.addParamsInRequest(req))
                .subscribe((event: HttpEvent<any>) => {
                        if (event instanceof HttpResponse) {
                            // the request went well and we have valid response
                            // give response to user and complete the subscription
                            subscriber.next(event);
                            subscriber.complete();
                        }
                    },
                    error => {
                        if (!this.util.isVoid(error.status)) {
                            switch (error.status) {
                                case 401:
                                case 419:
                                    console.info('@interceptor 401 error, trying to re-refresh');
                                    this.handle401Error(req, next, subscriber)
                                    break;
                                case 500:
                                case 504:
                                case 400:
                                    console.info('@interceptor 500/504 error, ignoring it. moving forward.');
                                    subscriber.next();
                                    subscriber.complete();
                                    break;
                                default:
                                    console.error("@interceptor unknown http error code ", error)
                                    subscriber.error(error);
                            }
                        } else {
                            console.error("@interceptor unknown error instance")
                            console.error("error ", error);
                            subscriber.error(error);
                            // this.util.infoOut();
                        }
                    });
        });
    }

    addParamsInRequest(req: HttpRequest<any>): HttpRequest<any> {
        if (!req.headers.has('Content-Type')) {
            req = req.clone({headers: req.headers.set('Content-Type', 'application/json')});
        }
        req = req.clone({headers: req.headers.set('locale', environment.APP_LOCALE)});
        req = req.clone({headers: req.headers.set('appname', environment.APP_NAME)});
        // console.info(req);
        const token: string = localStorage.getItem('token');
        if (token) {
            req = req.clone({headers: req.headers.set('Authorization', token)});
        } else {
            console.info("could not set token to header,not present.")
        }
        return req;
    }

    public retryFailedRequests(subscriber, next): void {
        console.info("@retryFailedRequests...")
        // retry the requests. this method can
        // be called after the token is refreshed
        if (this.cachedRequests.length && this.cachedRequests[this.cachedRequests.length - 1] != undefined) {
            next.handle(this.addParamsInRequest(this.cachedRequests[this.cachedRequests.length - 1]))
                .subscribe(newEvent => {
                    if (newEvent instanceof HttpResponse) {
                        // the second try went well and we have valid response
                        // give response to user and complete the subscription
                        subscriber.next(newEvent);
                        subscriber.complete();
                        console.info("refreshed api data successfully -", this.cachedRequests[this.cachedRequests.length - 1], "moving to next..");
                        this.cachedRequests.pop()
                        this.retryFailedRequests(subscriber, next);
                    }
                }, error => {
                    // second try went wrong -> throw error to subscriber
                    subscriber.error(error);
                    console.info("current api failed after refresh..")
                    // this.util.infoOut();
                }, () => {
                    console.info("finally for above ..")
                });
        } else {
            console.info("cleared cashe and reset refresh in progress to false")
            this.appRefreshUnderWay = false;
            this.cachedRequests = [];
            return;
        }

    }

    handle401Error(req: HttpRequest<any>, next: HttpHandler, subscriber: any): any {
        console.info("@handle401Error this.appRefreshUnderWayis ", this.appRefreshUnderWay)
        if (environment.APP_REFRESH_COUNT == 2) {
            console.info("refresh tries crossed threshhold. loggin out.");
            subscriber.error("reach max refresh calls. quiting..");
            environment.APP_REFRESH_COUNT = 0
            this.util.logOut();
            return null;
        }
        this.cachedRequests.push(req);
        console.info("saving unauthrized call to cache, now total cashed request are ", this.cachedRequests.length)
        if (!this.appRefreshUnderWay && !this.util.isVoid(localStorage.getItem("refreshToken"))) {
            environment.APP_REFRESH_COUNT++;
            this.appRefreshUnderWay = true;
            // this.refreshApp.refreshToken(localStorage.getItem("refresh_token"))
            const body = {refreshToken: localStorage.getItem("refreshToken")};
            this.util.getHttpClient().post(environment.API_REFRESH, body,).subscribe((data: any) => {
                    console.info(environment.APP_REFRESH_COUNT, "th refresh called,response", data);
                    this.util.setKeyVauleOnlocalStorage("token", data.token);
                    this.util.setKeyVauleOnlocalStorage("refreshToken", data.refreshToken);
                    this.retryFailedRequests(subscriber, next)
                },
                err => () => {
                    console.info("refres failed, ", environment.APP_REFRESH_COUNT, "times.")
                    if (environment.APP_REFRESH_COUNT == 1) {
                        this.appRefreshUnderWay = false;
                    }
                },
                () => {
                    console.info("refres done successfully..")
                })
        } else {
            console.info("refresh call under progress, saving current api call in cache.")
        }
    }
}
