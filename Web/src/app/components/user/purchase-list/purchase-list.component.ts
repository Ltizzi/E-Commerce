import { Component, Input } from '@angular/core';
import { PurchaseService } from 'src/app/services/purchase.service';
import { PaginationService } from 'src/app/services/ui/pagination.service';
import { inAndOutAnimation } from 'src/common/animations';
import { Product } from 'src/common/models/product';
import { Purchase } from 'src/common/models/purchase';
import { State } from 'src/common/models/state';
import { Order } from 'src/common/models/order';
import { DateUtilsService } from 'src/app/services/ui/date-utils.service';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrl: './purchase-list.component.css',
  animations: [inAndOutAnimation],
})
export class PurchaseListComponent {
  purchases!: Array<Purchase>;
  @Input('user_id') user_id!: number;
  noPurchases!: boolean;

  // allPurchases!: Array<Purchase>;
  // boughtProducts!: Array<Product>;

  showModal = false;

  purchaseDetails!: Purchase;

  ITEMS_PER_PAGE = 5;
  pages!: Array<number>;
  totalPurchases!: number;
  currentPage!: number;

  state: State = {
    animation: {
      table: 'out',
    },
    show: false,
  };

  constructor(
    private purchServ: PurchaseService,
    private pagination: PaginationService,
    private dateUtils: DateUtilsService
  ) {}

  ngOnInit(): void {
    // const user: User = JSON.parse(sessionStorage.getItem('user') as string);
    // if (user.user_id) {
    //   this.user_id = user.user_id as number;
    this.purchServ.countPurchasesByUser(this.user_id).subscribe((data: any) => {
      this.totalPurchases = data.total;
      if (this.totalPurchases > 0) {
        this.noPurchases = false;
        this.pages = this.pagination.build(
          this.ITEMS_PER_PAGE,
          this.totalPurchases
        );
      } else this.noPurchases = true;
    });
    this.fetchPurchases(1, this.ITEMS_PER_PAGE);
    this.currentPage = this.pagination.getCurrentPage();
    this.state.show = true;
    this.showTable();
    // if (!sessionStorage.getItem('compras')) {
    //   this.purchServ
    //     .getPurchasesByUserId(this.user_id)
    //     .subscribe((data: any) => {
    //       this.allPurchases = data;
    //       sessionStorage.setItem('compras', JSON.stringify(data));
    //     });
    // } else {
    //   this.allPurchases = JSON.parse(
    //     sessionStorage.getItem('compras') as string
    //   );
    // }
    //  this.boughtProducts = this.generateBoughtProductsArray();
    // }
  }

  // generateBoughtProductsArray() {
  //   let products = [] as Array<Product>;
  //   this.allPurchases.forEach((purch: Purchase) => {
  //     purch.orders.forEach((order: Order) => {
  //       const filterProducts = products.filter(
  //         (prod: Product) => prod.product_id == order.product.product_id
  //       );
  //       if (filterProducts.length == 0) {
  //         products.push(order.product);
  //       }
  //     });
  //   });
  //   //   console.log(products);
  //   return products;
  // }

  fetchPurchases(page: number, limit: number) {
    let correctPage = page;
    this.purchServ
      .getPurchasesFromUserWithPagination(this.user_id, correctPage, limit)
      .subscribe((data: any) => {
        this.purchases = data;
        this.currentPage = page;
      });
  }

  reloadPurchases() {
    this.fetchPurchases(this.currentPage, this.ITEMS_PER_PAGE);
  }

  generateDateTemplate(incDate: any) {
    return this.dateUtils.generateDateTemplate(incDate);
  }

  hideTable() {
    setTimeout(() => {
      this.state.animation.table = 'out';
    }, 50);
  }

  showTable() {
    setTimeout(() => {
      this.state.animation.table = 'in';
    }, 200);
  }

  showDetails(purch: Purchase, event: Event) {
    this.purchaseDetails = purch;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.purchaseDetails = {} as Purchase;
  }

  goNext() {
    this.hideTable();
    this.currentPage = this.pagination.goNext();
    this.fetchPurchases(this.currentPage, this.ITEMS_PER_PAGE);
    this.showTable();
  }

  goPrevious() {
    this.hideTable();
    this.currentPage = this.pagination.goPrevious();
    this.fetchPurchases(this.currentPage, this.ITEMS_PER_PAGE);
    this.showTable();
  }

  goPage(page: number) {
    this.hideTable();
    this.currentPage = this.pagination.goPage(page);
    this.fetchPurchases(this.currentPage, this.ITEMS_PER_PAGE);
    this.showTable();
  }
}
