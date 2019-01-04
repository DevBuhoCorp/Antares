import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { CrudService } from '../../../../shared/servicios/crud.service';
import { ToolsService } from '../../../../shared/servicios/tools.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: []
})
export class OPedidoPopupComponent implements OnInit {
  pageSize = this.toolsService.getPaginas();
  selPageSize : any = this.pageSize[0];
  paginate: any={
    data: [],
    page: 1,
    total: 0,
    per_page: 0
  };
  selectedItems: any = [];
  @ViewChild("MyDatatableComponent") ngxDatatable: DatatableComponent;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<OPedidoPopupComponent>,
  private fb: FormBuilder,
  private crudService: CrudService,
  private toolsService:ToolsService) { }

  ngOnInit() {
    this.loadApp();
  }

  async loadApp(){
    this.paginate = await this.crudService.SeleccionarAsync('productos', { page: 1 , psize: this.selPageSize });
  }

  async setPage(event){
    this.paginate = await this.crudService.SeleccionarAsync('productos', { page: event.offset + 1 , psize: this.selPageSize });
  }

  submit() {
    let data  = this.ngxDatatable.selected.map(row => row);
    this.dialogRef.close(data)
  }

  getID(row) {
    return row.ID;
  }

  updateValueCheck(event, cell, rowIndex) {
    this.paginate.data[rowIndex][cell] = event.checked;
    this.paginate.data = [...this.paginate.data];
    console.log(this.paginate.data);
  }

}
