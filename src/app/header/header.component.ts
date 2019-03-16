import {Component, OnInit} from '@angular/core';
import {UtilService} from '../services/util.service';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    headerJSON: any;

    constructor(private util: UtilService) {
        this.initJSON()
    }

    initJSON() {
        this.headerJSON = {
            "isLoggedIn": localStorage.getItem("user") ? true : false,
            "user": localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")) : {}
        }
        console.info("header",this.headerJSON);
    }

    ngOnInit() {
    }

    logout(){
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        this.util.getRouter().navigate([environment.ROUTE_LOGIN]);
    }

}
