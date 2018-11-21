import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CrudService } from '../../../../shared/servicios/crud.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styles: []
})
export class ColaboradorPopupComponent implements OnInit {
  Cargos: any = [];
  Departamentos: any = [];
  Areas: any = [];
  selDepartamento: any;
  public itemForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ColaboradorPopupComponent>,
    private fb: FormBuilder,
    private crudService: CrudService) { }

  ngOnInit() {
    this.CargarCombo();
    if (Array.isArray(this.data.payload)) {
      this.buildItemForm(this.data.payload[0]);
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
    this.selDepartamento = this.data.payload.IDDepartamento;
    this.itemForm = this.fb.group({
      NombrePrimero: [item.NombrePrimero || '', Validators.required],
      NombreSegundo: [item.NombreSegundo || '', Validators.required],
      ApellidoPaterno: [item.ApellidoPaterno || '', Validators.required],
      ApellidoMaterno: [item.ApellidoMaterno || '', Validators.required],
      Cedula: [item.Cedula || '', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
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