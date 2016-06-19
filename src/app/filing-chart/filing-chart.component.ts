import {Component, OnInit, Input, trigger,
  state,
  style,
  transition,
  animate} from '@angular/core';
import { Filing } from '../model/filing';

/*
 * App Component
 * Top Level Component
 */
@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'app'
  selector: 'filing-chart', // <app></app>
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [ ],
  
  pipes: [],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [require('./filing-chart.less')],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: `
    <div class="chart" @chartStateTrigger="chartState">
        Filing Chart {{filing?.TradingSymbol}}
        <div>Document Type: {{filing?.DocumentType}}</div>
        <div>Period End: {{filing?.DocumentPeriodEndDate}}</div>
        <div>Revenues: {{filing?.Revenues}}</div>
        <button (click)="toggleChartState()">Toggle State</button>
    </div>
  `,
  animations: [
    trigger('chartStateTrigger', [
      state('inactive', style({
        backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('active',   style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})
export class FilingChartComponent implements OnInit {
   public chartState: string = 'inactive';
   @Input() filing: Filing;

  ngOnInit() {
  }

  toggleChartState = () => {
    this.chartState = this.chartState === 'inactive' ? 'active' : 'inactive';
  }
}