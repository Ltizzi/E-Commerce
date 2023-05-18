import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Component } from '@angular/core';
import { Entry } from 'src/common/models/entry';
import { EntryService } from 'src/app/services/entry.service';
import { PaginationService } from 'src/app/services/ui/pagination.service';

@Component({
  selector: 'app-entry-table',
  templateUrl: './entry-table.component.html',
  styleUrls: ['./entry-table.component.css'],
})
export class EntryTableComponent {
  entries: Array<Entry> = [];
  faPen = faPen;
  faTrashCan = faTrashCan;

  isEditorDialogOpen: boolean = false;
  isDeleteDialogOPen: boolean = false;
  entryToEdit!: Entry;
  entryToDelete!: Object;
  newOrEdit: boolean = false;

  ITEMS_PER_PAGE = 5;
  pages!: Array<number>;
  totalEntries!: number;
  currentPage!: number;

  constructor(
    private entryServ: EntryService,
    private pagination: PaginationService
  ) {}

  ngOnInit(): void {
    this.entryServ.getAll().subscribe((data: any) => {
      this.totalEntries = data.total;
      this.pages = this.pagination.build(
        this.ITEMS_PER_PAGE,
        this.totalEntries
      );
    });
    this.fetchEntries(1, this.ITEMS_PER_PAGE);
    this.currentPage = this.pagination.getCurrentPage();
  }

  //Fetch

  fetchEntries(page: number, limit: number) {
    let correctPage = page - 1;
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

  goNext() {
    this.currentPage = this.pagination.goNext();
    this.fetchEntries(this.currentPage, this.ITEMS_PER_PAGE);
  }

  goPrevious() {
    this.currentPage = this.pagination.goPrevious();
    this.fetchEntries(this.currentPage, this.ITEMS_PER_PAGE);
  }

  goPage(page: number) {
    this.currentPage = this.pagination.goPage(page);
    this.fetchEntries(this.currentPage, this.ITEMS_PER_PAGE);
  }

  //ACTIONS

  deleteEntry(entry: Entry) {
    this.isDeleteDialogOPen = !this.isDeleteDialogOPen;
    this.entryToDelete = entry;
  }

  editEntry(entry: Entry) {
    this.isEditorDialogOpen = !this.isEditorDialogOpen;
    this.entryToEdit = entry;
  }

  closeDeleteDialog() {
    this.isDeleteDialogOPen = !this.isDeleteDialogOPen;
    this.reloadEntries();
  }

  closeModal() {
    this.isEditorDialogOpen = !this.isEditorDialogOpen;
    this.reloadEntries();
  }
}
