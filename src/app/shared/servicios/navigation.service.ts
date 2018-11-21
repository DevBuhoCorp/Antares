import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

interface IMenuItem {
  type: string,       // Possible values: link/dropDown/icon/separator/extLink
  name?: string,      // Used as display text for item and title for separator type
  state?: string,     // Router state  ruta
  icon?: string,      // Material icon name
  tooltip?: string,   // Tooltip text
  disabled?: boolean, // If true, item will not be appeared in sidenav.  estado
  sub?: IChildItem[], // Dropdown items   idpadre
  badges?: IBadge[]
}

interface IChildItem {
  type?: string,
  name: string,       // Display text
  state?: string,     // Router state
  icon?: string,
  sub?: IChildItem[]
}

interface IBadge {
  color: string;      // primary/accent/warn/hex color codes(#fff000)
  value: string;      // Display text
}

@Injectable()
export class NavigationService {
  constructor() {
  }


  iconMenu: IMenuItem[] = [
    {
      name: 'DASHBOARD',
      type: 'icon',
      tooltip: 'Dashboard',
      icon: 'dashboard',
      state: 'dashboard'
    },
    {
      type: 'separator',
      name: 'Items Principales'
    },
    {
      name: 'Catálogos',
      type: 'dropDown',
      icon: 'description',
      state: 'modulos/catalogos',
      sub: [
        {name: 'Área', state: 'area'},
        {name: 'Departamento', state: 'departamento'},
        {name: 'Contribuyente', state: 'contribuyente'},
        {name: 'Tipo Emisor', state: 'tipoemisor'},
        {name: 'Tipo Identifación', state: 'tipoidentificacion'},
      ]
    },
    {
      name: 'Nómina',
      type: 'dropDown',
      icon: 'person',
      state: 'modulos/nomina',
      sub: [
        {name: 'Usuario', state: 'usuario'},
        {name: 'Roles', state: 'roles'},
      ]
    },
    {
      name: 'Compras',
      type: 'dropDown',
      icon: 'person',
      state: 'modulos/compras',
      sub: [
        {name: 'Proveedor', state: 'proveedor'},
      ]
    },

  ];

  // Icon menu TITLE at the very top of navigation.
  // This title will appear if any icon type item is present in menu.
  iconTypeMenuTitle: string = 'Acceso frecuente';
  // sets iconMenu as default;
  menuItems = new BehaviorSubject<IMenuItem[]>(this.iconMenu);
  // navigation component has subscribed to this Observable
  menuItems$ = this.menuItems.asObservable();

  // Customizer component uses this method to change menu.
  // You can remove this method and customizer component.
  // Or you can customize this method to supply different menu for
  // different user type.

}
