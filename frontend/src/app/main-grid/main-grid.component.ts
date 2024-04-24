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
  ngOnInit() :void{
   


    this.dataService.getData().subscribe(
      (response: any) => {
        this.data = response;
        this.extractCategories(); 
        this.paginateData();
      },
      (error: any) => {
        console.error('Error al obtener los datos:', error);
      }
    );
    this.cartItems = this.cartService.getCartItems();
    console.log('Cart items on init:', this.cartItems);
    console.log('Cart empty: ', this.cartItems.length);


  
    const sidebar = document.getElementById('sidebar');
    if (sidebar && !sidebar.classList.contains('active')) {
      this.renderer.addClass(sidebar, 'active');
    }
   
  }
  
  removeFromCart(item: any): void {
    // Eliminar el producto del carrito
    const index = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      // Actualizar el estado isLiked a false
      item.isLiked = false;
      // Guardar los cambios en el almacenamiento local
      this.cartService.saveCartItemsToLocalStorage();
      // this.cartService.updateIsLikedState(item.isLiked);
    }
  }


  extractCategories() {
    // Extrae las categorías únicas de los datos
    const uniqueCategories = new Set<string>();
    this.data.forEach(item => {
      uniqueCategories.add(item.category);
    });
    this.categories = Array.from(uniqueCategories);
  }

  filterByCategory(category?: string) {
    // Reinicia la paginación al cambiar la categoría seleccionada
    this.selectedCategory = category || '';
    this.currentPage = 0; // Reinicia a la primera página
    this.paginateData();
  }

  nextPage() {
    // Pasa a la página siguiente si es posible y vuelve a paginar los datos
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.paginateData();
    }
  }

  previousPage() {
    // Pasa a la página anterior si es posible y vuelve a paginar los datos
    if (this.currentPage > 0) {
      this.currentPage--;
      this.paginateData();
    }
  }

  paginateData() {
    // Filtra, ordena y pagine los datos según los criterios seleccionados
    let filteredData = this.data;
    if (this.searchTerm) {
      // Filtra por término de búsqueda si existe
      filteredData = filteredData.filter(item => item.retailer.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }
    if (this.selectedCategory) {
      // Filtra por categoría si está seleccionada
      filteredData = filteredData.filter(item => item.category === this.selectedCategory);
    }
    // Ordena los datos después de aplicar los filtros
    filteredData.sort((a, b) => a.retailer.localeCompare(b.retailer));
    // Pagina los datos según la página actual y los elementos por página
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedData = filteredData.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    // Calcula el número total de páginas basado en la cantidad total de datos filtrados
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
