import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommondataService {

  constructor() { }

  serviceCity:any[]=["Pune","Delhi","Bengaluru"];

  private message = new BehaviorSubject({});
  sharedMessage = this.message.asObservable();

  nextMessage(inputData) {
    this.message.next(inputData)
  }
}
