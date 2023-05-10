import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/layout/landing/landing.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { CartComponent } from './components/layout/cart/cart.component';
import { ProductPageComponent } from './components/product/product-page/product-page.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'cart', component: CartComponent },
  { path: 'product', component: ProductPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
