import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {
  fadeIndAndFadeOutAnimation,
  hoverInAndOutAnimation,
  inAndOutAnimation,
} from 'src/common/animations';
import { State } from 'src/common/models/state';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  animations: [
    inAndOutAnimation,
    fadeIndAndFadeOutAnimation,
    hoverInAndOutAnimation,
  ],
})
export class LandingComponent {
  state: State = {
    animation: {
      img: 'out',
      text: 'out',
      btn: 'leave',
    },
  };

  constructor(private route: ActivatedRoute, private authServ: AuthService) {}

  ngOnInit(): void {
    this.authServ.getUser().subscribe((data) => {
      console.log(data);
      sessionStorage.setItem('user', JSON.stringify(data));
    });
    setTimeout(() => {
      this.state.animation.img = 'in';
      this.state.animation.text = 'in';
    }, 200);
  }
}
