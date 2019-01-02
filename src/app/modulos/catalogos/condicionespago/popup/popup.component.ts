import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styles: []
})
export class PopupCondicionesPagoComponent implements OnInit {

  public itemForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<PopupCondicionesPagoComponent>,
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
      Etiqueta: [ item.Etiqueta || '', Validators.required ],
      NDias: [ item.NDias || '' ],
      Estado: [ item.Estado || true, Validators.required ]
    })
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }

}
