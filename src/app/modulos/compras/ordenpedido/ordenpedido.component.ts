import { Component, OnInit, ViewChildren } from "@angular/core";
import { CrudService } from "../../../shared/servicios/crud.service";
import { MatDialog, MatSnackBar, MatDialogRef } from "@angular/material";
import { AppLoaderService } from "../../../shared/servicios/app-loader/app-loader.service";
import { AppConfirmService } from "../../../shared/servicios/app-confirm/app-confirm.service";
import { ToolsService } from "../../../shared/servicios/tools.service";
import { OPedidoPopupComponent } from "./popup/popup.component";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-ordenpedido",
  templateUrl: "./ordenpedido.component.html",
  styleUrls: []
})
export class OrdenpedidoComponent implements OnInit {
  Pedidos: any = [];
  Total = 0;
  Fecha: any = new Date();
  Creado: boolean = false;
  OPedido: any = {
    Detalles: []
  };

  @ViewChildren("checkboxMultiple") private checkboxesMultiple: any;
  public itemForm: FormGroup;
  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: CrudService,
    private loader: AppLoaderService,
    private confirmService: AppConfirmService,
    private fb: FormBuilder,
    private toolsService: ToolsService
  ) {}

  ngOnInit() {
    this.buildItemForm();
    this.Pedidos = [];
    this.Total = 0;
  }
  buildItemForm() {
    this.itemForm = this.fb.group({
      Estado: [{ value: "BRR", disabled: true }],
      FechaRegistro: [{ value: this.Fecha.toDateString(), disabled: true }],
      Observacion: [""]
    });
  }
  updateValue(event, cell, rowIndex) {
    this.Pedidos[rowIndex][cell] = event.target.value;
    this.Pedidos = [...this.Pedidos];

    this.Total = this.Pedidos.reduce(
      (a, b) => a + parseFloat(b.Referencia) * parseFloat(b.Cantidad),
      0
    );
    this.OPedido.Detalles = this.Pedidos;
    console.log(this.OPedido);
    // this.rowData.PInicial = this.initMeses.reduce((a, b) => a + b.Precio, 0);
  }
  updateValueCheck(event, cell, rowIndex) {
    this.Pedidos[rowIndex][cell] = event.checked;
    this.Pedidos = [...this.Pedidos];
  }
  agregar() {
    const nuevo = {
      Seleccionar: false,
      Cantidad: 0,
      Descripcion: "",
      Referencia: 0
    };
    this.Pedidos = this.Pedidos.concat(nuevo);
    // this.Total = this.Pedidos.reduce((a, b) => a + b.Referencia, 0);
  }

  eliminar() {
    let count = 0;
    let checkboxesArray = this.checkboxesMultiple.toArray();
    let a = this.Pedidos.filter(function seleccionado(i) {
      checkboxesArray[count].checked = false;
      count++;
      if (!i.Seleccionar) {
        return i;
      }
    });
    this.Pedidos = [...a];
    console.log(a);
  }

  submitTransaccion() {
    this.snack.open("Agregado!", "OK", { duration: 4000 });
    this.itemForm.disable();
    this.OPedido = this.itemForm.value;
    this.Creado = true;
  }

  cancelar() {
    this.Creado = false;
  }

  async openPopUp(data: any = {}, isNew?) {
    let title = isNew ? "Agregar" : "Actualizar";
    if (!isNew) {
      data = await this.crudService.SeleccionarAsync("proveedor/" + data.ID);
    }
    let dialogRef: MatDialogRef<any> = this.dialog.open(OPedidoPopupComponent, {
      width: "1080px",
      height: "720px",
      disableClose: true,
      data: { title: title, payload: data }
    });

    dialogRef.afterClosed().subscribe(response => {
      if (!response) return;

      this.loader.open();
      if (isNew) {
        this.crudService.Insertar(response, "proveedor/").subscribe(data => {
          //  this.loadApp();
          this.loader.close();
          this.snack.open("Agregado!", "OK", { duration: 4000 });
        });
      } else {
        this.crudService
          .Actualizar(data.ID, response, "proveedor/")
          .subscribe(response2 => {
            // this.loadApp();
            this.loader.close();
            this.snack.open("Actualizado!", "OK", { duration: 4000 });
          });
      }
    });
  }
}
