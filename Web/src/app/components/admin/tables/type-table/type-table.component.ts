import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ProductType } from 'src/common/models/type';
import { ProductTypeService } from 'src/app/services/product-type.service';
import { PaginationService } from 'src/app/services/ui/pagination.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { State } from 'src/common/models/state';
import { fadeIndAndFadeOutAnimation } from 'src/common/animations';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-type-table',
  templateUrl: './type-table.component.html',
  styleUrls: ['./type-table.component.css'],
  animations: [
    trigger('tableState', [
      state(
        'hide',
        style({
          opacity: 0,
          transform: 'scale(0.5) translateY(200px)',
        })
      ),
      state(
        'show',
        style({ opacity: 1, transform: 'scale(1) translateY(0px)' })
      ),
      transition('show=>hide', animate(50)),
      transition('hide=>show', animate(150)),
    ]),
    fadeIndAndFadeOutAnimation,
  ],
})
export class TypeTableComponent {
  @Input() reload!: boolean;
  @Output() typeToEdit = new EventEmitter<ProductType>();
  @Output() typeToDelete = new EventEmitter<ProductType>();

  types: Array<ProductType> = [];
  faPen = faPen;
  faTrashCan = faTrashCan;

  isDeleteDialogOpen: boolean = false;

  ITEMS_PER_PAGE = 5;
  pages!: Array<number>;
  totalTypes!: number;
  currentPage!: number;

  state: State = {
    show: false,
    reloading: false,
    animation: {
      page: 'show',
    },
  };

  constructor(
    private typeServ: ProductTypeService,
    private pagination: PaginationService,
    private eventServ: EventService
  ) {}

  ngOnInit(): void {
    this.typeServ.getTotal().subscribe((data: any) => {
      this.totalTypes = data.total;
      this.pages = this.pagination.build(this.ITEMS_PER_PAGE, this.totalTypes);
    });
    this.fetchTypes(1, this.ITEMS_PER_PAGE);
    this.currentPage = this.pagination.getCurrentPage();
    this.showTable();
    this.eventServ.subscribe('updateTypes').subscribe((data) => {
      this.fetchTotal();
      this.reloadTypes();
    });
  }

  //refresh on new type
  ngOnChanges(changes: SimpleChanges) {
    if (changes['reload'] && changes['reload'].currentValue) {
      this.fetchTotal();
      this.reloadTypes();
    }
  }

  fetchTotal() {
    this.reloadingPage();
    this.typeServ.getTotal().subscribe((data: any) => {
      this.totalTypes = data.total;
      this.pages = this.pagination.build(this.ITEMS_PER_PAGE, this.totalTypes);
      this.reloadingPage();
    });
  }

  fetchTypes(page: number, limit: number) {
    let correctPage = page;
    this.reloadingPage();
    this.typeServ
      .getAllWithPagination(correctPage, limit)
      .subscribe((data: any) => {
        this.types = data;
        this.currentPage = page;
        this.reloadingPage();
      });
  }

  reloadingPage() {
    setTimeout(() => {
      this.state.reloading = !this.state.reloading;
    }, 200);
  }

  reloadTypes() {
    this.fetchTypes(this.currentPage, this.ITEMS_PER_PAGE);
  }

  //PAGINATION

  hideTable() {
    this.state.show = false;
    this.state.animation.page = 'hide';
  }

  showTable() {
    setTimeout(() => {
      this.state.animation.page = 'show';
      this.state.show = true;
    }, 150);
  }

  goNext() {
    this.hideTable();
    this.currentPage = this.pagination.goNext();
    this.fetchTypes(this.currentPage, this.ITEMS_PER_PAGE);
    this.showTable();
  }

  goPrevious() {
    this.hideTable();
    this.currentPage = this.pagination.goPrevious();
    this.fetchTypes(this.currentPage, this.ITEMS_PER_PAGE);
    this.showTable();
  }

  goPage(page: number) {
    this.hideTable();
    this.currentPage = this.pagination.goPage(page);
    this.fetchTypes(this.currentPage, this.ITEMS_PER_PAGE);
    this.showTable();
  }

  editType(type: ProductType) {
    this.typeToEdit.emit(type);
  }

  deleteType(type: ProductType) {
    this.typeToDelete.emit(type);
  }
}
