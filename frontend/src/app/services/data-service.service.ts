import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  cartItems: any[] = [];

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get('http://localhost:3000/api/data');
  }
  getCartItems(): any[] {
    return this.cartItems;
  }
 
}
