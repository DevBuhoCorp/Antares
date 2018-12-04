import { Component, OnInit } from '@angular/core';
import { ToolsService } from 'src/app/shared/servicios/tools.service';
import { CrudService } from 'src/app/shared/servicios/crud.service';
import { MatSnackBar } from '@angular/material';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-listacotizacion',
  templateUrl: './listacotizacion.component.html',
  styleUrls: []
})
export class ListaprovcotizacionComponent implements OnInit {
  pageSize = this.toolsService.getPaginas();
  selPageSize: any = this.pageSize[0];
  paginate: any = {
    data: [],
    page: 1,
    total: 0,
    per_page: 0
  };
  constructor(
    private toolsService: ToolsService,
    private crudService: CrudService,
    private snack: MatSnackBar,
    private fb: FormBuilder
  ) {  }

  ngOnInit() {
    this.loadApp();
  }

  async loadApp() {
    this.paginate = await this.crudService.SeleccionarAsync("cotizacion", {
      page: 1,
      psize: this.selPageSize,
      Estado: "BRR"
    });
  }

  async setPage(event) {
    this.paginate = await this.crudService.SeleccionarAsync("cotizacion", {
      page: event.offset + 1,
      psize: this.selPageSize,
      Estado: "BRR"
    });
  }

}
