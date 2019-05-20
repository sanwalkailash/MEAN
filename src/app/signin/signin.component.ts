import {Component, OnInit} from '@angular/core';
import {UtilService} from '../services/util.service'
import {AjaxService} from '../services/ajax.service';
import {AuthService} from '../auth/auth.service';
import {environment} from '../../environments/environment';

declare const window:any;

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
    loginJSON: any;

    constructor(private ajax: AjaxService, private util: UtilService,private auth:AuthService) {
        this.initJSON()
    }

    initJSON() {

        this.loginJSON = {
            "register": {
                "appName": environment.APP_NAME,
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
                "appName": environment.APP_NAME,
                "remember": ""
            },
            "cities": [],
            "loginFormVeiw": 0,
            "errors": []
        }
        console.info("@initJSON..", this.loginJSON);
    }

    ngOnInit() {
        if(document.cookie && localStorage.getItem("socialLogin") == "true"){
            var decodedCookie = decodeURIComponent(document.cookie);
            var cookies = decodedCookie.split(';');
            console.info("document.cookie array --- ",cookies);
            let keyvals;
            for(let i=0;i<cookies.length;i++){
                keyvals=cookies[i].split("=");
                console.info("keyvals--",keyvals)
                if( keyvals[0].trim()== "token"){
                    localStorage.setItem("token", keyvals[1])
                }else if (keyvals[0].trim() == "refreshToken"){
                    localStorage.setItem("refreshToken", keyvals[1])
                }else if(keyvals[0].trim() == "user"){
                    localStorage.setItem("user", keyvals[1])
                }
            }
            if(this.auth.isLoggedIn()){
                this.util.getRouter().navigate([environment.ROUTE_HOME]);
            }
        }
        this.fetchCities();
    }

    login() {
        this.loginJSON.errors = [];
        console.info("@login..", this.loginJSON.login)
        this.ajax.apiCall_POST(this.loginJSON.login, environment.API_LOGIN)
            .subscribe(
                data => {
                    if (data.status) {
                        localStorage.setItem("user", data.user)
                        localStorage.setItem("token", data.token)
                        localStorage.setItem("refreshToken", data.refreshToken);
                        this.util.getRouter().navigate([environment.ROUTE_HOME]);
                    } else {
                        this.loginJSON.errors = data.errors;
                    }
                },
                error => {
                    console.info("error.status:: ", error.status);
                    this.loginJSON.errors = error;
                }
            );
    }

    register() {
        this.loginJSON.errors = [];
        console.info("@register..", this.loginJSON.register)
        this.ajax.apiCall_POST(this.loginJSON.register, environment.API_REGISTER)
            .subscribe(
                data => {
                    if (data.status) {
                        localStorage.setItem("user", JSON.stringify(data.user))
                        localStorage.setItem("token", data.token)
                        localStorage.setItem("refreshToken", data.refreshToken);
                        this.util.getRouter().navigate([environment.ROUTE_HOME]);
                    } else {
                        this.loginJSON.errors = data.errors;
                    }
                },
                error => {
                    console.info("error.status:: ", error.status);
                    this.loginJSON.errors = error;
                }
            );
    }

    forgot() {
    }

    fetchCities() {
        console.info("@fetchCities..")
        this.ajax.apiCall_GET({}, environment.API_CITIES_INDIA)
            .subscribe(
                data => {
                    this.loginJSON.cities = data.cities
                },
                error => {
                    console.info("error.status:: ", error.status);
                }
            );
    }

    googleLogin(){
        localStorage.setItem("socialLogin", "true");
        window.location.href="/auth/google";
    }

}
