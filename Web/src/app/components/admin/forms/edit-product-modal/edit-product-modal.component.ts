import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/event.service';
import { ProductTypeService } from 'src/app/services/product-type.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/common/models/product';
import { ProductType } from 'src/common/models/type';

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.css'],
})
export class EditProductModalComponent {
  @Input('data') show!: boolean;
  @Input('product') product!: Product;
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() reloadProducts = new EventEmitter<boolean>();

  editProductForm!: FormGroup;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product']) {
      this.editProductForm = new FormGroup({
        name: new FormControl(this.product.name, [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(25),
        ]),
        brand: new FormControl(this.product.brand, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ]),
        price: new FormControl(this.product.price, [
          Validators.required,
          Validators.min(0.1),
        ]),
        about: new FormControl(this.product.about, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(2000),
        ]),
        type: new FormControl(this.product.type, Validators.required),
      });
    }
  }

  private element: any;

  types: Array<ProductType> = [];

  urls: Array<string> = [];
  url: string = '';

  successOperation: boolean = false;

  errorMessages = {
    name: [
      { type: 'required', message: 'Product name is required' },
      {
        type: 'minlength',
        message: 'Product name requires at least 4 characters',
      },
      {
        type: 'maxlength',
        message: 'Product name has a maximum of 25 characters',
      },
    ],
    brand: [
      { type: 'required', message: 'Brand name is required' },
      {
        type: 'minlength',
        message: 'Brand name requires at least 3 characters',
      },
      {
        type: 'maxlength',
        message: 'Brand name has a maximum of 20 characters',
      },
    ],
    price: [
      { type: 'required', message: 'Price is required' },
      { type: 'min', message: "Price can't be lower than $0.1" },
    ],
    about: [
      { type: 'required', message: 'Product Description is required' },
      {
        type: 'minlength',
        message: 'Description requires at least 3 characters',
      },
      {
        type: 'maxlength',
        message: 'Description has a maximum of 2000 characters',
      },
    ],
    type: [{ type: 'required', message: 'Product type is required' }],
  };

  constructor(
    private el: ElementRef,
    private typeServ: ProductTypeService,
    private prodServ: ProductService,
    private eventServ: EventService
  ) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    this.element.addEventListener('click', (el: any) => {
      if (el.target.className === 'edit-product') this.close();
    });
    this.typeServ.getAll().subscribe((data: any) => (this.types = data));
    this.successOperation = false;
    this.urls = this.product.imageUrl;
  }

  // ngOnDestroy() {
  //   this.element.remove();
  // }

  submitForm() {
    if (this.editProductForm.valid) {
      let type = this.types.find(
        (type: ProductType) =>
          type.name == (this.editProductForm.value.type as string)
      );
      let updatedProduct: Product = {
        product_id: this.product.product_id,
        name: this.editProductForm.value.name as string,
        brand: this.editProductForm.value.brand as string,
        price: parseFloat(this.editProductForm.value.price as string),
        about: this.editProductForm.value.about as string,
        imageUrl: this.urls,
        type: type as ProductType,
        rating: this.product.rating,
        total_reviews: this.product.total_reviews,
      };

      // for (let prop in updatedProduct) {
      //   if (!updatedProduct[prop]) {
      //     updatedProduct[prop] = this.product[prop];
      //   }
      // }
      console.log(updatedProduct);
      this.prodServ.update(updatedProduct).subscribe((data: any) => {
        console.log(data);
        this.eventServ.emit('updateProducts');
        this.reloadProducts.emit(true);
        this.successOperation = true;
      });

      // en el subscribe agregar this.reloadProducts.emit(true)
    }
  }

  open(): void {
    //   this.element.style.display = 'block';
    this.show = !this.show;
  }

  close(): void {
    this.show = !this.show;
    this.closeModal.emit(this.show);
  }

  addUrl(url: string) {
    this.urls.push(url);
    this.url = '';
  }
}
