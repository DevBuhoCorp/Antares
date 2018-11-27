import {Component, OnInit, ViewChild} from '@angular/core';
import {CrudService} from '../../../shared/servicios/crud.service';
import {MatSnackBar} from '@angular/material';
import {DatatableComponent} from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-bodegatmovimiento',
  templateUrl: './bodegatmovimiento.component.html',
  styles: []
})
export class BodegatmovimientoComponent implements OnInit {

  tipoMovimientos: any;
  selectedtipoMovimientos: any = [];

  bodegas: any;
  selBodega: any;

  @ViewChild('MyDatatableComponent') ngxDatatable: DatatableComponent;

  constructor(
    private crudService : CrudService,
    private snack: MatSnackBar,
  ) { }

  async ngOnInit() {
    this.bodegas = this.crudService.SeleccionarAsync('bodega_combo');
    this.tipoMovimientos = await this.crudService.SeleccionarAsync('tipomovimiento_combo');
  }

  async loadTMovimiento(){
    let rows = await this.crudService.SeleccionarAsync(`bodegatmov/${ this.selBodega }`);
    this.selectedtipoMovimientos = rows;
  }

  save(){
    let selected = this.selectedtipoMovimientos.map(row =>  row.ID );
    this.crudService.Insertar( selected, `bodegatmov/${ this.selBodega }` )
      .subscribe(res => {
        this.snack.open('Guardado!', 'OK', { duration: 4000 });
      });
  }

  getID( row ){
    return row.ID;
  }

  cancel(){
    this.selectedtipoMovimientos = [];
    this.selBodega = null;
  }

}
