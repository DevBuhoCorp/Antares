import { Component, OnInit, Inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToolsService } from "../../../../../shared/servicios/tools.service";
import { CrudService } from "../../../../../shared/servicios/crud.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

@Component({
  selector: "app-listacotizacion",
  templateUrl: "./listacotizacion.component.html",
  styles: []
})
export class PopUpListacotizacionComponent implements OnInit {
  Total = 0;
  IDOrdenPedido: any;
  pageSize = this.toolsService.getPaginas();
  selPageSize: any = this.pageSize[0];
  paginate: any = {
    data: [],
    page: 1,
    total: 0,
    per_page: 0
  };
  Bandera: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopUpListacotizacionComponent>,
    private crudService: CrudService,
    private toolsService: ToolsService,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    
      this.loadApp(this.data.payload);
      this.IDOrdenPedido = this.data.payload;
    
  }
  async loadApp(id) {
    this.paginate = await this.crudService.SeleccionarAsync(
      "opedido/" + id,
      {
        page: 1,
        psize: this.selPageSize
      }
    );
  
  }

  async setPage(event) {
    this.paginate = await this.crudService.SeleccionarAsync(
      "opedido/" + this.IDOrdenPedido,
      {
        page:  event.offset + 1,
        psize: this.selPageSize
      }
    );
  }

  Cerrar(){
    this.dialogRef.close()
  }
}
