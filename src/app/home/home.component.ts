import {Component, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";
import {AjaxService} from '../services/ajax.service';
import {UtilService} from '../services/util.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    userLoc = JSON.parse(localStorage.getItem("userLoc"));
    homeJSON={
        "idea": {
            "_id": "",
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
                "result":"/assets/images/cover.png"
            },
            "user":JSON.parse(localStorage.getItem("user")).email,
            "private":false
        },
        "ideas": [],
        "errors": [],
        "viewCode":0

    }
    constructor(private ajax: AjaxService, private util: UtilService) {
    }

    ngOnInit() {
        this.fetchPublicIdeas();
    }

    fetchPublicIdeas(page = 1, _id?: any) {
        console.info("@fetchPublicIdeas...");
        this.homeJSON.errors = []
        this.ajax.apiCall_GET({page: page}, environment.API_LIST_PUBLIC_IDEAS)
            .subscribe(
                data => {
                    console.info("response", data);
                    if (data.status) {
                        this.homeJSON.ideas = data.ideas
                    } else {
                        this.homeJSON.errors = data.errors;
                    }
                },
                error => {
                    console.info("error.status:: ", error);
                    this.homeJSON.errors = error;
                }
            );
    }

    shareIdea(idea: any) {
        this.util.getRouter().navigate(["ideas/share/" + idea._id])
    }

    saveIdea() {
        this.homeJSON.errors = []
        localStorage.removeItem("editIdea");
        if (!this.util.isVoid(this.userLoc)) {
            console.info("saving device location", this.userLoc);
            this.homeJSON.idea.lat = this.userLoc.lat;
            this.homeJSON.idea.lng = this.userLoc.lng;
        }
        this.ajax.apiCall_POST(this.homeJSON.idea, environment.API_SAVE_IDEAS)
            .subscribe(
                data => {
                    console.info("response", data);
                    if (data.status) {
                        console.info("done")
                    } else {
                        this.homeJSON.errors = data.errors;
                    }
                },
                error => {
                    console.info("error.status:: ", error);
                }
            );
    }

}
