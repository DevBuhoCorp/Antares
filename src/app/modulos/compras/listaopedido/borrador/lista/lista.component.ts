import { Component, OnInit, ViewChildren } from "@angular/core";
import { FormControl, FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { MatDialog, MatSnackBar, MatDialogRef } from "@angular/material";
import { CrudService } from "../../../../../shared/servicios/crud.service";
import { AppLoaderService } from "../../../../../shared/servicios/app-loader/app-loader.service";
import { AppConfirmService } from "../../../../../shared/servicios/app-confirm/app-confirm.service";
import { ToolsService } from "../../../../../shared/servicios/tools.service";
import { startWith, map } from "rxjs/operators";
import { OPedidoPopupComponent } from "../../../ordenpedido/popup/popup.component";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-lista",
  templateUrl: "./lista.component.html",
  styles: []
})
export class ListaComponent implements OnInit {
  Pedidos: any = [];
  checked = false;
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
    private toolsService: ToolsService,
    private router: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.router.params.subscribe(async params => {
      this.IDOrdenPedido = params["id"];
   
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
      this.Total += i.Saldo;
    });
    //this.paginate.data = this.crudService.SetBool(this.paginate.data);
    this.Pedidos = [...this.paginate.data];
  }
  
 
  updateValue(event, cell, rowIndex) {
    let bandera = false;
    if (cell == "Etiqueta") {
      this.Pedidos[rowIndex]["IdItem"] = null;
      this.Pedidos.forEach(i => {
        if (i.Etiqueta == event.target.value) {
          bandera = true;
          return;
        }
      });
    }
    if (cell == "Cantidad" ) {
      if (parseFloat(event.target.value) <= 0 || !parseFloat(event.target.value)) {
        this.snack.open("Registre una Cantidad Correcta", "OK", {
          duration: 4000
        });
        let cantidadMultiple = this.cantidadMultiple.toArray();
        cantidadMultiple[rowIndex].nativeElement.value = null;
        this.Pedidos[rowIndex][cell] = null;
        this.Pedidos = [...this.Pedidos];
        return;
      }
    }

    if (cell == "PrecioRef"  ) {
      if (parseFloat(event.target.value) <= 0 || !parseFloat(event.target.value)) {
        this.snack.open("Registre una Cantidad Correcta", "OK", {
          duration: 4000
        });
        
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
      
    } else {
      let textboxMultiple = this.textboxMultiple.toArray();
      textboxMultiple[rowIndex].nativeElement.value = null;
      this.Pedidos[rowIndex][cell] = null;
      this.Pedidos = [...this.Pedidos];
      this.snack.open("Dato Incorrecto, Ingrese Otro", "OK", {
        duration: 4000
      });
    }
    this.Total = 0;
    this.Pedidos.forEach(i => {
      if(parseFloat(i.Cantidad) || parseFloat(i.PrecioRef)){
        this.Total += parseFloat(i.Cantidad) * parseFloat(i.PrecioRef);
      }
    });
  }
  updateValueCheck(event, cell, rowIndex) {
    this.Pedidos[rowIndex][cell] = event.checked;
    this.Pedidos = [...this.Pedidos];
  }
  agregar() {
    const nuevo = {
      Seleccionar: false,
      ID: null,
      IdItem: null,
      IdOPedido: null,
      Etiqueta: null,
      PrecioRef: null,
      Cantidad: null,
      Saldo: null
    };

    this.Pedidos = this.Pedidos.concat(nuevo);
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

  save() {
    let bandera = false;
    this.Pedidos.forEach(i => {
      if (i.Etiqueta == null || i.Cantidad == null || !parseFloat(i.Cantidad) || !parseFloat(i.PrecioRef)) {
        bandera = true;
        return;
      }
    });
    if (!bandera) {
      this.crudService
        .Actualizar(this.IDOrdenPedido, this.Pedidos, "detallepedido/")
        .subscribe(res => {
          this.snack.open("Orden de Pedido Actualizada", "OK", {
            duration: 4000
          });
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
      let bandera = false;
      if (!response) return;
      response.forEach(i => {
        this.Pedidos.forEach(element => {
          if (element.IdItem == i.ID) {
            bandera = true;
            return;
          }
        });
        if (!bandera) {
          const nuevo = {
            Seleccionar: false,
            Cantidad: null,
            Etiqueta: i.Descripcion,
            PrecioRef: 0,
            Saldo: 0,
            IdItem: i.ID
          };
          this.Pedidos = this.Pedidos.concat(nuevo);
        }
        else{
          this.snack.open(
            "Item repetido",
            "OK",
            { duration: 4000 }
          );
        }
        bandera = false;
      });


    });
  }
}
