import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {UtilService} from '../services/util.service';
import {BroadcastService} from '../services/broadcast.service';
import {ActivatedRoute, Router} from "@angular/router";

@Injectable()
export class AuthService {

    constructor(private util: UtilService,private broadcast:BroadcastService,private router:Router) {
    }

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    isLoggedIn = (): boolean => {
        console.info("@isLoggedIn token--", localStorage.getItem("token"));
        if (localStorage.getItem("token") !== null) {
            this.broadcast.sendMessage("isLoggedIn",true)
            return true;
        }
        this.broadcast.sendMessage("isLoggedIn",false);
        return false;
    }


    public logOut(): void {
        localStorage.clear();
        localStorage.setItem("socialLogin", "false");
        this.broadcast.sendMessage("isLoggedIn",false);
        this.router.navigate([environment.ROUTE_LOGIN]);
    }

}
