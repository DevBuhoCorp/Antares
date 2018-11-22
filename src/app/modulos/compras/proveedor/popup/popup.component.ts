import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CrudService} from '../../../../shared/servicios/crud.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styles: []
})
export class PopupProveedorComponent implements OnInit {

  Contribuyentes: any;
  TEmisors: any;
  TIdentificacions: any;

  public itemForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<PopupProveedorComponent>,
              private fb: FormBuilder,
              private crudService: CrudService) { }
  ngOnInit() {
    this.Contribuyentes = this.crudService.SeleccionarAsync('contribuyente_combo');
    this.TEmisors = this.crudService.SeleccionarAsync('tipoemisor_combo');
    this.TIdentificacions = this.crudService.SeleccionarAsync('tipoidentificacion_combo');


    if (Array.isArray(this.data.payload)) {
      this.buildItemForm(this.data.payload[0]);
    } else {
      this.buildItemForm(this.data.payload);
    }
  }
  buildItemForm(item) {
    this.itemForm = this.fb.group({
      Identificacion: [item.Identificacion || '', Validators.required],
      RazonSocial: [item.RazonSocial || '', Validators.required],
      AutorizacionSRI: [item.AutorizacionSRI || '', Validators.required],
      Email: [ item.Email || '', Validators.required],
      Telefono: [ item.Telefono || '' ],
      Celular: [ item.Celular || '' ],
      IDContribuyente: [ item.IDContribuyente || '', Validators.required],
      IDTipoEmisor: [ item.IDTipoEmisor || '', Validators.required],
      IDTipoIdentificacion: [ item.IDTipoIdentificacion || '', Validators.required],
      Estado: [item.Estado || true, Validators.required]
    })
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }

}
