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
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    price: new FormControl('', [Validators.required, Validators.min(0.1)]),
    about: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(1000),
    ]),
    // imageUrl: new FormControl(''),
    prod_type: new FormControl('', Validators.required),
  });

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
      { type: 'required', message: 'Product description is required' },
      {
        type: 'minlength',
        message: 'Description requires at least 3 characters',
      },
      {
        type: 'maxlength',
        message: 'Description has a maximum of 1000 characters',
      },
    ],
    prod_type: [{ type: 'required', message: 'Product type is required' }],
  };

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
    this.urls = [];
  }
  ngOnDestroy() {
    this.element.remove();
  }

  submitForm() {
    if (this.newProductForm.valid) {
      let type = this.types.find(
        (type: ProductType) =>
          type.name == (this.newProductForm.value.prod_type as string)
      );

      let newProduct: Product = {
        name: this.newProductForm.value.name as string,
        brand: this.newProductForm.value.brand as string,
        price: parseFloat(this.newProductForm.value.price as string),
        about: this.newProductForm.value.about as string,
        imageUrl: this.urls,
        prod_type: type as ProductType,
      };

      this.prodServ.create(newProduct).subscribe((data) => {
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

  addUrl(url: string) {
    console.log(url);
    this.urls.push(url);
    console.log(this.urls);
    this.url = '';
  }
}
