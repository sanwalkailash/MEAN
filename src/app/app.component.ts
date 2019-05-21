import {Component} from '@angular/core';
import {BroadcastService} from './services/broadcast.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'ImHere';
    Notification: any;
    userLocation = {
        "lat": 0.0,
        "lng": 0.0
    }
    constructor(private broadcast:BroadcastService){
        console.info(`%c Stop, Its Dangerous !`, "background:red;color:white;font-size:15px;padding:5px;")
    }

    ngOnInit() {
        localStorage.setItem("userLoc", JSON.stringify(this.userLocation));
        this.watchLocation();
        let loctimer = setInterval(() => {
            this.watchLocation();
            console.info("updated user location--",this.userLocation)
        }, 1000); // 1 minute = 1000*60*1
        // clearInterval(loctimer);
    }

    watchLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setUserLocation, this.showError,{
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            });
        } else {
            this.Notification = "Geolocation is not supported by this browser.";
        }
    }

    showError = (error) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                this.Notification = "Please provide your location."
                break;
            case error.POSITION_UNAVAILABLE:
                this.Notification = "Location information is unavailable."
                break;
            case error.TIMEOUT:
                this.Notification = "The request to get user location timed out."
                break;
            case error.UNKNOWN_ERROR:
                this.Notification = "An unknown error occurred."
                break;
        }
    }

    setUserLocation = (position) => {
        console.info("gps-",position)
        this.userLocation.lat = position.coords.latitude?position.coords.latitude:0;
        this.userLocation.lng = position.coords.longitude?position.coords.longitude:0;
        // localStorage.setItem("gps",position);
        localStorage.setItem("userLoc", JSON.stringify(this.userLocation));
        this.broadcast.sendMessage("gps",position)
    }

}
