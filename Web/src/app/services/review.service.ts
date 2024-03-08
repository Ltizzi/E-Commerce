import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/common/common';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class ReviewService extends DataService {
  constructor(http: HttpClient) {
    super(`${API_URL}review`, `review_id=`, http);
  }
}
