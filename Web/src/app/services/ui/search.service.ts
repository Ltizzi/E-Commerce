import { Injectable } from '@angular/core';
import { Product } from 'src/common/models/product';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  all_products!: Array<Product>;
  results!: Array<Product>;

  constructor() {
    this.all_products = JSON.parse(
      sessionStorage.getItem('products') as string
    );
  }

  setProducts(products: Array<Product>) {
    this.all_products = products;
  }

  getProducts() {
    return this.all_products;
  }

  search(value: string): Array<Product> {
    let results = [] as Array<Product>;
    const byName = this.searchByName(value, undefined) as Array<Product>;
    if (byName.length > 0) {
      results = results.concat(byName);
    }
    const byBrand = this.searchByBrand(value, undefined) as Array<Product>;
    if (byBrand.length > 0) {
      results = results.concat(byBrand);
    }
    const byType = this.searchByType(value, undefined) as Array<Product>;
    if (byType.length > 0) {
      results = results.concat(byType);
    }
    const inAbout = this.searchInAbout(value, undefined) as Array<Product>;
    if (inAbout.length > 0) {
      results = results.concat(inAbout);
    }
    //  console.log(results);
    return this.deleteDuplicates(results);
  }

  searchByRangePrice(
    minPrice: number,
    maxPrice: number,
    value: string
  ): Array<Product> {
    let results = [] as Array<Product>;
    let filteredProducts = this.all_products.filter((prod: Product) => {
      prod.price >= minPrice && prod.price <= maxPrice;
    });
    const byName = this.searchByName(value, filteredProducts);
    if (byName.length > 0) {
      results = results.concat(byName);
    }
    const byBrand = this.searchByBrand(value, filteredProducts);
    if (byBrand.length > 0) {
      results = results.concat(byBrand);
    }
    const byType = this.searchByType(value, filteredProducts);
    if (byType.length > 0) {
      results = results.concat(byType);
    }
    const inAbout = this.searchInAbout(value, filteredProducts);
    if (inAbout.length > 0) {
      results = results.concat(inAbout);
    }
    return this.deleteDuplicates(results);
  }

  searchByType(value: string, products?: Array<Product>): Array<Product> {
    let results = [] as Array<Product>;
    if (products) {
      results = products.filter((prod: Product) => {
        // prod.type.name.toLowerCase() == value.toLowerCase();
        if (prod.type.name.toLowerCase().includes(value.toLowerCase()))
          return true;
        else return false;
      });
    } else {
      results = this.all_products.filter((prod: Product) => {
        //prod.type.name.toLowerCase() == value.toLowerCase();
        if (prod.type.name.toLowerCase().includes(value.toLowerCase()))
          return true;
        else return false;
      });
    }
    return results;
  }

  searchByBrand(value: string, products?: Array<Product>): Array<Product> {
    let results = [] as Array<Product>;
    if (products) {
      results = products.filter((prod: Product) => {
        //prod.brand.toLowerCase() == value.toLowerCase()
        if (prod.brand.toLowerCase().includes(value.toLowerCase())) return true;
        else return false;
      });
    } else {
      results = this.all_products.filter((prod: Product) => {
        //prod.brand.toLowerCase() == value.toLowerCase();
        if (prod.brand.toLowerCase().includes(value.toLowerCase())) return true;
        else return false;
      });
    }
    return results;
  }

  searchInAbout(value: string, products?: Array<Product>): Array<Product> {
    let results = [] as Array<Product>;
    if (products) {
      results = products.filter((prod: Product) => {
        if (prod.about.toLowerCase().includes(value.toLowerCase())) return true;
        else return false;
      });
    } else {
      results = this.all_products.filter((prod: Product) => {
        if (prod.about.toLowerCase().includes(value.toLowerCase())) return true;
        else return false;
      });
    }
    return results;
  }

  searchByName(value: string, products?: Array<Product>): Array<Product> {
    let results = [] as Array<Product>;
    if (products) {
      results = products.filter((prod: Product) => {
        if (prod.name.toLowerCase().includes(value.toLowerCase())) return true;
        else return false;
        //  prod.name.toLowerCase() == value.toLowerCase()
      });
    } else {
      results = this.all_products.filter((prod: Product) => {
        // console.log(prod.name, ' ', value);
        // console.log(prod.name.toLowerCase().includes(value.toLowerCase()));
        if (prod.name.toLowerCase().includes(value.toLowerCase())) return true;
        else return false;
      });
    }
    return results;
  }

  normalizeString(value: string): string {
    if (value.length > 3) {
      value.toLowerCase();
      let valueSplited = value.slice(1);
      value = value[0].toUpperCase() + valueSplited;
      return value;
    } else return value.toUpperCase();
  }

  deleteDuplicates(array: Array<Product>): Array<Product> {
    const uniqueIds = [] as Array<number>;
    const uniqueProducts = array.filter((prod: Product) => {
      if (uniqueIds.includes(prod.product_id as number)) return false;
      else {
        uniqueIds.push(prod.product_id as number);
        return true;
      }
    });
    return uniqueProducts;
  }
}
