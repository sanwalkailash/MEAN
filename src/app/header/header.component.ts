import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    headerJSON: any;

    constructor() {
    }

    initJSON() {
        this.headerJSON = {
            "isLoggedIn": localStorage.getItem("user") ? true : false,
            "user": localStorage.getItem("user") || {}
        }
    }

    ngOnInit() {
    }

}
