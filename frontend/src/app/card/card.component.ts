import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() data: any;

  isLiked: boolean = false;
  favorites: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.loadFavorites();  
  }

  youLikeIt(): void {
    this.isLiked = !this.isLiked;
    if (this.isLiked) {
      console.log(this.data.id);
      this.addToFavorites(this.data.id);
    } else {
      this.removeFromFavorites(this.data.id);
    }
  }

  addToFavorites(itemId: string): void {
    if (!this.favorites.includes(itemId)) {
      this.favorites.push(itemId);
      var items;
      for(items in this.favorites){
        console.log(this.favorites[items]);
      }
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
      console.log('Added to favorites:', this.favorites);
    }
  }

  removeFromFavorites(itemId: string): void {
    const index = this.favorites.indexOf(itemId);
    if (index !== -1) {
      this.favorites.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
      console.log('Removed from favorites:', this.favorites);
    }
  }
  
  loadFavorites(): void {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
      console.log('Loaded favorites:', this.favorites);
      // Comprueba si el ID actual está en los favoritos y establece isLiked como true si es así
      this.isLiked = this.favorites.includes(this.data.id);
    }
  }
  
}
