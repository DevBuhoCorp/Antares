import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, MatDialogRef } from '@angular/material';
import { CrudService } from 'src/app/shared/servicios/crud.service';
import { AppLoaderService } from 'src/app/shared/servicios/app-loader/app-loader.service';
import { AppConfirmService } from 'src/app/shared/servicios/app-confirm/app-confirm.service';
import { ToolsService } from 'src/app/shared/servicios/tools.service';
import { PopupFormasPagoComponent } from './popup/popup.component';

@Component({
  selector: 'app-formaspago',
  templateUrl: './formaspago.component.html',
  styles: []
})
export class FormaspagoComponent implements OnInit {
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
    private toolsService: ToolsService,) { }

  ngOnInit() {
    this.loadApp();
  }

  async loadApp(){
    this.paginate = await this.crudService.SeleccionarAsync('modospago', { page: 1 , psize: this.selPageSize });
    this.paginate.data = this.crudService.SetBool(this.paginate.data);

  }

  async setPage(event){
    this.paginate = await this.crudService.SeleccionarAsync('modospago', { page: event.offset + 1 , psize: this.selPageSize });
    this.paginate.data = this.crudService.SetBool(this.paginate.data);
  }

  deleteItem(item){
    this.confirmService.confirm({ message: `Eliminar ${ item.Etiqueta }?` })
      .subscribe(res => {
        if (res) {
          this.loader.open();
          this.crudService.Eliminar(item.ID, 'modospago/').subscribe(data => {
            this.loadApp();
            this.loader.close();
            this.snack.open('Eliminado!', 'OK', { duration: 4000 });
          });
        }
      });
  }

  async openPopUp(isNew: boolean = true, data: any = {}){
    let title = isNew ? 'Agregar' : 'Actualizar';
    if (!isNew) {
      data = await this.crudService.SeleccionarAsync("modospago/" + data.ID);
    }

    let dialogRef: MatDialogRef<any> = this.dialog.open(PopupFormasPagoComponent, {
      width: '720px',
      disableClose: true,
      data: { title: title, payload: data }
    });

    dialogRef.afterClosed().subscribe(response => {
      if(!response)
        return;

      this.loader.open();
      if(isNew){
        this.crudService.Insertar(response, 'modospago/').subscribe(data => {
          this.loadApp();
          this.loader.close();
          this.snack.open('Agregado!', 'OK', { duration: 4000 });
        });
      }
      else{
        this.crudService.Actualizar(data.ID, response, 'modospago/')
          .subscribe(response2 => {
            this.loadApp();
            this.loader.close();
            this.snack.open('Actualizado!', 'OK', {duration: 4000});
          });
      }
    });
  }

}