import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() data: any;
  isLiked: boolean = false;
  cartItems: any[] = [];
  images: string[] = [];
  selectedImage: string = '';
  isLikedUpdated: Subject<boolean> = new Subject<boolean>();

 

  constructor(private cartService: CartService, private cdRef: ChangeDetectorRef) {

    this.images = [
      '../../assets/img/products/big_1042610.jpg',
      '../../assets/img/products/big_1079318.jpg',
      '../../assets/img/products/big_1141764.jpg',
      '../../assets/img/products/big_1147543.jpg',
      '../../assets/img/products/big_1152789.jpg',
      '../../assets/img/products/big_1155738.jpg',
      '../../assets/img/products/big_1154974.jpg',
      '../../assets/img/products/big_1164460.jpg',
      '../../assets/img/products/big_1163891.jpg',
    ];
  }

  ngOnInit(): void {
    const cartItems = this.cartService.getCartItems();
    const foundItem = cartItems.find(item => item.id === this.data.id);
    this.isLiked = foundItem ? true : false;

    this.selectedImage = this.getRandomImage();
   
  
    
  }

  
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.getRandomImage();
    });
  }

  updateIsLikedState(isLiked: boolean): void {
    this.isLikedUpdated.next(isLiked);
  }

  youLikeIt(): void {
    this.isLiked = !this.isLiked;
    if (this.isLiked) {
      this.cartService.addToCart(this.data);
    } else {
      this.cartService.removeFromCart(this.data);
    }
   // Check if cart is empty after adding or removing
  
 
  //  this.isLikedUpdated.next({ isLiked: this.isLiked, isEmptyCart });

  }

  getRandomImage(): string {
    var randomImage = '';
    if (this.images.length === 0) {
      // Si está vacío, devuelve la ruta de una imagen por defecto o una ruta válida
      return '../../assets/img/products/big_1163891.jpg';
    }else{
    // Genera un índice aleatorio dentro del rango de longitud de this.images
    const randomIndex = Math.floor(Math.random() * this.images.length);
    // Obtiene la imagen aleatoria del array usando el índice generado aleatoriamente
     randomImage = this.images[randomIndex];

    }
  
  
    
    return randomImage;
  }
  
}
