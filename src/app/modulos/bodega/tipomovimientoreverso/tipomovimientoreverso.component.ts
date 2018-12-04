import {Component, OnInit, ViewChild} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {CrudService} from '../../../shared/servicios/crud.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-tipomovimientoreverso',
  templateUrl: './tipomovimientoreverso.component.html',
  styles: []
})
export class TipomovimientoreversoComponent implements OnInit {

  slTipo: any;
  lsTipos: any[] = [
    { Value: 'I', Descripcion: 'Ingreso', Reverso: 'E' },
    { Value: 'E', Descripcion: 'Egreso', Reverso: 'I' },
    { Value: 'T', Descripcion: 'Transferencia', Reverso: 'T' },
  ];

  tipoMovimientos: any;
  CbTipoMovimientos: any;
  slTipoMovimiento: any;
  tipoMovimientosReverso: any = [];
  selectedtipoMovimientosReverso: any = [];

  @ViewChild('MyDatatableComponent') ngxDatatable: DatatableComponent;

  constructor(
    private crudService : CrudService,
    private snack: MatSnackBar,
  ) { }

  async ngOnInit() {
    this.tipoMovimientos = await this.crudService.SeleccionarAsync('tipomovimiento_combo');
  }

  loadTMovimiento(){
    this.CbTipoMovimientos = this.tipoMovimientos.filter(item => item.Tipo == this.slTipo.Value);
    this.tipoMovimientosReverso = this.tipoMovimientos.filter(item => item.Tipo == this.slTipo.Reverso);
    this.cancel();
  }
  async loadTMovimientoReverso(){
    let rows: any = await this.crudService.SeleccionarAsync(`tipomovimiento/reverso/${ this.slTipoMovimiento }`);
    this.selectedtipoMovimientosReverso = [...rows];
  }

  save(){
    let selected = this.ngxDatatable.selected.map(row =>  row.ID );

    this.crudService.Insertar( selected, `tipomovimiento/reverso/${ this.slTipoMovimiento }` )
      .subscribe(res => {
        this.snack.open('Guardado!', 'OK', { duration: 4000 });
        this.cancel();
      });
  }

  getID( row ){
    return row.ID;
  }

  cancel(){
    this.selectedtipoMovimientosReverso = this.ngxDatatable.selected = [];
    this.slTipoMovimiento = null;
  }

}
