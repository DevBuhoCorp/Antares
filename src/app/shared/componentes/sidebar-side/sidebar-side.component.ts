import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { NavigationService } from "../../servicios/navigation.service";
import { ThemeService } from '../../servicios/theme.service';
import { Subscription } from "rxjs";
import PerfectScrollbar from 'perfect-scrollbar';
import { CrudService } from '../../servicios/crud.service';
import { ToolsService } from '../../servicios/tools.service';

@Component({
  selector: 'app-sidebar-side',
  templateUrl: './sidebar-side.component.html'
})
export class SidebarSideComponent implements OnInit, OnDestroy, AfterViewInit {
  private sidebarPS: PerfectScrollbar;
  public menuItems: any[];
  public hasIconTypeMenuItem: boolean;
  public iconTypeMenuTitle: string;
  private menuItemsSub: Subscription;
  DatosPersonales:any=[];
  constructor(
    private navService: NavigationService,
    public themeService: ThemeService,
    private crudService: CrudService,
    private toolsService: ToolsService
  ) { }

  async ngOnInit() {
    this.iconTypeMenuTitle = this.navService.iconTypeMenuTitle;
    this.menuItemsSub = this.navService.menuItems$.subscribe(menuItem => {
      this.menuItems = menuItem;
      //Checks item list has any icon type.
      this.hasIconTypeMenuItem = !!this.menuItems.filter(item => item.type === 'icon').length;
    });
    /*this.DatosPersonales = await this.crudService.SeleccionarAsync("usuario/" + this.toolsService.getEmpresaActive().IDUsers);
    if (this.DatosPersonales[0].FotoPerfil) {
      this.DatosPersonales[0].FotoPerfil = 'data:image/jpeg;base64,' + this.DatosPersonales[0].FotoPerfil.replace(/,/g, '');
    }*/
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.sidebarPS = new PerfectScrollbar('#scroll-area', {
        suppressScrollX: true
      })
    })
  }
  ngOnDestroy() {
    if (this.sidebarPS) {
      this.sidebarPS.destroy();
    }
    if (this.menuItemsSub) {
      this.menuItemsSub.unsubscribe()
    }
  }

  logout(){
    localStorage.clear();
  }

}
