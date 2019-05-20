import {Component, OnInit} from '@angular/core';
import {UtilService} from '../services/util.service'
import {AjaxService} from '../services/ajax.service';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
    loginJSON: any;

    constructor(private ajax: AjaxService, private util: UtilService) {
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
        localStorage.setItem("socialLogin", "false")
        if(document.cookie){
            var decodedCookie = decodeURIComponent(document.cookie);
            var cookies = decodedCookie.split(';');
            console.info("document.cookie array --- ",cookies)
            if(cookies.length==3){
                localStorage.setItem("token", cookies[0].replace('=undefined',''))
                localStorage.setItem("refreshToken", cookies[1].replace('=undefined',''))
                localStorage.setItem("user", JSON.stringify(cookies[2].replace('=undefined','')))
                localStorage.setItem("socialLogin", "true")
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

}
