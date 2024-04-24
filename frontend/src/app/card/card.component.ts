import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() data: any; // Data passed from parent component
  isLiked: boolean = false; // Flag indicating if the item is liked
  cartItems: any[] = []; // Array of items currently in the cart
  images: string[] = [
    // Predefined image URLs for product display
    '../../assets/img/products/big_1042610.jpg',
    '../../assets/img/products/big_1079318.jpg',
    '../../assets/img/products/big_1141764.jpg',
    '../../assets/img/products/big_1147543.jpg',
    '../../assets/img/products/big_1152789.jpg',
    '../../assets/img/products/big_1155738.jpg',
    '../../assets/img/products/big_1163891.jpg',
    '../../assets/img/products/big_1164460.jpg',
    // ... remaining image URLs
  ];
  selectedImage: string = ''; // Currently displayed product image
  isLikedUpdated = new Subject<boolean>(); // Stream for notifying of liked state changes

  constructor(private cartService: CartService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initializeLikedState();
    this.selectedImage = this.getRandomImage();
  }

  private initializeLikedState(): void {
    const cartItems = this.cartService.getCartItems();
    this.isLiked = cartItems.some(item => item.id === this.data.id);
  }

  youLikeIt(): void {
    this.isLiked = !this.isLiked;

    if (this.isLiked) {
      this.cartService.addToCart(this.data);
    } else {
      this.cartService.removeFromCart(this.data);
    }

    this.isLikedUpdated.next(this.isLiked); // Emit updated liked state
  }

  getRandomImage(): string {
    if (this.images.length === 0) {
      
      return '../../assets/img/products/default.jpg'; // Replace with your default image path
    }

    const randomIndex = Math.floor(Math.random() * this.images.length);
    return this.images[randomIndex];
  }
}
