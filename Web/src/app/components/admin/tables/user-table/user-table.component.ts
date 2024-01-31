import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Component } from '@angular/core';
import { User } from 'src/common/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { PaginationService } from 'src/app/services/ui/pagination.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
})
export class UserTableComponent {
  users: Array<User> = [];
  faTrashCan = faTrashCan;

  isDeleteDialogOpen: boolean = false;
  userToDelete!: Object;

  ITEMS_PER_PAGE = 5;
  pages!: Array<number>;
  totalUsers!: number;
  currentPage!: number;

  constructor(
    private userServ: UserService,
    private router: Router,
    private pagination: PaginationService
  ) {}

  ngOnInit(): void {
    this.userServ.getTotal().subscribe((data: any) => {
      this.totalUsers = data.total;
      this.pages = this.pagination.build(this.ITEMS_PER_PAGE, this.totalUsers);
    });
    this.fetchUsers(1, this.ITEMS_PER_PAGE);
  }

  //DATA FETCH

  fetchUsers(page: number, limit: number) {
    let correctPage = page;
    this.userServ
      .getAllWithPagination(correctPage, limit)
      .subscribe((data: any) => {
        this.users = data;
        this.currentPage = page;
      });
  }

  reloadUsers() {
    this.fetchUsers(this.currentPage, this.ITEMS_PER_PAGE);
  }

  //PAGINATION

  goNext() {
    this.currentPage = this.pagination.goNext();
    this.fetchUsers(this.currentPage, this.ITEMS_PER_PAGE);
  }

  goPrevious() {
    this.currentPage = this.pagination.goPrevious();
    this.fetchUsers(this.currentPage, this.ITEMS_PER_PAGE);
  }

  goPage(page: number) {
    this.currentPage = this.pagination.goPage(page);
    this.fetchUsers(this.currentPage, this.ITEMS_PER_PAGE);
  }

  //ACTIONS

  goToUser(id: number | undefined, event: Event) {
    event.preventDefault();
    // ??
  }

  deleteUser(user: User) {
    this.userToDelete = user;
    this.isDeleteDialogOpen = !this.isDeleteDialogOpen;
  }

  closeDeleteDialog() {
    this.isDeleteDialogOpen = !this.isDeleteDialogOpen;
    this.fetchUsers(this.currentPage, this.ITEMS_PER_PAGE);
  }
}
