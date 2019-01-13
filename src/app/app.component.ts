import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable,  fromEvent, interval, timer, of } from 'rxjs';
import { merge, flatMap, takeUntil, scan, map, switchMap, tap, reduce, takeLast, startWith } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  timerValue = 0;
  timerValueSecond = this.timerValue < 10 ? '0' + this.timerValue : this.timerValue;
  timerValueMinute = this.timerValue < 10 ? '0' + this.timerValue : this.timerValue;
  timerValueHour = this.timerValue < 10 ? '0' + this.timerValue : this.timerValue;
  timer$: Observable<any>;


  ngOnInit() {
  }

  startTimer() {

    const startButton$ = fromEvent(document.getElementById('start'), 'click');
    const stopButton$ = fromEvent(document.getElementById('stop'), 'click');
    const resetButton$ = fromEvent(document.getElementById('reset'), 'click');
    const waitButton$ = fromEvent(document.getElementById('wait'), 'click');

    this.timer$ = of()
      .pipe(
        merge(
          interval(1000).pipe(
            takeUntil(stopButton$),
            takeUntil(resetButton$),
            takeUntil(waitButton$),
            map(() => 1),
          ),
          resetButton$.pipe(map(() => 0)),
          waitButton$.pipe(
            takeLast(1),
            map(() => 0)
          ),
        ),
        scan((acc: number, val: number) => val === 0 ? 0 : acc + val),
        tap(val => console.log('scan', val)),
      );

    this.timer$.subscribe((value: number) => {
      this.timerValue = value;
      this.timerValueSecond = (this.timerValue % 60) < 10 ? '0' + (this.timerValue % 60) : (this.timerValue % 60);

      this.timerValueMinute = Math.floor((this.timerValue / 60) % 60);
      this.timerValueMinute = this.timerValueMinute < 10 ? '0' + this.timerValueMinute : this.timerValueMinute;


      this.timerValueHour = Math.floor(this.timerValue / 3600);
      this.timerValueHour = this.timerValueHour < 10 ? '0' + this.timerValueHour : this.timerValueHour;
    });


  }

  ngOnDestroy() {

  }
}