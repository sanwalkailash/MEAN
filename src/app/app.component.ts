import {Component} from '@angular/core';


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

    ngOnInit() {
        localStorage.setItem("userLoc", JSON.stringify(this.userLocation));
        this.getLocation();
        let loctimer = setInterval(() => {
            this.getLocation();
            console.info("updated user location--",this.userLocation)
        }, 2000);
        // clearInterval(loctimer);
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setUserLocation, this.showError);
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
        this.userLocation.lat = position.coords.latitude?position.coords.latitude:0;
        this.userLocation.lng = position.coords.longitude?position.coords.longitude:0;
        localStorage.setItem("userLoc", JSON.stringify(this.userLocation));
    }

}
