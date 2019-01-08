import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/shared/servicios/crud.service';
import { ToolsService } from 'src/app/shared/servicios/tools.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-verocompra',
  templateUrl: './verocompra.component.html',
  styles: []
})
export class VerocompraComponent implements OnInit {
  IDOCompra:any;
  paginate:any=[];
  Total:any=0;
  constructor(
    private crudService: CrudService,
    private toolsService: ToolsService,
    private router: ActivatedRoute,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {
    this.router.params.subscribe(async params => {
      this.IDOCompra = params["id"];
      this.loadApp();
    });
  }

  async loadApp() {
    this.paginate = await this.crudService.SeleccionarAsync(
      "ordencompra/" + this.IDOCompra
    );
    this.paginate.forEach(i => {
      console.log(i);
      this.Total += i.Cantidad * i.Precio;
    });
    
  }
}
