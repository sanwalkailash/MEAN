import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import {AjaxService} from "../services/ajax.service";
import {UtilService} from "../services/util.service";
import {Location,DatePipe} from "@angular/common";
import {AppComponent} from "../app.component";
import {BroadcastService} from '../services/broadcast.service';

declare const google: any;
declare const window:any;

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit {

  liveJSON: any;
  pipe = new DatePipe('en-US'); // Use your own locale

  constructor(private ajax: AjaxService, private util: UtilService, location: Location, private app: AppComponent,private broadcast:BroadcastService) {
  }

  ngOnInit() {
    this.initializeLiveJSON();
  }

  ngAfterViewInit() {
    this.initializaMapProperties();
    this.broadcast.getMessage("gps").subscribe((status)=>{
      this.updateUserLocation();
    })
  }

  initializeLiveJSON() {
    this.liveJSON = {
      "errors":[],
      "map": undefined,
      "mapOptions": {
        disableDefaultUI: true,
        center: new google.maps.LatLng(environment.DEFAULT_MAP_SETTINGS.lat, environment.DEFAULT_MAP_SETTINGS.lng),
        zoom: environment.DEFAULT_MAP_SETTINGS.zoom,
        zoomControl: true,
        scrollwheel: false,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.LARGE,
          position: google.maps.ControlPosition.RIGHT_CENTER
        },
        draggableCursor: 'pointer',
        mapTypeControl: false,
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.ROADMAP],
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: google.maps.ControlPosition.TOP_CENTER
        },
        streetViewControl: false,
        streetViewControlOptions: {
          position: google.maps.ControlPosition.LEFT_CENTER,
          addressControl: true,
          panControl: true,
          zoomControl: true,
          fullscreenControl: false
        },
        rotateControlOptions: {
          position: google.maps.ControlPosition.LEFT_TOP
        },
        fullscreenControl: false,
        styles: [{elementType: 'labels', stylers: [{visibility: 'on'}]}],
        tilt: 10
      },
      "streetViewPanorama": undefined,
      "enableStreetView": true,
      "streetViewOptions": {
        disableDefaultUI: true,
        mapTypeControl: false,
        position: environment.DEFAULT_MAP_SETTINGS.streetViewDefaultPosition,
        pov: environment.DEFAULT_MAP_SETTINGS.pov,
        addressControl: false,
        addressControlOptions: {
          position: google.maps.ControlPosition.TOP_LEFT
        },
        fullscreenControl: false,
        linksControl: false,
        panControl: false,
        panControlOptions: {
          position: google.maps.ControlPosition.TOP_LEFT
        },
        zoomControl: false,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.LARGE,
          position: google.maps.ControlPosition.TOP_LEFT
        },
        enableCloseButton: false,
        disableDoubleClickZoom: true
      },
      "userLocation": JSON.parse(localStorage.getItem("userLoc")) ? JSON.parse(localStorage.getItem("userLoc")) : {
        "lat": 0,
        "lng": 0
      },
      "userMapMarker": "",
      "activity":{
        "user_id":JSON.parse(localStorage.getItem("user"))._id,
        "shift_state": "",
        "speed": 0,
        "power": 0,
        "latitude": 0,
        "longitude": 0,
        "geohash": "",
        "heading": "",
        "gps_as_of": "",
        "native_location_supported": "",
        "native_latitude": 0,
        "native_longitude": 0,
        "native_geohash": "",
        "native_type": "",
        "milestone":{
          "cover":{
            "name":"",
            "size":"",
            "type":"",
            "lastModifiedDate":"",
            "result":"",
          },
          "views":0,
          "likes":0,
          "comments":[]
        },
        "isMilestone":false
      },
      "markerInfoWindow":new google.maps.InfoWindow()
    }

  }

  initializaMapProperties() {
    this.liveJSON.map = new google.maps.Map(document.getElementById('map-canvas'), this.liveJSON.mapOptions);
    this.liveJSON.streetViewPanorama = new google.maps.StreetViewPanorama(document.getElementById('street-view'), this.liveJSON.streetViewOptions);

    this.liveJSON.userMapMarker = new google.maps.Marker({
      position: this.getGoogleLatLangObject(this.liveJSON.userLocation.lat, this.liveJSON.userLocation.lng),
      map: this.liveJSON.map,
      animation: google.maps.Animation.DROP,
      draggable: true
    });

    this.addEventListnersOnMarker();

    this.refreshMaps();
    this.updateUserLocation();

  }

  getGoogleLatLangObject(lat: any, lng: any) {
    return new google.maps.LatLng(lat, lng);
  }

  refreshMaps() {
    this.liveJSON.map.panTo(this.liveJSON.userMapMarker.getPosition())
    // this.liveJSON.map.setCenter(this.liveJSON.userMapMarker.getPosition());
    this.liveJSON.streetViewPanorama = new google.maps.StreetViewPanorama(document.getElementById('street-view'), this.liveJSON.streetViewOptions);
    this.liveJSON.streetViewPanorama.setPosition(this.liveJSON.userMapMarker.getPosition());
    google.maps.event.trigger(this.liveJSON.map, 'resize');
    google.maps.event.trigger(this.liveJSON.streetViewPanorama, 'resize');
  }


  toggleMapView() {
    console.info("map defaults :::", this.liveJSON.mapOptions)
    console.info("street view defaults :::", this.liveJSON.streetViewOptions)
    this.liveJSON.enableStreetView = !this.liveJSON.enableStreetView;
    if (this.liveJSON.enableStreetView) {
      setTimeout(() => {
        this.liveJSON.map.setMapTypeId(google.maps.MapTypeId.HYBRID);
        this.liveJSON.streetViewPanorama.setPosition({
          lat: this.liveJSON.userLocation.lat,
          lng: this.liveJSON.userLocation.lng
        });
      }, 0)
    } else {
      this.liveJSON.map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
      this.refreshMaps();
    }
  }

  toggleStreetView() {
    this.liveJSON.enableStreetView = !this.liveJSON.enableStreetView;
  }

  fileEvent(event) {
    console.info("fileEvent..")
    this.liveJSON.activity.milestone.cover = this.util.readfile(event);
    setTimeout( ()=>{
      console.info("added cover -- ", this.liveJSON.activity)
      this.logActivity(true);
    },2000)
  }

  updateUserLocation() {
    console.info("updateUserLocation..");
    this.liveJSON.userLocation = JSON.parse(localStorage.getItem("userLoc"));
    this.liveJSON.userMapMarker.setPosition(this.getGoogleLatLangObject(this.liveJSON.userLocation.lat, this.liveJSON.userLocation.lng));
    this.refreshMaps();
  }
  
  logActivity(milestone=false){
    this.liveJSON.errors = [];
    this.liveJSON.activity.isMilestone=milestone;
    this.liveJSON.activity.latitude = this.liveJSON.userMapMarker.getPosition().lat();
    this.liveJSON.activity.longitude = this.liveJSON.userMapMarker.getPosition().lng();
    this.ajax.apiCall_POST(this.liveJSON.activity, environment.API_USER_DRIVE)
        .subscribe(
            data => {
              if (data.status) {
                console.info("activity saved");
                if(milestone){
                  this.liveJSON.errors.push("Activity Saved.");
                }
              } else {
                this.liveJSON.errors = data.errors;
              }
              if(milestone){
                // this.liveJSON.activity.milestone={
                //   "cover":{
                //     "name":"",
                //     "size":"",
                //     "type":"",
                //     "lastModifiedDate":"",
                //     "result":"",
                //   },
                //   "views":0,
                //   "likes":0,
                //   "comments":[]
                // }
                this.liveJSON.activity.isMilestone=false;
              }
            },
            error => {
              console.info("error.status:: ", error);
            }
        );
  }

  addEventListnersOnMarker(marker=this.liveJSON.userMapMarker){
    google.maps.event.addListener(marker, 'position_changed', () => {
      console.info("userMapMarker position changes t0 --", this.liveJSON.streetViewPanorama.getPosition());
      var content;
      content ="ImHere"
      if(!this.util.isVoid(this.liveJSON.activity.milestone.cover.result)) {
        content += '<h4 id="milestone">' + this.liveJSON.activity.milestone.cover.name +'</h4>';
        content += '<img style="width:150px;height:100px;" src="' + this.liveJSON.activity.milestone.cover.result +'"></img>';
        content += '<p>'+ this.pipe.transform(this.liveJSON.activity.milestone.cover.lastModifiedDate,"yyyy-MM-dd hh:mm:ss") +'</p>';
      }

      this.liveJSON.markerInfoWindow.setContent(content);
      this.liveJSON.markerInfoWindow.setPosition(this.getGoogleLatLangObject(marker.getPosition().lat(), marker.getPosition().lng()))
      this.liveJSON.markerInfoWindow.open(this.liveJSON.map, marker);

      this.logActivity(false);
      this.refreshMaps();
    });

    google.maps.event.addListener(marker,"click",(event) => {
      var content;
      content = '<h4 id="milestone">' + this.liveJSON.activity.milestone.cover.name +'</h4>';
      content += '<img style="width:150px;height:100px;" src="' + this.liveJSON.activity.milestone.cover.result +'"></img>';
      content += '<p>'+ this.liveJSON.activity.milestone.cover.lastModifiedDate +'</p>';

      this.liveJSON.markerInfoWindow.setContent(content);
      this.liveJSON.markerInfoWindow.setPosition(this.getGoogleLatLangObject(marker.getPosition().lat(), marker.getPosition().lng()))
      this.liveJSON.markerInfoWindow.open(this.liveJSON.map, marker);
    });
  }



}
