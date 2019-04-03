import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {UtilService} from './util.service';
import {Response} from '@angular/http';
import 'rxjs/Rx';


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

    retryGeocode(body: any): Observable<any> {
        return this.util.getHttpClient().put("const", body)
    }


    getApiCall(countries: string, page: number, pageSize: number, key: string): Observable<any> { // we will use isSearch=true for search
        return this.util.getHttpClient().get("api consta" + "?countryNames=" + countries + "&page=" + page + "&pageSize=" + pageSize + "&key=" + key);
    }

    refreshToken(token: string): Observable<any> {
        console.log("Refresh Token Reached");
        const body = {refreshToken: token};
        return this.util.getHttpClient().post(environment.REFRESH_API, body,)
    }

    // ajax calls ends --


    apiCall_GET(perameterjson, apiPath) {
        console.log("perameter json for get call is ", perameterjson);
        let url = environment.API_INVALID_PATH;
        switch (apiPath) {
            case environment.API_LIST_USER_IDEAS:
                url = environment.API_LIST_USER_IDEAS + "?page=" + perameterjson.page + "&id=" + perameterjson.id;
                break;
            case environment.API_LIST_PUBLIC_IDEAS:
                url = environment.API_LIST_PUBLIC_IDEAS + "?page=" + perameterjson.page + "&id=" + perameterjson.id;
                break;
            case environment.API_CITIES_INDIA:
                url = environment.API_CITIES_INDIA;
                break;
            default:
                console.error("ERROR -- : @apiCall_GET api path not added.");
                return Observable.throw("api path not added.");
        }
        console.log("called api [" + url + "]");
        return this.util.getHttpClient().get(url)
            .catch((error: Response) => Observable.throw(error || 'Server error'));
    }

    apiCall_DELETE(data, apiPath) {
        console.log("apiCall_DELETE data ", data);
        let url = environment.API_INVALID_PATH;

        switch (apiPath) {
            case environment.API_DELETE_IDEA:
                url = environment.API_DELETE_IDEA + data._id;
                break;
            default:
                console.error("ERROR -- : @apiCall_DELETE api path not added.");
                return Observable.throw("api path not added.");
        }
        console.log("called api [" + url + "]");
        return this.util.getHttpClient().delete(url)
            .catch((error: Response) => Observable.throw(error || 'Server error'));
    }

    apiCall_PUT(data, apiPath) {
        console.log("put data ", data);
        let url = environment.API_INVALID_PATH;

        switch (apiPath) {
            case environment.API_DELETE_IDEA:
                url = environment.API_DELETE_IDEA;
                break;
            default:
                console.error("ERROR -- : @apiCall_PUT api path not added.");
                return Observable.throw("api path not added.");
        }
        console.log("called api [" + url + "]");
        return this.util.getHttpClient().put(url, data)
            .catch((error: Response) => Observable.throw(error || 'Server error'));
    }

    apiCall_POST(data, apiPath) {
        console.log("post data ", data);
        console.log("post apiPath ", apiPath);
        let url = environment.API_INVALID_PATH;
        switch (apiPath) {
            case environment.API_LOGIN:
                url = environment.API_LOGIN;
                break;
            case environment.API_SAVE_IDEAS:
                url = environment.API_SAVE_IDEAS;
                break;
            case environment.API_REGISTER:
                url = environment.API_REGISTER;
                break;
            case environment.API_REFRESH:
                url = environment.API_REFRESH;
                break;
            default:
                console.error("ERROR -- : @apiCall_POST api path not added.");
                return Observable.throw("api path not added.");
        }
        console.log("called api [" + url + "]");
        return this.util.getHttpClient().post(url, data)
            .catch((error: Response) => Observable.throw(error || 'Server error'));
    }

}
