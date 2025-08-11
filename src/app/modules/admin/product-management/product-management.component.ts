import { Component } from '@angular/core'; 
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/core/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.css']
})
export class ProductManagementComponent {
  produitForm!: FormGroup;
  imagePreview: string | null = null; 
  selectedFile: File | null = null;
  isSubmitting = false;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.produitForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      stockQuantity: [0, [Validators.required, Validators.min(0)]],
      isNew: [false],
      imageUrl: ['', Validators.required] 
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.produitForm.patchValue({ imageUrl: this.imagePreview });
      };

      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.produitForm.invalid || !this.selectedFile) {
      alert('Formulaire invalide ou image manquante');
      return;
    }

    this.isSubmitting = true;
    const product: Product = this.produitForm.value;

    this.productService.addProduct(product).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.produitForm.reset();
        this.imagePreview = null;
        this.selectedFile = null;
        this.router.navigate(['/']); 
        alert('Produit ajouté avec succès !');
      },
      error: (err) => {
        this.isSubmitting = false;
        console.error(err);
        alert('Erreur lors de l\'ajout du produit');
      }
    });
  }
}