import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BroadcastService {
private subject = [];

constructor() { }


  sendMessage(key: any, data: any) {
    if (!this.subject[key]) {
      this.subject[key] = new Subject();
    }
    this.subject[key].next(data);
  }

  getMessage(key: any): Observable<any> {
    if (!this.subject[key]) {
      this.subject[key] = new Subject();
    }

    /*let a = this.subject;
    this.clearMessage(key,a);*/
    return this.subject[key].asObservable();

  }
  clearMessage(key, a) {
    a[key].next();
  }

}
