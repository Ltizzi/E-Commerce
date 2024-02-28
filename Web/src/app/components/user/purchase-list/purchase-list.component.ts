import { Component, Input } from '@angular/core';
import { PurchaseService } from 'src/app/services/purchase.service';
import { PaginationService } from 'src/app/services/ui/pagination.service';
import { inAndOutAnimation } from 'src/common/animations';
import { Purchase } from 'src/common/models/purchase';
import { State } from 'src/common/models/state';
import { User } from 'src/common/models/user';

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
    private pagination: PaginationService
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
    // }
  }

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
    let date = new Date(incDate);
    const year = date.getFullYear().toString();
    const month = date.getMonth().toString();
    const day = date.getDay().toString();
    const hour = date.getHours().toString();
    const minutes = date.getMinutes().toString();

    return `${day}/${month}/${year} at ${hour.length < 2 ? '0' + hour : hour}:${
      minutes.length < 2 ? '0' + minutes : minutes
    }`;
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
