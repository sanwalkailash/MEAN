import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    headerJSON: any;

    constructor() {
        this.initJSON()
    }

    initJSON() {
        this.headerJSON = {
            "isLoggedIn": localStorage.getItem("user") ? true : false,
            "user": localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")) : {}
        }
        console.info(this.headerJSON);
    }

    ngOnInit() {
    }

}
