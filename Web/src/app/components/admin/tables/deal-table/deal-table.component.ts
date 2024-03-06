import { Component } from '@angular/core';
import { Deal } from 'src/common/models/deal';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { inAndOutAnimation } from 'src/common/animations';
import { State } from 'src/common/models/state';
import { DealService } from 'src/app/services/deal.service';
import { PaginationService } from 'src/app/services/ui/pagination.service';
import { EventService } from 'src/app/services/event.service';
import { Router } from '@angular/router';
import { DateUtilsService } from 'src/app/services/ui/date-utils.service';

@Component({
  selector: 'app-deal-table',
  templateUrl: './deal-table.component.html',
  styleUrl: './deal-table.component.css',
  animations: [inAndOutAnimation],
})
export class DealTableComponent {
  deals: Array<Deal> = [];
  faPen = faPen;
  faTrashCan = faTrashCan;

  isEditModalDisplayed: boolean = false;
  showDeleteDialog: boolean = false;
  dealToEdit!: Deal;
  dealToDelete!: Deal;

  ITEMS_PER_PAGE = 5;
  pages!: Array<number>;
  totalDeals!: number;
  currentPage!: number;

  state: State = {
    animation: {
      table: 'out',
    },
  };

  constructor(
    private dealServ: DealService,
    private router: Router,
    private pagination: PaginationService,
    private eventServ: EventService,
    private dateUtils: DateUtilsService
  ) {}

  ngOnInit(): void {
    this.hideTable();
    this.dealServ.getTotal().subscribe((data: any) => {
      this.totalDeals = data.total;
      this.pages = this.pagination.build(this.ITEMS_PER_PAGE, this.totalDeals);
    });
    this.eventServ.subscribe('updateDeals').subscribe((data) => {
      this.reloadDeals();
    });

    this.fetchDeals(1, this.ITEMS_PER_PAGE);
    this.currentPage = this.pagination.getCurrentPage();
    this.showTable();
  }

  fetchDeals(page: number, limit: number) {
    let correctPage = page;
    this.dealServ
      .getAllWithPagination(correctPage, limit)
      .subscribe((data: any) => {
        this.deals = data;
        this.currentPage = page;
        this.state.animation.table = 'in';
      });
  }

  reloadDeals() {
    this.fetchDeals(this.currentPage, this.ITEMS_PER_PAGE);
  }

  generateDateTemplate(date: any) {
    return this.dateUtils.generateDateTemplate(date);
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

  goNext() {
    this.hideTable();
    this.currentPage = this.pagination.goNext();
    this.fetchDeals(this.currentPage, this.ITEMS_PER_PAGE);
    this.showTable();
  }

  goPrevious() {
    this.hideTable();
    this.currentPage = this.pagination.goPrevious();
    this.fetchDeals(this.currentPage, this.ITEMS_PER_PAGE);
    this.showTable();
  }

  goPage(page: number) {
    this.hideTable();
    this.currentPage = this.pagination.goPage(page);
    this.fetchDeals(this.currentPage, this.ITEMS_PER_PAGE);
    this.showTable();
  }

  goToProduct(id: number | undefined, event: Event) {
    event.preventDefault();
    this.router.navigate(['/product'], { queryParams: { id: id } });
  }

  deleteDeal(deal: Deal) {
    console.log('asdas');
    this.dealToDelete = deal;
    this.showDeleteDialog = true;
  }

  showEditModal(deal: Deal) {
    this.dealToEdit = {} as Deal;
    this.dealToEdit = deal;
    this.isEditModalDisplayed = !this.isEditModalDisplayed;
  }

  closeDeleteDialog() {
    this.showDeleteDialog = !this.showDeleteDialog;
    this.fetchDeals(this.currentPage, this.ITEMS_PER_PAGE);
  }

  closeModal() {
    this.isEditModalDisplayed = !this.isEditModalDisplayed;
    this.fetchDeals(this.currentPage, this.ITEMS_PER_PAGE);
  }
}
