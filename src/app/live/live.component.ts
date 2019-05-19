import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';

declare const google: any;
declare const window:any;

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit {

  liveJSON:any;

  constructor() { }

  ngOnInit() {
    this.initializeLiveJSON();
  }

  ngAfterViewInit(){
    setTimeout(()=>{
      this.initializaMapProperties();
    },1000);
  }

  initializeLiveJSON(){
    this.liveJSON={
      "map":undefined,
      "mapOptions":{
        disableDefaultUI: true,
        center: new google.maps.LatLng(environment.DEFAULT_MAP_SETTINGS.lat, environment.DEFAULT_MAP_SETTINGS.lng),
        zoom: environment.DEFAULT_MAP_SETTINGS.zoom,
        zoomControl: false,
        scrollwheel: false,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.LARGE,
          position: google.maps.ControlPosition.RIGHT_CENTER
        },
        draggableCursor: 'pointer',
        mapTypeControl: false,
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.HYBRID,google.maps.MapTypeId.ROADMAP],
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: google.maps.ControlPosition.TOP_CENTER
        },
        streetViewControl: false,
        streetViewControlOptions: {
          position: google.maps.ControlPosition.LEFT_CENTER,
          addressControl:true,
          panControl:true,
          zoomControl:true,
          fullscreenControl: false
        },
        rotateControlOptions: {
          position: google.maps.ControlPosition.LEFT_TOP
        },
        fullscreenControl: false,
        styles: [{ elementType: 'labels', stylers: [{ visibility: 'on'}] }],
        tilt: 10
      },
      "streetViewPanorama":undefined,
      "enableStreetView":true,
      "streetViewOptions" :{
        disableDefaultUI: true,
        mapTypeControl:false,
        position: environment.DEFAULT_MAP_SETTINGS.streetViewDefaultPosition,
        pov:environment.DEFAULT_MAP_SETTINGS.pov,
        addressControl:false,
        addressControlOptions: {
          position: google.maps.ControlPosition.TOP_LEFT
        },
        fullscreenControl:false,
        linksControl: false,
        panControl: false,
        panControlOptions:{
          position: google.maps.ControlPosition.TOP_LEFT
        },
        zoomControl:false,
        zoomControlOptions: {
          style: google.maps.ZoomControlStyle.LARGE,
          position: google.maps.ControlPosition.TOP_LEFT
        },
        enableCloseButton: false,
        disableDoubleClickZoom:true
      },
      "userLocation":JSON.parse(localStorage.getItem("userLoc"))?JSON.parse(localStorage.getItem("userLoc")) : {
        "lat":"",
        "lng":""
      },
      "userMapMarker":""
    }

  }

  initializaMapProperties(){
    this.liveJSON.map = new google.maps.Map(document.getElementById('map-canvas'), this.liveJSON.mapOptions);
    this.liveJSON.streetViewPanorama = new google.maps.StreetViewPanorama(document.getElementById('street-view'),this.liveJSON.streetViewOptions);
    google.maps.event.addListener(this.liveJSON.streetViewPanorama, 'position_changed', ()=>{
      this.liveJSON.map.panTo(this.liveJSON.streetViewPanorama.getPosition())
      this.liveJSON.userMapMarker.setPosition(this.liveJSON.streetViewPanorama.getPosition());
    });
    this.liveJSON.userMapMarker=new google.maps.Marker({
      position: this.getGoogleLatLangObject(this.liveJSON.userLocation.lat, this.liveJSON.userLocation.lng),
      map: this.liveJSON.map,
      animation: google.maps.Animation.DROP,
      draggable: true
    })
  }

  getGoogleLatLangObject(lat:any,lng:any){
    return new google.maps.LatLng(lat,lng);
  }

  resizeMaps(){
    google.maps.event.trigger(this.liveJSON.map, 'resize');
    google.maps.event.trigger(this.liveJSON.streetViewPanorama, 'resize')
  }


  toggleMapView(){
    console.info("map defaults :::",this.liveJSON.mapOptions)
    console.info("street view defaults :::",this.liveJSON.streetViewOptions)
    this.liveJSON.enableStreetView=!this.liveJSON.enableStreetView;
    if(this.liveJSON.enableStreetView){
      setTimeout(()=>{
        this.liveJSON.map.setMapTypeId(google.maps.MapTypeId.HYBRID);
        this.liveJSON.streetViewPanorama.setPosition({lat: this.liveJSON.userLocation.lat, lng: this.liveJSON.userLocation.lng});
      },0)
    }else {
      this.liveJSON.map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
      this.resizeMaps();
    }
  }

  toggleStreetView(){
    this.liveJSON.enableStreetView=!this.liveJSON.enableStreetView;
  }

}
