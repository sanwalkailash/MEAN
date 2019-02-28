import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from "@angular/router";
import { Injectable, Injector } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable()
export class UtilService {

  constructor(private injector: Injector) { }

  getEnvironmentConstants():any {
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

  public getActiveRoute():ActivatedRoute{
    return this.injector.get(ActivatedRoute);
  }

  public refreshComponent(route){
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

  public logOut():void{
    localStorage.clear();
    this.getRouter().navigate(['/login']);
  }

  public getHttpClient(): HttpClient { //this creates router property on your service.
    return this.injector.get(HttpClient);
  }

  public getAuthToken(): any {
    return localStorage.getItem('token');
  }

  public saveToStorage(key: string, value: any): void {
    if(typeof value == 'object'){
      localStorage.setItem(key, JSON.stringify(value));
    }else {
      localStorage.setItem(key, value);
    }
  }

  public getFromStorage(key:string): any {
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
    if(typeof value == 'object'){
      localStorage.setItem(key, JSON.stringify(value));
    }else {
      localStorage.setItem(key, value);
    }
  }

  public getDataFromStorageUsingKey(key:string): any {
    return JSON.parse(localStorage.getItem(key));
  }




}
