import { Component, OnInit, ViewChildren } from "@angular/core";
import { CrudService } from "../../../shared/servicios/crud.service";
import { MatDialog, MatSnackBar, MatDialogRef } from "@angular/material";
import { AppLoaderService } from "../../../shared/servicios/app-loader/app-loader.service";
import { AppConfirmService } from "../../../shared/servicios/app-confirm/app-confirm.service";
import { ToolsService } from "../../../shared/servicios/tools.service";
import { OPedidoPopupComponent } from "./popup/popup.component";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import { startWith, map } from "rxjs/operators";
export interface Items {
  ID: number;
  Descripcion: string;
}
@Component({
  selector: "app-ordenpedido",
  templateUrl: "./ordenpedido.component.html",
  styleUrls: []
})
export class OrdenpedidoComponent implements OnInit {
  item: any = {
    ID: 0
  };
  Items: any = [];
  itemCtrl = new FormControl();
  Pedidos: any = [];
  checked = false;
  Total = 0;
  Fecha: any = new Date();
  Creado: boolean = false;
  OPedido: any = {
    Detalles: []
  };

  @ViewChildren("checkboxMultiple") private checkboxesMultiple: any;
  @ViewChildren("textboxMultiple") private textboxMultiple: any;
  @ViewChildren("cantidadMultiple") private cantidadMultiple: any;
  
  public itemForm: FormGroup;
  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: CrudService,
    private loader: AppLoaderService,
    private confirmService: AppConfirmService,
    private fb: FormBuilder,
    private toolsService: ToolsService
  ) {
    this.CargarAuto();
    this.buildItemForm();
  }

  ngOnInit() {
    this.item = this.itemCtrl.valueChanges.pipe(
      startWith<string | Items>(""),
      map(value => (typeof value === "string" ? value : value.Descripcion)),
      map(item => (item ? this._filter(item) : this.Items.slice()))
    );
  }
  private _filter(name: string): Items[] {
    const filterValue = name.toLowerCase();
    return this.Items.filter(option =>
      option.Descripcion.toLowerCase().includes(filterValue)
    );
  }
  displayFn(user?: Items): string | undefined {
    return user ? user.Descripcion : undefined;
  }
  async CargarAuto() {
    this.Items = await this.crudService.SeleccionarAsync("autocompleteitems");
  }
  buildItemForm() {
    //this.itemCtrl = new FormControl();
    this.itemForm = this.fb.group({
      Estado: [{ value: "Borrador", disabled: true }],
      FechaRegistro: ["", Validators.required],
      Observacion: ["", Validators.required]
    });
  }
  updateValue(event, cell, rowIndex) {
    let bandera = false;
    if (cell == "Etiqueta") {
      this.Pedidos.forEach(i => {
        if (i.Etiqueta == event.target.value) {
          bandera = true;
          return;
        }
      });
    }
    if (cell == "Cantidad") {
      if( parseFloat(event.target.value) <= 0){
        this.snack.open("Cantidad debe ser mayor que 0", "OK", {
          duration: 4000
        });
        let textboxMultiple = this.cantidadMultiple.toArray();
        textboxMultiple[rowIndex].nativeElement.value = null;
        this.Pedidos[rowIndex][cell] = null;
        this.Pedidos = [...this.Pedidos];
        return;
        
      }
    }
    if (!bandera) {
      this.Pedidos[rowIndex][cell] = event.target.value;
      this.Pedidos[rowIndex]["Saldo"] =
        parseFloat(this.Pedidos[rowIndex]["Cantidad"]) *
        parseFloat(this.Pedidos[rowIndex]["PrecioRef"]);

      this.Pedidos = [...this.Pedidos];
      this.Total = this.Pedidos.reduce(
        (a, b) => a + parseFloat(b.PrecioRef) * parseFloat(b.Cantidad),
        0
      );
    } else {
      let textboxMultiple = this.textboxMultiple.toArray();
      textboxMultiple[rowIndex].nativeElement.value = null;
      this.Pedidos[rowIndex][cell] = null;
      this.Pedidos = [...this.Pedidos];
      this.snack.open("Dato Incorrecto, Ingrese Otro", "OK", {
        duration: 4000
      });
    }
  }
  updateValueCheck(event, cell, rowIndex) {
    this.Pedidos[rowIndex][cell] = event.checked;
    this.Pedidos = [...this.Pedidos];
  }
  agregar() {
    const nuevo = {
      Seleccionar: false,
      Cantidad: null,
      Etiqueta: null,
      PrecioRef: 0,
      Saldo: 0
    };

    this.Pedidos = this.Pedidos.concat(nuevo);

    try {
      this.itemCtrl.value.Descripcion = "";
    } catch {}
    this.CargarAuto();
  }

  eliminar() {
    let count = 0;
    let checkboxesArray = this.checkboxesMultiple.toArray();
    let nuevo = this.Pedidos.filter(function seleccionado(i) {
      checkboxesArray[count].checked = false;
      count++;
      if (!i.Seleccionar) {
        return i;
      }
    });
    this.Pedidos = [...nuevo];
  }

  submitTransaccion() {
    this.snack.open("Agregado!", "OK", { duration: 4000 });
    this.itemForm.value.FechaRegistro = this.itemForm.value.FechaRegistro.toDateString();
    this.itemForm.disable();
    this.OPedido = this.itemForm.value;
    this.Creado = true;
  }

  cancelar() {
    this.Creado = false;
    this.buildItemForm();
    this.OPedido = [];
    this.Pedidos = [];
  }

  save() {
    let bandera = false;
    if (this.checked) {
      this.OPedido.Estado = "ENV";
    } else {
      this.OPedido.Estado = "BRR";
    }

    this.Pedidos.forEach(i => {
      if (i.Etiqueta == null || i.Cantidad == null) {
        bandera = true;
      }
    });

    if (!bandera) {
      this.OPedido.Detalles = [...this.Pedidos];
      this.crudService.Insertar(this.OPedido, "opedido").subscribe(res => {
        this.snack.open("Orden de Pedido Registrada", "OK", { duration: 4000 });
        this.cancelar();
      });
    } else {
      this.snack.open(
        "Orden de Pedido Incorrecta, Revise que todos los datos estén correctos",
        "OK",
        { duration: 4000 }
      );
    }
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
          Cantidad: null,
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
