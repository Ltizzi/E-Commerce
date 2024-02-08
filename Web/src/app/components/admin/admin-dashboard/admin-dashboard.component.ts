import { Component } from '@angular/core';
import { ModalService } from 'src/app/services/ui/modal.service';
import { NewProductModalComponent } from '../forms/new-product-modal/new-product-modal.component';
import { ProductService } from 'src/app/services/product.service';
import { ProductTypeService } from 'src/app/services/product-type.service';
import { UserService } from 'src/app/services/user.service';
import { StockService } from 'src/app/services/stock.service';
import { EntryService } from 'src/app/services/entry.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  totalUsers!: number;
  totalTypes!: number;
  totalProducts!: number;
  totalPurchases!: number;
  totalStock!: number;
  totalEntries!: number;
  events: string[] = [
    'updateProducts',
    'updateTypes',
    'updateStock',
    'updateEntries',
  ];

  state: any = {
    actualTab: 'users',
  };

  constructor(
    private prodServ: ProductService,
    private typeServ: ProductTypeService,
    private userServ: UserService,
    private stockServ: StockService,
    private entryServ: EntryService,
    private purchServ: PurchaseService,
    private eventServ: EventService
  ) {}

  ngOnInit() {
    this.updateProducts();
    this.updateTypes();
    this.userServ
      .getTotal()
      .subscribe((data: any) => (this.totalUsers = data.total));
    this.updateStock();
    this.updateEntries();
    this.purchServ
      .getTotal()
      .subscribe((data: any) => (this.totalPurchases = data.total));
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
      });
    });
  }

  changeTab(tab: string) {
    this.state.actualTab = tab;
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
