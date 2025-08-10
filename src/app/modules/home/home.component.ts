import { Component } from '@angular/core';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products: Product[] = [
    {
      productId: '',
      name: 'Anti-Wrinkle Serum',
      description: 'Sérum anti-âge à base d\'ingrédients naturels',
      price: 29.99,
      stockQuantity: 20,
      category: 'Soins',
      imageUrl: 'assets/img/products/serum.webp',
      rating: 4.8
    },
    {
      productId: '',
      name: 'Hydrating Cream',
      description: 'Crème hydratante intense pour tous les types de peau',
      price: 19.99,
      stockQuantity: 30,
      category: 'Soins',
      imageUrl: 'assets/img/products/cream.webp',
      rating: 4.5
    },
        {
      productId: '',
      name: 'Pack Keratin',
      description: 'Shampoing sans sulfate et sans sodium et Masque spécial protéine',
      price: 59.9,
      stockQuantity: 45,
      category: 'cheveux',
      imageUrl: 'assets/img/products/cheveux.webp',
      rating: 4.5
    }
  ];

  categories = [
    { name: 'Teint', icon: 'assets/img/categories/teint.webp' },
    { name: 'Yeux', icon: 'assets/img/categories/yeux.jpg' },
    { name: 'Lèvres', icon: 'assets/img/categories/levres.jpeg' },
    { name: 'Soins', icon: 'assets/img/categories/soins.jpg' },
    { name: 'Cheveux', icon: 'assets/img/categories/cheveux.webp' }
  ];

  testimonials = [
    {
      text: "Produits de très bonne qualité, naturels et efficaces. Je recommande vivement !",
      author: "Sophie",
      photoUrl: "assets/img/users/sophie.jpg"
    },
    {
      text: "Livraison rapide et service client très réactif. Une marque engagée !",
      author: "Clara",
      photoUrl: "assets/img/users/clara.jpeg"
    },
    {
      text: "Enfin une boutique bio avec du style ! Je suis fan du design et des valeurs.",
      author: "Emma",
      photoUrl: "assets/img/users/emma.avif"
    }
  ];
}
