import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-panel',
  templateUrl: './nav-panel.component.html',
  styleUrls: ['./nav-panel.component.css']
})
export class NavPanelComponent implements OnInit {
navPanelJSON:any;
  constructor() { 
  this.initJSON();
  }

initJSON(){
        this.navPanelJSON={
            "activeTab":0,
            "navigationPanel":"true",
            "clickEvent":0
        }
    }

  ngOnInit() {
  }



}
