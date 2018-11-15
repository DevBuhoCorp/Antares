import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styles: []
})
export class PopupComponentRoles implements OnInit {
  public itemForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<PopupComponentRoles>,
              private fb: FormBuilder,) { }

  ngOnInit() {
    if (Array.isArray(this.data.payload)) {
      this.buildItemForm(this.data.payload[0]);
    } else {
      this.buildItemForm(this.data.payload);
    }
  }

  buildItemForm(item) {
    this.itemForm = this.fb.group({
      Descripcion: [item.Descripcion || '', Validators.compose([Validators.required, Validators.maxLength(45)])],
      Observacion: [item.Observacion || '', Validators.compose([Validators.required, Validators.maxLength(45)])],
      Estado: [item.Estado || false, Validators.required]
    })
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }

}
