import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CrudService } from '../../../../shared/servicios/crud.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styles: []
})
export class AreaPopupComponent implements OnInit {
  Departamentos:any = [];
  public itemForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AreaPopupComponent>,
    private fb: FormBuilder,
    private crudService: CrudService ) { }

  ngOnInit() {
    this.CargarCombo();
    if (Array.isArray(this.data.payload)) {
      this.buildItemForm(this.data.payload[0]);
    } else {
      this.buildItemForm(this.data.payload);
    }
  }

  async CargarCombo(){
    this.Departamentos = await this.crudService.SeleccionarAsync("departamento_combo");
  }

  buildItemForm(item) {
    this.itemForm = this.fb.group({
      Descripcion: [item.Descripcion || '', Validators.required],
      NombreCorto: [item.NombreCorto || '', Validators.required],
      IDDepartamento: [item.IDDepartamento || '', Validators.required],
      Estado: [item.Estado || false, Validators.required]
    })
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }

}
