import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { DataService } from 'src/app/services/data-s.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent  {
  @Input()
  requiredFileType:string;

  fileName = '';
  uploadProgress:number;
  uploadSub: Subscription;
  url:any;
  imgdata: void;
  formData: FormData;
  productId: any;

  constructor(private dataService: DataService) {
 this.dataService.imgEvent.subscribe((value) => {
      console.log(value)
      this.productId =value;
     });
  }

  onFileSelected(event) {
      const file:File = event.target.files[0];
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
  
        reader.readAsDataURL(event.target.files[0]); // read file as data url
  
        reader.onload = (event) => { // called once readAsDataURL is completed
          this.url = event.target.result;
        }
      }
      if (file) {
          this.fileName = file.name;
          this.formData = new FormData();
          this.formData.append("image", file);
      }
    }

      uploadImg(){
        console.log(this.productId)
        this.dataService.imageUploadTumb(this.productId, this.formData).subscribe(
          (data) => this.productdialog(data),
          (err) => console.log(err)
        );
      
      }
      productdialog(data: any) {
        if (data.status === true) {
          this.reset();
          alert("Product Added ")
        }
        if (data.status === false) {
          alert(data.message)
        }
      }
cancelUpload() {
  this.reset();
}

reset() {
  this.uploadProgress = null;
  this.uploadSub = null;
}
}
