import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

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
      name: 'Nómina',
      type: 'dropDown',
      icon: 'person',
      state: 'modulos/nomina',
      sub: [
        { name: 'Usuario', state: 'usuario' },
        { name: 'Roles', state: 'roles' },
      ]
    },
    /*
    {
      name: 'Finanzas',
      type: 'dropDown',
      icon: 'account_balance',
      state: 'modulos/finanzas',
      sub: [
        { name: 'Banco', state: 'banco' },
        { name: 'Tipo Cuenta Bancaria', state: 'tipocuentabancaria' },
        { name: 'Cuentas Bancarias', state: 'cuentabancaria' },
      ]
    },
    {
      name: 'Configurar',
      type: 'dropDown',
      icon: 'settings',
      state: 'modulos/configurar',
      sub: [
        { name: 'Empresa', state: 'empresas' },
        { name: 'Aplicación', state: 'aplicacion' },
        { name: 'Diarios Contables', state: 'diarioscontables' },
        { name: 'Modelos de Planes Contables', state: 'modelosplanescontables' },
        { name: 'Plan Contable', state: 'plancontable' },
        { name: 'Cuenta Balance', state: 'cuentabalance' },
      ]
    },
    {
      name: 'Transacciones',
      type: 'dropDown',
      icon: 'transform',
      state: 'modulos',
      sub: [
        { name: 'Nueva', state: 'transacciones' },
        { name: 'Contabilizar Transacciones', icon: 'account_balance_wallet', state: 'contabilizarcliente/contabilizar' },
      ]
    },
    {
      name: 'Libro Diario',
      type: 'link',
      icon: 'local_library',
      state: 'modulos/libromayor',
    },
    {
      name: 'Libro Mayor',
      type: 'link',
      icon: 'business_center',
      state: 'modulos/mayor',
    },
    {
      name: 'Reportes',
      type: 'dropDown',
      icon: 'list_alt',
      state: 'modulos',
      sub: [
        {
          name: 'Balances',
          type: 'dropDown',
          state: 'reportes',
          sub: [
            { name: 'Balance de Comprobación', state: 'balancecomprobacion' },
            { name: 'Balance Final', state: 'balancefinal' },
          ]
        },
        {
          name: 'Estados',
          type: 'dropDown',
          state: 'reportes',
          sub: [
            { name: 'Estado de Resultados', state: 'estadoresultado' },
          ]
        },
        {
          name: 'Hojas',
          type: 'dropDown',
          state: 'reportes',
          sub: [
            { name: 'Hoja de Trabajo', state: 'hojatrabajo' },
          ]
        },
      ]
    },*/
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
