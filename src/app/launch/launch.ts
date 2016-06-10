import {Component, OnInit} from '@angular/core';
import {FORM_DIRECTIVES} from '@angular/common';
import {RouteConfig, RouteParams, ROUTER_DIRECTIVES, ROUTER_BINDINGS} from '@angular/router-deprecated';
import {SECDataService} from '../secdata/secdata';
import {SECCompare} from './SECCompare';

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
  template: require('./launch.html')
})
export class Launch implements OnInit {
   public compare: SECCompare;
   public error: string;
   constructor(public dataService: SECDataService) {
    this.compare = new SECCompare();
  }

  ngOnInit() {
    
  }

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