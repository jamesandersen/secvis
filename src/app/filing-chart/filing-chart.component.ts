import {Component, OnInit, OnChanges, SimpleChanges, Input, trigger,
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
        
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" id="svg2" viewBox="0 0 100 100">
            <g id="layer1" >
              <rect id="revenues" width="8" 
                [attr.height]="coords.revenuesHeight" 
                x="0" 
                [attr.y]="coords.revenuesY" 
                fill="#14a918" stroke-width="0"/>
              <rect id="cost_of_revenue" width="8" 
                [attr.height]="coords.costOfRevenueHeight" 
                x="10"
                [attr.y]="coords.costOfRevenueY" 
                fill="#ce3100" stroke="#000" stroke-width="0"/>
              <rect id="operating_expenses" width="8" 
                [attr.height]="coords.operatingExpensesHeight" 
                x="20" 
                [attr.y]="coords.operatingExpensesY" 
                fill="#ce3100" 
                stroke="#000" stroke-width="0"/>
              <rect id="other_operating_income" width="8" 
                [attr.height]="coords.otherOperatingIncomeHeight" 
                x="30" 
                [attr.y]="coords.otherOperatingIncomeY" 
                fill="#14a918" stroke="#000" stroke-width="0"/>
              <rect id="non_operating_income" width="8" 
                [attr.height]="coords.nonoperatingIncomeLossHeight" 
                x="40"
                [attr.y]="coords.nonoperatingIncomeLossY"
                fill="#14a918" 
                stroke="#000" 
                stroke-width="0"/>
              <rect id="interest_debt_expense" width="8" 
                [attr.height]="coords.interestAndDebtExpenseHeight" 
                x="50" 
                [attr.y]="coords.interestAndDebtExpenseY" 
                fill="#ce3100" 
                stroke="#000" stroke-width=".058"/>
              <rect id="tax_expense" width="7.883" 
                [attr.height]="coords.incomeTaxExpenseBenefitHeight" 
                x="60" 
                [attr.y]="coords.incomeTaxExpenseBenefitY"
                fill="#ce3100" stroke="#000" stroke-width="0"/>
              <rect id="discontinued_operations" width="7.934" 
                [attr.height]="coords.incomeFromDiscontinuedOperationsHeight" 
                x="70" 
                [attr.y]="coords.incomeFromDiscontinuedOperationsY"
                fill="#ce3100" 
                stroke="#000" stroke-width="0"/>
              <rect id="extraordinary_items" width="7.941" 
                [attr.height]="coords.extraordaryItemsGainLossHeight" 
                x="80" 
                [attr.y]="coords.extraordaryItemsGainLossY"
                fill="#ce3100" stroke="#000" stroke-width="0"/>
            </g>
          </svg>
        </div>
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
        <!--<div>
          <svg class="pie" viewBox="0 0 32 32">
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
        </div>-->
        
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
export class FilingChartComponent implements OnInit, OnChanges {
   public chartState: string = 'inactive';
   @Input() filing: Filing;
   @Input() maxValue: number;
   public coords: any = {};

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges) {
      if (changes['filing'] || changes['maxValue']) {
        if (this.filing && this.maxValue > 0) {
          this.coords = this.getFilingChartCoordinates();
        }
      }
  }

  toggleChartState = () => {
    this.chartState = this.chartState === 'inactive' ? 'active' : 'inactive';
  }

  pixelValue = dollarValue => {
    var val = dollarValue / this.maxValue * 100;
    return isNaN(val) ? 0 : val;
  }

  getFilingChartCoordinates= () => {
    var coords : any = { revenuesHeight: Math.abs(this.pixelValue(this.filing.Revenues)) };
    var lastY = 100 - coords.revenuesHeight;
    coords.revenuesY = lastY;

    coords.costOfRevenueHeight = Math.abs(this.pixelValue(this.filing.CostOfRevenue));
    coords.costOfRevenueY = lastY;
    lastY += coords.costOfRevenueHeight;

    coords.operatingExpensesHeight = Math.abs(this.pixelValue(this.filing.OperatingExpenses));
    coords.operatingExpensesY = lastY;
    lastY += coords.operatingExpensesHeight;

    coords.otherOperatingIncomeHeight = Math.abs(this.pixelValue(this.filing.OtherOperatingIncome));
    coords.otherOperatingIncomeY = lastY;
    lastY += coords.otherOperatingIncomeHeight;

    coords.nonoperatingIncomeLossHeight = Math.abs(this.pixelValue(this.filing.NonoperatingIncomeLoss));
    coords.nonoperatingIncomeLossY = lastY;
    lastY += coords.nonoperatingIncomeLossHeight;

    coords.interestAndDebtExpenseHeight = Math.abs(this.pixelValue(this.filing.InterestAndDebtExpense));
    coords.interestAndDebtExpenseY = lastY;
    lastY += coords.interestAndDebtExpenseHeight;

    coords.incomeTaxExpenseBenefitHeight = Math.abs(this.pixelValue(this.filing.IncomeTaxExpenseBenefit));
    coords.incomeTaxExpenseBenefitY = lastY;
    lastY += coords.incomeTaxExpenseBenefitHeight;

    coords.incomeFromDiscontinuedOperationsHeight = Math.abs(this.pixelValue(this.filing.IncomeFromDiscontinuedOperations));
    coords.incomeFromDiscontinuedOperationsY = lastY;
    lastY += coords.incomeFromDiscontinuedOperationsHeight;

    coords.extraordaryItemsGainLossHeight = Math.abs(this.pixelValue(this.filing.ExtraordaryItemsGainLoss));
    coords.extraordaryItemsGainLossY = lastY;
    lastY += coords.extraordaryItemsGainLossHeight;

    return coords;
  }
}