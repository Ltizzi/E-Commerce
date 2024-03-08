import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/common/common';

@Injectable({
  providedIn: 'root',
})
export class ShopOrderService extends DataService {
  constructor(http: HttpClient) {
    super(`${API_URL}order`, `order_id=`, http);
  }
}
