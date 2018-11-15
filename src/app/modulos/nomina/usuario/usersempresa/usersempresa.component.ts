import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {CrudService} from '../../../../shared/servicios/crud.service';
import {FormBuilder} from '@angular/forms';
import {DateAdapter} from '../../../../../../node_modules/@angular/material/core';
import {forEach} from '../../../../../../node_modules/@angular/router/src/utils/collection';

@Component({
  selector: 'app-usersempresa',
  templateUrl: './usersempresa.component.html',
  styles: []
})
export class UsersempresaComponent implements OnInit {

  empresas: any;
  selectEmpresa: any;
  userEmpresa: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private crudService: CrudService,
    private snack: MatSnackBar,
    public dialogRef: MatDialogRef<UsersempresaComponent>,
    private adapter: DateAdapter<any>
  ) {
  }

  async ngOnInit() {
    this.empresas = await this.crudService.SeleccionarAsync('comboempresa');
    this.userEmpresa = await this.crudService.SeleccionarAsync(`usuario/${ this.data.usuario }/empresa`);
  }

  save(){
    this.crudService.Insertar(this.userEmpresa,`usuario/${ this.data.usuario }/empresa`).subscribe(res => {
      this.dialogRef.close(false);
      this.snack.open('Operación Finalizada!', 'OK', { duration: 4000 });
    });
  }

  addList() {
    let cant = this.userEmpresa.filter(data => data.IDEmpresa == this.selectEmpresa);
    if (cant.length == 0) {
      let data = this.empresas.filter(row => row.ID == this.selectEmpresa)[0];
      this.userEmpresa.push({
        ID: 0,
        IDEmpresa: data.ID,
        IDUsers: this.data.usuario,
        Descripcion: data.Descripcion,
        Estado: 'ACT'
      });
    }
  }

  removeList(data) {
    data.Estado = 'INA';
  }

  reAddList(data) {
    data.Estado = 'ACT';
  }

}
