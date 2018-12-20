import { Component, OnInit, Input } from "@angular/core";
import { ToolsService } from "src/app/shared/servicios/tools.service";
import { CrudService } from "src/app/shared/servicios/crud.service";
import { MatSnackBar, MatDialog, MatDialogRef } from "@angular/material";
import { FormBuilder } from "@angular/forms";
import { PopupemailComponent } from "./popupemail/popupemail.component";

@Component({
  selector: "app-listacotizacion",
  templateUrl: "./listacotizacion.component.html",
  styleUrls: []
})
export class ListaprovcotizacionComponent implements OnInit {
  pageSize = this.toolsService.getPaginas();
  selPageSize: any = this.pageSize[0];
  paginate: any = {
    data: [],
    page: 1,
    total: 0,
    per_page: 0
  };
  Estados: any = [
    {
      value: "Borrador",
      ID: "BRR"
    },
    {
      value: "Enviados",
      ID: "ENV"
    }
  ];
  Cotizacion: any;
  selEstado: any;
  
  constructor(
    private toolsService: ToolsService,
    private crudService: CrudService,
    public composeDialog: MatDialog,
    private dialog: MatDialog,
  ) {
    
  }

  ngOnInit() {
    // this.loadApp();
  }

  async loadApp() {
    this.paginate = await this.crudService.SeleccionarAsync("cotizacion", {
      page: 1,
      psize: this.selPageSize,
      Estado: this.selEstado
    });
  }

  async setPage(event) {
    this.paginate = await this.crudService.SeleccionarAsync("cotizacion", {
      page: event.offset + 1,
      psize: this.selPageSize,
      Estado: this.selEstado
    });
  }
  openComposeDialog(row) {
    /* let dialogRef = this.composeDialog.open(PopupemailComponent); */
    let dialogRef: MatDialogRef<any> = this.dialog.open(PopupemailComponent, {
      disableClose: true,
      data: { payload: row }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadApp();
    });
  }

 
}
