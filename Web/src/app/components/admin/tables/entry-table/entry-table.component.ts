import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Component } from '@angular/core';
import { Entry } from 'src/common/models/entry';
import { EntryService } from 'src/app/services/entry.service';
import { PaginationService } from 'src/app/services/ui/pagination.service';
import { inAndOutAnimation } from 'src/common/animations';
import { State } from 'src/common/models/state';

@Component({
  selector: 'app-entry-table',
  templateUrl: './entry-table.component.html',
  styleUrls: ['./entry-table.component.css'],
  animations: [inAndOutAnimation],
})
export class EntryTableComponent {
  entries: Array<Entry> = [];
  faPen = faPen;
  faTrashCan = faTrashCan;

  isEditorDialogOpen: boolean = false;
  isDeleteDialogOpen: boolean = false;
  entryToEdit!: Entry;
  entryToDelete!: Entry;
  newOrEdit: boolean = false;

  ITEMS_PER_PAGE = 5;
  pages!: Array<number>;
  totalEntries!: number;
  currentPage!: number;

  state: State = {
    animation: {
      table: 'out',
    },
  };

  constructor(
    private entryServ: EntryService,
    private pagination: PaginationService
  ) {}

  ngOnInit(): void {
    this.entryServ.getTotal().subscribe((data: any) => {
      this.totalEntries = data.total;
      this.pages = this.pagination.build(
        this.ITEMS_PER_PAGE,
        this.totalEntries
      );
    });
    this.fetchEntries(1, this.ITEMS_PER_PAGE);
    this.currentPage = this.pagination.getCurrentPage();
    this.showTable();
  }

  //Fetch

  fetchEntries(page: number, limit: number) {
    let correctPage = page;
    this.entryServ
      .getAllWithPagination(correctPage, limit)
      .subscribe((data: any) => {
        this.entries = data;
        this.currentPage = page;
      });
  }

  reloadEntries() {
    this.fetchEntries(this.currentPage, this.ITEMS_PER_PAGE);
  }

  //PAgination

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
    this.fetchEntries(this.currentPage, this.ITEMS_PER_PAGE);
    this.showTable();
  }

  goPrevious() {
    this.hideTable();
    this.currentPage = this.pagination.goPrevious();
    this.fetchEntries(this.currentPage, this.ITEMS_PER_PAGE);
    this.showTable();
  }

  goPage(page: number) {
    this.hideTable();
    this.currentPage = this.pagination.goPage(page);
    this.fetchEntries(this.currentPage, this.ITEMS_PER_PAGE);
    this.showTable();
  }

  //ACTIONS

  deleteEntry(entry: Entry) {
    this.isDeleteDialogOpen = !this.isDeleteDialogOpen;
    this.entryToDelete = entry;
  }

  editEntry(entry: Entry) {
    this.isEditorDialogOpen = !this.isEditorDialogOpen;
    this.entryToEdit = entry;
  }

  closeDeleteDialog() {
    this.isDeleteDialogOpen = !this.isDeleteDialogOpen;
    this.reloadEntries();
  }

  closeModal() {
    this.isEditorDialogOpen = !this.isEditorDialogOpen;
    this.reloadEntries();
  }
}
