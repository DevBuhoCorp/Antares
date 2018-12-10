import { Component, OnInit, ViewChild, Inject } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  MatDialog,
  MatSnackBar,
  MAT_DIALOG_DATA,
  MatDialogRef
} from "@angular/material";
import { CrudService } from "src/app/shared/servicios/crud.service";
import { DatatableComponent } from "@swimlane/ngx-datatable";

@Component({
  selector: "app-popupemail",
  templateUrl: "./popupemail.component.html",
  styles: []
})
export class PopupemailComponent implements OnInit {
  newMailData = {};
  mailForm: FormGroup;
  selProveedor: any;
  Proveedores: any = [];
  //Correos: any = [];
  selectedProveedores: any = [];

  @ViewChild("MyDatatableComponent") ngxDatatable: DatatableComponent;

  constructor(
    private snack: MatSnackBar,
    private crudService: CrudService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopupemailComponent>
  ) {}

  ngOnInit() {
    console.log(this.data.payload);
    this.mailForm = new FormGroup({
      to: new FormControl("", [Validators.required, Validators.email]),
      subject: new FormControl(
        this.data.payload.Observacion +
          " con fecha de plazo: " +
          new Date(this.data.payload.FechaIni).toLocaleDateString() +
          " hasta " +
          new Date(this.data.payload.FechaFin).toLocaleDateString(),
        [Validators.required]
      ),
      message: new FormControl("", [Validators.required]),
      cotizacion: new FormControl(this.data.payload.ID, [Validators.required])
    });
    console.log(this.mailForm);
    this.loadApp();
  }

  getID(row) {
    return row.ID;
  }

  sendEmail() {
    let selected = this.ngxDatatable.selected.map(row => row.Email);

    if (selected.length > 0) {
      this.mailForm.controls["to"].setValue(selected);
      this.closeDialog();
      this.snack.open("Cotizacion Enviada", "OK", { duration: 4000 });
      this.crudService
        .Insertar(this.mailForm.value, "cotizacionmail")
        .subscribe(res => {});
    } else {
      this.snack.open("Seleccione al menos un Proveedor", "OK", {
        duration: 4000
      });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  async loadApp() {
    this.Proveedores = await this.crudService.SeleccionarAsync(
      "proveedorcombo"
    );
  }
}
