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
  Proveedores: any = [];
  Cotizacion: any = [];
  checked = false;
  selProveedor:any;
  constructor(
    private crudService: CrudService,
    private toolsService: ToolsService,
    private router: ActivatedRoute,
    private snack: MatSnackBar,
  ) {
   
  }



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
    this.Proveedores = await this.crudService.SeleccionarAsync(
      "proveedorcombo"
    );
    
  }

  updateValue(event, cell, rowIndex) {
    this.paginate[rowIndex][cell] = event.value;
    this.paginate = [...this.paginate];
  }

  save() {
    let proveedor = [];
    let bandera = false;
    if(this.checked){
      this.paginate.forEach(i => {
          proveedor.push(this.selProveedor);
      });
      this.Cotizacion = [...proveedor];
      this.crudService
        .Actualizar(this.IDCotizacion, this.Cotizacion, "detallecotizacion/")
        .subscribe(res => {
          this.snack.open("Cotización Actualizada", "OK", {
            duration: 4000
          });
          this.loadApp();

        });
    }
    else{
      this.paginate.forEach(i => {
        if (i.IDProveedor) {
          proveedor.push(i.IDProveedor);
        } else {
          bandera = true;
          return;
        }
      });
      if (!bandera) {
        this.Cotizacion.Detalle = [...proveedor];
        this.crudService
          .Actualizar(this.IDCotizacion, this.Cotizacion, "detallecotizacion/")
          .subscribe(res => {
            this.snack.open("Cotización Actualizada", "OK", {
              duration: 4000
            });
            this.loadApp();
          });
      } else {
        this.snack.open("Seleccione Proveedor!", "OK", { duration: 4000 });
        this.Cotizacion = [];
      }
    }
   
    
  }
}
