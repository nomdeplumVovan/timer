Angular 2+
Реализовать таймер, который подсчитывает время в формате «HH: MM: SS»
Таймер должен иметь следующие кнопки:
* «Start / Stop» - запуск / остановка отсчета времени,
* «Wait» - с последующим быстрым нажатием (время между нажатиями не более 300 мс) таймер должен прекратить отсчет времени,
* «Reset» - сброс таймера на 0
Требование: используйте Observables в коде. 

https://nomdeplumvovan.github.io/timer/  - таймер

Реализован с четырьмя кнопками
* «Start» - запуск отсчета времени, продолжение отсчета времени(два клика/двойной клик).
* «Stop» - остановка отсчета времени,  
* «Wait» - с последующим быстрым нажатием (время между нажатиями не более 300 мс) таймер прекращает отсчет времени,
* «Reset» - сброс таймера на 00.


# MyApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
