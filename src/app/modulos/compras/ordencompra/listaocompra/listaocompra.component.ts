import { Component, OnInit } from "@angular/core";
import { ToolsService } from "src/app/shared/servicios/tools.service";
import { CrudService } from "src/app/shared/servicios/crud.service";
import { MatDialog } from "@angular/material";

@Component({
  selector: "app-listaocompra",
  templateUrl: "./listaocompra.component.html",
  styles: []
})
export class ListaocompraComponent implements OnInit {
  pageSize = this.toolsService.getPaginas();
  selPageSize: any = this.pageSize[0];
  paginate: any = {
    data: [],
    page: 1,
    total: 0,
    per_page: 0
  };
  Estados: any = [
    {
      value: "Borrador",
      ID: "BRR"
    },
    {
      value: "Enviados",
      ID: "ENV"
    }
  ];
  selEstado: any;
  constructor(
    private toolsService: ToolsService,
    private crudService: CrudService,
    public composeDialog: MatDialog,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
   
  }

  async loadApp() {
    this.paginate = await this.crudService.SeleccionarAsync("ordencompra", {
      page: 1,
      psize: this.selPageSize,
      Estado: this.selEstado
    });
  }

  async setPage(event) {
    this.paginate = await this.crudService.SeleccionarAsync("ordencompra", {
      page: event.offset + 1,
      psize: this.selPageSize,
      Estado: this.selEstado
    });
  }
}
