import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { CrudService } from '../../../../shared/servicios/crud.service';
import { ToolsService } from '../../../../shared/servicios/tools.service';

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
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<OPedidoPopupComponent>,
  private fb: FormBuilder,
  private crudService: CrudService,
  private toolsService:ToolsService) { }

  ngOnInit() {
    this.loadApp();
  }

  async loadApp(){
    this.paginate = await this.crudService.SeleccionarAsync('items', { page: 1 , psize: this.selPageSize });
  }

  async setPage(event){
    this.paginate = await this.crudService.SeleccionarAsync('items', { page: event.offset + 1 , psize: this.selPageSize });
  }

  submit() {
    let data = [];
    this.paginate.data.forEach(i => {
      if(i.Seleccionar){
        data = data.concat(i);
      }      
    });
    this.dialogRef.close(data)
  }

  updateValueCheck(event, cell, rowIndex) {
    this.paginate.data[rowIndex][cell] = event.checked;
    this.paginate.data = [...this.paginate.data];
    console.log(this.paginate.data);
  }

}
