import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToolsService } from "../../../../../shared/servicios/tools.service";
import { CrudService } from "../../../../../shared/servicios/crud.service";

@Component({
  selector: "app-visualizar",
  templateUrl: "./visualizar.component.html",
  styles: []
})
export class VisualizarComponent implements OnInit {
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
    private crudService: CrudService,
    private toolsService: ToolsService,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    this.router.params.subscribe(async params => {
      this.IDOrdenPedido = params["id"];
      this.Bandera = params["bandera"];
      console.log(this.Bandera)
      this.loadApp();
    });
  }
  async loadApp() {
    this.paginate = await this.crudService.SeleccionarAsync(
      "opedido/" + this.IDOrdenPedido,
      {
        page: 1,
        psize: this.selPageSize
      }
    );
    this.paginate.data.forEach(i => {
      this.Total += i.PrecioRef * i.Cantidad;
    });
  }
}
