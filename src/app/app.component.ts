import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, fromEvent, interval, timer, of, } from 'rxjs';
import { merge, takeUntil, scan, map, switchMap, tap, bufferTime, buffer, startWith } from 'rxjs/operators';
import { takeLast, exhaustMap, take, skip, filter, skipUntil, flatMap } from 'rxjs/operators';
import { padZero } from '../utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  timerValue = 0;
  timer$: Observable<any>;

  /*

  Angular 2+
  Реализовать таймер, который подсчитывает время в формате «HH: MM: SS»
  Таймер должен иметь следующие кнопки:
  * «Start / Stop» - запуск / остановка отсчета времени,
  * «Wait» - с последующим быстрым нажатием (время между нажатиями не более 300 мс) таймер должен прекратить отсчет времени,
  * «Reset» - сброс таймера на 0
  Требование: используйте Observables в коде.

  */

  startTimer() {
    const startButton$ = fromEvent(document.getElementById('start'), 'click');
    const stopButton$ = fromEvent(document.getElementById('stop'), 'click');
    const resetButton$ = fromEvent(document.getElementById('reset'), 'click');
    const waitButton$ = fromEvent(document.getElementById('wait'), 'click');

    // -------------- wait---------

    const waitButton = waitButton$.pipe(exhaustMap(() =>
      waitButton$.pipe(take(2), takeUntil(interval(300)),
        tap(val => console.log('wait', val)))));

    const stopButton = startButton$.pipe(
      exhaustMap(() => stopButton$.pipe(
        take(1),
        tap(val => console.log('stop', val)))));

    const startButton = startButton$.pipe(
      switchMap(() => timer(this.timerValue === 0 ? 0 : this.timerValue, 1000)),
      // startWith(this.timerValue === 0 ? 0 : this.timerValue),
      tap(val => console.log('timer', val)));




    this.timer$ = of()
      .pipe(
        merge(
          startButton.pipe(
            takeUntil(resetButton$),
            takeUntil(waitButton),
            takeUntil(stopButton),
            map(() => 1),
          ),
          resetButton$.pipe(
            tap(val => console.log('reset', val)),
            map(() => 0),
          )
        ),

        scan((acc: number, val: number) => val === 0 ? 0 : acc + val),
        // tap(val => console.log('scan', val)),
      );

    this.timer$.subscribe((value: number) => {
      this.timerValue = value;
    });
  }

  getTimerSeconds() {
    return padZero(this.timerValue % 60);
  }

  getTimerMinutes() {
    return padZero(Math.floor(this.timerValue / 60) % 60);
  }

  getTimerHours() {
    return padZero(Math.floor(this.timerValue / 3600));
  }

  ngOnInit() {
    // this.startTimer();
  }

  ngOnDestroy() {

  }
}
