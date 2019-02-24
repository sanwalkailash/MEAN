import { Component, OnInit } from '@angular/core';
import {UtilService} from '../services/util.service'
import {AjaxService} from '../services/ajax.service';
import {environment} from '../../environments/environment';
import {UtilService} from '../services/util.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
    loginJSON:any;
  constructor(private ajax : AjaxService,private util: UtilService) {
    this.initJSON()
  }
  initJSON(){
    this.loginJSON = {
        "login":{
            "email":"",
            "password":"",
            "location":""
        }
"cities":[]
    }
  }
  ngOnInit() {
    this.fetchCities();
  }

login(){
console.info("@login..",this.loginJSON.login)
 this.ajax.apiCall_POST(this.loginJSON.login,environment.API_LOGIN)
    .subscribe(
        data => {
          if (data.status == 0) {
            this.util.getRouter().navigate("['/home']");
          }
        },
        error => {
          console.info("error.status:: ", error.status);
        }
      );
}

fetchCities(){
console.info("@login..",this.loginJSON.login)
 this.ajax.apiCall_GET({},environment.API_CITIES_INDIA)
    .subscribe(
        data => {
          if (data.status == 0) {
this.loginJSON.cities=data.cities
          }
        },
        error => {
          console.info("error.status:: ", error.status);
        }
      );
}

}
