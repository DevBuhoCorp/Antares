import { Component, OnInit } from "@angular/core";
import { ToolsService } from "../../../../shared/servicios/tools.service";
import { CrudService } from "../../../../shared/servicios/crud.service";
import { MatSnackBar, MatDialogRef, MatDialog } from "@angular/material";
import { AutorizarPopupComponent } from "./popup/popup.component";

@Component({
  selector: "app-autorizar",
  templateUrl: "./autorizar.component.html",
  styles: []
})
export class AutorizarComponent implements OnInit {
  pageSize = this.toolsService.getPaginas();
  selPageSize: any = this.pageSize[0];
  paginate: any = {
    data: [],
    page: 1,
    total: 0,
    per_page: 0
  };
  constructor(
    private toolsService: ToolsService,
    private crudService: CrudService,
    private snack: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadApp();
  }

  async loadApp() {
    this.paginate = await this.crudService.SeleccionarAsync("opedido", {
      page: 1,
      psize: this.selPageSize,
      Estado: "ENV"
    });
    this.paginate.data = this.crudService.SetBool(this.paginate.data);
  }
  async setPage(event) {
    this.paginate = await this.crudService.SeleccionarAsync("opedido", {
      page: event.offset + 1,
      psize: this.selPageSize
    });
  }

  Autorizar(value, row) {
    if (value == "RCH") {
      let title = "Observación del Rechazo";
      let dialogRef: MatDialogRef<any> = this.dialog.open(
        AutorizarPopupComponent,
        {
          width: "720px",
          disableClose: true,
          data: { title: title, payload: {} }
        }
      );

      dialogRef.afterClosed().subscribe(response => {
        if (!response) return;
        else {
          row.Estado = value;
          row.ObservacionAutorizacion = response.ObservacionAutorizacion;
          this.crudService.Actualizar(row.ID, row, "opedido/").subscribe(
            async data => {
              this.snack.open("Transacción Finalizada!", "OK", {
                duration: 4000
              });
              this.loadApp();
            },
            error => {
              this.snack.open(error._body, "OK", { duration: 4000 });
            }
          );
        }
      });
    } else {
      row.Estado = value;
      this.crudService.Actualizar(row.ID, row, "opedido/").subscribe(
        async data => {
          this.snack.open("Transacción Finalizada!", "OK", {
            duration: 4000
          });
          this.loadApp();
        },
        error => {
          this.snack.open(error._body, "OK", { duration: 4000 });
        }
      );
    }
  }
}
