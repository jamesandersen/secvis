import {Component, OnInit} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {RouteConfig, RouteParams, ROUTER_DIRECTIVES, APP_BASE_HREF, ROUTER_BINDINGS} from 'angular2/router'
import {SECDataService} from '../secdata/secdata';

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
  
  providers: [ SECDataService ],
  pipes: [],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [require('./launch.less')],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: `
    <div id="startup">
        Data Vis Here {{ticker}}
    </div>
  `
})
export class Launch implements OnInit {
   public ticker: string;
   
   constructor(public dataService: SECDataService) {
    this.ticker = 'MSFT';
  }
  
  ngOnInit() {
    this.dataService.getTicker(this.ticker).subscribe(
        // onNext callback
        data => this.ticker = data.json().message,
        // onError callback
        err  => this.ticker = err,
        // onComplete callback
        ()   => console.log('complete')
      );
  }
}