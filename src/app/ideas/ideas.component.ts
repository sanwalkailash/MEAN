import {Component, OnInit} from '@angular/core';
import {AjaxService} from '../services/ajax.service';
import {UtilService} from '../services/util.service';
import {environment} from '../../environments/environment';
import {Location} from '@angular/common';

@Component({
    selector: 'app-ideas',
    templateUrl: './ideas.component.html',
    styleUrls: ['./ideas.component.css']
})
export class IdeasComponent implements OnInit {
    ideaJSON: any;
    throttle = 300;
    scrollDistance = 1;
    scrollUpDistance = 2;
    userLoc = JSON.parse(localStorage.getItem("userLoc"));

    constructor(private ajax: AjaxService, private util: UtilService, location: Location) {
        this.initProperties();
    }

    initProperties() {
        this.ideaJSON = {
            "idea": {
                "_id": "",
                "id": "",
                "uid": "",
                "title": "",
                "details": "",
                "lat": "",
                "lng": "",
                "created_at": "",
                "like": 0,
                "views": 0,
                "cover":  {
                    "name":"",
                    "size":"",
                    "type":"",
                    "lastModifiedDate":"",
                    "result":""
                }
            },
            "errors": [],
            "activeRoute": this.util.getCurrentRoutePath(),
            "ideas": [],
            "viewCode": 0
        }


        console.info("this.ideaJSON", this.ideaJSON);
    }

    setAppFlow() {
        console.warn("this.ideaJSON.activeRoute.substring(0, 11)........", this.ideaJSON.activeRoute.substring(0, 11))

        if (this.ideaJSON.activeRoute == environment.ROUTE_IDEAS) {
            this.ideaJSON.viewCode = 0;
            this.fetchIdeas();
        }

        if (this.ideaJSON.activeRoute.substring(0, 11) == "ideas/edit/") {
            this.ideaJSON.viewCode = 1;
            console.info("this.ideaJSON.activeRoute.substring(12)", this.ideaJSON.activeRoute.substring(12));
            if (!this.util.isVoid(localStorage.getItem("editIdea"))) {
                this.ideaJSON.idea = JSON.parse(localStorage.getItem("editIdea"));
            } else {
                console.error("nothing to edit");
            }
        }


        if (this.ideaJSON.activeRoute.substring(0, 11) == environment.ROUTE_ADD_IDEA) {
            this.ideaJSON.viewCode = 1;
        }


        if (this.ideaJSON.activeRoute.substring(0, 11) == "ideas/share") {
            this.ideaJSON.viewCode = 2;
            console.info("this.ideaJSON.activeRoute.substring(12)", this.ideaJSON.activeRoute.substring(12));
            this.fetchIdeas(1, this.ideaJSON.activeRoute.substring(12));
        }
    }

    ngOnInit() {
        this.setAppFlow();
    }

    editIdea(idea: any) {
        console.info("@editIdea...");
        this.ideaJSON.idea = idea;
        localStorage.setItem("editIdea", JSON.stringify(this.ideaJSON.idea));
        this.util.getRouter().navigate(["ideas/edit/" + idea._id]);
    }


    shareIdea(idea: any) {
        this.util.getRouter().navigate(["ideas/share/" + idea._id])
    }


    newIdea(idea: any) {
        this.util.getRouter().navigate([environment.ROUTE_ADD_IDEA])
    }

    addView(idea: any) {
        if (this.util.isVoid(idea.views)) {
            idea.views = 1
        } else {
            idea.views += 1;
        }
        this.ideaJSON.idea = idea;
        this.saveIdea();
    }

    addLike(idea: any) {
        if (this.util.isVoid(idea.like)) {
            idea.like = 1
        } else {
            idea.like += 1;
        }
        this.ideaJSON.idea = idea;
        this.saveIdea();
    }

    markPublic(idea: any) {
    }

    deleteIdea(idea: any) {
        this.ideaJSON.errors = []
        this.ajax.apiCall_DELETE(idea, environment.API_DELETE_IDEA)
            .subscribe(
                data => {
                    console.info("response", data);
                    if (data.status) {
                        this.fetchIdeas();
                    } else {
                        this.ideaJSON.errors = data.errors;
                    }
                },
                error => {
                    console.info("error.status:: ", error);
                }
            );
    }

    saveIdea() {
        this.ideaJSON.errors = []
        localStorage.removeItem("editIdea");
        if (!this.util.isVoid(this.userLoc)) {
            console.info("saving device location", this.userLoc);
            this.ideaJSON.idea.lat = this.userLoc.lat;
            this.ideaJSON.idea.lng = this.userLoc.lng;
        }
        this.ajax.apiCall_POST(this.ideaJSON.idea, environment.API_SAVE_IDEAS)
            .subscribe(
                data => {
                    console.info("response", data);
                    if (data.status) {
                        if (this.ideaJSON.viewCode == 1) {
                            this.util.getRouter().navigate([environment.ROUTE_IDEAS]);
                        }
                    } else {
                        this.ideaJSON.errors = data.errors;
                    }
                },
                error => {
                    console.info("error.status:: ", error);
                }
            );
    }

    onScrollDown(event: any) {
        console.info("event", event);
        this.fetchIdeas(2);

    }


    onScrollUp(event: any) {
        console.info("event", event);
        this.fetchIdeas(1);
    }


    fetchIdeas(page = 1, _id?: any) {
        console.info("@fetchIdeas...");
        this.ideaJSON.errors = []
        this.ajax.apiCall_GET({page: page, id: _id}, environment.API_LIST_IDEAS)
            .subscribe(
                data => {
                    console.info("response", data);
                    if (data.status) {
                        this.ideaJSON.ideas = data.ideas
                    } else {
                        this.ideaJSON.errors = data.errors;
                    }
                },
                error => {
                    console.info("error.status:: ", error);
                    this.ideaJSON.errors = error;
                }
            );
    }


    _getDirectionsInGoogleMap(lat: any, lng: any) {
        window.open('https://www.google.com/maps/dir/?api=1&destination=' + lat + ',' + lng);
    }

    fileEvent(event){
        this.ideaJSON.idea.cover = this.util.readfile(event);
        console.info("added cover -- ",this.ideaJSON)
    }

}
