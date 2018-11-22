import {Component, OnInit} from '@angular/core';
import {CrudService} from '../../../shared/servicios/crud.service';
import {number} from '../../../../../node_modules/ng2-validation/dist/number';
import {MatSnackBar} from '@angular/material';
import {forEach} from '../../../../../node_modules/@angular/router/src/utils/collection';

@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.css'],
})
export class PresupuestoComponent implements OnInit {

  initMeses: any = [
    {
      'Mes': 'ENERO',
      'Precio': 0
    },
    {
      'Mes': 'FEBRERO',
      'Precio': 0
    },
    {
      'Mes': 'MARZO',
      'Precio': 0
    },
    {
      'Mes': 'ABRIL',
      'Precio': 0
    },
    {
      'Mes': 'MAYO',
      'Precio': 0
    },
    {
      'Mes': 'JUNIO',
      'Precio': 0
    },
    {
      'Mes': 'JULIO',
      'Precio': 0
    },
    {
      'Mes': 'AGOSTO',
      'Precio': 0
    },
    {
      'Mes': 'SEPTIEMBRE',
      'Precio': 0
    },
    {
      'Mes': 'OCTUBRE',
      'Precio': 0
    },
    {
      'Mes': 'NOVIEMBRE',
      'Precio': 0
    },
    {
      'Mes': 'DICIEMBRE',
      'Precio': 0
    }
  ];
  departamentos: any;
  anios: number[] = [];
  total: number;

  selDepartamento: any;
  selAnio: any;

  rowData: any = {
    OPedido: 0,
    OCompra: 0,
    PInicial: 0,
    Compras: 0,
  };

  constructor(
    private crudService: CrudService,
    private snack: MatSnackBar,
  ) {
  }

  ngOnInit() {
    this.departamentos = this.crudService.SeleccionarAsync('departamento_combo');
    let anioActual = (new Date()).getFullYear();
    for (let i = (new Date()).getFullYear() + 1; i >= anioActual - 5; i--) {
      this.anios.push(i);
    }

  }

  async loadData() {
    if (this.selAnio) {
      let data = await this.crudService.SeleccionarAsync(`presupuesto/${ this.selDepartamento }/${ this.selAnio }`);
      if (data['Row']) {
        this.rowData = data['extra'];
        this.initMeses = JSON.parse(data['Row']['Meses']);
        this.rowData.PInicial = this.initMeses.reduce((a, b) => a + b.Precio, 0);
      } else {
        this.snack.open('Sin presupuesto asignado', 'OK', {duration: 4000});
        this.rowData = {
          OPedido: 0,
          OCompra: 0,
          PInicial: 0,
          Compras: 0,
        };
        this.limpiarTable();
      }
    }


  }

  save() {
    let data = {
      IDDepartamento: this.selDepartamento,
      Anio: this.selAnio,
      Meses: JSON.stringify(this.initMeses),
      PresupuestoInicial: this.rowData.PInicial
    };
    this.crudService.Insertar(data, `presupuesto/${ this.selDepartamento }/${ this.selAnio }`)
      .subscribe(res => {
        this.snack.open('Presupuesto Actualizado', 'OK', {duration: 4000});
        this.limpiar();

      });
  }


  updateValue(event, cell, rowIndex) {
    this.initMeses[rowIndex][cell] = parseFloat(event.target.value);
    this.initMeses = [...this.initMeses];

    this.rowData.PInicial = this.initMeses.reduce((a, b) => a + b.Precio, 0);

  }

  private limpiar() {
    this.selDepartamento = this.selAnio = null;
    this.rowData = {
      OPedido: 0,
      OCompra: 0,
      PInicial: 0,
      Compras: 0,
    };
    this.limpiarTable();
  }

  private limpiarTable() {
    this.initMeses.forEach(row => {
      row.Precio = parseFloat('0');
    });
  }

}
