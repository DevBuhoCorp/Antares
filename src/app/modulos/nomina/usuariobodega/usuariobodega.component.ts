import {Component, OnInit, ViewChild} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {CrudService} from '../../../shared/servicios/crud.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-usuariobodega',
  templateUrl: './usuariobodega.component.html',
  styles: []
})
export class UsuariobodegaComponent implements OnInit {

  bodegas: any;
  selectedBodegas: any = [];

  usuarios: any;
  selUsuario: any;

  @ViewChild('MyDatatableComponent') ngxDatatable: DatatableComponent;

  constructor(
    private crudService : CrudService,
    private snack: MatSnackBar,
  ) { }

  async ngOnInit() {
    this.usuarios = this.crudService.SeleccionarAsync('users_combo');
    this.bodegas = await this.crudService.SeleccionarAsync('bodega_list');
  }

  async loadTMovimiento(){
    let rows: any = await this.crudService.SeleccionarAsync(`usuario_bod/${ this.selUsuario }`);
    this.selectedBodegas = [...rows];
  }

  save(){
    let selected = this.ngxDatatable.selected.map(row =>  row.ID );

    this.crudService.Insertar( selected, `usuario_bod/${ this.selUsuario }` )
      .subscribe(res => {
        this.snack.open('Guardado!', 'OK', { duration: 4000 });
        this.cancel();
      });
  }

  getID( row ){
    return row.ID;
  }

  cancel(){
    this.selectedBodegas = this.ngxDatatable.selected = [];
    this.selUsuario = null;
  }

}
