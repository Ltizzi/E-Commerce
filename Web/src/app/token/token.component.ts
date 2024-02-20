import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css'],
})
export class TokenComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      console.log(params);
      const token = params.get('token');
      sessionStorage.setItem('token', token as string);
      this.router.navigate(['/']);
    });
  }
}
