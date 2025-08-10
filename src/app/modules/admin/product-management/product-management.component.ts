import { Component } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent {
  product: Product = {
   productId: '',
    name: '',
    description: '',
    price: 0,
    category: '',
    imageUrl: '',
    stockQuantity: 0,
    isNew: false
  };

  constructor(private productService: ProductService) {}

  onSubmit() {
    console.log('Produit ajouté :', this.product);
    
   
    this.productService.addProduct(this.product).subscribe({
      next: (response) => {
        alert('Produit ajouté avec succès !');
       
        this.product = {
          productId:'' ,
          name: '',
          description: '',
          price: 0,
          category: '',
          imageUrl: '',
          stockQuantity: 0,
          isNew: true
        };
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du produit :', err);
        alert('Une erreur est survenue. Veuillez réessayer.');
      }
    });
  }
}
