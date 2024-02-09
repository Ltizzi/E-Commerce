import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PurchaseService } from 'src/app/services/purchase.service';
import { Purchase } from 'src/common/models/purchase';

import { User } from 'src/common/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  user!: User;
  totalPurchase: number = 0;
  purchases!: Array<Purchase>;

  showProfileEditorModal = false;

  constructor(
    private authServ: AuthService,
    private purchServ: PurchaseService
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('user')) {
      this.reloadUserData();
    } else this.user = JSON.parse(localStorage.getItem('user') as string);
    if (this.user) {
      this.purchServ
        .getByUserId(this.user.user_id as number)
        .subscribe((data: any) => {
          this.purchases = data;
          this.totalPurchase = this.purchases.length;
        });
    }
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
}
