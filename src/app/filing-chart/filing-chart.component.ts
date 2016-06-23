import {Component, OnInit, Input, trigger,
  state,
  style,
  transition,
  animate} from '@angular/core';
import { Filing } from '../model/filing';

@Component({
  selector: 'filing-chart',
  directives: [ ],
  pipes: [],
  styles: [require('./filing-chart.less')],
  template: `
    <div class="chart" @chartStateTrigger="chartState">
        Filing Chart {{filing?.TradingSymbol}}
        <div>Document Type: {{filing?.DocumentType}}</div>
        <div>Period End: {{filing?.DocumentPeriodEndDate}}</div>
        <br>
        <div class="rollup credit">Revenues: {{filing?.Revenues}}</div>
        <div class="debit indent1">Cost of Revenue: {{filing?.CostOfRevenue}}</div>
        <div class="debit indent1">Operating Expenses: {{filing?.OperatingExpenses}}</div>
        <div class="debit rollup">Costs and Expenses: {{filing?.CostsAndExpenses}}</div>
        <div class="credit">Other operating income: {{filing?.OtherOperatingIncome}}</div>
        <div class="debit">Operating Income: {{filing?.OperatingIncomeLoss}}</div>
        <br/>
        <div class="rollup credit">Non-operating income: {{filing?.NonoperatingIncomeLoss}}</div>
        <div class="debit indent1">Interest And Debt Expense: {{filing?.InterestAndDebtExpense}}</div>
        <div class="credit rollup">Income (Loss) from Continuing Operations Before Tax: {{filing?.IncomeFromContinuingOperationsBeforeTax}}</div>
        <br/>

        <div class="rollup credit">Income Tax Expense (Benefit): {{filing?.IncomeTaxExpenseBenefit}}</div>
        <div class="debit indent1">Income (Loss) from Continuing Operations After Tax: {{filing?.IncomeFromContinuingOperationsAfterTax}}</div>
        <div class="credit indent1">Income (Loss) from Discontinued Operations, Net of Tax: {{filing?.IncomeFromDiscontinuedOperations}}</div>
        <div class="credit rollup">Extraordinary Items of Income (Expense), Net of Tax: {{filing?.ExtraordaryItemsGainLoss}}</div>
        <div class="credit rollup">Net Income (Loss): {{filing?.NetIncomeLoss}}</div>
        
        <br/>
        <button (click)="toggleChartState()">Toggle State</button>
        <div>
          <svg viewBox="0 0 32 32">
            <circle r="16" cx="16" cy="16" />
          </svg>
        </div>
        <div class="container">
          <div class="container-chart">
            <div class="container-semicircle">
              <div class="semicircle large"></div>
              <div class="semicircle mid"></div>
              <div class="semicircle small"></div>
            </div>
          </div>
        </div>
        
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