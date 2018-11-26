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
      Observacion: ["", Validators.required]
      //IdUsers: [this.toolsService.getEmpresaActive().IDUsers]
    });
  }
  updateValue(event, cell, rowIndex) {
    this.Pedidos[rowIndex][cell] = event.target.value;
    this.Pedidos[rowIndex]["Saldo"] =
      parseFloat(this.Pedidos[rowIndex]["Cantidad"]) *
      parseFloat(this.Pedidos[rowIndex]["PrecioRef"]);
    this.Pedidos = [...this.Pedidos];

    this.Total = this.Pedidos.reduce(
      (a, b) => a + parseFloat(b.PrecioRef) * parseFloat(b.Cantidad),
      0
    );
  }
  updateValueCheck(event, cell, rowIndex) {
    this.Pedidos[rowIndex][cell] = event.checked;
    this.Pedidos = [...this.Pedidos];
  }
  agregar() {
    const nuevo = {
      Seleccionar: false,
      Cantidad: 0,
      Etiqueta: "",
      PrecioRef: 0,
      Saldo: 0
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
    this.OPedido = this.itemForm.value;
    this.Creado = true;
  }

  cancelar() {
    this.Creado = false;
    this.itemForm.controls['Observacion'].setValue("");
    this.OPedido = [];
    this.Pedidos = [];
  }

  save() {
    this.OPedido.Detalles = [...this.Pedidos];
    console.log(this.OPedido);
    this.crudService.Insertar(this.OPedido, "opedido").subscribe(res => {
      this.snack.open("Orden de Pedido Registrada", "OK", { duration: 4000 });
      this.cancelar();
    });
  }

  async openPopUp(data: any = {}, isNew?) {
    let title = isNew ? "Agregar" : "Actualizar";
    let dialogRef: MatDialogRef<any> = this.dialog.open(OPedidoPopupComponent, {
      width: "1080px",
      height: "720px",
      disableClose: true,
      data: { title: title, payload: data }
    });

    dialogRef.afterClosed().subscribe(response => {
      console.log(response);
      if (!response) return;
      response.forEach(i => {
        const nuevo = {
          Seleccionar: false,
          Cantidad: 0,
          Etiqueta: i.Descripcion,
          PrecioRef: 0,
          Saldo: 0,
          IdItem: i.ID
        };
        this.Pedidos = this.Pedidos.concat(nuevo);
      });

      console.log(this.Pedidos);
    });
  }
}
