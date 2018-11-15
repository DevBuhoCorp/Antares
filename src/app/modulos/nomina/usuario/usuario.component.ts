import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {CrudService} from '../../../shared/servicios/crud.service';
import {AppLoaderService} from '../../../shared/servicios/app-loader/app-loader.service';
import {AppConfirmService} from '../../../shared/servicios/app-confirm/app-confirm.service';
import { PopupComponentUser } from '../usuario/popup/popup.component';
import {UsersempresaComponent} from './usersempresa/usersempresa.component';
import { ToolsService } from '../../../shared/servicios/tools.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {
  pageSize = this.toolsService.getPaginas(); 
  selPageSize: any = this.pageSize[0];
  items: any = {
    data: [],
    page: 1,
    total: 0,
    per_page: 0
  };
  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: CrudService,
    private loader: AppLoaderService,
    private confirmService: AppConfirmService,
    private toolsService: ToolsService
  ) { }

  ngOnInit() {
    this.getItems(1);
  }

  async getItems(indice) {
    this.items = await this.crudService.SeleccionarAsync("usuario", { page: indice, psize: this.selPageSize });
    this.items.data = this.crudService.SetBool(this.items.data);
  }

  async openPopUp(data: any = {}, isNew?) {

    const title = isNew ? 'Agregar' : 'Actualizar';
    if (!isNew)
    {
      data = await this.crudService.SeleccionarAsync("usuario/" + data.ID);
      data =  this.crudService.SetBool(data);
    }
    const dialogRef: MatDialogRef<any> = this.dialog.open(PopupComponentUser, {
      width: '720px',
      disableClose: true,
      data: { title: title, payload: data }
    });
    dialogRef.afterClosed()
      .subscribe(res => {
        if (!res) {
          // If user press cancel
          return;
        }
        this.loader.open();
        if (isNew) {
          this.crudService.Insertar(res, 'usuario/').subscribe(data => {
            this.getItems(1);
            this.loader.close();
            this.snack.open('Agregado!', 'OK', { duration: 4000 });
          },
          error => {
            this.loader.close();
            this.snack.open('Correo Duplicado!', 'OK', { duration: 4000 });
          })
        } else {
          this.crudService.Actualizar(data[0].ID, res, 'usuario/' + data[0].IDUser + '/').subscribe(data => {
            this.getItems(1);
            this.loader.close();
            this.snack.open('Actualizado!', 'OK', { duration: 4000 });
          },
          error => {
            this.getItems(1);
            this.loader.close();           
            this.snack.open('Actualizado!', 'OK', { duration: 4000 });
          })
        }
      });
  }

  deleteItem(row) {
    this.confirmService.confirm({ message: `Eliminar ${row.ApellidoPaterno + ' ' + row.NombrePrimer}?` })
      .subscribe(res => {
        if (res) {
          this.loader.open();
          this.crudService.Eliminar(row.ID, "usuario/").subscribe(data => {
            this.getItems(1);
            this.loader.close();
            this.snack.open('Eliminado!', 'OK', { duration: 4000 })
          })
        }
      })

  }

  usersEmpresa(row){
    const dialogRef: MatDialogRef<any> = this.dialog.open(UsersempresaComponent, {
      width: '720px',
      disableClose: true,
      data: { title: 'Asignar Empresa', usuario: row.IDUser }
    });
  }

  setPage(event) {
    this.getItems(event.offset + 1);
  }

}
