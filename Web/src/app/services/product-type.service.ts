import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { API_URL } from 'src/common/common';

@Injectable({
  providedIn: 'root',
})
export class ProductTypeService extends DataService {
  constructor(http: HttpClient) {
    super(`${API_URL}type`, 'type_id=', http);
  }
}
