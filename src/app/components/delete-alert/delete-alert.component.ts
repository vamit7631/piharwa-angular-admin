import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data-s.service';

@Component({
  selector: 'app-delete-alert',
  templateUrl: './delete-alert.component.html',
  styleUrls: ['./delete-alert.component.scss']
})
export class DeleteAlertComponent implements OnInit {

  id: any;
  constructor(public dialogRef: MatDialogRef<DeleteAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public productId: any,
    private dataService: DataService) { }

  ngOnInit() {
    console.log(this.productId)
   }

   deleteContactType() {
    this.id = this.productId
    console.log(this.id)

    this.dataService.deleteproduct(this.id).subscribe(
      data => this.closeDialog(data),
      error => this.closeDialog(error)
    )
  }
  closeDialog(data) {
    if(data.status===true){
      console.log(data)
      this.dialogRef.close(data);
    }
  }
  
  close(){
    this.dialogRef.close();
  }
  
}