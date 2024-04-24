import { Component, OnInit, Renderer2 } from '@angular/core';
import { CartService } from '../services/cart.service';
import { DataService } from '../services/data-service.service';

declare var $: any;

@Component({
  selector: 'app-main-grid',
  templateUrl: './main-grid.component.html',
  styleUrls: ['./main-grid.component.css']
})
export class MainGridComponent implements OnInit {
  data: any[] = [];
  paginatedData: any[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 10;
  searchTerm: string = '';
  selectedCategory: string = ''; 
  categories: string[] = []; 
  cartItems: any[] = [];
 
  constructor(private dataService: DataService, private cartService: CartService, private renderer: Renderer2) { }
  sidebarOpen:boolean = false;

  toggleSidebar(): void {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
      sidebar.classList.toggle('active');
    }
  }

  ngOnInit(): void {
    this.dataService.getData().subscribe(
      (response: any) => {
        this.data = response;
        this.extractCategories(); 
        this.paginateData();
      },
      (error: any) => {
        console.error('Error fetching data:', error);
      }
    );
    this.cartItems = this.cartService.getCartItems();

    const sidebar = document.getElementById('sidebar');
    if (sidebar && !sidebar.classList.contains('active')) {
      this.renderer.addClass(sidebar, 'active');
    }
  }
  
  removeFromCart(item: any): void {
    const index = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      item.isLiked = false;
      this.cartService.saveCartItemsToLocalStorage();
    }
  }

  extractCategories() {
    const uniqueCategories = new Set<string>();
    this.data.forEach(item => {
      uniqueCategories.add(item.category);
    });
    this.categories = Array.from(uniqueCategories);
  }

  filterByCategory(category?: string) {
    this.selectedCategory = category || '';
    this.currentPage = 0;
    this.paginateData();
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.paginateData();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.paginateData();
    }
  }

  paginateData() {
    let filteredData = this.data;
    if (this.searchTerm) {
      filteredData = filteredData.filter(item => item.retailer.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }
    if (this.selectedCategory) {
      filteredData = filteredData.filter(item => item.category === this.selectedCategory);
    }
    filteredData.sort((a, b) => a.retailer.localeCompare(b.retailer));
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedData = filteredData.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    let totalFilteredData = this.data;
    if (this.searchTerm) {
      totalFilteredData = totalFilteredData.filter(item => item.retailer.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }
    if (this.selectedCategory) {
      totalFilteredData = totalFilteredData.filter(item => item.category === this.selectedCategory);
    }
    return Math.ceil(totalFilteredData.length / this.itemsPerPage);
  }
}
