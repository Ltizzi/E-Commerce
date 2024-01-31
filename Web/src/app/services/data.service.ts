import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';
import { Product } from 'src/common/models/product';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    @Inject(String) private url: string,
    @Inject(String) private urlParam: string,
    private http: HttpClient
  ) {}

  headers = new HttpHeaders().set(
    'Access-Control-Allow-Origin',
    'http://localhost:4200'
  );

  getAll() {
    return this.http.get(this.url + '/all', { withCredentials: true });
  }

  getAllWithPagination(page: number, limit: number) {
    return this.http.get(
      this.url + '/withPagination?page=' + page + '&pageSize=' + limit,
      {
        withCredentials: true,
      }
    );
  }

  getTotal() {
    return this.http.get(this.url + '/count', { withCredentials: true });
  }

  checkStock(product: Product) {
    return this.http.post(this.url + '/checkStock', product).pipe(
      map((response) => response),
      catchError(this.handleError)
    );
  }

  getById(id: number) {
    return this.http
      .get(this.url + '/byId?' + this.urlParam + id, { withCredentials: true })
      .pipe(
        map((response) => response),
        catchError(this.handleError)
      );
  }

  getUser() {
    return this.http.get(this.url + '/user', { withCredentials: true }).pipe(
      map((response) => response),
      catchError(this.handleError)
    );
  }

  getByUser(user: string) {
    return this.http
      .get(this.url + '/byUser?username=' + user, { withCredentials: true })
      .pipe(
        map((response) => response),
        catchError(this.handleError)
      );
  }

  getByUserId(id: number) {
    return this.http
      .get(this.url + '/byUserId?user_id=' + id, { withCredentials: true })
      .pipe(
        map((response) => response),
        catchError(this.handleError)
      );
  }

  create(resource: any) {
    return this.http
      .post(this.url + '/new', resource, { withCredentials: true })
      .pipe(
        map((response) => response),
        catchError(this.handleError)
      );
  }

  update(id: number, resource: any) {
    return this.http
      .patch(this.url + '/update?' + this.urlParam + id, resource, {
        withCredentials: true,
      })
      .pipe(
        map((response) => response),
        catchError(this.handleError)
      );
  }

  delete(id: number) {
    return this.http
      .delete(this.url + '/delete?' + this.urlParam + id, {
        withCredentials: true,
      })
      .pipe(
        map((response) => response),
        catchError(this.handleError)
      );
  }

  private handleError(error: Response) {
    if (error.status === 404) {
      return throwError(() => new Error('Not Found'));
    } else if (error.status === 400) {
      return throwError(() => new Error('Bad request'));
    } else return throwError(() => new Error('App error'));
  }
}
