import { Component, OnInit } from '@angular/core';
import {AjaxService} from '../services/ajax.service';
import {UtilService} from '../services/util.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.css']
})
export class IdeasComponent implements OnInit {
  ideaJSON:any;
throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  userLoc=JSON.parse(localStorage.getItem("userLoc"));
  constructor(private ajax : AjaxService,private util: UtilService) {
this.initProperties();
  }

initProperties(){
    this.ideaJSON={
    "idea":{
        "_id":"",
        "title":"",
        "details":"",
        "lat":"",
        "lng":""
    },
    "errors":[],
    "activeRoute":this.util.getCurrentRoutePath(),
    "ideas":[]
}

if(!this.util.isVoid(localStorage.getItem("editIdea"))){
this.ideaJSON.idea = JSON.parse(localStorage.getItem("editIdea"));
}


    if(this.ideaJSON.activeRoute == environment.ROUTE_IDEAS ){
this.fetchIdeas();
    }
    console.info("this.ideaJSON",this.ideaJSON);

}
  ngOnInit() {

  }

editIdea(idea:any){
console.info("@editIdea...");
this.ideaJSON.idea = idea;
localStorage.setItem("editIdea",JSON.stringify(this.ideaJSON.idea));
this.util.getRouter().navigate([environment.ROUTE_EDIT_IDEA+idea._id]);
}

markPublic(idea:any){
}

deleteIdea(idea:any){
    this.ajax.apiCall_DELETE(idea,environment.API_DELETE_IDEA)
    .subscribe(
        data => {
console.info("response",data);
          if (data.status) {
            this.fetchIdeas();
          }else {
this.ideaJSON.errors=data.errors;
}
        },
        error => {
          console.info("error.status:: ", error);
        }
      );
}

saveIdea(){
    this.ideaJSON.errors=[]
localStorage.removeItem("editIdea");
    if(!this.util.isVoid(this.userLoc)){
console.info("saving device location",this.userLoc);
    this.ideaJSON.idea.lat = this.userLoc.lat;
    this.ideaJSON.idea.lng = this.userLoc.lng;
    }
    this.ajax.apiCall_POST(this.ideaJSON.idea,environment.API_SAVE_IDEAS)
    .subscribe(
        data => {
console.info("response",data);
          if (data.status) {
            this.util.getRouter().navigate([environment.ROUTE_IDEAS]);
          }else {
this.ideaJSON.errors=data.errors;
}
        },
        error => {
          console.info("error.status:: ", error);
        }
      );
}

onScrollDown(event:any){
console.info("event",event);
this.fetchIdeas(2);

}


onScrollUp(event:any){
console.info("event",event);
this.fetchIdeas(2);

}


fetchIdeas(page=1){
console.info("@fetchIdeas...");
    this.ideaJSON.errors=[]
    this.ajax.apiCall_GET({page:page},environment.API_LIST_IDEAS)
    .subscribe(
        data => {
console.info("response",data);
          if (data.status) {
            this.ideaJSON.ideas=data.ideas
var myDiv = document.getElementById('ideasDiv');
myDiv.scrollTop = 0;
          }else {
this.ideaJSON.errors=data.errors;
}
        },
        error => {
          console.info("error.status:: ", error);
        }
      );
}


_getDirectionsInGoogleMap(lat:any,lng:any){
    window.open('https://www.google.com/maps/dir/?api=1&destination='+lat+','+lng);
  }

}
