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
    /*  {
      value: "Aceptados",
      ID: "ACT"
    },
    {
      value: "Rechazados",
      ID: "RCH"
    },
    {
      value: "Cotizadas",
      ID: "COT"
    } */
  ];
  selEstado: any;
  File: any = [];
  datos: any = [];
  errors: Array<string> = []; //array de errores
  @Input() fileExt: string = "XLSX"; //extensiones aceptadas para ingreso
  @Input() maxFiles: number = 5; //máximo de imágenes aceptadas en drag and drop
  @Input() maxSize: number = 1; // 1MB
  FotoPerfil: any;
  constructor(
    private toolsService: ToolsService,
    private crudService: CrudService,
    public composeDialog: MatDialog,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {
    this.UploadFile = this.UploadFile.bind(this);
    this.Upload = this.Upload.bind(this);
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
      Estado: "BRR"
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

  UploadFile() {
    var input = document.createElement("input");
    input.type = "file";
    input.onchange = this.Upload;
    input.click();
  }

  Upload(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    let files = e.target.files;
    this.errors = []; // Clear error
    // Validate file size and allowed extensions
    if (files.length > 0 && !this.isValidFiles(files)) {
      return;
    }
    //
    if (files.length > 0) {
      reader.onloadend = () => {
        this.File = reader.result;
        /* console.log(this.File);
        try {
          this.File = this.File.replace(/data:image\/jpeg;base64,/g, "");
        } catch {}
        try {
          this.File = this.File.replace(/data:image\/png;base64,/g, "");
        } catch {}
        try {
          this.File = this.File.replace(/data:image\/gif;base64,/g, "");
        } catch {} */
        console.log(this.File);
        this.crudService.Insertar(this.File, 'cotizacionimport/',).subscribe(data => {
          this.snack.open('Registros Actualizados!', 'OK', { duration: 4000 });
          
        },
        error => {         
          this.snack.open('Registros Actualizados!', 'OK', { duration: 4000 });
        });  
      };
      reader.readAsDataURL(file);
    }
  }

  private isValidFiles(files) {
    // Check Number of files
    if (files.length > this.maxFiles) {
      this.errors.push(
        "Error: En un momento puedes subir solo " + this.maxFiles + " Imagenes"
      );
      this.snack.open(
        "Error: En un momento puedes subir solo " + this.maxFiles + " Imagenes",
        "OK",
        { duration: 4000 }
      );
      return;
    }
    this.isValidFileExtension(files);
    return this.errors.length === 0;
  }

  private isValidFileExtension(files) {
    // Make array of file extensions
    var extensions = this.fileExt.split(",").map(function(x) {
      return x.toLocaleUpperCase().trim();
    });
    for (var i = 0; i < files.length; i++) {
      // Get file extension
      var ext =
        files[i].name
          .toUpperCase()
          .split(".")
          .pop() || files[i].name;
      // Check the extension exists
      var exists = extensions.includes(ext);
      if (!exists) {
        this.errors.push("Error (Extensión): " + files[i].name);
        this.snack.open("Error (Extensión): " + files[i].name, "OK", {
          duration: 4000
        });
      }
      // Check file size
      this.isValidFileSize(files[i]);
    }
  }
  private isValidFileSize(file) {
    var fileSizeinMB = file.size / (1024 * 1000);
    var size = Math.round(fileSizeinMB * 100) / 100; // convert upto 2 decimal place
    if (size > this.maxSize) {
      this.errors.push(
        "Error (Tamaño del archivo): " +
          file.name +
          ": excede el límite de tamaño de archivo " +
          this.maxSize +
          "MB ( " +
          size +
          "MB )"
      );
      this.snack.open(
        "Error (Tamaño del archivo): " +
          file.name +
          ": excede el límite de tamaño de archivo " +
          this.maxSize +
          "MB ( " +
          size +
          "MB )",
        "OK",
        { duration: 4000 }
      );
    }
  }
}
