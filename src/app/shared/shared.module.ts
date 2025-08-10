import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { BannerComponent } from './components/banner/banner.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ProductCardComponent,
    BannerComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule, RouterModule, 
  ],
    exports: [
 HeaderComponent,
    FooterComponent,
    ProductCardComponent,
    BannerComponent,
    CategoriesComponent
  ],
})
export class SharedModule { }
