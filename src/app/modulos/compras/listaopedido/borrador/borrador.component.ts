import { Component, OnInit } from "@angular/core";
import { ToolsService } from "../../../../shared/servicios/tools.service";
import { CrudService } from "../../../../shared/servicios/crud.service";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-borrador",
  templateUrl: "./borrador.component.html",
  styleUrls: []
})
export class BorradorComponent implements OnInit {
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
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadApp();
  }

  Guardar() {
    this.paginate.data.map(i => {
      if (i.Estado) {
        this.crudService.Actualizar(i.ID, i, "opedido/").subscribe(
          async data => {
            this.snack.open("Transacción Finalizada!", "OK", {
              duration: 4000
            });
            this.loadApp();
          },
          error => {
            this.snack.open(error._body, "OK", { duration: 4000 });
          }
        );
      }
    });
  }
  async loadApp() {
    this.paginate = await this.crudService.SeleccionarAsync("opedido", {
      page: 1,
      psize: this.selPageSize
    });
    this.paginate.data = this.crudService.SetBool(this.paginate.data);
  }
  async setPage(event) {
    this.paginate = await this.crudService.SeleccionarAsync("opedido", {
      page: event.offset + 1,
      psize: this.selPageSize
    });
  }
}
