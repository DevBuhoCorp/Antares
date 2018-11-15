import { Component, OnInit, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { ThemeService } from '../../servicios/theme.service';
import { LayoutService } from '../../servicios/layout.service';
import { TranslateService } from 'ng2-translate/ng2-translate';
import {MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import { CrudService } from '../../servicios/crud.service';
import { ToolsService } from '../../servicios/tools.service';

@Component({
  selector: 'app-header-side',
  templateUrl: './header-side.template.html'
})
export class HeaderSideComponent implements OnInit {
  @Input() notificPanel;
  currentLang = 'en';
  empresa: any;
  public availableLangs = [{
    name: 'English',
    code: 'en',
  }, {
    name: 'Spanish',
    code: 'es',
  }]
  public egretThemes;
  public layoutConf: any;
  DatosPersonales:any=[];
  constructor(
    private themeService: ThemeService,
    private layout: LayoutService,
    public translate: TranslateService,
    private renderer: Renderer2,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private crudService: CrudService,
    private toolsService: ToolsService
  ) { }
  async ngOnInit() {
    this.egretThemes = this.themeService.egretThemes;
    this.layoutConf = this.layout.layoutConf;
    /*this.empresa = JSON.parse(localStorage.getItem('Empresa')).Descripcion;
    this.DatosPersonales = await this.crudService.SeleccionarAsync("usuario/" + this.toolsService.getEmpresaActive().IDUsers);
    if (this.DatosPersonales[0].FotoPerfil) {
      this.DatosPersonales[0].FotoPerfil = 'data:image/jpeg;base64,' + this.DatosPersonales[0].FotoPerfil.replace(/,/g, '');
    }*/
  }
  setLang() {
    this.translate.use(this.currentLang)
  }
  changeTheme(theme) {
    this.themeService.changeTheme(this.renderer, theme);
  }
  toggleNotific() {
    this.notificPanel.toggle();
  }
  toggleSidenav() {
    if (this.layoutConf.sidebarStyle === 'closed') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      })
    }
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    })
  }

  toggleCollapse() {
    // compact --> full
    if (this.layoutConf.sidebarStyle === 'compact') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      }, { transitionClass: true })
    }

    // * --> compact
    this.layout.publishLayoutChange({
      sidebarStyle: 'compact'
    }, { transitionClass: true })

  }

  logout(){
    localStorage.clear();
  }

  /*cambiarEmpresa(){
    let dialogRef: MatDialogRef<any> = this.dialog.open(ChangeempresaComponent, {
      width: '720px',
      disableClose: true,
      data: { title: 'Seleccionar empresa a contabilizar', payload: {} }
    });
    dialogRef.afterClosed().subscribe(response => {
      location.reload();
    });
  }*/
}
