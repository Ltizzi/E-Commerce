import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent {
  constructor(private route: ActivatedRoute, private authServ: AuthService) {}

  ngOnInit(): void {
    this.authServ.getUser().subscribe((data) => {
      console.log(data);
    });
  }
}
