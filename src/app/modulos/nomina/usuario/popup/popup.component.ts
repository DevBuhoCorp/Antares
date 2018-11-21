import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CrudService } from '../../../../shared/servicios/crud.service';
import { DateAdapter } from '../../../../../../node_modules/@angular/material/core';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styles: []
})
export class PopupComponentUser implements OnInit {
  public itemForm: FormGroup;
  roles: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private crudService: CrudService,
    public dialogRef: MatDialogRef<PopupComponentUser>,
    private fb: FormBuilder,
    private adapter: DateAdapter<any>
  ) { }

  ngOnInit() {
    this.roles = this.crudService.SeleccionarAsync('rol_combo');
    if (Array.isArray(this.data.payload)) {
      this.buildItemForm(this.data.payload[0]);
    } else {
      this.buildItemForm(this.data.payload);
    }
  }

  buildItemForm(item) {
    this.itemForm = this.fb.group({
      Cedula: [item.Cedula || '', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      NombrePrimer: [item.NombrePrimer || '', Validators.required],
      NombreSegundo: [item.NombreSegundo || '', Validators.required],
      ApellidoPaterno: [item.ApellidoPaterno || '', Validators.required],
      ApellidoMaterno: [item.ApellidoMaterno || '', Validators.required],
      NumConvencional: [item.NumConvencional || '', [Validators.required, CustomValidators.phone('BD')]],
      NumMovil: [item.NumMovil || '', [Validators.required, CustomValidators.phone('BD')]],
      name: [item.name || '', [Validators.required]],
      email: [item.email || '', [Validators.required, Validators.email]],
      password: [item.password || ''],
      IDRol: [item.IDRol || '', Validators.required],
      Estado: [item.Estado || '', Validators.required],
    });
    
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }

}
