import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ProductTypeService } from 'src/app/services/product-type.service';
import { UserService } from 'src/app/services/user.service';
import { StockService } from 'src/app/services/stock.service';
import { EntryService } from 'src/app/services/entry.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { EventService } from 'src/app/services/event.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { State } from 'src/common/models/state';
import { DealService } from 'src/app/services/deal.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  animations: [
    trigger('cardState', [
      state(
        'firstLoad',
        style({
          transform: 'translateY(50px) scale(0.7)',
          opacity: 0,
        })
      ),
      state(
        'normal',
        style({
          transform: 'translateY(0px) scale(0.9) ',
          opacity: 1,
        })
      ),
      state(
        'hover',
        style({
          transform: 'scale(0.99)',
          backgroundColor: '#4f46e5',
          color: 'white',
        })
      ),
      state(
        'selected',
        style({
          transform: 'scale(1)',
          backgroundColor: '#818cf8',
        })
      ),
      transition('firstLoad => normal', animate(300)),
      transition('firstLoad => selected', animate(300)),
      transition('normal <=> hover', animate(100)),
      transition('hover<=>selected', animate(300)),
      transition('selected=>normal', animate(300)),
    ]),
  ],
})
export class AdminDashboardComponent {
  totalUsers!: number;
  totalTypes!: number;
  totalProducts!: number;
  totalDeals!: number;
  totalPurchases!: number;
  totalStock!: number;
  totalEntries!: number;
  totalIncome!: number;
  incomeSimbol!: string;
  events: string[] = [
    'updateProducts',
    'updateTypes',
    'updateStock',
    'updateEntries',
    'updateDeals',
  ];

  state: State = {
    actualTab: 'users',
    animation: {
      user: 'firstLoad',
      products: 'firstLoad',
      types: 'firstLoad',
      purchases: 'firstLoad',
      stock: 'firstLoad',
      entries: 'firstLoad',
      income: 'firstLoad',
      deals: 'firstLoad',
    },
  };
  firstLoad = true;

  constructor(
    private prodServ: ProductService,
    private typeServ: ProductTypeService,
    private userServ: UserService,
    private stockServ: StockService,
    private entryServ: EntryService,
    private purchServ: PurchaseService,
    private eventServ: EventService,
    private dealServ: DealService
  ) {}

  ngOnInit() {
    this.updateProducts();
    this.updateTypes();
    this.updateDeals();
    this.userServ
      .getTotal()
      .subscribe((data: any) => (this.totalUsers = data.total));
    this.updateStock();
    this.updateEntries();
    this.purchServ
      .getTotal()
      .subscribe((data: any) => (this.totalPurchases = data.total));
    this.purchServ
      .getTotalIncome()
      .subscribe(
        (data: any) => (this.totalIncome = this.calcIncomeTemplate(data.total))
      );
    this.events.forEach((event) => {
      this.eventServ.subscribe(event).subscribe((data) => {
        if (event == 'updateProducts') {
          this.updateProducts();
        }
        if (event == 'updateTypes') {
          this.updateTypes();
        }
        if (event == 'updateStock') {
          this.updateStock();
        }
        if (event == 'updateEntries') {
          this.updateEntries();
        }
        if (event == 'updateDeals') {
          this.updateDeals();
        }
      });
    });
    setTimeout(() => {
      this.firstLoad = false;
      this.state.animation.user = 'selected';
      for (let prop in this.state.animation) {
        this.state.animation[prop] = 'normal';
      }
    }, 100);
  }

  calcIncomeTemplate(income: number) {
    let inc = 0;
    let millon = 1000000;
    let thousand = 1000;
    if (income > millon) {
      this.incomeSimbol = 'm';
      inc = parseFloat((income / millon).toFixed(1));
    }
    if (income < millon) {
      this.incomeSimbol = 'k';
      inc = parseFloat((income / thousand).toFixed(1));
    }

    return inc;
  }

  changeTab(tab: string) {
    this.state.actualTab = tab;
    for (let prop in this.state.animation) {
      if (prop == tab) {
        this.state.animation[prop] = 'selected';
      } else this.state.animation[prop] = 'normal';
    }
  }

  leaveCard(tab: string) {
    for (let prop in this.state.animation) {
      if (prop == tab && prop != 'selected') {
        this.state.animation[prop] = 'normal';
      }
    }
  }

  hoverCard(tab: string) {
    for (let prop in this.state.animation) {
      if (prop == tab) {
        this.state.animation[prop] = 'hover';
      }
    }
  }

  updateDeals() {
    this.dealServ
      .getTotal()
      .subscribe((data: any) => (this.totalDeals = data.total));
  }

  updateProducts() {
    this.prodServ
      .getTotal()
      .subscribe((data: any) => (this.totalProducts = data.total));
  }
  updateTypes() {
    this.typeServ
      .getTotal()
      .subscribe((data: any) => (this.totalTypes = data.total));
  }
  updateStock() {
    this.stockServ
      .getTotal()
      .subscribe((data: any) => (this.totalStock = data.total));
  }

  updateEntries() {
    this.entryServ
      .getTotal()
      .subscribe((data: any) => (this.totalEntries = data.total));
  }
}
