import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/layout/landing/landing.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductPageComponent } from './components/product/product-page/product-page.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { PurchaseComponent } from './components/layout/purchase/purchase.component';
import { OrdersComponent } from './components/purchase/orders/orders.component';
import { TokenComponent } from './token/token.component';
import { ProfileComponent } from './components/user/profile/profile.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'product', component: ProductPageComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'purchase', component: PurchaseComponent },
  { path: 'order', component: OrdersComponent },
  { path: 'token', component: TokenComponent },
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
