import {Component, OnInit, Inject, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {Response} from '@angular/http';
import {REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup } from '@angular/forms';
import {Observable, Observer, Subject} from 'rxjs';
import {Action, SetSymbolAction } from '../model/Actions';
import {SECDataService} from '../secdata/secdata';
import {Symbol} from '../model/symbol';
import {AppState} from '../model/AppState';
import { state } from '../../app/app.dispatcher';
import {SymbolItemComponent} from './symbol-item.component';

/*
 * App Component
 * Top Level Component
 */
@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'app'
  selector: 'symbol-picker', // <app></app>
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [SymbolItemComponent, REACTIVE_FORM_DIRECTIVES],

  providers: [SECDataService],
  //pipes: [],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [require('./symbol-picker.less')],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: `<div class="symbol" [formGroup]="symbolForm">
      <input type="text" name="ticker" required formControlName="ticker">
      <ul [hidden]="tickerLoading | async">
        <symbol-item *ngFor="let symbol of tickerSymbols | async" (click)="onSelection(symbol)"
          [symbol]="symbol"
          [selected]="!selectedSymbol ? undefined : symbol.Symbol === selectedSymbol.Symbol"
          ></symbol-item>
      </ul>
      <div [hidden]="(loading | async) === false || false" class="loader">Loading...</div>
    </div>`
})
export class SymbolPickerComponent implements OnInit, OnChanges {
  @Input() selectedSymbol: Symbol;
  @Output() symbolSelected = new EventEmitter<Symbol>();

  public tickerControl = new FormControl();
  public symbolForm = new FormGroup({
      ticker: this.tickerControl
   });
  public tickerSymbols: Observable<Array<Symbol>>;
  public tickerLoading: Observable<boolean>;
  public error: string;

  private symbolsSubject = new Subject<Symbol[]>();
  private loading = new Subject<boolean>();
  private updatingSelectedSymbol : boolean = false;

  constructor( 
    @Inject(state) private state: Observable<AppState>,
    public dataService: SECDataService) { }

  ngOnInit() {

    // merge initial value with subsequent changes into stream
    var tickerChanges = this.tickerControl.valueChanges
                            .filter(txt => !this.updatingSelectedSymbol)
                            .debounceTime(200)
                            .distinctUntilChanged()
                            .share();

    // for each ticker value change, fetch the matching symbol values
    this.tickerSymbols = Observable.merge(
        // seed the observable with an initial value 
        this.symbolsSubject,
        tickerChanges.switchMap(term => {
                    console.log('ticker value change: ' + term);
                    return this.dataService.searchSymbols(term)
                          .catch((err, obs) => 
                            Observable.from([[ <Symbol>{ Name: `no data matches ${term}`}]]));
                  }).do(val => this.loading.next(false)))
                  .share();
  }

  ngOnChanges(changes: SimpleChanges) {
      if (changes['selectedSymbol']) {
        if(changes['selectedSymbol'].currentValue) {
          this.updatingSelectedSymbol = true;
          this.tickerControl.updateValue(changes['selectedSymbol'].currentValue.Symbol);
          this.symbolsSubject.next([changes['selectedSymbol'].currentValue]);
          this.loading.next(false);
          this.updatingSelectedSymbol = false;
        }
      }
  }

  onSelection(evt: Symbol) {
    this.symbolSelected.emit(evt);
  }
}