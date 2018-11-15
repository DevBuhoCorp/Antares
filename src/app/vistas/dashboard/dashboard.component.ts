import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../shared/servicios/crud.service';
import { ToolsService } from '../../shared/servicios/tools.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.template.html'
})
export class DashboardComponent implements OnInit {
  /*
   * Line Chart Options
   */
  sharedChartOptions: any = {
    responsive: true,
    // maintainAspectRatio: false,
    legend: {
      display: false,
      position: 'bottom'
    }
  };
  chartColors: Array<any> = [{
    backgroundColor: '#3f51b5',
    borderColor: '#3f51b5',
    pointBackgroundColor: '#3f51b5',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }, {
    backgroundColor: '#eeeeee',
    borderColor: '#e0e0e0',
    pointBackgroundColor: '#e0e0e0',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(77,83,96,1)'
  },
    {
    backgroundColor: 'rgba(148,159,177,0.2)',
    borderColor: 'rgba(148,159,177,1)',
    pointBackgroundColor: 'rgba(148,159,177,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0.8)'
  }];
  lineChartData: Array<any> = [{
    data: [],
    borderWidth: 1
  }];
  
  barChartData: any[] = [{
    data: [],
    borderWidth: 0
  }];
  
  lineChartLabels: any = [];
  barChartLabels: any[] = [];
  lineChartOptions: any = Object.assign({
    animation: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        }
      }],
      yAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        },
        ticks: {
          beginAtZero: true,
          suggestedMax: 9,
        }
      }]
    }
  }, this.sharedChartOptions);
  public lineChartLegend: boolean = false;
  public lineChartType: string = 'line';
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartOptions: any = Object.assign({
    scaleShowVerticalLines: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        }
      }],
      yAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        },
        position: 'left',
        ticks: {
          beginAtZero: true,
          suggestedMax: 9
        }
      }]
    }
  }, this.sharedChartOptions);
  lineChartPointsData: Array<any> = [{
    data: [6, 5, 8, 8, 5, 5, 4],
    label: 'Series A',
    borderWidth: 1,
    fill: false,
    pointRadius: 10,
    pointHoverRadius: 15,
    showLine: false
  }, {
    data: [5, 4, 4, 2, 6, 2, 5],
    label: 'Series B',
    borderWidth: 1,
    fill: false,
    pointRadius: 10,
    pointHoverRadius: 15,
    showLine: false
  }];
  lineChartPointsOptions: any = Object.assign({
    scales: {
      xAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        }
      }],
      yAxes: [{
        gridLines: {
          color: 'rgba(0,0,0,0.02)',
          zeroLineColor: 'rgba(0,0,0,0.02)'
        },
        ticks: {
          beginAtZero: true,
          suggestedMax: 9,
        }
      }]
    },
    elements: {
      point: {
        pointStyle: 'rectRot',
      }
    }
  }, this.sharedChartOptions);
  topcuentas: any = [];
  top: number;
  topm: number;
  totales: any = [];
  porcentaje: number;
  movimientos:any=[];
  constructor(private crudService: CrudService, private toolsService: ToolsService) { }
  ngOnInit() {
    /*this.gettrans();
    this.gettopcuentas();
    this.getporcentaje();
    this.getmovimiento();*/
  }
  async gettrans() {
    let clone = JSON.parse(JSON.stringify(this.lineChartData));
    let datos: any = await this.crudService.SeleccionarAsync("transpormes/" + this.toolsService.getEmpresaActive().IDEmpresa);
    this.lineChartData = datos.map(i => {
      clone[0].data.push(i.data);
      this.lineChartLabels.push(i.label);
    })
    this.lineChartData = clone
  }

  async gettopcuentas() {
    this.topcuentas = await this.crudService.SeleccionarAsync("topcuentas/" + this.toolsService.getEmpresaActive().IDEmpresa);
    this.top = this.topcuentas[0].Saldo;
  }
  async getporcentaje() {
    try{
    this.totales = await this.crudService.SeleccionarAsync("porcentaje/" + this.toolsService.getEmpresaActive().IDEmpresa);
    this.porcentaje = (this.totales[1].data - this.totales[0].data) * 100 / this.totales[0].data;
    }
    catch{}
    
  }
  async getmovimiento() {
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    let datos: any = await this.crudService.SeleccionarAsync("movimiento/" + this.toolsService.getEmpresaActive().IDEmpresa);
    this.barChartData = datos.map(i => {
      clone[0].data.push(i.data);
      this.barChartLabels.push(i.label);
    })
    this.barChartData = clone
  }
}
