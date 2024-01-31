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

@Component({
  selector: 'app-type-table',
  templateUrl: './type-table.component.html',
  styleUrls: ['./type-table.component.css'],
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

  constructor(
    private typeServ: ProductTypeService,
    private pagination: PaginationService
  ) {}

  ngOnInit(): void {
    this.typeServ.getTotal().subscribe((data: any) => {
      this.totalTypes = data.total;
      this.pages = this.pagination.build(this.ITEMS_PER_PAGE, this.totalTypes);
    });
    this.fetchTypes(1, this.ITEMS_PER_PAGE);
    this.currentPage = this.pagination.getCurrentPage();
  }

  //refresh on new type
  ngOnChanges(changes: SimpleChanges) {
    if (changes['reload'] && changes['reload'].currentValue) {
      this.fetchTotal();
      this.reloadTypes();
    }
  }

  fetchTotal() {
    this.typeServ.getTotal().subscribe((data: any) => {
      this.totalTypes = data.total;
      this.pages = this.pagination.build(this.ITEMS_PER_PAGE, this.totalTypes);
    });
  }

  fetchTypes(page: number, limit: number) {
    let correctPage = page;
    this.typeServ
      .getAllWithPagination(correctPage, limit)
      .subscribe((data: any) => {
        this.types = data;
        this.currentPage = page;
      });
  }

  reloadTypes() {
    this.fetchTypes(this.currentPage, this.ITEMS_PER_PAGE);
  }

  //PAGINATION

  goNext() {
    this.currentPage = this.pagination.goNext();
    this.fetchTypes(this.currentPage, this.ITEMS_PER_PAGE);
  }

  goPrevious() {
    this.currentPage = this.pagination.goPrevious();
    this.fetchTypes(this.currentPage, this.ITEMS_PER_PAGE);
  }

  goPage(page: number) {
    this.currentPage = this.pagination.goPage(page);
    this.fetchTypes(this.currentPage, this.ITEMS_PER_PAGE);
  }

  editType(type: ProductType) {
    this.typeToEdit.emit(type);
  }

  deleteType(type: ProductType) {
    this.typeToDelete.emit(type);
  }
}
