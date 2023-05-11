import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductTypeService } from 'src/app/services/product-type.service';
import { ProductService } from 'src/app/services/product.service';
import { ModalService } from 'src/app/services/ui/modal.service';
import { Product } from 'src/common/models/product';
import { ProductType } from 'src/common/models/type';

@Component({
  selector: 'app-new-product-modal',
  templateUrl: './new-product-modal.component.html',
  styleUrls: ['./new-product-modal.component.css'],
})
export class NewProductModalComponent {
  @Input('data') show!: boolean;
  @Output() closeModal = new EventEmitter<boolean>();

  newProductForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(25),
    ]),
    brand: new FormControl('', [
      Validators.required,
      Validators.min(3),
      Validators.maxLength(20),
    ]),
    price: new FormControl('', [Validators.required, Validators.min(0.1)]),
    about: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(200),
    ]),
    imageUrl: new FormControl(''),
    prod_type: new FormControl(''),
  });

  private element: any;

  types: Array<ProductType> = [];

  successOperation: boolean = false;

  constructor(
    private el: ElementRef,
    private typeServ: ProductTypeService,
    private prodServ: ProductService
  ) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    this.element.addEventListener('click', (el: any) => {
      if (el.target.className === 'new-product-modal') this.close();
    });
    this.typeServ.getAll().subscribe((data: any) => {
      this.types = data;
    });
    this.successOperation = false;
  }
  ngOnDestroy() {
    this.element.remove();
  }

  submitForm() {
    console.log(this.newProductForm);
    if (this.newProductForm.valid) {
      let type = this.types.find(
        (type: ProductType) =>
          type.name == (this.newProductForm.value.prod_type as string)
      );

      let newProduct: Product = {
        name: this.newProductForm.value.name as string,
        brand: this.newProductForm.value.brand as string,
        price: parseInt(this.newProductForm.value.price as string),
        about: this.newProductForm.value.about as string,
        imageUrl: [],
        prod_type: type as ProductType,
      };
      console.log(newProduct);
      this.prodServ.create(newProduct).subscribe((data) => {
        console.log(data);
        this.successOperation = true;
      });
    }
  }

  open(): void {
    this.element.style.display = 'block';
    this.show = true;
  }
  close(): void {
    // this.element.style.display = 'none';
    this.show = false;
    this.closeModal.emit(this.show);
  }
}
