import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data-s.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'sb-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements AfterViewInit ,OnInit{
  displayedColumns = [  'productTitle','price','rootCategoryName'];
  dataSource: MatTableDataSource<any>;
  selection: SelectionModel<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  productData: any[];
  constructor(public dataService: DataService,public router :Router) {

  }
  ngAfterViewInit() {
    this.getProductlist();

  }

  ngOnInit() {
  }
  getProductlist(): void {
    this.dataService.getProduct()
      .subscribe(
        ( data: any) => this.getProductdata(data),
    )
  }

  getProductdata(data:any) {
    console.log(data.data);
    this.productData= data.data;
    this.dataSource = new MatTableDataSource(this.productData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    }


  addProduct(){
    this.router.navigateByUrl('/addproduct');
  }

 
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }
}