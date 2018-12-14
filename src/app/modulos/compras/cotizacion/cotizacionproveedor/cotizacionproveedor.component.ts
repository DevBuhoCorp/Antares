import { Component, OnInit, Input } from "@angular/core";
import { CrudService } from "src/app/shared/servicios/crud.service";
import { ToolsService } from "src/app/shared/servicios/tools.service";
import { ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-cotizacionproveedor",
  templateUrl: "./cotizacionproveedor.component.html",
  styles: []
})
export class CotizacionproveedorComponent implements OnInit {
  selProveedor: any;
  paginate: any = [];
  IDCotizacion: any;
  Proveedores: any = [];
  File: any = [];
  datos: any = [];
  errors: Array<string> = []; //array de errores
  @Input() fileExt: string = "XLSX"; //extensiones aceptadas para ingreso
  @Input() maxFiles: number = 5; //máximo de imágenes aceptadas en drag and drop
  @Input() maxSize: number = 1; // 1MB
  FotoPerfil: any;
  constructor(
    private crudService: CrudService,
    private toolsService: ToolsService,
    private router: ActivatedRoute,
    private snack: MatSnackBar
  ) {this.UploadFile = this.UploadFile.bind(this);
    this.Upload = this.Upload.bind(this);}

  ngOnInit() {
    this.router.params.subscribe(async params => {
      this.IDCotizacion = params["id"];
      this.loadCombo();
    });
  }

  async loadApp() {
    console.log(this.paginate);
    this.paginate = await this.crudService.SeleccionarAsync(
      "detallecotizacionprov/",
      { IDCotizacion: this.IDCotizacion, IDProveedor: this.selProveedor }
    );
  }

  async loadCombo() {
    this.Proveedores = await this.crudService.SeleccionarAsync(
      "combocotprov/" + this.IDCotizacion
    );
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
        try {
          this.File = this.File.replace(
            /data:application\/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,/g,
            ""
          );
        } catch {}

        let input = new FormData();
        input.append("IDCotizacion", this.IDCotizacion);
        input.append("file", file);
        input.append("IDProveedor", this.selProveedor);
        this.crudService.SendFile(input, "cotizacionimport/").subscribe(
          data => {
            this.snack.open("Registros Actualizados!", "OK", {
              duration: 4000
            });
            this.loadApp();
          },
          error => {
            console.log(error.error);
            this.snack.open(error.error, "OK", {
              duration: 4000
            });
          }
        );
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
