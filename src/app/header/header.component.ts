import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    headerJSON:any;
  constructor() {
    this.initJSON();
  }

    initJSON(){
        this.headerJSON={
            "activeTab":0,
            "navigationPanel":"true",
            "clickEvent":0
        }
    }


  ngOnInit() {
  }

}
