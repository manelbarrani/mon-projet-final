import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];

  searchTerm: string = '';
  selectedCategory: string = '';
  priceMax: number | null = null;

  categories = [
    { name: 'Teint', icon: 'assets/img/categories/teint.webp' },
    { name: 'Yeux', icon: 'assets/img/categories/yeux.jpg' },
    { name: 'Lèvres', icon: 'assets/img/categories/levres.jpeg' },
    { name: 'Soins', icon: 'assets/img/categories/soins.jpg' },
    { name: 'Cheveux', icon: 'assets/img/categories/cheveux.webp' }
  ];

  selectedProduct?: Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();

    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['q'] || '';
      this.applyFilters();
    });
  }

loadProducts(): void {
  this.productService.getAllProducts(1, 100).subscribe({
    next: (data: any) => {
      if (Array.isArray(data)) {
        this.products = data;
      } else if (data && data.resultat && Array.isArray(data.resultat.items)) {
        this.products = data.resultat.items;
      } else {
        console.error('Format inattendu ou items manquants dans la réponse:', data);
        this.products = [];
      }
      this.applyFilters();
    },
    error: (err) => {
      console.error('Erreur de chargement des produits :', err);
      alert('Erreur lors du chargement des produits : ' + (err.message || err.statusText || 'Erreur inconnue'));
      this.products = [];
      this.applyFilters();
    }
  });
}

  applyFilters(): void {
    if (!Array.isArray(this.products)) {
      console.error('Produits non initialisés comme tableau');
      this.filteredProducts = [];
      return;
    }

    const keyword = this.searchTerm.trim().toLowerCase();

    this.filteredProducts = this.products.filter(product => {
      const matchKeyword =
        product.name.toLowerCase().includes(keyword) ||
        product.description.toLowerCase().includes(keyword);

      const matchCategory = this.selectedCategory
        ? product.category?.trim().toLowerCase() === this.selectedCategory.trim().toLowerCase()
        : true;

      const matchPrice = this.priceMax !== null
        ? product.price <= this.priceMax
        : true;

      return matchKeyword && matchCategory && matchPrice;
    });
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.priceMax = null;
    this.applyFilters();
  }

  openPopup(product: Product): void {
    this.selectedProduct = product;
  }

  closePopup(): void {
    this.selectedProduct = undefined;
  }

 
  goToEdit(product: Product): void {
    if (product.stockQuantity === 0) {
      alert(`❌ Ce produit "${product.name}" est en rupture de stock et ne peut pas être modifié.`);
      return;
    }
    console.log(product)
    this.router.navigate(['/modif-produit/'+product.id]);
  }

  onDelete(product: Product): void {
    console.log('Tentative suppression produit :', product);

    if (product.stockQuantity === 0) {
      alert(`❌ Ce produit "${product.name}" est en rupture de stock et ne peut pas être supprimé.`);
      return;
    }

    const confirmed = confirm(`🗑️ Supprimer "${product.name}" ?`);
    if (confirmed) {
      const id = product.id;
      if (!id) {
        console.error('❌ ID produit manquant');
        return;
      }

      this.productService.deleteProduct(id).subscribe({
        next: () => {
          console.log('✅ Produit supprimé');
          this.products = this.products.filter(p => p.id !== id);

          this.applyFilters();
          this.closePopup();
        },
        error: err => {
          console.error('❌ Erreur suppression :', err);
          alert('Erreur lors de la suppression : ' + (err.message || 'Erreur inconnue'));
        }
      });
    }
  }
}
