import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { CrudService } from '../../../shared/servicios/crud.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ToolsService } from '../../../shared/servicios/tools.service';
import { MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';
import { AppLoaderService } from '../../../shared/servicios/app-loader/app-loader.service';
import { ProfileBlankComponent } from '../profile-blank/profile-blank.component';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: []
})
export class ProfileSettingsComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({ url: 'upload_url' });
  public hasBaseDropZoneOver: boolean = false;
  DatosUsuario: any = [];
  items: any = [];
  public itemForm: FormGroup;
  constructor(private crudService: CrudService, private fb: FormBuilder, private toolService: ToolsService, private snack: MatSnackBar,
    private dialog: MatDialog,
    private loader: AppLoaderService, ) { }

  async ngOnInit() {
   /* this.items = await this.crudService.SeleccionarAsync("usuario/" + this.toolService.getEmpresaActive().IDUsers);
    this.buildItemForm(this.items[0]);*/
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
      IDRol: [item.IDRol || '', Validators.required],
      Estado: [item.Estado || '', Validators.required],
    });

  }
  submit() {
    this.crudService.Actualizar(this.items[0].ID, this.itemForm.value, 'usuario/' + this.items[0].IDUser + '/').subscribe(data => {
      this.snack.open('Actualizado!', 'OK', { duration: 4000 });
    },
      error => {
        this.snack.open('Actualizado!', 'OK', { duration: 4000 });
      })
  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  async openPopUp(data: any = {}, isNew?) {
    let dialogRef: MatDialogRef<any> = this.dialog.open(ProfileBlankComponent, {
      width: '720px',
      disableClose: true,
      data: { payload: data }
    });

    dialogRef.afterClosed().subscribe(response => {
      if (!response)
        return;
      else {
        this.crudService.Actualizar(this.toolService.getEmpresaActive().IDUsers, response, 'changepass/')
          .subscribe(response2 => {
            console.log(response2); 
            if (response2) {
              localStorage.clear();
              location.reload();
            }
            else{
              this.snack.open('Error Contraseña!', 'OK', { duration: 4000 });
            }

          });
      }
    });
  }

}
