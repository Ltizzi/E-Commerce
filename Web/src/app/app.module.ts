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
import { CartComponent } from './components/purchase/cart/cart.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { ProductTableComponent } from './components/admin/tables/product-table/product-table.component';
import { ProductsPanelComponent } from './components/admin/layout/products-panel/products-panel.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditProductModalComponent } from './components/admin/forms/edit-product-modal/edit-product-modal.component';
import { DeleteProductModalComponent } from './components/admin/ui/delete-product-modal/delete-product-modal.component';
import { PurchaseComponent } from './components/layout/purchase/purchase.component';
import { TypeTableComponent } from './components/admin/tables/type-table/type-table.component';
import { StockTableComponent } from './components/admin/tables/stock-table/stock-table.component';
import { EntryTableComponent } from './components/admin/tables/entry-table/entry-table.component';
import { PurchaseTableComponent } from './components/admin/tables/purchase-table/purchase-table.component';
import { UserTableComponent } from './components/admin/tables/user-table/user-table.component';
import { EntryEditorModalComponent } from './components/admin/forms/entry-editor-modal/entry-editor-modal.component';
import { TypePanelComponent } from './components/admin/layout/type-panel/type-panel.component';
import { StockPanelComponent } from './components/admin/layout/stock-panel/stock-panel.component';
import { EntryPanelComponent } from './components/admin/layout/entry-panel/entry-panel.component';
import { DeleteEntryModalComponent } from './components/admin/ui/delete-entry-modal/delete-entry-modal.component';
import { OrdersComponent } from './components/purchase/orders/orders.component';
import { SuccessComponent } from './components/purchase/success/success.component';
import { TokenComponent } from './token/token.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { EventService } from './services/event.service';
import { ProfileComponent } from './components/user/profile/profile.component';
import { EditprofilemodalComponent } from './components/user/editprofilemodal/editprofilemodal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StarsComponent } from './components/review/stars/stars.component';
import { ReviewComponent } from './components/review/review/review.component';
import { ReviewListComponent } from './components/review/review-list/review-list.component';

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
    ProductTableComponent,
    ProductsPanelComponent,
    EditProductModalComponent,
    DeleteProductModalComponent,
    PurchaseComponent,
    TypeTableComponent,
    StockTableComponent,
    EntryTableComponent,
    PurchaseTableComponent,
    UserTableComponent,
    EntryEditorModalComponent,
    TypePanelComponent,
    StockPanelComponent,
    EntryPanelComponent,
    DeleteEntryModalComponent,
    OrdersComponent,
    SuccessComponent,
    TokenComponent,
    ProfileComponent,
    EditprofilemodalComponent,
    StarsComponent,
    ReviewComponent,
    ReviewListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
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
    EventService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
