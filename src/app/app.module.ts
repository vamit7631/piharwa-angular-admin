import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './login/login/login.component';
import { MaterialExampleModule } from './services/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { StatComponent } from './components/home/stat/stat.component';
import { TokenService } from './services/token.service';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './components/products/product/product.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AddProductComponent } from './components/products/product/add-product/add-product.component';
import { TreeviewConfig, TreeviewEventParser, TreeviewI18n, TreeviewModule } from 'ngx-treeview';
@NgModule({
  declarations: [AppComponent,LoginComponent, HeaderComponent, 
    AddProductComponent,
    ProductComponent,FooterComponent, HomeComponent,StatComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,ReactiveFormsModule,FormsModule,
    SharedModule,MaterialExampleModule,
    CommonModule,AngularEditorModule,TreeviewModule.forRoot()

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenService,
    multi: true,
   },
  ],
   schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule {}
