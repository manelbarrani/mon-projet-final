import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/core/models/product.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  produitForm: FormGroup;
  selectedProduit!: Product;
  imagePreview: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private fb: FormBuilder
  ) {
    this.produitForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stockQuantity: [0, [Validators.required, Validators.min(0)]], 
      isNew: [false],
      imageUrl: ['', Validators.required],
      rating: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
      productId: [''],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      alert('❌ Aucun ID de produit fourni !');
      this.router.navigate(['/produits']);
      return;
    }

    this.productService.getById(id).subscribe({
      next: (response) => {
        const retrievedProduit = response.resultat ?? response;
        this.selectedProduit = retrievedProduit;

        this.produitForm.patchValue({
          name: retrievedProduit.name,
          category: retrievedProduit.category,
          description: retrievedProduit.description,
          price: retrievedProduit.price,
          rating: retrievedProduit.rating,
          stockQuantity: retrievedProduit.stockQuantity, 
          isNew: retrievedProduit.isNew ?? false,
          imageUrl: retrievedProduit.imageUrl ?? '',
          productId: id
        });

        this.imagePreview = retrievedProduit.imageUrl ?? null;
      },
      error: (error) => {
        console.error("Erreur chargement produit :", error);
        alert("Erreur lors du chargement du produit");
        this.router.navigate(['/produits']);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.produitForm.patchValue({ imageUrl: this.imagePreview });
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(): void {
    if (this.produitForm.invalid) {
      alert('Formulaire invalide !');
      return;
    }

    // Make sure productId is set
    const id = this.route.snapshot.paramMap.get('id');
    this.produitForm.get('productId')?.setValue(id);

    const updatedProduct: Product = {
      ...this.selectedProduit,
      ...this.produitForm.value
    };

    this.productService.updateProduct(updatedProduct).subscribe({
      next: () => {
        alert('✅ Produit mis à jour !');
        this.router.navigate(['/produits']);
      },
      error: (err) => {
        console.error('Erreur mise à jour :', err);
        alert('Échec de la mise à jour');
      }
    });
  }
}
