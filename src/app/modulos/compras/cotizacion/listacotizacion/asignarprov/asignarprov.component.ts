import { Component, OnInit } from "@angular/core";
import { CrudService } from "src/app/shared/servicios/crud.service";
import { ToolsService } from "src/app/shared/servicios/tools.service";
import { ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-asignarprov",
  templateUrl: "./asignarprov.component.html",
  styles: []
})
export class AsignarprovComponent implements OnInit {
  IDCotizacion: any;
  pageSize = this.toolsService.getPaginas();
  selPageSize: any = this.pageSize[0];
  paginate: any = [];
  Cotizacion: any = [];
  checked = false;
  selProveedor: any;
  Total: number = 0;
  constructor(
    private crudService: CrudService,
    private toolsService: ToolsService,
    private router: ActivatedRoute,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    this.router.params.subscribe(async params => {
      this.IDCotizacion = params["id"];
      this.loadApp();
    });
  }

  async loadApp() {
    this.paginate = await this.crudService.SeleccionarAsync(
      "cotizacion/" + this.IDCotizacion
    );
    this.paginate.forEach(i => {
      this.Total += i.Cantidad * i.PrecioRef;
    });
  }
}
