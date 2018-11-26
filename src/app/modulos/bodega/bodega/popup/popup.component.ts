import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CrudService} from '../../../../shared/servicios/crud.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styles: []
})
export class PopupBodegaComponent implements OnInit {

  public itemForm: FormGroup;
  ciudads: any;
  estados: any = [
    { Abr: 'ACT', Etiqueta: "Activo" },
    { Abr: 'INA', Etiqueta: "Inactivo" },
    { Abr: 'BLO', Etiqueta: "Bloqueada" },
    { Abr: 'TRA', Etiqueta: "Transacción" },
    // { Abr: 'CER', Etiqueta: "" },
  ];


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<PopupBodegaComponent>,
              private fb: FormBuilder,
              private crudService: CrudService) { }
  ngOnInit() {
    this.ciudads = this.crudService.SeleccionarAsync('ciudad_combo');
    if (Array.isArray(this.data.payload)) {
      this.buildItemForm(this.data.payload[0]);
    } else {
      this.buildItemForm(this.data.payload);
    }
  }
  buildItemForm(item) {
    this.itemForm = this.fb.group({
      Descripcion: [ item.Descripcion || '', Validators.required ],
      Direccion: [ item.Direccion || '', Validators.required ],
      Observacion: [ item.Observacion || '' ],
      IDCiudad: [ item.IDCiudad || null, Validators.required ],
      Latitud: [ item.Latitud || '' ],
      Longitud: [ item.Longitud || '' ],
      Estado: [ item.Estado || null, Validators.required ]
    })
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }

}
