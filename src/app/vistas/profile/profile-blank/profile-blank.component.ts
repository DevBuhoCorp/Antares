import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-profile-blank',
  templateUrl: './profile-blank.component.html',
  styles: []
})
export class ProfileBlankComponent implements OnInit {
  public itemForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ProfileBlankComponent>,
    private fb: FormBuilder, ) { }

  ngOnInit() {
    if (Array.isArray(this.data.payload)) {
      this.buildItemForm(this.data.payload[0]);
    } else {
      this.buildItemForm(this.data.payload);
    }
  }

  buildItemForm(item) {
    this.itemForm = this.fb.group({
      OldPass: [item.OldPass || '', Validators.required],
      NewPass: [item.NewPass || '', Validators.required],

    })
  }

  submit() {
    console.log(this.itemForm.value);
    this.dialogRef.close(this.itemForm.value)
  }

}
