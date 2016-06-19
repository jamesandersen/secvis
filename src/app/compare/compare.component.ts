import {Component, OnInit, Inject} from '@angular/core';
import {FORM_DIRECTIVES} from '@angular/common';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {SECDataService} from '../secdata/secdata';
import {FilingChartComponent} from '../filing-chart/filing-chart.component';
import {state, dispatcher } from '../../app/app.dispatcher';
import {Observable, Observer} from 'rxjs';

import {AppState} from '../model/AppState';
import {Action, SetFilingAction} from '../model/Actions';

/*
 * App Component
 * Top Level Component
 */
@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'app'
  selector: 'compare', // <app></app>
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [ FORM_DIRECTIVES, ROUTER_DIRECTIVES, FilingChartComponent ],
  
  providers: [ SECDataService ],
  pipes: [],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [require('./compare.less')],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: `
    <div id="startup">
        Data Vis Here {{(compare | async).filing1?.TradingSymbol}}
        <div>Document Type: {{(compare | async).filing1?.DocumentType}}</div>
        <div>Period End: {{(compare | async).filing1?.DocumentPeriodEndDate}}</div>
        <div>Revenues: {{(compare | async).filing1?.Revenues}}</div>

        <filing-chart [filing]="(compare | async).filing1"></filing-chart> 
        Chart?
    </div>
  `
})
export class CompareComponent implements OnInit {
   public ticker: string;
   
   constructor(
     @Inject(dispatcher) private dispatcher: Observer<Action>,
     @Inject(state) private state: Observable<AppState>,
    public dataService: SECDataService) {
    this.ticker = 'MSFT';
  }
  
  ngOnInit() {
    this.dataService.getFiling(this.ticker).subscribe(
        // onNext callback
        data => this.dispatcher.next(new SetFilingAction(data.json())),
        // onError callback
        err  => this.ticker = err,
        // onComplete callback
        ()   => console.log('complete')
      );
  }

  get compare() { return this.state.map(s => s.compare); }
}