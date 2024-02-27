import { Component, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/common/models/product';

@Component({
  selector: 'app-user-fav-list',
  templateUrl: './user-fav-list.component.html',
  styleUrl: './user-fav-list.component.css',
})
export class UserFavListComponent {
  @Input('userFavs') userFavs!: Array<Product>;

  constructor() {}
}
