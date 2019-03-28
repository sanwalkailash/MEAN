import {Component, OnInit} from '@angular/core';
import {UtilService} from '../services/util.service';
import {BroadcastService} from '../services/broadcast.service';
import {environment} from '../../environments/environment';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    headerJSON=this.headerJSON={
        "isLoggedIn": false,
        "user": localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")) : {}
    }
    status:any;
    constructor(private util: UtilService,private broadcast:BroadcastService) {
    }

    initJSON() {
        this.status = this.broadcast.getMessage("isLoggedIn").subscribe((status)=>{
            console.info("login status",status);
            this.headerJSON.isLoggedIn=status;
            console.info("header",this.headerJSON);
        })
    }

    ngOnInit() {
        this.initJSON()
    }

    logout(){
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        this.broadcast.clearMessage("isLoggedIn");
        this.util.getRouter().navigate([environment.ROUTE_LOGIN]);
    }

}
