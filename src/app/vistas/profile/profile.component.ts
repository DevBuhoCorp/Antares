import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { CrudService } from '../../shared/servicios/crud.service';
import { ToolsService } from '../../shared/servicios/tools.service';
import { MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  activeView: string = 'overview';

  // Doughnut
  doughnutChartColors: any[] = [{
    backgroundColor: ['#fff', 'rgba(0, 0, 0, .24)',]
  }];

  total1: number = 500;
  data1: number = 200;
  doughnutChartData1: number[] = [this.data1, (this.total1 - this.data1)];

  total2: number = 1000;
  data2: number = 400;
  doughnutChartData2: number[] = [this.data2, (this.total2 - this.data2)];

  doughnutChartType = 'doughnut';
  doughnutOptions: any = {
    cutoutPercentage: 85,
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      display: false,
      position: 'bottom'
    },
    elements: {
      arc: {
        borderWidth: 0,
      }
    },
    tooltips: {
      enabled: false
    }
  };
  DatosPersonales: any = [];
  datos: any = [];
  errors: Array<string> = [];//array de errores
  @Input() fileExt: string = "JPG,PNG,GIF";//extensiones aceptadas para ingreso
  @Input() maxFiles: number = 5;//máximo de imágenes aceptadas en drag and drop
  @Input() maxSize: number = 1; // 1MB
  FotoPerfil: any;
  constructor(private router: ActivatedRoute, private crudService: CrudService, private toolsService: ToolsService, private snack: MatSnackBar, private _sanitizer: DomSanitizer) {
    this.FPerfilChange = this.FPerfilChange.bind(this);
    this.FPerfilClick = this.FPerfilClick.bind(this);
  }

  async ngOnInit() {
    this.activeView = this.router.snapshot.params['view']
    /*this.DatosPersonales = await this.crudService.SeleccionarAsync("usuario/" + this.toolsService.getEmpresaActive().IDUsers);
    this.datos = this.DatosPersonales;
    if (this.DatosPersonales[0].FotoPerfil) {
      this.DatosPersonales[0].FotoPerfil = 'data:image/jpeg;base64,' + this.DatosPersonales[0].FotoPerfil.replace(/,/g, '');
      this.FotoPerfil = this.DatosPersonales[0].FotoPerfil;
    }*/


  }
  FPerfilClick() {
    var input = document.createElement("input");
    input.type = "file";
    input.onchange = this.FPerfilChange;
    input.click();
  }

  FPerfilChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    let files = e.target.files;
    this.errors = []; // Clear error
    // Validate file size and allowed extensions
    if (files.length > 0 && (!this.isValidFiles(files))) {
      return;
    }
    //
    if (files.length > 0) {
      reader.onloadend = () => {

        this.DatosPersonales[0].FotoPerfil = reader.result;
        try {
          this.DatosPersonales[0].FotoPerfil = this.DatosPersonales[0].FotoPerfil.replace(/data:image\/jpeg;base64,/g, '');
        }
        catch{ }
        try {
          this.DatosPersonales[0].FotoPerfil = this.DatosPersonales[0].FotoPerfil.replace(/data:image\/png;base64,/g, '');
        }
        catch{ }
        try {
          this.DatosPersonales[0].FotoPerfil = this.DatosPersonales[0].FotoPerfil.replace(/data:image\/gif;base64,/g, '');
        }
        catch{ }
        this.crudService.Actualizar(this.datos[0].ID, this.datos[0], 'usuario/' + this.datos[0].IDUser + '/',).subscribe(data => {
          this.snack.open('Registros Actualizados!', 'OK', { duration: 4000 });
          this.FotoPerfil = 'data:image/jpeg;base64,' + this.DatosPersonales[0].FotoPerfil.replace(/,/g, '');
          this.DatosPersonales[0].FotoPerfil = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + this.DatosPersonales[0].FotoPerfil.replace(/,/g, ''));
        },
        error => {         
          this.snack.open('Registros Actualizados!', 'OK', { duration: 4000 });
          this.FotoPerfil = 'data:image/jpeg;base64,' + this.DatosPersonales[0].FotoPerfil.replace(/,/g, '');
          this.DatosPersonales[0].FotoPerfil = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,' + this.DatosPersonales[0].FotoPerfil.replace(/,/g, ''));
          location.reload();
        });
      }
      reader.readAsDataURL(file);
    }
  }

  private isValidFiles(files) {
    // Check Number of files
    if (files.length > this.maxFiles) {
      this.errors.push("Error: En un momento puedes subir solo " + this.maxFiles + " Imagenes");
      this.snack.open("Error: En un momento puedes subir solo " + this.maxFiles + " Imagenes", 'OK', { duration: 4000 });
      return;
    }
    this.isValidFileExtension(files);
    return this.errors.length === 0;
  }

  private isValidFileExtension(files) {
    // Make array of file extensions
    var extensions = (this.fileExt.split(','))
      .map(function (x) { return x.toLocaleUpperCase().trim() });
    for (var i = 0; i < files.length; i++) {
      // Get file extension
      var ext = files[i].name.toUpperCase().split('.').pop() || files[i].name;
      // Check the extension exists
      var exists = extensions.includes(ext);
      if (!exists) {
        this.errors.push("Error (Extensión): " + files[i].name);
        this.snack.open("Error (Extensión): " + files[i].name, 'OK', { duration: 4000 });
      }
      // Check file size
      this.isValidFileSize(files[i]);
    }
  }
  private isValidFileSize(file) {
    var fileSizeinMB = file.size / (1024 * 1000);
    var size = Math.round(fileSizeinMB * 100) / 100; // convert upto 2 decimal place
    if (size > this.maxSize) {
      this.errors.push("Error (Tamaño del archivo): " + file.name + ": excede el límite de tamaño de archivo " + this.maxSize + "MB ( " + size + "MB )");
      this.snack.open("Error (Tamaño del archivo): " + file.name + ": excede el límite de tamaño de archivo " + this.maxSize + "MB ( " + size + "MB )", 'OK', { duration: 4000 });
      
    }
  }

}
