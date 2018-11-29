import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styles: []
})
export class DepartamentoPopupComponent implements OnInit {
  public itemForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DepartamentoPopupComponent>,
    private fb: FormBuilder) { }
  ngOnInit() {
    if (Array.isArray(this.data.payload)) {
      this.buildItemForm(this.data.payload[0]);
    } else {
      this.buildItemForm(this.data.payload);
    }
  }
  buildItemForm(item) {
    this.itemForm = this.fb.group({
      Descripcion: [item.Descripcion || '', Validators.required],
      NombreCorto: [item.NombreCorto || '', Validators.required],
      Estado: [item.Estado || false, Validators.required]
    })
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }


}
