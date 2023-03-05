import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConstants } from '../appConfig/app-config';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  ngOnInit() {
  
  }
  loginApi (data:any) {
    return this.http.post(ApiConstants.apiURL + ApiConstants.loginApi,data);
   }
   getProduct(){
    return this.http.get(ApiConstants.apiURL + ApiConstants.productList);
   }
   getCategory(){
    return this.http.get(ApiConstants.apiURL + ApiConstants.categoryList);
   }
   getCateroryListAllId(id){
    return this.http.get(ApiConstants.apiURL + ApiConstants.categoryId+'/'+id);

   }
}