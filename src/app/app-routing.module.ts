import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AddProductComponent } from './components/products/product/add-product/add-product.component';
import { ProductComponent } from './components/products/product/product.component';
import { LoginComponent } from './login/login/login.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'product',
    component: ProductComponent,
  },
  {
    path: 'addproduct',
    component: AddProductComponent,
  },
  {
    path: 'editproduct/:id',
    component: AddProductComponent,
  },
  
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
