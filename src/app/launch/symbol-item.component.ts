import {Component, OnInit, Inject, Input, Output, EventEmitter, ChangeDetectionStrategy, trigger,
  state,
  style,
  transition,
  animate } from '@angular/core';
import {Symbol} from '../model/symbol';

/*
 * App Component
 * Top Level Component
 */
@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'app'
  selector: 'symbol-item', // <app></app>
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [ ],
  
  providers: [],
  pipes: [],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [require('./symbol-item.less')],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: `
    <li @itemStateTrigger="state" class="symbol-item">
      <div>
        <svg class="check" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
        <g>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M39.363,79L16,55.49l11.347-11.419L39.694,56.49L72.983,23L84,34.085L39.363,79z">
        </path>
        </g>
        </svg>
        <span class="exchange">{{symbol.exchange}}:</span>
        <span class="ticker">{{symbol.Symbol}}</span>
      </div>
      <div class="name">{{symbol.Name}}</div>
    </li>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('itemStateTrigger', [
      state('default', style({
        backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('selected',   style({
        borderColor: 'green',
        backgroundColor: 'green',
        color: 'white'
      })),
      state('unselected',   style({
        borderColor: 'gray'
      })),
      transition('void => *', [
        style({transform: 'translateX(-100%) scale(1)'}),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({transform: 'translateX(100%) scale(1)'}))
      ]),
    ])
  ]
})
export class SymbolItemComponent {
   @Input() symbol: Symbol;
   @Input() selected: boolean = false;
   
   constructor(){}
  
   get state() : string {
     return this.selected === true ? 'selected' : (this.selected === false ? 'unselected' : 'default');
   }
}