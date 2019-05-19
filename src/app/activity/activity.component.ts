import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';
declare var EventSource:any

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  private sseSource = new EventSource('http://localhost:8888/car/stream/activity/v1');

  activityJSON:any;
  constructor() { }

  initActivityJSON(){
    this.activityJSON={
      "milestones":[]
    }
  }

  ngOnInit() {
    console.info(this.sseSource);
    this.sseSource.addEventListener('myEvent', (e) => {
      const messageData = e.data;
      console.info("message",e)
      // ...
      // ...
    });
    this.sseSource.onmessage = (e) => {
      const messageData = e.data;
      console.info("message",e)
      if (e.lastEventId === '-1') {
        // This is the end of the stream
        this.sseSource.close();
      }
      // ...
      // ...
    };

// When finished with the source close the connection
//     sseSource.close();
  }

  ngOnDestroy(){
    this.sseSource.close();
  }

  // public getActivtyStream(processName: string): Observable<any> {
  //   let headers: HttpHeaders = new HttpHeaders();
  //   headers = headers.append('X-Authorization', "");
  //   headers = headers.append('accept', 'text/event-stream');
  //
  //   let url = "/api"
  //   return Observable.create(observer => {
  //     let eventSource = new EventSourcePolyfill(url, { headers: headers });
  //     eventSource.onmessage = (event => {
  //       observer.next(event);
  //       this.zone.run(() => {
  //         console.log('prpprpr');
  //       });
  //     });
  //     eventSource.onopen = (event) => {
  //       observer.next(event);
  //     };
  //     eventSource.onerror = (error) => {
  //       if (eventSource.readyState === 0) {
  //         console.log('The stream has been closed by the server.');
  //         eventSource.close();
  //         observer.complete();
  //       } else {
  //         observer.error('EventSource error: ' + error);
  //       }
  //     };
  //   });
  // }

}
