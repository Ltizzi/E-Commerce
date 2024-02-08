import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { User } from 'src/common/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  user!: User;

  constructor(private authServ: AuthService) {}

  ngOnInit(): void {
    if (!localStorage.getItem('user')) {
      this.authServ.getUser().subscribe((data) => {
        this.user = data as User;
      });
    } else this.user = JSON.parse(localStorage.getItem('user') as string);
  }
}
