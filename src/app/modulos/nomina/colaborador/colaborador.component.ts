import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { CrudService } from '../../../shared/servicios/crud.service';
import { AppLoaderService } from '../../../shared/servicios/app-loader/app-loader.service';
import { AppConfirmService } from '../../../shared/servicios/app-confirm/app-confirm.service';
import { Router } from '@angular/router';
import { ToolsService } from '../../../shared/servicios/tools.service';
import { ColaboradorPopupComponent } from './popup/popup.component';

@Component({
  selector: 'app-colaborador',
  templateUrl: './colaborador.component.html',
  styles: []
})
export class ColaboradorComponent implements OnInit {
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
    this.paginate = await this.crudService.SeleccionarAsync('colaborador', { page: 1 , psize: this.selPageSize });
  }

  async setPage(event){
    this.paginate = await this.crudService.SeleccionarAsync('colaborador', { page: event.offset + 1 , psize: this.selPageSize });
  }

  deleteItem(item){
    this.confirmService.confirm({ message: `Eliminar ${ item.Nombre }?` })
      .subscribe(res => {
        if (res) {
          this.loader.open();
          this.crudService.Eliminar(item.ID, 'colaborador/').subscribe(data => {
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
      data = await this.crudService.SeleccionarAsync("colaborador/" + data.ID);
    }
    let dialogRef: MatDialogRef<any> = this.dialog.open(ColaboradorPopupComponent, {
      width: '720px',
      disableClose: true,
      data: { title: title, payload: data }
    });

    dialogRef.afterClosed().subscribe(response => {
      if(!response)
        return;

      this.loader.open();
      if(isNew){
        this.crudService.Insertar(response, 'colaborador/').subscribe(data => {
          this.loadApp();
          this.loader.close();
          this.snack.open('Agregado!', 'OK', { duration: 4000 });
        });
      }
      else{
        this.crudService.Actualizar(data.ID, response, 'colaborador/')
          .subscribe(response2 => {
            this.loadApp();
            this.loader.close();
            this.snack.open('Actualizado!', 'OK', {duration: 4000});
          });
      }
    });
  }

}

