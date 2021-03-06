import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from "@angular/router";
import {Injectable, Injector} from '@angular/core';
import {environment} from '../../environments/environment';
import {AjaxService} from "./ajax.service";

@Injectable()
export class UtilService {

    constructor(private injector: Injector) {
    }

    getEnvironmentConstants(): any {
        return environment;
    }

    public isVoid(obj) {
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
    }

    public getRouter(): Router { //this creates router property on your service.
        return this.injector.get(Router);
    }

    public getActiveRoute(): ActivatedRoute {
        return this.injector.get(ActivatedRoute);
    }

    public refreshComponent(route) {
        setTimeout(() => {
            this.getRouter().navigated = false;
            this.getRouter().navigate([this.getRouter().url]);
            console.warn("refreshed current route")
        }, 100);
    }

    getCurrentRoutePath() {
        const targetPath = this.getRouter().url.split('#/'); // "http://localhost:8888/#/ideas/add";
        return targetPath[targetPath.length - 1].substring(1); // [http://localhost:8888 , ideas/add]
    }

    public getHttpClient(): HttpClient { //this creates router property on your service.
        return this.injector.get(HttpClient);
    }

    public getAuthToken(): any {
        return localStorage.getItem('token');
    }

    public saveToStorage(key: string, value: any): void {
        if (typeof value == 'object') {
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            localStorage.setItem(key, value);
        }
    }

    public getFromStorage(key: string): any {
        return JSON.parse(localStorage.getItem(key));
    }

    public getAuthAppConfigFromStorage(): any {
        return JSON.parse(localStorage.getItem('config'));
    }


    public setAuthAppConfigInStorage(config: any): void {
        localStorage.setItem("config", JSON.stringify(config));
    }


    public getAuthAppVocabFromStorage(): any {
        return JSON.parse(localStorage.getItem('vocab'));
    }

    public setAuthAppVocabInStorage(vocab: any): void {
        localStorage.setItem("vocab", JSON.stringify(vocab));
    }


    public getAuthAppRouteDataFromStorage(): any {
        return JSON.parse(localStorage.getItem('routeData'));
    }

    public setAuthAppRouteDataInStorage(vocab: any): void {
        localStorage.setItem("routeData", JSON.stringify(vocab));
    }

    public setKeyVauleOnlocalStorage(key: string, value: any): void {
        if (typeof value == 'object') {
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            localStorage.setItem(key, value);
        }
    }

    public getDataFromStorageUsingKey(key: string): any {
        return JSON.parse(localStorage.getItem(key));
    }

    public readfile(event) {
        let fileObj = {
            "name":"",
            "type":"",
            "size":"",
            "lastModifiedDate":"",
            "result":""
        }
        fileObj.name = event.target.files[0].name;
        fileObj.type = event.target.files[0].type;
        fileObj.size = event.target.files[0].size;
        fileObj.lastModifiedDate = event.target.files[0].lastModifiedDate;
        var reader = new FileReader();
        reader.onload = (evt) => {
            console.info("reader object onload: ",evt)
            fileObj.result = evt.target["result"]
        };
        reader.readAsDataURL(event.target.files[0]);
        // console.info("fileSelected",this.util.uploadFile(event.target.files[0]))
        // console.info("fileObj",fileObj)
        return fileObj;
    }

}
