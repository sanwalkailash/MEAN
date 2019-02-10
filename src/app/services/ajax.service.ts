import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { retry } from 'rxjs/operators';
import {environment} from '../../environments/environment';
import { UtilService } from './util.service';

import { Router }             from '@angular/router';
import * as Crypto            from 'crypto-js/md5';
import * as moment from 'moment';
import {  Headers, Response, RequestOptions }        from '@angular/http';
import 'rxjs/Rx';
import { TokeninterceptorService }                   from '../auth/token-interceptor.service';


@Injectable()
export class AjaxService {
  private httpClient;
  constructor(private util: UtilService) {
  }
  // ajax calls --
  login(body: any): Observable<any> {
    return this.util.getHttpClient().post(environment.API_LOGIN, body)
  }

  contactUs(body: any): Observable<any> {
      return this.util.getHttpClient().post(environment.API_LOGIN, body)
    }

  retryGeocode(body:any):Observable<any>{
    return this.util.getHttpClient().put("const",body)
  }


  getApiCall(countries: string, page: number, pageSize: number,key:string): Observable<any> { // we will use isSearch=true for search
    return this.util.getHttpClient().get("api consta" + "?countryNames=" + countries + "&page=" + page + "&pageSize=" + pageSize + "&key=" + key);
  }

  refreshToken(token:string):Observable<any> {
    console.log("Refresh Token Reached");
    const body = { refreshToken: token };
    return this.util.getHttpClient().post(environment.REFRESH_API, body, )
  }
  // ajax calls ends --


  apiCall_GET(perameterjson, apiPath) {
    console.log("perameter json for get call is ",perameterjson);
    let token = localStorage.getItem('auth_token');
    const headers = new Headers({ "auth_token": token });
    let options = new RequestOptions({ headers: headers });
    let url=environment.API_INVALID_PATH;

    switch(apiPath) {
        case environment.API_LOGIN:
            url = environment.API_LOGIN+'?userid='+perameterjson.userid+"&startIndex="+perameterjson.startIndex+"&pageSize="+perameterjson.pageSize;
            break;
        default:
            console.error("ERROR -- : @apiCall_GET api path not added.");
    }

    console.log("called api ["+url+"]");
    return this.util.getHttpClient().get(url)
    .map((res: Response) => res.json())
    .catch((error: Response) => Observable.throw(error || 'Server error'));
  }

  apiCall_PUT(data, apiPath) {
    console.log("put data ",data);
    let url=environment.API_INVALID_PATH;

    switch(apiPath) {
        case environment.API_LOGIN:
            url = environment.API_LOGIN;
            break;
        default:
            console.error("ERROR -- : @apiCall_PUT api path not added.");
    }

    console.log("called api ["+url+"]");
    return this.util.getHttpClient().put(url, data)
    .map((res: Response) => res.json())
    .catch((error: Response) => Observable.throw(error || 'Server error'));
  }

  apiCall_POST(data, apiPath) {
    console.log("post data ",data);
    let token = localStorage.getItem('auth_token');
    let url=environment.API_INVALID_PATH;

    switch(apiPath) {
        case environment.API_LOGIN:
            url = environment.API_LOGIN;
            break;
        default:
            console.error("ERROR -- : @apiCall_PUT api path not added.");
    }

    console.log("called api ["+url+"]");
    return this.util.getHttpClient().post(url, data)
    .map((res: Response) => res.json())
    .catch((error: Response) => Observable.throw(error || 'Server error'));
  }

}
