import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { ProductListComponent } from './modules/produits/product-list/product-list.component';
import { AdminDashboardComponent } from './modules/admin/admin-dashboard/admin-dashboard.component';

import { PanierComponent } from './modules/panier/panier.component';
import { LoginComponent } from './modules/login/login.component';
import { ProductManagementComponent } from './modules/admin/product-management/product-management.component';
import { ProductEditComponent } from './modules/admin/product-edit/product-edit.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'produits', component: ProductListComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'user', component: PanierComponent },
  { path: 'login', component: LoginComponent },
  { path: 'ajouter-produit', component: ProductManagementComponent },
  { path: 'modif-produit/:id', component: ProductEditComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
