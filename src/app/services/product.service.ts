import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/models/product.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly apiUrl = 'https://localhost:44395/api/Product';

  constructor(private http: HttpClient) {}

 getAllProducts(pageNumber: number = 1, pageSize: number = 50): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
}


getById(id: string): Observable<{ resultat: Product }> {
  return this.http.get<{ resultat: Product }>(`${this.apiUrl}/${id}`);
}



  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.apiUrl, product);
  }
  
  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
