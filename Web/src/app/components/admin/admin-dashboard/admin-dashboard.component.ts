import { Component } from '@angular/core';
import { ModalService } from 'src/app/services/ui/modal.service';
import { NewProductModalComponent } from '../forms/new-product-modal/new-product-modal.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  showNewProductModal: boolean = false;
  // constructor(
  //   private modalServ: ModalService,
  //   private newProductModal: NewProductModalComponent
  // ) {}

  // ngOnInit(): void {
  //   this.modalServ.add(NewProductModalComponent);
  // }

  openModal() {
    this.showNewProductModal = true;
  }

  closeModal() {
    console.log('cerrando');
    this.showNewProductModal = false;
  }
}
