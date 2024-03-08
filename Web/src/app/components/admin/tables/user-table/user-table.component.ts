import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Component } from '@angular/core';
import { User } from 'src/common/models/user';
import { UserService } from 'src/app/services/user.service';
import { PaginationService } from 'src/app/services/ui/pagination.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { State } from 'src/common/models/state';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
  animations: [
    trigger('tableState', [
      state(
        'firstLoad',
        style({
          opacity: 0,
          transform: 'scale(0.8)',
        })
      ),
      state(
        'normal',
        style({
          opacity: 1,
          transform: 'scale(1)',
        })
      ),
      transition('firstLoad <=> normal', animate(300)),
    ]),
    trigger('rowState', [
      state(
        'hover',
        style({
          backgroundColor: '#E0E7FF ',
          fontWeight: 'bolder',
          opacity: 1,
        })
      ),
      state('normal', style({ backgroundColor: 'white', opacity: 0.7 })),
      transition('normal<=>hover', animate(200)),
    ]),
    trigger('paginationNavState', [
      state(
        'normal',
        style({
          backgroundColor: 'white',
        })
      ),
      state(
        'hover',
        style({
          backgroundColor: '#4F46E5',
        })
      ),
      transition('normal<=>hover', animate(300)),
    ]),
    // trigger('paginationPages', [
    //   state('normal', style({})),
    //   state('hover', style({})),
    //   state(
    //     'selected',
    //     style({
    //       backgroundColor: '#4F46E5',
    //     })
    //   ),
    //   state('click', style({})),
    //   transition('normal<=>hover', animate(300)),
    //   transition('hover=>click', animate(300)),
    //   transition('click=>selected', animate(300)),
    //   transition('selected=>normal', animate(300)),
    // ]),
  ],
})
export class UserTableComponent {
  users: Array<User> = [];
  faTrashCan = faTrashCan;

  isDeleteDialogOpen: boolean = false;
  userToDelete!: Object;

  ITEMS_PER_PAGE = 5;
  pages!: Array<number>;
  //pagesWithState!: Array<State>;
  totalUsers!: number;
  currentPage!: number;

  state: State = {
    animation: {
      table: 'firstLoad',
      navLeft: 'normal',
      navRight: 'normal',
    },
  };

  constructor(
    private userServ: UserService,
    private pagination: PaginationService
  ) {}

  ngOnInit(): void {
    this.userServ.getTotal().subscribe((data: any) => {
      this.totalUsers = data.total;
      this.pages = this.pagination.build(this.ITEMS_PER_PAGE, this.totalUsers);
      //   this.pagesWithState = this.refactorPages(this.pages);
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
        this.state.animation.table = 'normal';
        this.users.forEach((user: any) => {
          user.state = 'normal';
        });
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

  // refactorPages(pages: Array<number>): Array<State> {
  //   let objs: Array<State> = [];
  //   pages.forEach((page: number) => {
  //     objs.push({ number: page, animation: 'normal' });
  //   });
  //   objs[0].animation = 'selected';
  //   return objs;
  // }

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
