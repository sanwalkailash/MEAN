import {Injectable} from '@angular/core';
import {BroadcastService} from '../services/broadcast.service';
import {environment} from "../../environments/environment";
import {UtilService} from '../services/util.service'

@Injectable()
export class AuthService {

    constructor(private subject :BroadcastService,private util:UtilService) {
    }

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    isLoggedIn = (): boolean => {
        console.info("@isLoggedIn token--", localStorage.getItem("token"));
        if (this.getToken() !== null) {
            // subject.sendMessage("session",true);
            return true;
        }
        return false;
    }

    sendToken(token: string) {
        localStorage.setItem("token", token)
    }
    getToken() {
        return localStorage.getItem("token")
    }

    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        this.util.getRouter().navigate([environment.ROUTE_LOGIN]);
    }

}
