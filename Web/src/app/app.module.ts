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
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './services/data.service';
import { ProductService } from './services/product.service';
import { StockService } from './services/stock.service';
import { EntryService } from './services/entry.service';
import { ProductTypeService } from './services/product-type.service';
import { PurchaseService } from './services/purchase.service';
import { UserService } from './services/user.service';
import { CartService } from './services/cart.service';
import { ShopOrderService } from './services/shop-order.service';
import { NewProductModalComponent } from './components/admin/forms/new-product-modal/new-product-modal.component';
import { ModalService } from './services/ui/modal.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    NewProductModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    DataService,
    ProductService,
    StockService,
    EntryService,
    ProductTypeService,
    PurchaseService,
    UserService,
    CartService,
    ShopOrderService,
    ModalService,
    NewProductModalComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
