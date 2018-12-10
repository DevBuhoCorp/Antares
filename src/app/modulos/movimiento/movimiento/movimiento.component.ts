import {Component, OnInit} from '@angular/core';
import {CrudService} from '../../../shared/servicios/crud.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-movimiento',
  templateUrl: './movimiento.component.html',
  styles: []
})
export class MovimientoComponent implements OnInit {

  lsTipos: any[] = [
    {Value: 'I', Descripcion: 'Ingreso', Reverso: 'E'},
    {Value: 'E', Descripcion: 'Egreso', Reverso: 'I'},
  ];
  lsMovimientos: any;
  lsBodega: any;
  lsProductos: any = [];

  slBodega: any;
  slMovimiento: any;
  slTipo: any;
  slProductos: any = [];

  constructor(
    private snack: MatSnackBar,
    private crudService: CrudService) {
    this.slTipo = this.lsTipos[0];
  }

  ngOnInit() {
    this.lsBodega = this.crudService.SeleccionarAsync('usuario_bod');
  }

  loadMovimiento() {
    if (this.slTipo && this.slBodega)
      this.lsMovimientos = this.crudService.SeleccionarAsync('usuario_bod/tmovimiento', {
        Bodega: this.slBodega,
        Tipo: this.slTipo.Value
      });
  }

  getID(row) {
    return row.ID;
  }

  async loadProductosTipo() {

    this.loadMovimiento();
    switch (this.slTipo.Value) {
      case 'I':
        this.lsProductos = [];
        break;
      case 'E':
        if (this.slBodega)
          this.lsProductos = await this.crudService.SeleccionarAsync(`bodega_productos/${ this.slBodega }`);

        break;
    }
  }

  updateValue(event, cell, rowIndex) {
    let value = event.target.value;
    if (parseFloat(value) > this.lsProductos[rowIndex].Stock) {
      this.snack.open("Cantidad debe ser menor que el Stock", "OK", {
        duration: 4000
      });
      event.target.value = 0;
      // let textboxMultiple = this.cantidadMultiple.toArray();
      // textboxMultiple[rowIndex].nativeElement.value = null;
      // this.Pedidos[rowIndex][cell] = null;
      // this.Pedidos = [...this.Pedidos];
      return;
    }else{
      this.lsProductos[rowIndex][cell] = value;
      this.lsProductos = [...this.lsProductos];
    }
  }

  cancel() {

  }

  save() {

  }

}
