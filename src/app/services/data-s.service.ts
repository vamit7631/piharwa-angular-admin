import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
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

   addproduct(data){
    return this.http.post(ApiConstants.apiURL + ApiConstants.addProduct,data);

   }
   imageUploadTumb(productId,data){
    return this.http.post(ApiConstants.apiURL + ApiConstants.imageUpload+'/'+productId,data);

   }
   public imgEvent: EventEmitter<any> = new EventEmitter();

   
}