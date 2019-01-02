import { Component, OnInit, ViewChild, ViewChildren } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToolsService } from "src/app/shared/servicios/tools.service";
import { CrudService } from "src/app/shared/servicios/crud.service";
import { MatSnackBar, MatDialog } from "@angular/material";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { RowHeightCache } from "@swimlane/ngx-datatable/release/utils";

@Component({
  selector: "app-nuevaocompra",
  templateUrl: "./nuevaocompra.component.html",
  styles: []
})
export class NuevaocompraComponent implements OnInit {
  pageSize = this.toolsService.getPaginas();
  selPageSize: any = this.pageSize[0];
  paginate: any = [];
  SelProveedor: any;
  SelFPago: any;
  SelCPago: any;
  Proveedores: any = [];
  FormasPago: any = [];
  CondicionesPago: any = [];
  Creado: boolean = false;
  checked = false;
  public itemForm: FormGroup;
  OrdenCompra: any = {
    Detalles: [],
    IDCotProv: []
  };
  selectedItems: any = [];
  @ViewChild("MyDatatableComponent") ngxDatatable: DatatableComponent;
  @ViewChildren("cantidadMultiple") private cantidadMultiple: any;

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
    this.LoadCombos();
  }

  buildItemForm() {
    this.itemForm = this.fb.group({
      Estado: [{ value: "Borrador", disabled: true }],
      FechaEntrega: ["", Validators.required],
      Observacion: ["", Validators.required],
      IDProveedor: ["", Validators.required],
      IDCondicionPago: ["", Validators.required],
      IDModoPago: ["", Validators.required]
    });
  }

  submitTransaccion() {
    this.snack.open("Agregado!", "OK", { duration: 4000 });
    this.itemForm.value.FechaEntrega = this.itemForm.value.FechaEntrega.toDateString();
    this.itemForm.disable();
    this.OrdenCompra = this.itemForm.value;
    this.Creado = true;
    this.loadApp();
  }

  async loadApp() {
    this.paginate = await this.crudService.SeleccionarAsync(
      "ordencompraitems",
      {
        page: 1,
        psize: this.selPageSize,
        Estado: "BRR",
        IDProveedor: this.itemForm.value.IDProveedor
      }
    );
  }

  async LoadCombos() {
    this.Proveedores = await this.crudService.SeleccionarAsync(
      "comboocompra/" + this.toolsService.getCotizacionesMinimas()
    );
    this.FormasPago = await this.crudService.SeleccionarAsync(
      "modospago_combo"
    );
    this.CondicionesPago = await this.crudService.SeleccionarAsync(
      "condiciones_combo"
    );
  }

  async setPage(event) {
    this.paginate = await this.crudService.SeleccionarAsync(
      "ordencompraitems",
      {
        page: event.offset + 1,
        psize: this.selPageSize,
        Estado: "BRR",
        IDProveedor: this.itemForm.value.IDProveedor
      }
    );
  }

  getID(row) {
    return row.ID;
  }

  updateValue(event, cell, rowIndex) {
    console.log(rowIndex);
    if (
      parseFloat(event.target.value) <= 0 ||
      !parseFloat(event.target.value)
    ) {
      this.snack.open("Registre una Cantidad Correcta", "OK", {
        duration: 4000
      });
      let cantidadMultiple = this.cantidadMultiple.toArray();
      cantidadMultiple[rowIndex].nativeElement.value = null;
      this.paginate[rowIndex][cell] = null;
      this.paginate = [...this.paginate];
      return;
    } else {
      this.paginate[rowIndex][cell] = event.target.value;
      this.paginate = [...this.paginate];
    }
  }

  cancelar() {
    this.Creado = false;
    this.buildItemForm();
    this.OrdenCompra = [];
  }

  save() {
    let bandera = false;
    let selected = this.ngxDatatable.selected.map(function(row) {
      if (row.Cantidad) {
        return row;
      } else {
        bandera = true;
        return;
      }
    });

    if (!bandera) {
      let ids = this.ngxDatatable.selected.map(row => row.ID);
      this.OrdenCompra.IDCotProv = ids;
      this.OrdenCompra.Detalles = selected;
      console.log(this.OrdenCompra);
       this.crudService
        .Insertar(this.OrdenCompra, "ordencompra")
        .subscribe(res => {
          this.snack.open("Orden de Compra Registrada", "OK", { duration: 4000 });
          this.cancelar();
        });
    } else {
      this.snack.open("Ingrese Cantidad!", "OK", {
        duration: 4000
      });
    }
  }
}
