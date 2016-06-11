import {Component, OnInit, Inject} from '@angular/core';
import {FORM_DIRECTIVES} from '@angular/common';
import {RouteConfig, RouteParams, ROUTER_DIRECTIVES, ROUTER_BINDINGS} from '@angular/router-deprecated';
import {SECDataService} from '../secdata/secdata';
import {AppState} from '../model/AppState';
import {SetTickersAction} from '../model/Actions';
import {state, dispatcher, stateAndDispatcher } from '../app.dispatcher';

/*
 * App Component
 * Top Level Component
 */
@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'app'
  selector: 'launch', // <app></app>
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [ FORM_DIRECTIVES, ROUTER_DIRECTIVES ],

  providers: [ SECDataService, stateAndDispatcher ],
  pipes: [],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [require('./launch.less')],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./launch.html')
})
export class Launch implements OnInit {
   public setTickers: SetTickersAction;
   public error: string;
   constructor(@Inject(dispatcher) private dispatcher: Observer<Action>,
              @Inject(state) private state: Observable<AppState>,
              public dataService: SECDataService) {

    this.setTickers = new SetTickersAction();
  }

  ngOnInit() {

  }

  get compare() { return this.state.map(s => s.compare); }

  emitSetTicker() { this.dispatcher.next(this.setTickers); }

  showCompare() {


    this.dataService.getTicker(this.compare.symbol1).subscribe(
        // onNext callback
        data => this.compare.filing1 = data.json(),
        // onError callback
        err  => this.error = err,
        // onComplete callback
        ()   => console.log('complete')
      );
  }

}