import {Component, OnInit, ViewChild} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {CrudService} from '../../../shared/servicios/crud.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-usuariotmovimiento',
  templateUrl: './usuariotmovimiento.component.html',
  styles: []
})
export class UsuariotmovimientoComponent implements OnInit {

  tipoMovimientos: any;
  selectedtipoMovimientos: any = [];

  usuarios: any;
  selUsuario: any;

  @ViewChild('MyDatatableComponent') ngxDatatable: DatatableComponent;

  constructor(
    private crudService : CrudService,
    private snack: MatSnackBar,
  ) { }

  async ngOnInit() {
    this.usuarios = this.crudService.SeleccionarAsync('users_combo');
    this.tipoMovimientos = await this.crudService.SeleccionarAsync('tipomovimiento_combo');
  }

  async loadTMovimiento(){
    let rows: any = await this.crudService.SeleccionarAsync(`usuariotmov/${ this.selUsuario }`);
    this.selectedtipoMovimientos = [...rows];
  }

  save(){
    let selected = this.ngxDatatable.selected.map(row =>  row.ID );

    this.crudService.Insertar( selected, `usuariotmov/${ this.selUsuario }` )
      .subscribe(res => {
        this.snack.open('Guardado!', 'OK', { duration: 4000 });
        this.cancel();
      });
  }

  getID( row ){
    return row.ID;
  }

  cancel(){
    this.selectedtipoMovimientos = this.ngxDatatable.selected = [];
    this.selUsuario = null;
  }

}
