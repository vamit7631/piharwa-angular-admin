import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { TreeviewConfig, TreeviewItem } from 'ngx-treeview';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data-s.service';

@Component({
  selector: 'sb-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  loginData: any;
  addProductForm!: FormGroup;
  config1 = TreeviewConfig.create({
    hasAllCheckBox: true,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 400
});

  validation={
    phoneRegex: /\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/,
    emailPhone:/^(?:\d{10}|\w+@\w+\.\w{2,3})$/
   }
  categoryData: any;
  categoryDataIdData: any;
  items:  TreeviewItem[]; ;

  constructor(
    private formBuilder: FormBuilder,
    private myRoute: Router,
    private dataService: DataService,
    public authService: AuthService,
  ) {}
  selectedValue: string;
  ngOnInit(): void {
    this.addProductFormData();
    this.getcategorylist();
   
  }
  getcategorylist(): void {
    this.dataService.getCategory()
      .subscribe(
        ( data: any) => this.getcategorydata(data),
    )
  }

  getcategorylistId(id): void {
    this.dataService.getCateroryListAllId(id)
      .subscribe(
        ( data: any) => this.getcategorylistIdg(data),
    )
  }
  getcategorylistIdg(data){
    this.categoryDataIdData= data.data;
    this.categoryDataIdData.forEach(function(q) {
      q.checked = false,
      q.collapsed=true
    })
    console.log(this.categoryDataIdData);
    this.items= this.categoryDataIdData;
  }

  onSelectedChange(event){
    console.log(event)
  }

  getcategorydata(data:any) {
    console.log(data.data);
    this.categoryData= data.data;
    }
    category(event:any){
      console.log(event.value)
      this.getcategorylistId(event.value)
    }

  private addProductFormData() {
    this.addProductForm = this.formBuilder.group({
      productTitle: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55)],
        updateOn: 'change',
      }),
      productSKU:new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55)],
        updateOn: 'change',
      }),
      productDescription: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55)],
        updateOn: 'change',
      }),

      productCategoryID: new FormControl('63c3a7b3778da837ba45b477', {
        validators: [Validators.required, Validators.maxLength(55)],
        updateOn: 'change',
      }),
      rootCategoryID: new FormControl('63b1376a8b21a6b0bf2ce2f8', {
        validators: [Validators.required, Validators.maxLength(55)],
        updateOn: 'change',
      }),
      price:new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55)],
        updateOn: 'change',
      }),
      currency: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55)],
        updateOn: 'change',
      }),

      allowDiscount: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55), Validators.pattern(this.validation.emailPhone)],
        updateOn: 'change',
      }),
      discountPercentage:new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55), Validators.pattern(this.validation.emailPhone)],
        updateOn: 'change',
      }),
      productRating: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55)],
        updateOn: 'change',
      }),
      OverallRating: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55)],
        updateOn: 'change',
      }),

      productDetails: this.formBuilder.array([
        
      ])
    });
    this.addNewAddressGroup()
  }
  addNewAddressGroup() {
    const add = this.addProductForm.get('productDetails') as FormArray;
    add.push(this.formBuilder.group({
      quantity:new FormControl('', {}),
      sizes:new FormControl('', {}),
      stockAvailability:new FormControl('', {})
    }))
  }

  deleteAddressGroup(index: number) {
    const add = this.addProductForm.get('productDetails') as FormArray;
    add.removeAt(index)
  }
  onLogin() {
    let userData = this.addProductForm.value;
    console.log(userData)
    this.dataService.loginApi(userData).subscribe(
      (data) => this.logindialog(data),
      (err) => console.log(err)
    );
  }

  logindialog(data: any) {
    if (data.status === true) {
      this.loginData = data;
    }
    if (data.status === false) {
      alert(data.message)
    }
  }
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '300px',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    customClasses: [
    {
      name: 'quote',
      class: 'quote',
    },
    {
      name: 'redText',
      class: 'redText'
    },
    {
      name: 'titleText',
      class: 'titleText',
      tag: 'h1',
    },
  ],
  uploadUrl: 'v1/image',
  uploadWithCredentials: false,
  sanitize: true,
  toolbarPosition: 'top',
  toolbarHiddenButtons: [
    ['bold', 'italic'],
    ['fontSize']
  ]

}
}
