import { Component, OnInit, ViewChildren } from "@angular/core";
import { ToolsService } from "../../../../shared/servicios/tools.service";
import { CrudService } from "../../../../shared/servicios/crud.service";
import { MatSnackBar, MatDialog, MatDialogRef } from "@angular/material";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PopUpListacotizacionComponent } from "./listacotizacion/listacotizacion.component";

@Component({
  selector: "app-nuevacotizacion",
  templateUrl: "./nuevacotizacion.component.html",
  styles: []
})
export class NuevacotizacionComponent implements OnInit {
  pageSize = this.toolsService.getPaginas();
  selPageSize: any = this.pageSize[0];
  paginate: any = {
    data: [],
    page: 1,
    total: 0,
    per_page: 0
  };
  Cotizacion: any = {
    Detalles: []
  };
  Creado: boolean = false;
  checked = false;
  public itemForm: FormGroup;
  @ViewChildren("checkboxMultiple") private checkboxesMultiple: any;
  constructor(
    private toolsService: ToolsService,
    private crudService: CrudService,
    private snack: MatSnackBar,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.buildItemForm();
  }

  ngOnInit() {
    // this.loadApp();
  }

  buildItemForm() {
    this.itemForm = this.fb.group({
      Estado: [{ value: "Borrador", disabled: true }],
      FechaIni: ["", Validators.required],
      FechaFin: ["", Validators.required],
      Observacion: ["", Validators.required]
    });
  }

  submitTransaccion() {
    this.snack.open("Agregado!", "OK", { duration: 4000 });
    this.itemForm.value.FechaIni = this.itemForm.value.FechaIni.toDateString();
    this.itemForm.value.FechaFin = this.itemForm.value.FechaFin.toDateString();
    this.itemForm.disable();
    this.Cotizacion = this.itemForm.value;
    this.Creado = true;
    this.loadApp();
  }

  cancelar() {
    this.Creado = false;
    this.buildItemForm();
    this.Cotizacion = [];
  }

  async loadApp() {
    this.paginate = await this.crudService.SeleccionarAsync("opedidoauth", {
      page: 1,
      psize: this.selPageSize,
      Estado: "ACT"
    });
  }

  async setPage(event) {
    this.paginate = await this.crudService.SeleccionarAsync("opedidoauth", {
      page: event.offset + 1,
      psize: this.selPageSize,
      Estado: "ACT"
    });
  }

  updateValueCheck(event, cell, rowIndex) {
    this.paginate.data[rowIndex][cell] = event.checked;
    this.paginate.data = [...this.paginate.data];
  }

  save() {
    let transacciones = [];
    this.paginate.data.forEach(i => {
      if (i.Seleccionar) {
        transacciones.push(i.ID);
      }
    });
    if (transacciones.length > 0) {
      this.Cotizacion.Estado = "BRR";
      this.Cotizacion.Detalles = [...transacciones];
      this.crudService
        .Insertar(this.Cotizacion, "cotizacion")
        .subscribe(res => {
          this.snack.open("Cotizacion Registrada", "OK", { duration: 4000 });
          this.cancelar();
        });
    } else {
      this.snack.open("Seleccione por lo menos una O.Pedido", "OK", {
        duration: 4000
      });
    }
  }

  Modal(id) {
    let title = "Detalles Orden Pedido";
    let dialogRef: MatDialogRef<any> = this.dialog.open(
      PopUpListacotizacionComponent,
      {
        width: "1080px",
        disableClose: true,
        data: { title: title, payload: id }
      }
    );

    dialogRef.afterClosed().subscribe(response => {
      if (!response) return;
    });
  }
}
