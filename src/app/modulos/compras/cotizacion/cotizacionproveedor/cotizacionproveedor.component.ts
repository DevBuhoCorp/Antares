import { Component, OnInit, Input, ViewChildren } from "@angular/core";
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
  @ViewChildren("checkboxMultiple") private checkboxesMultiple: any;
  @ViewChildren("textboxMultiple") private textboxMultiple: any;
  @ViewChildren("cantidadMultiple") private cantidadMultiple: any;
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

  updateValue(event, cell, rowIndex) {
    let bandera = false;
    if (cell == "Etiqueta") {
      this.paginate.forEach(i => {
        if (i.Etiqueta == event.target.value) {
          bandera = true;
          return;
        }
      });
    }
    if (cell == "Cantidad" ) {
      if (parseFloat(event.target.value) <= 0 || !parseFloat(event.target.value)) {
        this.snack.open("Registre una Cantidad Correcta", "OK", {
          duration: 4000
        });
        let cantidadMultiple = this.cantidadMultiple.toArray();
        cantidadMultiple[rowIndex].nativeElement.value = null;
        this.paginate[rowIndex][cell] = null;
        this.paginate = [...this.paginate];
        return;
      }
    }

    if (cell == "Precio"  ) {
      if (parseFloat(event.target.value) <= 0 || !parseFloat(event.target.value)) {
        this.snack.open("Registre una Cantidad Correcta", "OK", {
          duration: 4000
        });
        
        this.paginate[rowIndex][cell] = null;
        this.paginate = [...this.paginate];
        return;
      }
    }
    
    if (!bandera) {
      this.paginate[rowIndex][cell] = event.target.value;
      this.paginate[rowIndex]["Saldo"] =
        parseFloat(this.paginate[rowIndex]["Cantidad"]) *
        parseFloat(this.paginate[rowIndex]["Precio"]);

      this.paginate = [...this.paginate];
      
    } else {
      let textboxMultiple = this.textboxMultiple.toArray();
      textboxMultiple[rowIndex].nativeElement.value = null;
      this.paginate[rowIndex][cell] = null;
      this.paginate = [...this.paginate];
      this.snack.open("Dato Incorrecto, Ingrese Otro", "OK", {
        duration: 4000
      });
    }
    
    
  }
  updateValueCheck(event, cell, rowIndex) {
    this.paginate[rowIndex][cell] = event.checked;
    this.paginate = [...this.paginate];
  }
  agregar() {
    const nuevo = {
      Etiqueta: null,
      CantidadDeseada: null,
      Cantidad: null,
      Precio: null,      
    };

    this.paginate = this.paginate.concat(nuevo);
  }

  eliminar() {
    let count = 0;
    let checkboxesArray = this.checkboxesMultiple.toArray();
    let nuevo = this.paginate.filter(function seleccionado(i) {
      checkboxesArray[count].checked = false;
      count++;
      if (!i.Seleccionar) {
        return i;
      }
    });
    this.paginate = [...nuevo];
  }

  save() {
    let bandera = false;
    this.paginate.forEach(i => {
      if (i.Cantidad == null || !parseFloat(i.Cantidad) || !parseFloat(i.Precio)) {
        bandera = true;
        return;
      }
    });
    if (!bandera) {
      this.crudService
        .Insertar(this.paginate, "detallecotizacionprov/")
        .subscribe(res => {
          this.snack.open("Cotización Actualizada", "OK", {
            duration: 4000
          });
        });
    } else {
      this.snack.open(
        "Cotización Incorrecta, Revise que todos los datos estén correctos",
        "OK",
        { duration: 4000 }
      );
    }
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
        input.append("Nombre", file.name);
        this.crudService.SendFile(input, "cotizacionimport/").subscribe(
          data => {
            this.snack.open("Registros Actualizados!", "OK", {
              duration: 4000
            });
            this.loadApp();
          },
          error => {
            console.log(error);
            this.snack.open(error._body, "OK", {
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
