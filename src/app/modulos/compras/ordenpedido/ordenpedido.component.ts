import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ordenpedido',
  templateUrl: './ordenpedido.component.html',
  styleUrls: []
})
export class OrdenpedidoComponent implements OnInit {
  Pedidos: any = []
  Total: number = 0
  Fecha: any = new Date()
  constructor() { }

  ngOnInit() {
    this.Pedidos = []
    this.Total = 0
  }
  updateValue(event, cell, rowIndex) {
    this.Pedidos[rowIndex][cell] = event.target.value;
    this.Pedidos = [...this.Pedidos];
    console.log(this.Pedidos);
    this.Total = this.Pedidos.reduce((a, b) => a + parseFloat(b.Referencia), 0);
    //this.rowData.PInicial = this.initMeses.reduce((a, b) => a + b.Precio, 0);

  }
  agregar() {
    let nuevo = {
      'Cantidad': 0,
      'Descripcion': '',
      'Referencia': 0
    };
    this.Pedidos = this.Pedidos.concat(nuevo);
    //this.Total = this.Pedidos.reduce((a, b) => a + b.Referencia, 0);
    console.log(this.Pedidos);
  }

}
