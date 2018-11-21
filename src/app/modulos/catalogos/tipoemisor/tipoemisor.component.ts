import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {CrudService} from '../../../shared/servicios/crud.service';
import {AppLoaderService} from '../../../shared/servicios/app-loader/app-loader.service';
import {AppConfirmService} from '../../../shared/servicios/app-confirm/app-confirm.service';
import {Router} from '@angular/router';
import {ToolsService} from '../../../shared/servicios/tools.service';
import {PopupTipoIdentificacionComponent} from '../tipoidentificacion/popup/popup.component';
import {PopupTipoEmisorComponent} from './popup/popup.component';

@Component({
  selector: 'app-tipoemisor',
  templateUrl: './tipoemisor.component.html',
  styles: []
})
export class TipoemisorComponent implements OnInit {

  pageSize = this.toolsService.getPaginas();
  selPageSize : any = this.pageSize[0];
  paginate: any={
    data: [],
    page: 1,
    total: 0,
    per_page: 0
  };
  constructor(
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService : CrudService,
    private loader: AppLoaderService,
    private confirmService: AppConfirmService,
    private router:Router,
    private toolsService: ToolsService,) { }

  ngOnInit() {
    this.loadApp();
  }

  async loadApp(){
    this.paginate = await this.crudService.SeleccionarAsync('tipoemisor', { page: 1 , psize: this.selPageSize });
  }

  async setPage(event){
    this.paginate = await this.crudService.SeleccionarAsync('tipoemisor', { page: event.offset + 1 , psize: this.selPageSize });
  }

  deleteItem(item){
    this.confirmService.confirm({ message: `Eliminar ${ item.Descripcion }?` })
      .subscribe(res => {
        if (res) {
          this.loader.open();
          this.crudService.Eliminar(item.ID, 'tipoemisor/').subscribe(data => {
            this.loadApp();
            this.loader.close();
            this.snack.open('Eliminado!', 'OK', { duration: 4000 });
          });
        }
      });
  }

  async openPopUp(data: any = {}, isNew?){
    let title = isNew ? 'Agregar' : 'Actualizar';
    if (!isNew) {
      data = await this.crudService.SeleccionarAsync("tipoemisor/" + data.ID);
    }
    let dialogRef: MatDialogRef<any> = this.dialog.open(PopupTipoEmisorComponent, {
      width: '720px',
      disableClose: true,
      data: { title: title, payload: data }
    });

    dialogRef.afterClosed().subscribe(response => {
      if(!response)
        return;

      this.loader.open();
      if(isNew){
        this.crudService.Insertar(response, 'tipoemisor/').subscribe(data => {
          this.loadApp();
          this.loader.close();
          this.snack.open('Agregado!', 'OK', { duration: 4000 });
        });
      }
      else{
        this.crudService.Actualizar(data.ID, response, 'tipoemisor/')
          .subscribe(response2 => {
            this.loadApp();
            this.loader.close();
            this.snack.open('Actualizado!', 'OK', {duration: 4000});
          });
      }
    });
  }

}
