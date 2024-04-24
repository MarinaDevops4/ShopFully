import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
 
    @Input() data: any; // Asegúrate de que los datos del input incluyan un 'id' único por cada ítem
  
    isLiked: boolean = false;
    cartItems: any[] = [];
  cdRef: any;
  
    constructor(private cartService: CartService) {}
  
    ngOnInit(): void {
   
    }
  
    youLikeIt(): void {
      this.isLiked = !this.isLiked;
      if (this.isLiked) {
        this.cartService.addToCart(this.data); // Usar el servicio de carrito
      } else {
        this.cartService.clearCart(); // Limpia todo el carrito, considera cambiar esto si no es el comportamiento deseado
      }
    }
  
    addToCart(item: any): void {
      this.cartItems.push(item);
      console.log('Current cart:', this.cartItems);
    }
    clearCart(): void {
      this.cartItems = [];
    }

    getCartItems(): any[] {
      return this.cartItems;
    }

    updateCart() {
      this.cartItems = this.cartService.getCartItems();
      this.cdRef.detectChanges(); // Forzar la actualización de la vista
    }
  }

