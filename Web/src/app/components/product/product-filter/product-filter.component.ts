import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { ProductTypeService } from 'src/app/services/product-type.service';
import { SearchService } from 'src/app/services/ui/search.service';
import { Product } from 'src/common/models/product';
import { State } from 'src/common/models/state';
import { ProductType } from 'src/common/models/type';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css',
})
export class ProductFilterComponent {
  @Output() filteredProducts = new EventEmitter<Array<Product>>();
  @Output() clearTypeFilter = new EventEmitter<boolean>();
  types!: Array<ProductType>;
  minPrice!: number;
  maxPrice!: number;
  highestPrice!: number;
  products = [] as Array<Product>;
  selectedTypes = [] as Array<ProductType>;

  typesOpened = false;
  checkBoxesValues: boolean[] = [];

  state: State = {
    actualTab: '',
  };

  @ViewChild('category') catEl!: ElementRef;
  @ViewChild('price') priceEl!: ElementRef;

  constructor(
    private typeServ: ProductTypeService,
    private searchServ: SearchService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.typeServ.getAll().subscribe((data: any) => {
      this.types = data;
      this.types.forEach((tipo) => {
        this.checkBoxesValues.push(false);
      });
    });
    this.highestPrice = this.searchServ.getHighestPrice();
    this.renderer.listen('document', 'click', (event: any) => {
      if (
        !this.catEl.nativeElement.contains(event.target) &&
        !this.priceEl.nativeElement.contains(event.target)
      ) {
        this.state.actualTab = '';
      }
    });
  }

  changeMenu(tab: string) {
    this.state.actualTab = tab;
  }

  resetPrices() {
    this.minPrice = 0;
    this.maxPrice = 0;
    this.clearTypeFilter.emit(true);
  }

  clearTypes() {
    this.selectedTypes = [];
    this.checkBoxesValues.fill(false);
    this.clearTypeFilter.emit(true);
  }

  handleCheckBox(event: any, type: ProductType, index: number) {
    if (event.target.checked) {
      this.addFilteredType(type);
      for (let i = 0; i < this.checkBoxesValues.length; i++) {
        this.checkBoxesValues[index] = true;
      }
    } else {
      this.removeFilteredType(type);
      for (let i = 0; i < this.checkBoxesValues.length; i++) {
        this.checkBoxesValues[index] = false;
      }
      if (this.checkBoxesValues.length < 1) {
        this.clearTypes();
      }
    }
  }

  addFilteredType(type: ProductType) {
    this.products = [];
    this.selectedTypes.push(type);
    this.selectedTypes.forEach((tipo: ProductType) => {
      if (this.products.length > 0) {
        let results = this.searchServ.searchByType(tipo.name);
        this.products = this.products.concat(results);
      } else {
        let results = this.searchServ.searchByType(tipo.name);
        this.products = results;
      }
    });
    this.filterProducts();
  }

  removeFilteredType(type: ProductType) {
    this.products = [];
    this.selectedTypes = this.selectedTypes.filter(
      (tipo) => tipo.prod_type_id != type.prod_type_id
    );
    if (this.selectedTypes.length > 0) {
      this.selectedTypes.forEach((tipo) => {
        if (this.products.length > 0) {
          let results = this.searchServ.searchByType(tipo.name);
          this.products = this.products.concat(results);
          console.log(this.products);
        } else {
          this.products = this.searchServ.searchByType(tipo.name);
        }
      });
      this.filterProducts();
    } else this.clearTypes();
  }

  filterByPrices() {
    let results = [] as Array<Product>;
    if (this.selectedTypes.length < 1) {
      console.log('FETCHING DATA');
      this.products = JSON.parse(sessionStorage.getItem('products') as string);
    }
    console.log('FILTRANDO..');
    this.products.forEach((prod) => {
      if (prod.price >= this.minPrice && prod.price <= this.maxPrice) {
        results.push(prod);
      }
    });
    return results;
  }

  handlePriceChange() {
    this.filterProducts();
  }

  filterProducts() {
    const maxPriceChecker = this.maxPrice > 0 && this.maxPrice > this.minPrice;
    if (this.minPrice > 0 || maxPriceChecker) {
      this.products = this.filterByPrices();
    }
    this.filteredProducts.emit(this.products);
  }
}
