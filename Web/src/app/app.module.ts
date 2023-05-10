import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductCardComponent } from './components/product/product-card/product-card.component';
import { NavBarComponent } from './components/layout/nav-bar/nav-bar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { UserProfileComponent } from './components/layout/user-profile/user-profile.component';
import { ProductPageComponent } from './components/product/product-page/product-page.component';
import { CategoryNavComponent } from './components/product/category-nav/category-nav.component';
import { LandingComponent } from './components/layout/landing/landing.component';
import { CartComponent } from './components/layout/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductCardComponent,
    NavBarComponent,
    FooterComponent,
    ProductListComponent,
    AdminDashboardComponent,
    UserProfileComponent,
    ProductPageComponent,
    CategoryNavComponent,
    LandingComponent,
    CartComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
