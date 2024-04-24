import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  cartUpdated = new Subject<void>();
  constructor() {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      this.cartItems = JSON.parse(savedCartItems);
    }
  }

  addToCart(item: any): void {
    const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id);
    if (!existingItem) {
      this.cartItems.push(item);
      this.saveCartItemsToLocalStorage();
      this.notifyCartUpdate();
    }
  }

  removeFromCart(item: any): void {
    const index = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.saveCartItemsToLocalStorage();
      this.notifyCartUpdate();
    }
  }

  clearCart(): void {
    this.cartItems = [];
    this.clearLikes(); // Call clearLikes()
    this.saveCartItemsToLocalStorage();
    this.notifyCartUpdate();
    
  }



  getCartItems(): any[] {
    return this.cartItems;
  }
  isEmptyCart(): boolean {
    return this.cartItems.length === 0;
  }

  private clearLikes(): void {
    this.cartItems.forEach(item => item.isLiked = false);
  }

   saveCartItemsToLocalStorage(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  private notifyCartUpdate(): void {
    this.cartUpdated.next();
  }




}
