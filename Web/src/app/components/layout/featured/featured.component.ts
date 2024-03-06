import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DealService } from 'src/app/services/deal.service';
import { MobileCheckerService } from 'src/app/services/ui/mobile-checker.service';
import { Deal } from 'src/common/models/deal';
import { Product } from 'src/common/models/product';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrl: './featured.component.css',
})
export class FeaturedComponent {
  isLoaded: boolean = false;
  featuredList: Array<Deal> = [];
  moreThanSixDeals!: boolean;
  deals!: Array<Deal>;
  products: Array<Product> = [];
  noDeals!: boolean;
  isMobile!: boolean;

  constructor(
    private dealServ: DealService,
    private router: Router,
    private mobileCheck: MobileCheckerService
  ) {}

  ngOnInit(): void {
    this.mobileCheck.checkScreenSize();
    this.isMobile = this.mobileCheck.getIsMobile();
    this.dealServ.getAll().subscribe((data: any) => {
      this.deals = data;
      if (this.deals && this.deals.length >= 6) {
        this.moreThanSixDeals = true;
        for (let i = 0; i < 6; i++) {
          this.featuredList.push(data[i]);
        }
      }
      if (this.deals.length == 0) {
        this.noDeals = true;
      }
      this.deals.forEach((deal: Deal) => {
        this.products.push(deal.product);
      });
    });
  }

  goToProduct(id: number | undefined, event: Event) {
    event.preventDefault();
    this.router.navigate(['/product'], { queryParams: { id: id } });
  }
}
