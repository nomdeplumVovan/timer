import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Observer, fromEvent, empty } from 'rxjs';
import { TimeSpan, FromSeconds } from 'timespan';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 0;
  disable = false;
  timer: any;

  time = Observable.create((observer: Observer<any>) => {
    this.timer = setInterval(() => {
      observer.next(this.title++);
    }, 1000);

    setTimeout(() => {
      observer.error('this does not work');
      observer.complete();
    }, 0);
  });

  regTimer() {
    // this.title = this.ts;
  }

  startTimer() {
    this.time.subscribe(
      (value: number) => { this.title = value; }
    );
    this.disable = true;
  }

  resetTimer() {
    this.title = 0;
  }

  stopTimer() {
    this.title = this.title;
    clearInterval(this.timer);
    this.disable = false;
  }

  waitTimer() {
    this.title = this.title;
    clearInterval(this.timer);
    // this.disable = false;
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    // this.time = empty();
  }




  // startTimer() {
  //   this.time.subscribe(
  //     (value: number) => { this.title = value; },
  //     (error: string) => { console.log(error); },
  //     () => { console.log('completed'); }
  //   );
  // }

  // startTime = fromEvent(this.startBtn, 'click');
  // stopTime = fromEvent(this.stopBtn, 'click');
  // waitTime = fromEvent(this.waitBtn, 'click');
  // resetTime = fromEvent(this.resetBtn, 'click');



}
