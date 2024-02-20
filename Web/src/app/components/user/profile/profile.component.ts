import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import {
  fadeIndAndFadeOutAnimation,
  hoverInAndOutAnimation,
  inAndOutAnimation,
} from 'src/common/animations';
import { Purchase } from 'src/common/models/purchase';
import { State } from 'src/common/models/state';

import { User } from 'src/common/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [fadeIndAndFadeOutAnimation, hoverInAndOutAnimation],
})
export class ProfileComponent {
  user!: User;
  totalPurchase: number = 0;
  purchases!: Array<Purchase>;
  age!: number;
  birthday!: Object;

  showProfileEditorModal = false;

  state: State = {
    animation: {
      edit_btn: 'leave',
      delete_btn: 'leave',
      layout: 'out',
    },
  };

  constructor(
    private authServ: AuthService,
    private purchServ: PurchaseService
  ) {}

  ngOnInit(): void {
    if (!sessionStorage.getItem('user')) {
      this.reloadUserData();
    } else this.user = JSON.parse(sessionStorage.getItem('user') as string);
    if (this.user) {
      this.age = this.calcAge();
      this.birthday = this.stringifyBirthday();
      this.purchServ
        .getByUserId(this.user.user_id as number)
        .subscribe((data: any) => {
          this.purchases = data;
          this.totalPurchase = this.purchases.length;
        });
    }
    setTimeout(() => {
      this.state.animation.layout = 'in';
    });
  }

  showProfileEditor() {
    this.showProfileEditorModal = !this.showProfileEditorModal;
    // console.log('asdasd', this.showProfileEditorModal);
  }

  reloadUserData() {
    this.authServ.getUser().subscribe((data) => {
      this.user = data as User;
    });
  }
  calcAge(): number {
    let birth = this.user.birthday.toString().split('-');
    let year = +birth[0];
    let month = +birth[1];
    let day = +birth[2];
    let current = new Date();
    let thisYearBirthdayPassed: boolean;
    if (
      (current.getMonth() == month && current.getDay() < day) ||
      current.getMonth() < month
    ) {
      thisYearBirthdayPassed = false;
    } else thisYearBirthdayPassed = true;

    if (thisYearBirthdayPassed) return current.getFullYear() - year;
    else return current.getFullYear() - year - 1;
  }

  stringifyBirthday(): string {
    let date = this.user.birthday.toString().split('-');
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'Octuber',
      'November',
      'December',
    ];
    const days = ['st', 'nd', 'rd', 'th'];
    let day = '';
    if (+date[2] == 1) day = days[0];
    else if (+date[2] == 2) day = days[1];
    else if (+date[2] == 3) day = days[2];
    else day = days[3];
    let month = +date[1] - 1;
    return `${months[month]} ${date[2]}${day}, ${date[0]} `;
  }
}
