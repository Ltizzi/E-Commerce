import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/common/common';

@Injectable({
  providedIn: 'root',
})
export class EntryService extends DataService {
  constructor(http: HttpClient) {
    super(`${API_URL}entry`, `entry_id=`, http);
  }
}
