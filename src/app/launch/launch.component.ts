import {Component, OnInit, Inject} from '@angular/core';
import {Response} from '@angular/http';
import {REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup } from '@angular/forms';
import {Observable, Observer} from 'rxjs';
import {Action, SetTickersAction, SetSymbolAction, ClearTickersAction } from '../model/Actions';
import { ActivatedRoute, Router, ROUTER_DIRECTIVES } from '@angular/router';
import {SECDataService} from '../secdata/secdata';
import {Symbol} from '../model/symbol';
import {AppState} from '../model/AppState';
import {state, dispatcher } from '../../app/app.dispatcher';

/*
 * App Component
 * Top Level Component
 */
@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'app'
  //selector: 'launch', // <app></app>
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [ROUTER_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],

  providers: [SECDataService],
  //pipes: [],
  // Our list of styles in our component. We may add more to compose many styles together
  //styles: [require('./launch.less')],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./launch.html'),
  styles: [require('./launch.less')]
})
export class LaunchComponent implements OnInit {
  public setTickers: SetTickersAction;
  public ticker1 = new FormControl('MSFT');
  public ticker2: FormControl = new FormControl('AAPL');
  public symbols = new FormGroup({
      ticker1: this.ticker1,
      ticker2: this.ticker2
   });
  public ticker1Symbols: Observable<Array<Symbol>>;
  public ticker1Loading: Observable<boolean>;
  public ticker2Symbols: Observable<Array<Symbol>>;
  public ticker2Loading: Observable<boolean>;
  public error: string;
  constructor( @Inject(dispatcher) private dispatcher: Observer<Action>,
    @Inject(state) private state: Observable<AppState>,
    private router: Router,
    private route: ActivatedRoute,
    public dataService: SECDataService) {
    this.setTickers = new SetTickersAction(null, null);
  }

  ngOnInit() {
    var ticker1changes = Observable.merge(
      Observable.from([this.ticker1.value]), 
      this.ticker1.valueChanges.debounceTime(200).distinctUntilChanged())
      .share();

    this.ticker1Symbols = ticker1changes.switchMap(term => {
                    console.log('ticker1 value change: ' + term);
                    return this.dataService.searchSymbols(term)
                    .catch((err, obs) => Observable.from([[ <Symbol>{ Symbol: 'no data'}]]));
                  }).share();

	  this.ticker1Loading = Observable.merge(ticker1changes.map(() => true), this.ticker1Symbols.map(() => false));

    var ticker2changes = Observable.merge(
      Observable.from([this.ticker2.value]), 
      this.ticker2.valueChanges.debounceTime(200).distinctUntilChanged())
      .share();

    this.ticker2Symbols = ticker2changes.switchMap(term => {
                    console.log('ticker2 value change: ' + term);
                    return this.dataService.searchSymbols(term)
                    .catch((err, obs) => Observable.from([[ <Symbol>{ Symbol: 'no data'}]]));
                  }).share();

	  this.ticker2Loading = Observable.merge(ticker2changes.map(() => true), this.ticker2Symbols.map(() => false));
  }

  get compare() { return this.state.map(s => s.compare); }

  emitSetTicker() {
    this.dispatcher.next(this.setTickers);

    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Add a totally useless `foo` parameter for kicks.
    this.router.navigate(['/compare']);
  }
}