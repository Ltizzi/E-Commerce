import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private eventSubjects: { [key: string]: Subject<any> } = {};

  constructor() {}

  subscribe(eventName: string): Observable<any> {
    if (!this.eventSubjects[eventName]) {
      this.eventSubjects[eventName] = new Subject<any>();
    }
    return this.eventSubjects[eventName].asObservable();
  }

  emit(eventName: string, data?: any) {
    if (this.eventSubjects[eventName]) {
      this.eventSubjects[eventName].next(data);
    }
  }
}
