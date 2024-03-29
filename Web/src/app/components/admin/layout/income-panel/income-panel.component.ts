import { Component, Input } from '@angular/core';
import { PurchaseService } from 'src/app/services/purchase.service';
import { inAndOutAnimation } from 'src/common/animations';
import { State } from 'src/common/models/state';

@Component({
  selector: 'app-income-panel',
  templateUrl: './income-panel.component.html',
  styleUrl: './income-panel.component.css',
  animations: [inAndOutAnimation],
})
export class IncomePanelComponent {
  incomeSimbol = {
    total: 'k',
    annual: 'k',
    monthly: 'k',
    weekly: 'k',
  };
  @Input('total') totalIncome!: number;
  @Input('simbol') simbol!: string;
  annualIncome!: number;
  monthlyIncome!: number;
  weeklyIncome!: number;

  state: State = {
    animation: {
      panel: 'out',
    },
  };

  constructor(private purchServ: PurchaseService) {}

  ngOnInit(): void {
    this.purchServ
      .getAnnualIncome()
      .subscribe(
        (data: any) =>
          (this.annualIncome = this.calcIncomeTemplate(data.total, 'annual'))
      );
    this.purchServ
      .getMonthlyIncome()
      .subscribe(
        (data: any) =>
          (this.monthlyIncome = this.calcIncomeTemplate(data.total, 'monthly'))
      );
    this.purchServ
      .getWeeklyIncome()
      .subscribe(
        (data: any) =>
          (this.weeklyIncome = this.calcIncomeTemplate(data.total, 'weekly'))
      );
    setTimeout(() => {
      this.state.animation.panel = 'in';
    }, 200);
  }

  ngOnDestroy(): void {
    setTimeout(() => {
      this.state.animation.panel = 'out';
    }, 50);
  }

  calcIncomeTemplate(income: number, type: string) {
    let inc = 0;
    let millon = 1000000;
    let thousand = 1000;
    if (income > millon) {
      if (type == 'total') this.incomeSimbol.total = 'm';
      if (type == 'annual') this.incomeSimbol.annual = 'm';
      if (type == 'monthly') this.incomeSimbol.monthly = 'm';
      if (type == 'weekly') this.incomeSimbol.weekly = 'm';
      inc = parseFloat((income / millon).toFixed(2));
    } else if (income < millon) {
      type = 'k';
      inc = parseFloat((income / thousand).toFixed(2));
    }

    return inc;
  }
}
