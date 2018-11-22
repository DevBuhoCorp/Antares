import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CrudService } from '../../../../shared/servicios/crud.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styles: []
})
export class ColaboradorAreaPopupComponent implements OnInit {
  Cargos: any = [];
  Departamentos: any = [];
  Areas: any = [];
  selDepartamento: any;
  public itemForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ColaboradorAreaPopupComponent>,
    private fb: FormBuilder,
    private crudService: CrudService) { }

  ngOnInit() {
    console.log(this.data.payload);
    this.CargarCombo();
    if (this.data.payload.length > 0) {
      this.buildItemForm(this.data.payload[0]);
      this.selDepartamento = this.data.payload[0].IDDepartamento;
    } else {
      this.buildItemForm(this.data.payload);
    }
  }

  async CargarCombo() {
    this.Cargos = await this.crudService.SeleccionarAsync("cargo_combo");
    this.Departamentos = await this.crudService.SeleccionarAsync("departamento_combo");
    this.Areas = await this.crudService.SeleccionarAsync("area_combo/" + this.selDepartamento);
  }

  async loadArea() {
    this.Areas = await this.crudService.SeleccionarAsync("area_combo/" + this.selDepartamento);
  }

  buildItemForm(item) {
    this.itemForm = this.fb.group({
      IdCargo: [item.IdCargo || ''],
      IdArea: [item.IdArea || ''],
      FechaInicio: [item.FechaInicio || '', Validators.required],
      Estado: [item.Estado || false, Validators.required]
    })
  }

  submit() {
    try{
      this.itemForm.value.FechaInicio = this.itemForm.value.FechaInicio.toDateString();
      this.dialogRef.close(this.itemForm.value)
    }
    catch{
      this.dialogRef.close(this.itemForm.value)
    }
   
  }




}