import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../../../../../shared/servicios/crud.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styles: []
})
export class AutorizarPopupComponent implements OnInit {
  public itemForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<AutorizarPopupComponent>,
              private fb: FormBuilder,
              ) { }

  ngOnInit() {
    this.buildItemForm(this.data.payload);
  }

  submit() {
    this.dialogRef.close(this.itemForm.value)
  }

  buildItemForm(item) {
    this.itemForm = this.fb.group({
      ObservacionAutorizacion: [item.ObservacionAutorizacion || '', Validators.required], 
    })
  }
}
