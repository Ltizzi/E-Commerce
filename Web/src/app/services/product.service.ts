import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/common/common';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends DataService {
  constructor(http: HttpClient) {
    super(`${API_URL}product`, `product_id=`, http);
  }
}
