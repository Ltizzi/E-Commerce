import { Component } from '@angular/core';
import { MobileCheckerService } from 'src/app/services/ui/mobile-checker.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css'],
})
export class PurchaseComponent {
  isMobile!: boolean;

  constructor(private mobileChecker: MobileCheckerService) {}

  ngOnInit() {
    this.isMobile = this.mobileChecker.getIsMobile();
  }
}
