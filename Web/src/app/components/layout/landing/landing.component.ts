import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent {
  constructor(private route: ActivatedRoute, private userServ: UserService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const userId = params['user_id'];
      if (userId) {
        this.userServ.getById(userId).subscribe((data) => {
          console.log(data);
        });
      }
    });
  }
}
