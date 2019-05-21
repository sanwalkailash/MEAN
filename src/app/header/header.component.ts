import {Component, OnInit} from '@angular/core';
import {UtilService} from '../services/util.service';
import {PushNotificationComponent} from '../push-notification/push-notification.component';
import {BroadcastService} from '../services/broadcast.service';
import {AuthService} from '../auth/auth.service';
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
    constructor(private util: UtilService,private broadcast:BroadcastService,private authService:AuthService) {
    }

    initJSON() {
        this.status = this.broadcast.getMessage("isLoggedIn").subscribe((status)=>{
            console.info("login status",status);
            this.headerJSON.isLoggedIn=status;
            this.headerJSON.user=localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")) : {}
            console.info("header",this.headerJSON);
        })
    }

    ngOnInit() {
        this.initJSON()
    }

    logout(){
        this.authService.logOut();
    }

}
