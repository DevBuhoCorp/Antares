import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { CrudService } from "src/app/shared/servicios/crud.service";

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
  constructor(
    private composeDialog: MatDialog,
    private crudService: CrudService
  ) {}

  ngOnInit() {
    this.mailForm = new FormGroup({
      to: new FormControl( "", [Validators.required, Validators.email]),
      subject: new FormControl("", [Validators.required]),
      message: new FormControl("", [Validators.required])
    });
    this.loadApp();
  }

  sendEmail() {
    console.log(this.mailForm.value);
  }

  closeDialog() {}

  async loadApp() {
    this.Proveedores = await this.crudService.SeleccionarAsync(
      "proveedorcombo"
    );
  }

  async getEmail() {
    let proveedor: any = [];
    proveedor = await this.crudService.SeleccionarAsync(
      "proveedor/" + this.selProveedor
    );
    //this.Correos.push(proveedor.Email);
    //this.Proveedores.splice(this.selProveedor - 1, 1);
    //this.mailForm.value.to = this.Correos;
    this.mailForm.controls['to'].setValue(proveedor.Email);
    //console.log(this.Correos);
  }
}
