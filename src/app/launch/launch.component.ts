import {Component, OnInit, Inject} from '@angular/core';
import {FORM_DIRECTIVES} from '@angular/common';
import {Observable, Observer} from 'rxjs';
import {Action, SetTickersAction, ClearTickersAction } from '../model/Actions';
import { ActivatedRoute, Router, ROUTER_DIRECTIVES } from '@angular/router';
import {SECDataService} from '../secdata/secdata';
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
  directives: [FORM_DIRECTIVES, ROUTER_DIRECTIVES],

  providers: [SECDataService],
  //pipes: [],
  // Our list of styles in our component. We may add more to compose many styles together
  //styles: [require('./launch.less')],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./launch.html')
})
export class LaunchComponent implements OnInit {
  public setTickers: SetTickersAction;
  public error: string;
  constructor( @Inject(dispatcher) private dispatcher: Observer<Action>,
    @Inject(state) private state: Observable<AppState>,
    private router: Router,
    private route: ActivatedRoute,
    public dataService: SECDataService) {
    this.setTickers = new SetTickersAction(null, null);
  }

  ngOnInit() {

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